import "dotenv/config";
import {PrismaClient} from "@/lib/generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";
import {Pool} from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL missing');
const pool = new Pool({ connectionString, connectionTimeoutMillis: 15000 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const rows = await prisma.populationData.findMany({
    where: { authority: 'גולן' },
    orderBy: { year: 'asc' },
  });
  console.log(JSON.stringify(rows, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
