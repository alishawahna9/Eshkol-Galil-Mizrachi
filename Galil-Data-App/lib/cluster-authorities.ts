// Service for retrieving cluster authority information
import prisma from "@/lib/prisma";

/**
 * Retrieves the list of authority symbols that belong to the Eastern Galilee Cluster.
 * 
 * This function fetches authorities from the PopulationData table, which represents
 * the cluster authorities, and maps them to their corresponding authority symbols
 * using the AuthorityGeneralInfo table.
 * 
 * return array of authority symbols (numbers) belonging to the Eastern Galilee Cluster
 */
export async function getAuthoritiesOfTheEasternGalilee(): Promise<number[]> {
  // Fetch distinct authority names from PopulationData table
  const clusterAuthorities = await prisma.populationData.findMany({
    select: { authority: true },
    distinct: ["authority"],
  });
  
  // Map authority names to their symbols using AuthorityGeneralInfo table
  const authorityNames = clusterAuthorities.map((r) => r.authority);
  const clusterRows = await prisma.authorityGeneralInfo.findMany({
    select: { symbol: true },
    where: { name: { in: authorityNames } },
  });
  
  return clusterRows.map((r) => r.symbol);
}
