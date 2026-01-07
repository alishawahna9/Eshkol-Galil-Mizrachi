import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Row = {
  authority: string;
  year: number;
  value: number;
};

function detectDelimiter(line: string) {
  // אם זה CSV רגיל → יש פסיקים. אם זה TSV → יש טאבים.
  if (line.includes(",")) return ",";
  if (line.includes("\t")) return "\t";
  return ","; // ברירת מחדל
}

function toIntSafe(v: string) {
  // מוריד פסיקים של אלפים ורווחים
  const n = Number(String(v ?? "").replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : null;
}

function parsePopulationCSV(fileContent: string, year: number): Row[] {
  // מנקה BOM אם יש
  const content = fileContent.replace(/^\uFEFF/, "");

  const lines = content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const delim = detectDelimiter(lines[0]);
  const header = lines[0].split(delim).map((s) => s.trim());

  // header: ["רשויות","2002","2003",...]
  const yearIndex = header.findIndex((h) => Number(h) === year);
  if (yearIndex === -1) return [];

  const out: Row[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(delim).map((s) => s.trim());
    const authority = cols[0];

    if (!authority) continue;
    // אם לא רוצים שורת סך הכל בטבלה:
    if (authority.includes("סך הכל")) continue;

    const val = toIntSafe(cols[yearIndex]);
    if (val === null) continue;

    out.push({ authority, year, value: val });
  }

  // מיון מהגדול לקטן כמו אצלכם במסך
  out.sort((a, b) => b.value - a.value);
  return out;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const yearStr = searchParams.get("year");
  const authority = (searchParams.get("authority") || "").trim();

  const year = Number(yearStr);
  if (!yearStr || !Number.isFinite(year)) {
    return NextResponse.json({ error: "Missing/invalid year" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "prisma", "population_data.csv");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "population_data.csv not found in /prisma" },
      { status: 500 }
    );
  }

  const raw = fs.readFileSync(filePath, "utf8");
  let data = parsePopulationCSV(raw, year);

  if (authority) {
    data = data.filter((r) => r.authority === authority);
  }

  return NextResponse.json({
    year,
    authority: authority || null,
    data,
  });
}
