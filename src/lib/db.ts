import { PrismaClient } from "@prisma/client";

// Add prisma to the NodeJS global type
declare global {
  // eslint-disable-next-line no-var
  var __db__: PrismaClient | undefined;
}

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["info", "warn", "error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

export const prisma = globalThis.__db__ ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.__db__ = prisma;
}
