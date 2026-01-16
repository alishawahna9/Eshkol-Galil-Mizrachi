// Service for retrieving cluster authority information
import prisma from "@/lib/prisma";

/**
 * List of all authorities in the Eastern Galilee Cluster
 * Includes both naming variants from population_data.csv and authorities_general.csv
 */
const CLUSTER_AUTHORITY_NAMES = [
  "בוקעאתא",
  "גולן",
  // Both variants for authorities with different names
  "ג'ש (גוש חלב)",
  "גוש חלב (ג'יש)",
  "הגליל העליון",
  "חצור הגלילית",
  "טובא-זנגרייה",
  "טובא - זנגרייה",
  "יסוד המעלה",
  "מבואות החרמון",
  "מג'דל שמס",
  "מגדל שמס",
  "מטולה",
  "מסעדה",
  "מרום הגליל",
  "ע'ג'ר",
  "עין קנייא",
  "עין קיניה",
  "צפת",
  "קצרין",
  "קריית שמונה",
  "ראש פינה",
];

/**
 * Retrieves the list of authority symbols that belong to the Eastern Galilee Cluster.
 * 
 * This function uses a predefined list of cluster authority names (including both
 * naming variants) and fetches their symbols from AuthorityGeneralInfo.
 * 
 * return array of authority symbols (numbers) belonging to the Eastern Galilee Cluster
 */
export async function getAuthoritiesOfTheEasternGalilee(): Promise<number[]> {
  const clusterRows = await prisma.authorityGeneralInfo.findMany({
    select: { symbol: true },
    where: { name: { in: CLUSTER_AUTHORITY_NAMES } },
  });
  
  return clusterRows.map((r) => r.symbol);
}
