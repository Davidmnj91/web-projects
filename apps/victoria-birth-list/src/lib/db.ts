import { createClient } from '@libsql/client'

// Use environment variable for database file or default to a local sqlite file
const databaseUrl = process.env.DATABASE_URL ?? 'file:birth_list.db'

export const db = createClient({
  url: databaseUrl,
})

// Self-initialization function for database tables
export async function initDb() {
  try {
    // Enable foreign keys
    await db.execute('PRAGMA foreign_keys = ON;')

    // Create gifts table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS gifts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT,
        price REAL NOT NULL,
        links TEXT, -- JSON array of strings
        createdAt INTEGER NOT NULL
      );
    `)

    // Create reservations table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS reservations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        giftId TEXT NOT NULL,
        status TEXT NOT NULL, -- 'Reserved', 'Purchased', 'Cancelled'
        message TEXT,
        timestamp INTEGER NOT NULL,
        FOREIGN KEY (giftId) REFERENCES gifts (id) ON DELETE CASCADE
      );
    `)

    console.log('Database initialized successfully.')
  } catch (error) {
    console.error('Failed to initialize database:', error)
    throw error
  }
}
