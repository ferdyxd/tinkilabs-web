# Tareas pendientes — Web Tinkilabs

> Fichero vivo. Tachar al implementar. Añadir nuevas tareas al final.
> Actualizado: 2026-05-27

---

## 🔴 Pendientes

### 1. Gift Certificate (Certificado de Regalo)

**Inspiración:** CrunchLabs Gift Certificate + KiwiCo Gift

**Cómo funciona (flujo completo):**

```
Comprador                     Tinkilabs                      Destinatario
─────────                     ─────────                      ────────────
1. Elige producto
   (Tinki Mini/Maker/Pro)
2. Elige duración
   (3, 6, 12 meses)
3. Rellena datos del
   destinatario:
   - Nombre
   - Email
   - Mensaje opcional
   - Fecha de entrega email
4. Paga (Stripe)
                              5. Guarda gift certificate
                                 en BD con estado "pending"
                              6. En la fecha elegida →
                                 envía email al destinatario
                                 (Brevo) con:
                                 - Nombre de quien regala
                                 - Mensaje personalizado
                                 - Código/botón de canje
                                                          7. Recibe email
                                                          8. Clica "Canjear"
                                                          9. Crea cuenta (si no tiene)
                                                          10. Ingresa dirección de envío
                                                          11. Activa suscripción
                              12. Marca certificado "active"
                              13. Empieza a enviar cajas
                                 según la duración comprada
                                                          14. Recibe cajas cada mes
                              15. Al terminar los meses →
                                 NO se renueva automáticamente
                                 (a menos que destinatario
                                  añada método de pago)
```

**Lo que hay que implementar:**

- [ ] **1a. Página de checkout de regalo**
  - Ruta: `/regalo` o `/gift`
  - Selector de producto (Mini, Maker, Pro)
  - Selector de duración (3, 6, 12 meses) con precios
  - Formulario: nombre comprador, nombre destinatario, email destinatario, mensaje (máx 200 chars), fecha de envío del email
  - Resumen del pedido + checkout Stripe

- [ ] **1b. Backend: crear gift certificate**
  - Tabla en BD: `gift_certificates` (id, code, product, duration, purchaser_name, recipient_name, recipient_email, message, send_date, status, created_at, redeemed_at, stripe_session_id)
  - API route `POST /api/gift` que crea el certificado + sesión de Stripe
  - Stripe Checkout Session con metadata del gift

- [ ] **1c. Webhook de Stripe → activar gift**
  - `POST /api/webhooks/stripe` — cuando el pago se confirma:
    - Marcar gift como `paid`
    - Programar envío de email para la fecha elegida

- [ ] **1d. Envío del email al destinatario**
  - Cron job (Vercel Cron) o endpoint que revise gifts con `send_date = today` y estado `paid`
  - Plantilla de email en Brevo con:
    - "¡[Comprador] te ha regalado una suscripción Tinkilabs!"
    - Mensaje personalizado
    - Botón "Canjear mi regalo" → link único con código

- [ ] **1e. Página de canje**
  - Ruta: `/canjear/[codigo]`
  - Si el código es válido y no está canjeado:
    - Si no tiene cuenta → formulario de registro
    - Si tiene cuenta → confirmar y activar
    - Pedir dirección de envío
    - Activar suscripción

- [ ] **1f. Emails transaccionales**
  - Email de confirmación al comprador ("Tu regalo está en camino")
  - Email al destinatario (el certificado)
  - Email recordatorio si no se ha canjeado en 7 días

---

### 2. Página de producto individual (landing de cada kit)

- [ ] Crear ruta `/productos/[slug]` con:
  - Vídeo del producto (YouTube embed)
  - Galería de imágenes
  - Qué incluye la caja
  - Mecanismo explicado (animación o diagrama)
  - Edad recomendada, precio, tiempo de montaje
  - Botón "Suscríbete" / "Regala esta caja"

---

### 3. Checkout de suscripción normal

- [ ] Página `/suscribete`
- [ ] Selector de línea (Mini, Maker, Pro)
- [ ] Stripe Checkout Session con suscripción recurrente
- [ ] Página de gracias post-pago `/gracias`

---

### 4. Portal de cliente

- [ ] Ruta `/mi-cuenta`
- [ ] Login/registro (email + contraseña o magic link)
- [ ] Ver suscripción activa, próximas cajas, histórico
- [ ] Cambiar dirección de envío
- [ ] Cancelar o pausar suscripción
- [ ] Añadir método de pago para renovación

---

### 5. Mejoras SEO

- [ ] sitemap.xml dinámico
- [ ] robots.txt
- [ ] Metadatos por página (title, description, og:image)
- [ ] Schema.org JSON-LD para producto, organización, FAQ

---

### 6. Blog o revista

- [ ] Ruta `/revista` o `/blog`
- [ ] Artículos sobre ciencia, experiments, makers
- [ ] Markdown o CMS ligero (Contentful, Notion API)

---

## 🟢 Completadas

- [x] Landing page con lista de espera
- [x] Email waitlist conectado a Brevo (List ID 3)
- [x] Catálogo de productos (/productos) con 12 roadmap + 8 reserva + 2 especiales
- [x] Toggle idioma ES/EN en productos y acceso
- [x] Acceso protegido por contraseña multi-usuario (/acceso)
- [x] Middleware de autenticación por cookie
- [x] API de autenticación con registro de accesos en logs
- [x] 20 imágenes de producto extraídas de referencias originales
- [x] Deploy en Vercel conectado a GitHub
