import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

function loadCsv(file: string) {
  const content = fs.readFileSync(path.resolve(__dirname, "..", "prisma", file), "utf-8");
  const rows = parse(content, { columns: false, skip_empty_lines: true, bom: true });
  const header = rows[0];
  const data = rows.slice(1).map((r: any[]) => r.map((c) => (typeof c === "string" ? c.trim() : c)));
  return { header, data };
}

const gen = loadCsv("authorities_general.csv");
const demo = loadCsv("authorities_demographics.csv");

const genBySymbol = new Map<number, string>();
for (const r of gen.data) {
  const name = String(r[0] || "").trim();
  const symbol = parseInt(String(r[1] || ""), 10);
  if (!isNaN(symbol)) genBySymbol.set(symbol, name);
}

const missingSymbols: number[] = [];
const nameMismatches: Array<{ symbol: number; genName: string; demoName: string }> = [];
for (const r of demo.data) {
  const name = String(r[0] || "").trim();
  const symbol = parseInt(String(r[1] || ""), 10);
  if (isNaN(symbol)) continue;
  if (!genBySymbol.has(symbol)) missingSymbols.push(symbol);
  else if (genBySymbol.get(symbol) !== name) {
    nameMismatches.push({ symbol, genName: genBySymbol.get(symbol)!, demoName: name });
  }
}

console.log("Missing symbols in general CSV:", missingSymbols.slice(0, 20));
console.log("Count missing:", missingSymbols.length);
console.log("Name mismatches sample:", nameMismatches.slice(0, 20));
console.log("Count name mismatches:", nameMismatches.length);

if (missingSymbols.length > 0) process.exit(2);
else process.exit(0);
