// lib/authorities-service.ts
import prisma from "@/lib/prisma";

export type AuthorityData = {
  name: string;
  totalPopulation: number;
};

export async function getAuthoritiesStats(filters?: any): Promise<AuthorityData[]> {
  const rows = await prisma.authorityDemographics.findMany({
    select: { name: true, totalPopulation: true },
    orderBy: { totalPopulation: "desc" }
  });

  return rows.map(r => ({ name: r.name, totalPopulation: r.totalPopulation ?? 0 }));
}