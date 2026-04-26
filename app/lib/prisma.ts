import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

export { prisma };
