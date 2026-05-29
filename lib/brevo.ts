/**
 * Utilidad Brevo — emails transaccionales y contactos
 * https://developers.brevo.com/reference
 */

const BREVO_API = 'https://api.brevo.com/v3';

function getKey(): string | null {
  return process.env.BREVO_API_KEY || null;
}

// ═══════════════════════════════════════════════════════════════
// Contactos
// ═══════════════════════════════════════════════════════════════

interface AddContactParams {
  email: string;
  nombre?: string;
  listIds?: number[];
  attributes?: Record<string, string>;
}

export async function addContact({ email, nombre, listIds, attributes }: AddContactParams) {
  const key = getKey();
  if (!key) {
    console.log('[brevo:dev] addContact', { email, nombre, listIds });
    return { ok: true, dev: true };
  }

  const body: Record<string, unknown> = {
    email,
    updateEnabled: true,
  };
  if (listIds?.length) body.listIds = listIds;
  if (nombre || attributes) {
    body.attributes = { ...attributes };
    if (nombre) (body.attributes as Record<string, string>).NOMBRE = nombre;
  }

  const res = await fetch(`${BREVO_API}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': key, accept: 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('[brevo] Error addContact:', err);
    return { ok: false, error: err };
  }
  return { ok: true };
}

// ═══════════════════════════════════════════════════════════════
// Email transaccional
// ═══════════════════════════════════════════════════════════════

interface SendEmailParams {
  to: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
}

export async function sendTransactionalEmail({ to, subject, htmlContent, replyTo }: SendEmailParams) {
  const key = getKey();
  if (!key) {
    console.log('[brevo:dev] sendEmail', { to: to.email, subject });
    return { ok: true, dev: true };
  }

  const body: Record<string, unknown> = {
    sender: { email: 'hola@tinkilabs.com', name: 'Tinkilabs' },
    to: [to],
    subject,
    htmlContent,
  };
  if (replyTo) body.replyTo = replyTo;

  const res = await fetch(`${BREVO_API}/smtp/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': key, accept: 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('[brevo] Error sendEmail:', err);
    return { ok: false, error: err };
  }
  return { ok: true };
}

// ═══════════════════════════════════════════════════════════════
// Plantillas predefinidas
// ═══════════════════════════════════════════════════════════════

const EMAIL_LOGO = 'https://tinkilabs.com/tinki-email.png';
const COLOR_NARANJA = '#FF6B35';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tinkilabs.com';

function wrapTemplate(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;padding:32px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
<!-- Header -->
<tr><td style="background:${COLOR_NARANJA};padding:32px 40px;text-align:center">
  <h1 style="margin:0;color:#fff;font-size:28px;font-weight:800">${title}</h1>
</td></tr>
<!-- Body -->
<tr><td style="padding:40px">
${body}
</td></tr>
<!-- Footer -->
<tr><td style="background:#1A1A2E;padding:24px 40px;text-align:center">
  <p style="margin:0 0 8px;color:#fff;font-size:14px;font-weight:700">Tinkilabs</p>
  <p style="margin:0;color:rgba(255,255,255,0.5);font-size:12px">Construye. Aprende. Alucina.</p>
  <p style="margin:12px 0 0;color:rgba(255,255,255,0.3);font-size:11px">
    <a href="${BASE_URL}/terminos" style="color:rgba(255,255,255,0.4)">Términos</a> ·
    <a href="${BASE_URL}/privacidad" style="color:rgba(255,255,255,0.4)">Privacidad</a> ·
    <a href="${BASE_URL}/aviso-legal" style="color:rgba(255,255,255,0.4)">Aviso legal</a>
  </p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function plantillaSuscripcion(nombreNino: string, linea: string, plan: string, total: string) {
  const body = `
    <h2 style="color:#1A1A2E;font-size:20px;margin:0 0 16px">¡${nombreNino}, bienvenido a Tinkilabs!</h2>
    <p style="color:rgba(26,26,46,0.6);font-size:16px;line-height:1.6;margin:0 0 24px">
      Tu primera caja <strong>${linea}</strong> sale el día <strong>5 del mes que viene</strong>.
      Mientras tanto, prepárate para construir cosas alucinantes.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF5F0;border-radius:12px;padding:20px;margin:0 0 24px">
      <tr><td>
        <p style="margin:0 0 8px;color:rgba(26,26,46,0.5);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Resumen del pedido</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="color:rgba(26,26,46,0.6);font-size:14px;padding:4px 0">Plan</td><td style="text-align:right;color:#1A1A2E;font-size:14px;font-weight:700">${plan}</td></tr>
          <tr><td style="color:rgba(26,26,46,0.6);font-size:14px;padding:4px 0">Línea</td><td style="text-align:right;color:#1A1A2E;font-size:14px;font-weight:700">${linea}</td></tr>
          <tr><td colspan="2" style="border-top:1px solid rgba(26,26,46,0.08);padding-top:12px;margin-top:8px"></td></tr>
          <tr><td style="color:#1A1A2E;font-size:18px;font-weight:800;padding:4px 0">Primer pago</td><td style="text-align:right;color:#FF6B35;font-size:18px;font-weight:800">${total}€</td></tr>
        </table>
      </td></tr>
    </table>
    <p style="color:rgba(26,26,46,0.4);font-size:14px;margin:0 0 24px">
      ¿Tienes dudas? Responde a este email o escríbenos a <a href="mailto:hola@tinkilabs.com" style="color:#FF6B35">hola@tinkilabs.com</a>.
    </p>
    <a href="${BASE_URL}/mi-cuenta" style="display:inline-block;background:${COLOR_NARANJA};color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:16px">Gestionar suscripción</a>
  `;
  return wrapTemplate(`¡Bienvenido a bordo, ${nombreNino}! 🚀`, body);
}

export function plantillaGiftComprador(nombreComprador: string, destinatario: string, producto: string, meses: number, total: string, codigo: string) {
  const body = `
    <h2 style="color:#1A1A2E;font-size:20px;margin:0 0 16px">¡Regalo creado, ${nombreComprador}!</h2>
    <p style="color:rgba(26,26,46,0.6);font-size:16px;line-height:1.6;margin:0 0 24px">
      Tu regalo para <strong>${destinatario}</strong> está listo. Lo entregaremos por email el día que elegiste.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF5F0;border-radius:12px;padding:20px;margin:0 0 24px">
      <tr><td>
        <p style="margin:0 0 8px;color:rgba(26,26,46,0.5);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Resumen del regalo</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="color:rgba(26,26,46,0.6);font-size:14px;padding:4px 0">Producto</td><td style="text-align:right;color:#1A1A2E;font-size:14px;font-weight:700">${producto}</td></tr>
          <tr><td style="color:rgba(26,26,46,0.6);font-size:14px;padding:4px 0">Duración</td><td style="text-align:right;color:#1A1A2E;font-size:14px;font-weight:700">${meses} meses</td></tr>
          <tr><td style="color:rgba(26,26,46,0.6);font-size:14px;padding:4px 0">Para</td><td style="text-align:right;color:#1A1A2E;font-size:14px;font-weight:700">${destinatario}</td></tr>
          <tr><td style="color:rgba(26,26,46,0.6);font-size:14px;padding:4px 0">Código</td><td style="text-align:right;color:#FF6B35;font-size:14px;font-weight:700;letter-spacing:1px">${codigo}</td></tr>
          <tr><td colspan="2" style="border-top:1px solid rgba(26,26,46,0.08);padding-top:12px;margin-top:8px"></td></tr>
          <tr><td style="color:#1A1A2E;font-size:18px;font-weight:800;padding:4px 0">Total</td><td style="text-align:right;color:#FF6B35;font-size:18px;font-weight:800">${total}€</td></tr>
        </table>
      </td></tr>
    </table>
    <p style="color:rgba(26,26,46,0.4);font-size:14px;margin:0 0 8px">Cuando el destinatario canjee el código, te avisaremos.</p>
    <p style="color:rgba(26,26,46,0.4);font-size:14px;margin:0">
      ¿Algo mal? Responde a este email o escribe a <a href="mailto:hola@tinkilabs.com" style="color:#FF6B35">hola@tinkilabs.com</a>.
    </p>
  `;
  return wrapTemplate('¡Regalo creado! 🎁', body);
}

export function plantillaGiftDestinatario(nombreDestinatario: string, nombreComprador: string, producto: string, meses: number, codigo: string, mensaje?: string) {
  const mensajeBloque = mensaje ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF5F0;border-radius:12px;padding:20px;margin:0 0 24px;border-left:4px solid ${COLOR_NARANJA}">
      <tr><td style="color:#1A1A2E;font-size:16px;font-style:italic;line-height:1.6">&ldquo;${mensaje}&rdquo;</td></tr>
      <tr><td style="color:rgba(26,26,46,0.4);font-size:12px;padding-top:8px">— ${nombreComprador}</td></tr>
    </table>
  ` : '';

  const body = `
    <h2 style="color:#1A1A2E;font-size:20px;margin:0 0 16px">¡${nombreDestinatario}, te han regalado Tinkilabs!</h2>
    <p style="color:rgba(26,26,46,0.6);font-size:16px;line-height:1.6;margin:0 0 24px">
      <strong>${nombreComprador}</strong> te ha regalado una suscripción de <strong>${meses} meses</strong> para que construyas cosas alucinantes cada mes.
    </p>
    ${mensajeBloque}
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF5F0;border-radius:12px;padding:20px;margin:0 0 32px">
      <tr><td>
        <p style="margin:0 0 8px;color:rgba(26,26,46,0.5);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Tu regalo</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="color:rgba(26,26,46,0.6);font-size:14px;padding:4px 0">Producto</td><td style="text-align:right;color:#1A1A2E;font-size:14px;font-weight:700">${producto}</td></tr>
          <tr><td style="color:rgba(26,26,46,0.6);font-size:14px;padding:4px 0">Duración</td><td style="text-align:right;color:#1A1A2E;font-size:14px;font-weight:700">${meses} meses (1 caja al mes)</td></tr>
          <tr><td style="color:rgba(26,26,46,0.6);font-size:14px;padding:4px 0">De parte de</td><td style="text-align:right;color:#1A1A2E;font-size:14px;font-weight:700">${nombreComprador}</td></tr>
          <tr><td style="color:rgba(26,26,46,0.6);font-size:14px;padding:4px 0">Código</td><td style="text-align:right;color:#FF6B35;font-size:16px;font-weight:800;letter-spacing:2px">${codigo}</td></tr>
        </table>
      </td></tr>
    </table>
    <a href="${BASE_URL}/canjear/${codigo}" style="display:inline-block;background:${COLOR_NARANJA};color:#fff;padding:16px 40px;border-radius:12px;text-decoration:none;font-weight:800;font-size:18px;text-align:center">Activar mi regalo 🚀</a>
    <p style="color:rgba(26,26,46,0.3);font-size:13px;margin:16px 0 0">O copia y pega este código en <a href="${BASE_URL}/canjear" style="color:#FF6B35">tinkilabs.com/canjear</a>: <strong>${codigo}</strong></p>
  `;
  return wrapTemplate(`¡${nombreComprador} te ha regalado Tinkilabs! 🎁`, body);
}
