import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"
dotenv.config()

export default defineConfig({
  schema: "./src/app/drizzle/schema.ts",
  out: "./src/app/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url : process.env.DATABASE_URL as string
  },
  verbose: true,
  strict: true,
})