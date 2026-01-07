// lib/authorities-service.ts
import prisma from "@/lib/prisma";

export type AuthorityData = {
  name: string;
  symbol?: number;
  totalPopulation: number;
  metricValue: number;
  municipalStatus?: string | null;
};

export async function getAuthoritiesStats(filters?: { search?: string; domain?: string; metric?: string; municipalStatus?: string }): Promise<AuthorityData[]> {
  // load general info (ensures authorities with no demographics are still present)
  const general = await prisma.authorityGeneralInfo.findMany({ select: { symbol: true, name: true, municipalStatus: true } });

  // load demographics where available
  const demos = await prisma.authorityDemographics.findMany({ select: { symbol: true, name: true, totalPopulation: true, jewsAndOthersPercent: true, arabsPercent: true, muslimsPercent: true } });

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
    const totalPopulation = Math.round(d?.totalPopulation ?? 0);

    // compute counts
    const arabsCount = Math.round((d?.arabsPercent ?? 0) * totalPopulation / 100);
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