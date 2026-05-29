import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// En producción: DATABASE_URL apuntará a Supabase
// En desarrollo: apunta a PostgreSQL local (localhost:5432)
const connectionString = process.env.DATABASE_URL || 'postgresql://alby_admin:alby_admin@localhost:5432/supermarket';

// Postgres.js con pool para serverless (Vercel)
const client = postgres(connectionString, {
  max: process.env.NODE_ENV === 'production' ? 5 : 1,
  idle_timeout: 20,
  connect_timeout: 10,
  prepare: false, // necesario para Supabase en modo transaction
});

export const db = drizzle(client, { schema });
export { schema };
