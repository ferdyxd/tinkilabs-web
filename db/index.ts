import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// Cliente para serverless (Vercel)
const client = postgres(connectionString, {
  max: process.env.NODE_ENV === 'production' ? 5 : 1,
  idle_timeout: 20,
  connect_timeout: 10,
  prepare: false,
});

export const db = drizzle(client, { schema });

// Migración programática (para producción: corre en el build de Vercel)
export async function runMigrations() {
  const migrationClient = postgres(connectionString, { max: 1 });
  await migrate(drizzle(migrationClient), { migrationsFolder: './db/migrations' });
  await migrationClient.end();
}

export { schema };
