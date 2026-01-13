import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Row = {
  authority: string;
  year: number;
  value: number;
};

// 1. מיפוי בין המפתח (שמגיע מהצד-לקוח) לשם הקובץ בתיקיית prisma
// עליך לוודא שהקבצים האלה באמת קיימים בתיקייה!
const FILE_MAPPING: Record<string, string> = {
  "total_population": "population_data.csv",       // אוכלוסיה כללית
  "jews_and_others": "population_jews.csv",        // יהודים ואחרים (שם קובץ לדוגמה)
  "arabs": "population_arabs.csv",                 // ערבים (שם קובץ לדוגמה)
  "muslims": "population_muslims.csv"              // מוסלמים (שם קובץ לדוגמה)
};

function detectDelimiter(line: string) {
  if (line.includes(",")) return ",";
  if (line.includes("\t")) return "\t";
  return ",";
}

function toIntSafe(v: string) {
  const n = Number(String(v ?? "").replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : null;
}

function parsePopulationCSV(fileContent: string, year: number): Row[] {
  const content = fileContent.replace(/^\uFEFF/, ""); // ניקוי BOM

  const lines = content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const delim = detectDelimiter(lines[0]);
  const header = lines[0].split(delim).map((s) => s.trim());

  // איתור העמודה של השנה המבוקשת
  const yearIndex = header.findIndex((h) => Number(h) === year);
  if (yearIndex === -1) return [];

  const out: Row[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(delim).map((s) => s.trim());
    const authority = cols[0];

    if (!authority) continue;
    if (authority.includes("סך הכל")) continue;

    const val = toIntSafe(cols[yearIndex]);
    if (val === null) continue;

    out.push({ authority, year, value: val });
  }

  out.sort((a, b) => b.value - a.value);
  return out;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const yearStr = searchParams.get("year");
  const authority = (searchParams.get("authority") || "").trim();
  
  // 2. קבלת המדד מה-URL (ברירת מחדל: אוכלוסיה כללית)
  const metric = searchParams.get("metric") || "total_population";

  const year = Number(yearStr);
  if (!yearStr || !Number.isFinite(year)) {
    return NextResponse.json({ error: "Missing/invalid year" }, { status: 400 });
  }

  // 3. בדיקה שהמדד תקין ושליפת שם הקובץ המתאים
  const fileName = FILE_MAPPING[metric];
  
  if (!fileName) {
    return NextResponse.json(
      { error: `Invalid metric type: ${metric}` }, 
      { status: 400 }
    );
  }

  const filePath = path.join(process.cwd(), "prisma", fileName);

  if (!fs.existsSync(filePath)) {
    // החזרת שגיאה מפורטת שתעזור לך להבין איזה קובץ חסר
    return NextResponse.json(
      { error: `File not found: ${fileName} (for metric: ${metric})` },
      { status: 404 } // שיניתי ל-404 כי הקובץ לא נמצא
    );
  }

  const raw = fs.readFileSync(filePath, "utf8");
  
  // 4. שליחת הקובץ הנכון לפונקציית הפירסור
  let data = parsePopulationCSV(raw, year);

  if (authority) {
    data = data.filter((r) => r.authority === authority);
  }

  return NextResponse.json({
    year,
    authority: authority || null,
    metric, // החזרת המדד בתשובה לצורכי בקרה
    data,
  });
}