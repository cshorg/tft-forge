import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: 'postgresql',
  driver: 'pg',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})