// app/api/authorities/route.ts
import { NextResponse } from "next/server";
import { getAuthoritiesStats } from "@/lib/authorities-service"; // הייבוא מהקובץ שלך

export async function GET() {
  try {
    // קריאה לפונקציה שכתבת
    const data = await getAuthoritiesStats();
    
    // החזרת התשובה לדפדפן
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching authorities:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}