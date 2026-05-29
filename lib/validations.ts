import { z } from 'zod';

// ═══════════════════════════════════════════════════════════════
// Suscripción
// ═══════════════════════════════════════════════════════════════

export const SubscribeSchema = z.object({
  nombreNino: z.string().min(1).max(200),
  linea: z.enum(['mini', 'maker', 'pro']),
  plan: z.enum(['mensual', 'trimestral', 'anual']),
  direccion: z.string().min(1).max(500),
  ciudad: z.string().min(1).max(200),
  cp: z.string().length(5).regex(/^\d{5}$/, 'Código postal no válido'),
  telefono: z.string().max(20).optional(),
  email: z.string().email().max(255).optional(),
});

export type SubscribeInput = z.infer<typeof SubscribeSchema>;

// ═══════════════════════════════════════════════════════════════
// Gift Certificate
// ═══════════════════════════════════════════════════════════════

export const CreateGiftSchema = z.object({
  product: z.string().min(1).max(100),
  durationMonths: z.union([z.literal(3), z.literal(6), z.literal(12)]),
  priceCents: z.number().int().positive(),
  purchaserName: z.string().min(1).max(200),
  purchaserEmail: z.string().email().max(200).optional(),
  recipientName: z.string().min(1).max(200),
  recipientEmail: z.string().email().max(200),
  message: z.string().max(500).optional(),
  sendDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato YYYY-MM-DD requerido'),
});

export type CreateGiftInput = z.infer<typeof CreateGiftSchema>;

// ═══════════════════════════════════════════════════════════════
// Canje Gift
// ═══════════════════════════════════════════════════════════════

export const RedeemGiftSchema = z.object({
  code: z.string().min(1).max(20),
  shippingAddress: z.string().optional(),
  shippingCity: z.string().optional(),
  shippingZip: z.string().optional(),
  shippingCountry: z.string().optional(),
});

export type RedeemGiftInput = z.infer<typeof RedeemGiftSchema>;

// ═══════════════════════════════════════════════════════════════
// Código gift (query param)
// ═══════════════════════════════════════════════════════════════

export const GiftCodeSchema = z.object({
  code: z.string().min(1).max(20),
});
