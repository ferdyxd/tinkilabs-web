// Script de migración para producción (Vercel)
// Se ejecuta en postinstall: npx tsx db/migrate-prod.ts
import { runMigrations } from './index';

runMigrations()
  .then(() => {
    console.log('✅ Migraciones aplicadas correctamente');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error al aplicar migraciones:', err);
    process.exit(1);
  });
