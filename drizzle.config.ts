import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/database/schema.ts",
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url: "postgres://dev:dev@localhost:5432/app"
  }
})
