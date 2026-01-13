// scripts/sync-vectors.ts
import "dotenv/config"; // <--- THIS MUST BE THE FIRST LINE
import {prisma} from "@/lib/prisma";
import {createAndSaveEmbedding} from "@/lib/vector-service";

async function main() {
  // Now process.env.DATABASE_URL will be populated
  console.log("🔍 Checking for missing vectors in Neon...");

  // Use raw SQL to bypass Prisma's "Unsupported" column limitations
  const tables = [
    "AuthorityGeneralInfo",
    "AuthorityDemographics",
    "population_data",
    "authority_population",
  ];

  for (const tableName of tables) {
    console.log(`Checking table: ${tableName}`);

    const missing: any[] = await prisma.$queryRawUnsafe(
      `SELECT * FROM "${tableName}" WHERE embedding IS NULL`
    );

    if (!missing || missing.length === 0) {
      console.log(`✅ ${tableName} is already fully vectorized.`);
      continue;
    }

    console.log(`🚀 Found ${missing.length} records in ${tableName}. Syncing...`);

    for (const item of missing) {
      try {
        await createAndSaveEmbedding(prisma, tableName as any, item);
        console.log(`   → Syncing ${item.name}...`);
        // Stay under Gemini Free Tier limits
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (error) {
        console.error(`   ❌ Failed ${item.name}:`, error);
      }
    }
  }
}

main().catch((err) => {
  console.error("CRITICAL SCRIPT ERROR:", err);
  process.exit(1);
});
