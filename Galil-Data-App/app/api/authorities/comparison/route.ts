// app/api/authorities/comparison/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const yearStr = url.searchParams.get("year");
    const limitStr = url.searchParams.get("limit"); // Optional: limit number of results

    const year = yearStr ? parseInt(yearStr, 10) : 2023; // Default to 2023
    const limit = limitStr ? parseInt(limitStr, 10) : undefined;

    // Validate year
    if (isNaN(year) || year < 2000 || year > 2100) {
      // Check what years are available in DB
      const availableYears = await prisma.populationData.findMany({
        select: { year: true },
        distinct: ["year"],
        orderBy: { year: "desc" },
      });
      
      return NextResponse.json(
        { error: "Invalid year", availableYears: availableYears.map(y => y.year) },
        { status: 400 }
      );
    }

    // Query PopulationData table for the specified year
    const populationData = await prisma.populationData.findMany({
      where: {
        year: year,
      },
      orderBy: {
        population: "desc", // Sort by population descending
      },
      take: limit, // Limit results if specified
    });

    // Transform to match ComparisonChart format: { label: string; value: number }
    const transformed = populationData.map((d) => ({
      label: d.authority,
      value: d.population,
    }));

    return NextResponse.json(transformed, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=30" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comparison data", details: String(error) },
      { status: 500 }
    );
  }
}

