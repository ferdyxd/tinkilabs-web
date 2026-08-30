#!/usr/bin/env node
/**
 * Script de keep-alive para Supabase.
 *
 * Genera actividad variada (lectura + escritura) en la base de datos
 * para evitar que Supabase suspenda el proyecto por inactividad.
 *
 * Cron (lunes y jueves 9AM):
 *   0 9 * * 1,4 node /home/alby/tinkilabs/web/scripts/keep-alive-supabase.js >> /home/alby/tinkilabs/web/scripts/keep-alive.log 2>&1
 */

const postgres = require('postgres');

const DATABASE_URL = process.env.DATABASE_URL
  || 'postgresql://postgres.swixrnqtrlcrtnacmzpb:%21Tinkilabs8%26@aws-1-eu-central-1.pooler.supabase.com:6543/postgres';

const sql = postgres(DATABASE_URL, {
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
  prepare: false,
});

function ts() {
  return new Date().toISOString();
}

function log(msg) {
  console.log(`[${ts()}] ${msg}`);
}

function logSection(title) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  ${title}`);
  console.log(`${'═'.repeat(60)}`);
}

async function main() {
  const start = Date.now();
  log('Iniciando keep-alive de Supabase...');

  try {
    // ── 1. Ping ──────────────────────────────────────────
    logSection('1. Ping');
    const pingRows = await sql`SELECT 1 as ping, now() as server_time`;
    log('Ping OK - servidor: ' + pingRows[0].server_time);

    // ── 2. Lectura de catalogo ───────────────────────────
    logSection('2. Lectura de catalogo');
    const productos = await sql`
      SELECT id, slug, nombre, linea, precio_cents, activo
      FROM productos ORDER BY orden
    `;
    log('Productos encontrados: ' + productos.length);
    for (const p of productos) {
      log('  [' + p.linea + '] ' + p.nombre + ' - ' + (p.precio_cents / 100).toFixed(2) + ' EUR ' + (p.activo ? 'activo' : 'inactivo'));
    }

    // ── 3. Usuarios ──────────────────────────────────────
    logSection('3. Usuarios');
    const usuarios = await sql`
      SELECT id, email, nombre, created_at,
             EXTRACT(DAY FROM now() - created_at)::int AS dias_desde_registro
      FROM usuarios ORDER BY created_at DESC LIMIT 10
    `;
    log('Total usuarios: ' + usuarios.length);
    for (const u of usuarios) {
      log('  ' + u.nombre + ' <' + u.email + '> - hace ' + u.dias_desde_registro + ' dias');
    }

    // ── 4. Suscripciones ─────────────────────────────────
    logSection('4. Suscripciones');
    const subs = await sql`
      SELECT s.id, s.linea, s.plan, s.estado, s.precio_mes_cents,
             COALESCE(u.email, 'sin usuario') AS email
      FROM suscripciones s
      LEFT JOIN usuarios u ON s.usuario_id = u.id
      ORDER BY s.created_at DESC
    `;
    log('Suscripciones: ' + subs.length);
    for (const s of subs) {
      log('  [' + s.estado + '] ' + s.linea + ' / ' + s.plan + ' - ' + (s.precio_mes_cents / 100).toFixed(2) + ' EUR - ' + s.email);
    }

    // ── 5. Escritura ligera ──────────────────────────────
    logSection('5. Escritura de actividad');

    try {
      await sql`
        CREATE TABLE IF NOT EXISTS _keep_alive_log (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMP DEFAULT now()
        )
      `;
      log('Tabla _keep_alive_log OK');
    } catch (e) {
      log('WARN: no se pudo crear tabla: ' + e.message);
    }

    const insertResult = await sql`
      INSERT INTO _keep_alive_log DEFAULT VALUES RETURNING id, created_at
    `;
    log('INSERT: id=' + insertResult[0].id + ' ts=' + insertResult[0].created_at);

    const cleaned = await sql`
      DELETE FROM _keep_alive_log
      WHERE id NOT IN (
        SELECT id FROM _keep_alive_log ORDER BY id DESC LIMIT 10
      )
    `;
    if (cleaned.count > 0) {
      log('Limpiados ' + cleaned.count + ' registros antiguos');
    }

    // ── 6. UPDATE ────────────────────────────────────────
    logSection('6. UPDATE de actividad');
    if (productos.length > 0) {
      const firstProduct = productos[0];
      const updateResult = await sql`
        UPDATE productos SET activo = true
        WHERE id = ${firstProduct.id} AND activo = true
        RETURNING id, nombre
      `;
      const nombre = updateResult[0] ? updateResult[0].nombre : firstProduct.nombre;
      log('UPDATE en "' + nombre + '" - sin cambios, solo actividad');
    }

    // ── 7. ANALYZE ───────────────────────────────────────
    logSection('7. ANALYZE');
    try {
      await sql`ANALYZE _keep_alive_log`;
      log('ANALYZE completado');
    } catch (e) {
      log('WARN: ANALYZE fallo: ' + e.message);
    }

    // ── Resumen ───────────────────────────────────────────
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    logSection('KEEP-ALIVE COMPLETADO');
    log('Tiempo total: ' + elapsed + 's');
    log('Operaciones: PING + SELECTx3 + INSERT + DELETE + UPDATE + ANALYZE');

  } catch (err) {
    log('ERROR: ' + err.message);
    console.error(err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
