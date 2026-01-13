import "dotenv/config";
import {PrismaClient} from "../lib/generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";
import {Pool} from "pg";
import fs from "fs";
import path from "path";
import {parse} from "csv-parse/sync";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is missing from .env file");
}

const pool = new Pool({
  connectionString,
  connectionTimeoutMillis: 15000,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});

const parseStrictNumber = (val: any): number => {
  if (val === undefined || val === null || val === "" || val === "-" || val === "..") return 0;
  const clean = String(val).replace(/[^\d.-]/g, "");
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
};

async function main() {
  //return console.log("seeding implemented no need to run again");
  // --- 1. SEED: AuthorityGeneralInfo ---
  const generalCsvPath = path.resolve(__dirname, "./authorities_general.csv");

  // canonical map symbol -> name used by demographics to avoid FK mismatches
  const symbolToName = new Map<number, string>();

  if (fs.existsSync(generalCsvPath)) {
    const content = fs.readFileSync(generalCsvPath, "utf-8");
    const rows = parse(content, {columns: false, skip_empty_lines: true, bom: true}).slice(1);

    console.log(`🚀 Seeding General Info: ${rows.length} records`);

    for (const row of rows) {
      const data = {
        name: row[0],
        symbol: Math.floor(parseStrictNumber(row[1])),
        district: row[2] || "Unknown",
        municipalStatus: row[3] || "Unknown",
        distanceFromTelAviv: parseStrictNumber(row[4]),
        establishedYear: row[5] ? String(row[5]) : "N/A",
        coastalStatus: row[6] === "1",
        councilMembersCount: Math.floor(parseStrictNumber(row[7])),
        planningCommitteeId: Math.floor(parseStrictNumber(row[8])),
        planningCommitteeName: row[9] || "Unknown",
        area: parseStrictNumber(row[10]),
      };
      await (prisma.authorityGeneralInfo as any).upsert({
        where: {symbol: data.symbol},
        update: data,
        create: data,
      });

      // store canonical name by symbol
      symbolToName.set(data.symbol, data.name);
    }
  }

  // --- 2. SEED: AuthorityDemographics ---
  const demoCsvPath = path.resolve(__dirname, "./authorities_demographics.csv");
  if (fs.existsSync(demoCsvPath)) {
    const content = fs.readFileSync(demoCsvPath, "utf-8");
    const rows = parse(content, {columns: false, skip_empty_lines: true, bom: true}).slice(1);

    console.log(`🚀 Seeding Demographics: ${rows.length} records`);
    for (const row of rows) {
      const symbol = Math.floor(parseStrictNumber(row[1]));
      const canonicalName = symbolToName.get(symbol) || String(row[0]);

      const data = {
        name: canonicalName,
        symbol,
        age_0_4: parseStrictNumber(row[2]),
        age_5_9: parseStrictNumber(row[3]),
        age_10_14: parseStrictNumber(row[4]),
        age_15_19: parseStrictNumber(row[5]),
        age_20_29: parseStrictNumber(row[6]),
        age_30_44: parseStrictNumber(row[7]),
        age_45_59: parseStrictNumber(row[8]),
        age_60_64: parseStrictNumber(row[9]),
        age_65_plus: parseStrictNumber(row[10]),
        age_0_17: parseStrictNumber(row[11]),
        age_75_plus: parseStrictNumber(row[12]),
        density: parseStrictNumber(row[13]),
        totalPopulation: parseStrictNumber(row[14]),
        totalIsraelis: parseStrictNumber(row[15]),
        jewsAndOthersPercent: parseStrictNumber(row[16]),
        jewsPercent: parseStrictNumber(row[17]),
        arabsPercent: parseStrictNumber(row[18]),
        muslimsPercent: parseStrictNumber(row[19]),
        christiansPercent: parseStrictNumber(row[20]),
        druzePercent: parseStrictNumber(row[21]),
        men: parseStrictNumber(row[22]),
        women: parseStrictNumber(row[23]),
      };
      await (prisma.authorityDemographics as any).upsert({
        where: {symbol: data.symbol},
        update: data,
        create: data,
      });
    }
  }

  // --- 3. SEED: PopulationData ---
  const popCsvPath = path.resolve(__dirname, "./population_data.csv");
  if (fs.existsSync(popCsvPath)) {
    const content = fs.readFileSync(popCsvPath, "utf-8");
    const rows = parse(content, { columns: false, skip_empty_lines: true, bom: true });
    const header = rows[0] || [];
    const dataRows = rows.slice(1);

    console.log(`🚀 Seeding PopulationData: ${dataRows.length} authorities × years`);
    const canonicalNames = new Set(Array.from(symbolToName.values()).map((s) => String(s).trim()));
    const missingAuthorities = new Set<string>();

    const records: Array<{ authority: string; year: number; population: number }> = [];

    for (const row of dataRows) {
      const authority = String(row[0] || "").trim();
      if (!authority || authority === "סך הכל") continue; // לדלג על שורת סיכום
      if (!canonicalNames.has(authority)) {
        missingAuthorities.add(authority);
        continue; // skip authorities that don't match general info names
      }
      for (let i = 1; i < header.length && i < row.length; i++) {
        const year = parseInt(String(header[i]), 10);
        if (isNaN(year)) continue;
        const population = Math.floor(parseStrictNumber(row[i]));
        records.push({ authority, year, population });
      }
    }

    if (missingAuthorities.size > 0) {
      console.warn(`⚠️ Skipping ${missingAuthorities.size} authorities from population CSV that have no matching general info. Examples:`, Array.from(missingAuthorities).slice(0,10));
    }

    // to avoid huge single requests, insert in chunks
    const chunkSize = 1000;
    for (let i = 0; i < records.length; i += chunkSize) {
      const chunk = records.slice(i, i + chunkSize);
      await prisma.populationData.createMany({ data: chunk, skipDuplicates: true });
    }
    console.log(`Inserted ${records.length} population records (duplicates skipped)`);
  }

  console.log("\n✅ Done! All tables seeded.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });