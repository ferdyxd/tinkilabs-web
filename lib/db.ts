import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'alby_admin',
  password: 'alby_admin',
  database: 'supermarket',
});

let tableCreated = false;

export async function ensureTables() {
  if (tableCreated) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id SERIAL PRIMARY KEY,
      nombre_nino VARCHAR(200) NOT NULL,
      linea VARCHAR(50) NOT NULL,
      plan VARCHAR(50) NOT NULL,
      precio_mes_cents INTEGER NOT NULL,
      precio_total_cents INTEGER NOT NULL,
      direccion VARCHAR(500) NOT NULL,
      ciudad VARCHAR(200) NOT NULL,
      cp VARCHAR(5) NOT NULL,
      telefono VARCHAR(20),
      stripe_customer_id VARCHAR(200),
      stripe_subscription_id VARCHAR(200),
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS gift_certificates (
      id SERIAL PRIMARY KEY,
      code VARCHAR(16) UNIQUE NOT NULL,
      product VARCHAR(50) NOT NULL,
      duration_months INTEGER NOT NULL,
      price_cents INTEGER NOT NULL,
      purchaser_name VARCHAR(200) NOT NULL,
      purchaser_email VARCHAR(200),
      recipient_name VARCHAR(200) NOT NULL,
      recipient_email VARCHAR(200) NOT NULL,
      message TEXT,
      send_date DATE NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      stripe_session_id VARCHAR(200),
      redeemed_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
  tableCreated = true;
}

export default pool;
