import { getAuthoritiesOfTheEasternGalilee } from "../lib/cluster-authorities";
import prisma from "../lib/prisma";

async function main() {
  console.log("🔍 Testing cluster authorities with Prisma relations...\n");
  
  const symbols = await getAuthoritiesOfTheEasternGalilee();
  
  console.log(`✅ Found ${symbols.length} authorities in the cluster\n`);
  console.log("Symbols:", symbols);
  console.log("\n");
  
  // Get full details for these symbols
  const authorities = await prisma.authorityGeneralInfo.findMany({
    where: { symbol: { in: symbols } },
    select: { symbol: true, name: true },
    orderBy: { name: 'asc' }
  });
  
  console.log("📋 Authority names:");
  authorities.forEach(auth => {
    console.log(`  ${auth.symbol}: ${auth.name}`);
  });
  
  await prisma.$disconnect();
}

main().catch(console.error);
