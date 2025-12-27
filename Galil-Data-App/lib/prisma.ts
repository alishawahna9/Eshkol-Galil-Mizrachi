// lib/prisma.ts
import {PrismaClient} from "@/lib/generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";
import {Pool} from "pg"; // You need the pg pool for the adapter

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// 1. Create the pg Pool first
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Create the adapter
const adapter = new PrismaPg(pool);

// 3. Construct the client
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
