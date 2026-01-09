// app/api/authorities/trend/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const authoritiesParam = url.searchParams.get("authorities"); // Comma-separated list of authority names
    const startYear = parseInt(url.searchParams.get("startYear") || "2003", 10);
    const endYear = parseInt(url.searchParams.get("endYear") || "2023", 10);
    const limit = url.searchParams.get("limit"); // Optional: limit number of authorities

    // Validate years
    if (isNaN(startYear) || isNaN(endYear) || startYear > endYear) {
      return NextResponse.json(
        { error: "Invalid year range" },
        { status: 400 }
      );
    }

    // Build where clause
    const where: any = {
      year: {
        gte: startYear,
        lte: endYear,
      },
    };

    // If specific authorities are requested, filter by them
    if (authoritiesParam) {
      const authorityNames = authoritiesParam.split(",").map((a) => a.trim());
      where.authority = {
        in: authorityNames,
      };
    }

    // Fetch population data
    const populationData = await prisma.populationData.findMany({
      where,
      orderBy: [
        { authority: "asc" },
        { year: "asc" },
      ],
    });

    // Group by authority and build series
    const authorityMap = new Map<string, Array<{ year: number; population: number }>>();

    populationData.forEach((record) => {
      if (!authorityMap.has(record.authority)) {
        authorityMap.set(record.authority, []);
      }
      authorityMap.get(record.authority)!.push({
        year: record.year,
        population: record.population,
      });
    });

    // Convert to series format
    let series = Array.from(authorityMap.entries())
      .map(([authority, data]) => {
        // Sort by year and convert to points format
        const points = data
          .sort((a, b) => a.year - b.year)
          .map((d) => ({
            x: d.year,
            y: d.population,
          }));

        return {
          name: authority,
          points,
        };
      })
      .filter((s) => s.points.length > 0) // Only include series with data
      .sort((a, b) => {
        // Sort by latest year value (descending)
        const aLatest = a.points[a.points.length - 1]?.y || 0;
        const bLatest = b.points[b.points.length - 1]?.y || 0;
        return bLatest - aLatest;
      });

    // Apply limit if specified (limit number of authorities, not records)
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum)) {
        series = series.slice(0, limitNum);
      }
    } else if (!authoritiesParam) {
      // If no specific authorities requested and no limit, default to top 10
      series = series.slice(0, 10);
    }

    return NextResponse.json(series, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=30" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch trend data", details: String(error) },
      { status: 500 }
    );
  }
}

