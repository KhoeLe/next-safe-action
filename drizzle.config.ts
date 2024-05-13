import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  out: "./src/db/generated",
  dbCredentials: {
    url: process.env.NEXT_DATABASE_URL ?? '',
  },
  verbose: true,
  strict: true,
});