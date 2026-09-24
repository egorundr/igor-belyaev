import { Pool } from 'pg'
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

const globalForNeon = globalThis as typeof globalThis & {
  neonPool?: Pool
  neonDb?: NodePgDatabase<typeof schema>
}

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured')
  }

  if (!globalForNeon.neonPool) {
    globalForNeon.neonPool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 })
  }

  if (!globalForNeon.neonDb) {
    globalForNeon.neonDb = drizzle(globalForNeon.neonPool, { schema })
  }

  return globalForNeon.neonDb
}
