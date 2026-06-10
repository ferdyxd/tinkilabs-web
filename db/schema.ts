import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
  date,
  pgEnum,
  boolean,
  index,
} from 'drizzle-orm/pg-core';

// ═══════════════════════════════════════════════════════════════
// Enums
// ═══════════════════════════════════════════════════════════════

export const lineaEnum = pgEnum('linea', ['mini', 'maker', 'pro']);
export const estadoSuscripcionEnum = pgEnum('estado_suscripcion', [
  'pendiente',
  'activa',
  'pausada',
  'cancelada',
  'expirada',
]);
export const estadoPedidoEnum = pgEnum('estado_pedido', [
  'pendiente',
  'confirmado',
  'enviado',
  'entregado',
  'cancelado',
  'reembolsado',
]);
export const estadoGiftEnum = pgEnum('estado_gift', [
  'pendiente',
  'pagado',
  'enviado',
  'canjeado',
  'expirado',
]);
export const estadoEnvioEnum = pgEnum('estado_envio', [
  'pendiente',
  'en_transito',
  'entregado',
  'devuelto',
]);
export const planEnum = pgEnum('plan', ['mensual', 'trimestral', 'semestral', 'anual']);

// ═══════════════════════════════════════════════════════════════
// Tablas
// ═══════════════════════════════════════════════════════════════

export const usuarios = pgTable('usuarios', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  nombre: varchar('nombre', { length: 255 }).notNull(),
  apellido: varchar('apellido', { length: 255 }),
  newsletter: boolean('newsletter').default(true),
  direccion: varchar('direccion', { length: 500 }),
  ciudad: varchar('ciudad', { length: 200 }),
  cp: varchar('cp', { length: 5 }),
  telefono: varchar('telefono', { length: 20 }),
  stripeCustomerId: varchar('stripe_customer_id', { length: 100 }).unique(),
  authProvider: varchar('auth_provider', { length: 20 }).default('email'),
  authProviderId: varchar('auth_provider_id', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const productos = pgTable('productos', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  nombre: varchar('nombre', { length: 255 }).notNull(),
  linea: lineaEnum('linea').notNull(),
  edadMin: integer('edad_min').notNull(),
  edadMax: integer('edad_max').notNull(),
  precioCents: integer('precio_cents').notNull(),
  descripcion: text('descripcion'),
  queIncluye: text('que_incluye'),
  tiempoMontaje: varchar('tiempo_montaje', { length: 100 }),
  imagenPrincipal: varchar('imagen_principal', { length: 500 }),
  videoUrl: varchar('video_url', { length: 500 }),
  mecanismo: text('mecanismo'),
  orden: integer('orden').default(0),
  activo: boolean('activo').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const suscripciones = pgTable('suscripciones', {
  id: serial('id').primaryKey(),
  usuarioId: integer('usuario_id').references(() => usuarios.id, { onDelete: 'set null' }),
  productoId: integer('producto_id').references(() => productos.id),
  linea: lineaEnum('linea').notNull(),
  plan: planEnum('plan').notNull().default('mensual'),
  precioMesCents: integer('precio_mes_cents').notNull(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 100 }),
  stripeCustomerId: varchar('stripe_customer_id', { length: 100 }),
  estado: estadoSuscripcionEnum('estado').notNull().default('pendiente'),
  direccion: varchar('direccion', { length: 500 }),
  ciudad: varchar('ciudad', { length: 200 }),
  cp: varchar('cp', { length: 5 }),
  telefono: varchar('telefono', { length: 20 }),
  proximaRenovacion: timestamp('proxima_renovacion'),
  pausadaHasta: timestamp('pausada_hasta'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_susc_usuario').on(table.usuarioId),
  index('idx_susc_estado').on(table.estado),
  index('idx_susc_renovacion').on(table.proximaRenovacion),
]);

export const pedidos = pgTable('pedidos', {
  id: serial('id').primaryKey(),
  usuarioId: integer('usuario_id').references(() => usuarios.id),
  stripeSessionId: varchar('stripe_session_id', { length: 100 }),
  estado: estadoPedidoEnum('estado').notNull().default('pendiente'),
  totalCents: integer('total_cents'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_pedidos_usuario').on(table.usuarioId),
  index('idx_pedidos_estado').on(table.estado),
]);

export const pedidoItems = pgTable('pedido_items', {
  id: serial('id').primaryKey(),
  pedidoId: integer('pedido_id')
    .notNull()
    .references(() => pedidos.id, { onDelete: 'cascade' }),
  productoId: integer('producto_id').references(() => productos.id),
  cantidad: integer('cantidad').notNull().default(1),
  precioUnitarioCents: integer('precio_unitario_cents'),
  duracionMeses: integer('duracion_meses'),
}, (table) => [
  index('idx_items_pedido').on(table.pedidoId),
  index('idx_items_producto').on(table.productoId),
]);

export const giftCertificates = pgTable('gift_certificates', {
  id: serial('id').primaryKey(),
  codigo: varchar('codigo', { length: 20 }).notNull().unique(),
  producto: varchar('producto', { length: 100 }).notNull(),
  duracionMeses: integer('duracion_meses').notNull(),
  precioCents: integer('precio_cents').notNull(),
  nombreComprador: varchar('nombre_comprador', { length: 200 }).notNull(),
  emailComprador: varchar('email_comprador', { length: 200 }),
  nombreDestinatario: varchar('nombre_destinatario', { length: 200 }).notNull(),
  emailDestinatario: varchar('email_destinatario', { length: 200 }).notNull(),
  mensaje: text('mensaje'),
  fechaEnvio: date('fecha_envio').notNull(),
  estado: estadoGiftEnum('estado').notNull().default('pendiente'),
  stripeSessionId: varchar('stripe_session_id', { length: 200 }),
  usuarioDestinatarioId: integer('usuario_destinatario_id').references(() => usuarios.id),
  canjeadoEn: timestamp('canjeado_en'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_gift_fecha_estado').on(table.fechaEnvio, table.estado),
  index('idx_gift_email_dest').on(table.emailDestinatario),
]);

export const envios = pgTable('envios', {
  id: serial('id').primaryKey(),
  pedidoId: integer('pedido_id').references(() => pedidos.id),
  suscripcionId: integer('suscripcion_id').references(() => suscripciones.id),
  trackingNumber: varchar('tracking_number', { length: 200 }),
  transportista: varchar('transportista', { length: 100 }),
  estado: estadoEnvioEnum('estado').notNull().default('pendiente'),
  fechaEnvio: timestamp('fecha_envio'),
  fechaEntrega: timestamp('fecha_entrega'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_envios_pedido').on(table.pedidoId),
  index('idx_envios_suscripcion').on(table.suscripcionId),
]);

export const sesiones = pgTable('sesiones', {
  id: serial('id').primaryKey(),
  usuarioId: integer('usuario_id')
    .notNull()
    .references(() => usuarios.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiraEn: timestamp('expira_en').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_sesiones_usuario').on(table.usuarioId),
  index('idx_sesiones_expira').on(table.expiraEn),
]);

export const ninos = pgTable('ninos', {
  id: serial('id').primaryKey(),
  usuarioId: integer('usuario_id')
    .notNull()
    .references(() => usuarios.id, { onDelete: 'cascade' }),
  nombre: varchar('nombre', { length: 100 }).notNull(),
  fechaNacimiento: date('fecha_nacimiento').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_ninos_usuario').on(table.usuarioId),
]);
