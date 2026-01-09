// app/api/authorities/comparison/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const yearStr = url.searchParams.get("year");
    const limitStr = url.searchParams.get("limit"); // Optional: limit number of results
    const metric = url.searchParams.get("metric") || "total_population";

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

    // Support optional search param to filter authorities by name
    const search = url.searchParams.get("search");

    let transformed: Array<{ label: string; value: number }> = [];

    if (metric === "total_population") {
      // Query PopulationData table for the specified year
      const populationData = await prisma.populationData.findMany({
        where: {
          year: year,
          ...(search ? { authority: { contains: search, mode: "insensitive" } } : {}),
        },
        orderBy: {
          population: "desc",
        },
        take: limit,
      });

      transformed = populationData.map((d) => ({ label: d.authority, value: d.population }));
    } else {
      // Map metric to demographics field
      const fieldMap: Record<string, keyof typeof prisma.authorityDemographics> = {
        jews_and_others: "jewsAndOthersPercent" as any,
        arabs: "arabsPercent" as any,
        muslims: "muslimsPercent" as any,
      };

      const field = fieldMap[metric];
      if (!field) {
        return NextResponse.json(
          { error: "Unsupported metric for comparison", metric },
          { status: 400 }
        );
      }

      const rows = await prisma.authorityDemographics.findMany({
        where: {
          ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
        },
        orderBy: {
          [field]: "desc" as any,
        },
        take: limit,
      });

      transformed = rows
        .map((r: any) => ({ label: r.name, value: r[field] ?? 0 }))
        .filter((r) => Number.isFinite(r.value));
    }

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

