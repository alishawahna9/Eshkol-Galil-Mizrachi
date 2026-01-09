import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const g = await prisma.authorityGeneralInfo.count();
  const d = await prisma.authorityDemographics.count();
  const p = await prisma.populationData.count();
  console.log('AuthorityGeneralInfo:', g);
  console.log('AuthorityDemographics:', d);
  console.log('PopulationData:', p);
}

main().catch(console.error).finally(async ()=>{await prisma.$disconnect(); await pool.end();});