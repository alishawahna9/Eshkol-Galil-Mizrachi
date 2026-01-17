// app/api/authorities/comparison/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthoritiesOfTheEasternGalilee } from "@/lib/cluster-authorities";

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
    const ageGroup = url.searchParams.get("ageGroup");
    const gender = url.searchParams.get("gender");

    let transformed: Array<{ label: string; value: number }> = [];

    if (metric === "total_population") {
      // Get Eastern Galilee cluster authority symbols
      const clusterSymbols = await getAuthoritiesOfTheEasternGalilee();

      // Get authority names for these symbols
      const clusterAuthorities = await prisma.authorityGeneralInfo.findMany({
        where: { symbol: { in: clusterSymbols } },
        select: { name: true }
      });
      const clusterNames = clusterAuthorities.map(a => a.name);

      // Query PopulationData table for the specified year, only for cluster authorities
      const populationData = await prisma.populationData.findMany({
        where: {
          year: year,
          authority: { in: clusterNames },
          ...(search ? { authority: { contains: search, mode: "insensitive" } } : {}),
        },
        orderBy: {
          population: "desc",
        },
        take: limit,
      });
      // If age group or gender filtering is requested, we need demographics data
      if (ageGroup || gender) {
        // Get demographics data for the authorities
        const authorityNames = populationData.map(p => p.authority);
        const demographics = await prisma.authorityDemographics.findMany({
          where: {
            name: { in: authorityNames },
          },
        });

        const demoMap = new Map(demographics.map(d => [d.name, d]));

        transformed = populationData.map((d) => {
          const demo = demoMap.get(d.authority);
          let value = d.population;

          if (demo) {
            if (ageGroup && ageGroup !== 'none') {
              // Apply age group filter - age fields are percentages
              const ageField = `age_${ageGroup}` as keyof typeof demo;
              const agePercent = demo[ageField];
              if (typeof agePercent === 'number') {
                value = Math.round(d.population * (agePercent / 100));
              }
            } else if (gender && gender !== 'none') {
              // Apply gender filter - gender fields are absolute numbers
              const genderField = gender as 'men' | 'women';
              const genderCount = demo[genderField];
              if (typeof genderCount === 'number') {
                value = genderCount;
              }
            }
          }

          return { label: d.authority, value };
        });
      } else {
        transformed = populationData.map((d) => ({ label: d.authority, value: d.population }));
      }
    } else {
      // Get Eastern Galilee cluster authority symbols
      const clusterSymbols = await getAuthoritiesOfTheEasternGalilee();

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
          symbol: { in: clusterSymbols },
          ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
        },
        orderBy: {
          [field]: "desc" as any,
        },
        take: limit,
      });

      transformed = rows
        .map((r: any) => {
          let value = r[field] ?? 0;

          // For demographic percentages, age/gender filtering doesn't apply directly
          // We'll return the percentage as-is, or could calculate based on age/gender distribution
          // For now, just return the percentage values
          if (ageGroup && ageGroup !== 'none') {
            // Could potentially adjust based on age distribution, but for simplicity return as-is
            value = r[field] ?? 0;
          } else if (gender && gender !== 'none') {
            // Could potentially adjust based on gender distribution, but for simplicity return as-is
            value = r[field] ?? 0;
          }

          return { label: r.name, value };
        })
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

