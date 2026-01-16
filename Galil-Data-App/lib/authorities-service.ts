// lib/authorities-service.ts
import prisma from "@/lib/prisma";
import { getAuthoritiesOfTheEasternGalilee } from "./cluster-authorities";

export type AuthorityData = {
  name: string;
  symbol?: number;
  totalPopulation: number;
  metricValue: number;
  municipalStatus?: string | null;
  arabsCount?: number;
  muslimsCount?: number;
};

export async function getAuthoritiesStats(filters?: { search?: string; domain?: string; metric?: string; municipalStatus?: string; year?: string; ageGroup?: string; gender?: string }): Promise<AuthorityData[]> {
  // Get cluster authority symbols
  const clusterSymbols = await getAuthoritiesOfTheEasternGalilee();
  
  // load general info (only for cluster authorities)
  const general = await prisma.authorityGeneralInfo.findMany({ 
    where: { symbol: { in: clusterSymbols } },
    select: { symbol: true, name: true, municipalStatus: true } 
  });

  // load demographics where available (only for cluster authorities)
  const demos = await prisma.authorityDemographics.findMany({ 
    where: { symbol: { in: clusterSymbols } },
    select: { 
      symbol: true, 
      name: true, 
      totalPopulation: true, 
      jewsAndOthersPercent: true, 
      arabsPercent: true, 
      muslimsPercent: true,
      age_0_4: true,
      age_5_9: true,
      age_10_14: true,
      age_15_19: true,
      age_20_29: true,
      age_30_44: true,
      age_45_59: true,
      age_60_64: true,
      age_65_plus: true,
      men: true,
      women: true
    } 
  });

  // load population data by year if year filter is provided
  const year = filters?.year ? parseInt(filters.year) : null;
  const populationByYear = year 
    ? await prisma.populationData.findMany({ 
        where: { year },
        select: { authority: true, population: true }
      })
    : [];
  
  const populationMap = new Map<string, number>();
  populationByYear.forEach(p => populationMap.set(p.authority, p.population));

  const demoBySymbol = new Map<number, typeof demos[0]>();
  demos.forEach((d) => {
    if (d.symbol != null) demoBySymbol.set(d.symbol, d);
  });

  // build a set of all symbols present in either table
  const symbolSet = new Set<number>();
  general.forEach((g) => symbolSet.add(g.symbol));
  demos.forEach((d) => symbolSet.add(d.symbol));

  const results: AuthorityData[] = [];

  symbolSet.forEach((symbol) => {
    const g = general.find((x) => x.symbol === symbol);
    const d = demoBySymbol.get(symbol);

    const name = g?.name ?? d?.name ?? `Unknown ${symbol}`;
    const municipalStatus = g?.municipalStatus ?? null;
    
    // Use year-specific population if available, otherwise use demographics total
    const basePopulation = year && populationMap.has(name) 
      ? populationMap.get(name)! 
      : Math.round(d?.totalPopulation ?? 0);
    
    let totalPopulation = basePopulation;
    
    // Apply age group filter if specified (ignore empty string or "none")
    if (filters?.ageGroup && filters.ageGroup !== '' && filters.ageGroup !== 'none' && d) {
      const ageField = `age_${filters.ageGroup}` as keyof typeof d;
      const agePercent = d[ageField];
      if (typeof agePercent === 'number') {
        totalPopulation = Math.round(basePopulation * (agePercent / 100));
      }
    }
    
    // Apply gender filter if specified (ignore empty string or "none")
    // men and women are absolute numbers, not percentages
    if (filters?.gender && filters.gender !== '' && filters.gender !== 'none' && d && (!filters?.ageGroup || filters.ageGroup === '' || filters.ageGroup === 'none')) {
      // If only gender filter (no age filter)
      const genderField = filters.gender as 'men' | 'women';
      const genderCount = d[genderField];
      if (typeof genderCount === 'number') {
        totalPopulation = Math.round(genderCount);
      }
    } else if (filters?.gender && filters.gender !== '' && filters.gender !== 'none' && d && filters?.ageGroup && filters.ageGroup !== '' && filters.ageGroup !== 'none') {
      // If both age and gender filters are applied
      // Calculate gender ratio from absolute numbers
      const menCount = d.men ?? 0;
      const womenCount = d.women ?? 0;
      const totalByGender = menCount + womenCount;
      
      if (totalByGender > 0) {
        const genderRatio = filters.gender === 'men' 
          ? (menCount / totalByGender)
          : (womenCount / totalByGender);
        totalPopulation = Math.round(totalPopulation * genderRatio);
      }
    }

    // compute counts from base population (not filtered)
    const arabsCount = Math.round((d?.arabsPercent ?? 0) * basePopulation / 100);
    // Muslims are a subset of Arabs: compute as arabsCount * (muslimsPercent / 100)
    const muslimsCount = Math.round(arabsCount * ((d?.muslimsPercent ?? 0) / 100));

    const metric = filters?.metric ?? "total_population";
    let metricValue = totalPopulation;
    if (metric === "jews_and_others") {
      metricValue = Math.round((d?.jewsAndOthersPercent ?? 0) * totalPopulation / 100);
    } else if (metric === "arabs") {
      metricValue = arabsCount;
    } else if (metric === "muslims") {
      metricValue = muslimsCount;
    }

    results.push({ name, symbol, totalPopulation, metricValue, municipalStatus, arabsCount, muslimsCount });
  });

  // apply search filter (name contains, case-insensitive)
  let filtered = results;
  if (filters?.search) {
    const s = (filters.search ?? "").toLowerCase();
    filtered = filtered.filter((r) => r.name.toLowerCase().includes(s));
  }

  // apply municipalStatus filter if provided
  if (filters?.municipalStatus) {
    filtered = filtered.filter((r) => r.municipalStatus === filters.municipalStatus);
  }

  // domain filter placeholder (future mapping) - currently ignored unless provided and not 'all'
  if (filters?.domain && filters.domain !== "all") {
    // example: if domain sets a special filter, apply mapping here
    // for now, no-op
  }

  // sort by metricValue desc by default
  filtered.sort((a, b) => b.metricValue - a.metricValue);

  return filtered;
}