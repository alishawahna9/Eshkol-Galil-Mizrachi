// app/api/authorities/route.ts
import { NextResponse } from "next/server";
import { getAuthoritiesStats } from "@/lib/authorities-service"; // הייבוא מהקובץ שלך

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || undefined;
    const domain = url.searchParams.get("domain") || undefined;
    const metric = url.searchParams.get("metric") || undefined;
    const municipalStatus = url.searchParams.get("municipalStatus") || undefined;
    const year = url.searchParams.get("year") || undefined;
    const ageGroup = url.searchParams.get("ageGroup") || undefined;
    const gender = url.searchParams.get("gender") || undefined;

    const filters = { search, domain, metric, municipalStatus, year, ageGroup, gender };

    // קריאה לפונקציה שכתבת עם פילטרים
    const data = await getAuthoritiesStats(filters);

    // החזרת התשובה לדפדפן עם cache קצר (60 שניות) כדי לשפר ביצועים
    return NextResponse.json(data, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=30" } });
  } catch (error) {
    console.error("Error fetching authorities:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}