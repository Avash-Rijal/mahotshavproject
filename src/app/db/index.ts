import { drizzle } from 'drizzle-orm/postgres-js'  // or whatever database you're using
import postgres from 'postgres'  // if using postgres
import * as schema from '../drizzle/schema'

// Create the connection
const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString)

// Create the drizzle database instance
export const db = drizzle(client, {schema})