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

### 7. Menú de navegación general (Header/Navbar)

**Inspiración:** CrunchLabs.com — estructura exacta del header

**Estructura en desktop:**

```
[Suscripciones ▼]  [Comprar más ▼]  [Nosotros ▼]   [LOGO]   [Eventos ✨]  [👤]  [🛒 0]
```

**Estructura en móvil:**
- Logo visible + iconos cuenta/carrito fijos
- Hamburguesa despliega panel vertical con TODO lo mismo secuencialmente
- Los submenús no son hover, se muestran expandidos en el panel

**Dropdowns detallados:**

**1. Suscripciones ▼** — cards visuales con imagen + texto:
- "Tinki Cajas" — suscripción mensual de kits STEM (activa) → `/suscribete`
- "Tinki City" — ciudad modular por meses (en construcción) → badge "Próximamente" → sin link o a lista de espera

**2. Comprar más ▼** — lista de texto (igual que CrunchLabs "Shop More"):
- "Certificados de Regalo" → `/regalo`
- "Merch y Extras" → `/tienda` (placeholder)
- "Repuestos" → `/repuestos`

**3. Nosotros ▼** — lista de texto (igual que CrunchLabs "Our Company"):
- "Sobre nosotros" → `/nosotros`
- "FAQ y Ayuda" → `/ayuda`
- "Reseñas" → `/resenas` (placeholder)

**Derecha del logo:**
- **Eventos especiales** — badge temporal (ej. "Campamento Verano 🏕️", "Día del Padre 🤖"). Igual que CrunchLabs pone "Dad's Day 🤖" y "Summer Camp 🏕️"
- **Icono cuenta** → `/mi-cuenta` o `/acceso`
- **Carrito** con contador → `/cart`

**Lo que hay que implementar:**

- [ ] **7a. Componente Navbar**
  - Fixed/sticky en top con backdrop-blur (fondo semi-transparente)
  - Tres dropdowns a la izquierda del logo con hover/click
  - Logo centrado (SVG Tinkilabs + Tinki)
  - Iconos cuenta + carrito a la derecha
  - Badge de "evento especial" entre logo e iconos (dinámico, configurable desde CMS o env var)
  - En móvil: hamburguesa animada que despliega panel full-screen

- [ ] **7b. Dropdown de Suscripciones**
  - Cards con imagen de cada línea de suscripción
  - Tinki Cajas: link activo a `/suscribete`
  - Tinki City: badge "En construcción" sin link
  - Animación de entrada (fade + slide)

- [ ] **7c. Dropdown Comprar más**
  - Lista de texto simple con hover naranja
  - 3 enlaces (gift, merch, repuestos)

- [ ] **7d. Dropdown Nosotros**
  - Lista de texto con 3 enlaces (about, FAQ, reseñas)
  - Opcional: card promocional pequeña con ilustración de Tinki (como hace CrunchLabs con Mark Rober)

- [ ] **7e. Integración con autenticación**
  - Si el usuario está logueado → icono cuenta va a `/mi-cuenta`
  - Si no → icono cuenta va a `/acceso`
  - Leer cookie `tinkilabs_auth` para saber estado

- [ ] **7f. Carrito fantasma**
  - Por ahora solo icono visual con contador "0"
  - La funcionalidad real del carrito se implementa más adelante

---

### 8. FAQ y Help Center

**Inspiración:** CrunchLabs Help Center (crunchlabshelp.zendesk.com)

**Canales de soporte que tiene CrunchLabs:**
- Help Center con artículos por categoría (Zendesk)
- Email: help@crunchlabs.com
- Teléfono: 650-267-2473
- Formulario de contacto en la web
- Chat en vivo (posiblemente Zendesk Chat)

**Estructura típica del Help Center:**
```
/ayuda
├── Primeros pasos
│   ├── ¿Qué incluye cada caja?
│   ├── ¿Cuánto tarda el primer envío?
│   └── ¿Cómo empiezo?
├── Suscripción
│   ├── ¿Cómo gestiono mi suscripción?
│   ├── ¿Puedo saltarme un mes?
│   ├── ¿Cómo cancelo?
│   ├── ¿Cómo cambio de plan?
│   └── ¿Se renueva automáticamente?
├── Envíos
│   ├── ¿A qué países enviáis?
│   ├── ¿Cuánto tardan los envíos?
│   ├── ¿Cuánto cuesta el envío?
│   └── Seguimiento del pedido
├── Pagos
│   ├── ¿Qué métodos de pago aceptáis?
│   ├── ¿Cuándo se me cobra?
│   └── Facturas y recibos
├── Devoluciones y reembolsos
│   ├── Política de devolución
│   └── ¿Cómo solicito un reembolso?
├── Piezas y repuestos
│   ├── ¿Falta una pieza? Repuestos gratis
│   ├── ¿Pieza rota? Cómo pedir recambio
│   └── ¿Cuánto tardan los repuestos?
└── Regalo
    ├── ¿Cómo funcionan los Gift Certificates?
    ├── ¿Cómo canjeo un certificado de regalo?
    └── ¿Puedo regalar una sola caja?
```

**Lo que hay que implementar:**

- [ ] **7a. Sistema de FAQ**
  - Ruta: `/ayuda` o `/faq`
  - Categorías colapsables (acordeón)
  - Buscador de preguntas
  - Datos desde un JSON o CMS para poder editar sin deploy
  - Esquema FAQ JSON-LD para rich snippets en Google

- [ ] **7b. Página de contacto**
  - Ruta: `/ayuda/contacto`
  - Formulario: nombre, email, asunto, mensaje, categoría
  - Enviar a email de soporte (Brevo transactional email)
  - Guardar consulta en BD para seguimiento

- [ ] **7c. Centro de ayuda con artículos**
  - Ruta: `/ayuda/[slug]`
  - Artículos individuales con texto e imágenes
  - Sidebar con categorías
  - Sistema simple: Markdown en repo o CMS headless

---

### 9. Gestión de suscripción (Portal del cliente)

**Estudio de CrunchLabs — "My Account":**

CrunchLabs permite gestionar TODO desde el panel de cuenta:

| Acción | Cómo funciona en CrunchLabs |
|--------|--------------------------|
| **Pausar** | Hasta 3 meses. Botón en "My Account" o email a help@crunchlabs.com |
| **Cancelar** | Desactivar auto-renewal desde "My Account". Ojo: algunos planes tienen permanencia 12 meses con penalización (~$60) |
| **Saltar mes** | Similar a pausa — te saltas un envío sin perder la suscripción |
| **Cambiar plan** | Cambiar de Build Box a Hack Pack, etc. — contactando a soporte |
| **Cambiar dirección** | Desde "My Account" antes de que se procese el siguiente envío |
| **Auto-renovación** | Activada por defecto. El cliente debe desactivarla manualmente |
| **Eliminar método de pago** | No se puede fácilmente — CrunchLabs lo retiene |

**Lo que hay que implementar:**

- [ ] **8a. Página "Mi Cuenta"**
  - Datos del suscriptor: nombre, email, dirección
  - Plan activo, fecha de próximo cobro y envío
  - Historial de cajas recibidas

- [ ] **8b. Pausar / Reanudar suscripción**
  - Botón "Pausar suscripción" (máx 3 meses)
  - Indicar hasta qué fecha está pausada
  - Botón "Reanudar" para reactivar antes
  - Lógica en backend: Stripe pause/resume

- [ ] **8c. Cancelar suscripción**
  - Botón "Cancelar suscripción" con confirmación
  - Preguntar motivo (encuesta opcional: muy caro, no le gusta al niño, etc.)
  - Si hay permanencia → mostrar penalización
  - Webhook de Stripe para gestionar el fin de ciclo

- [ ] **8d. Saltar un mes**
  - Botón "Saltar este mes" en el panel
  - El próximo envío se retrasa 1 mes
  - La fecha de renovación se ajusta automáticamente

---

### 10. Repuestos gratis

**Estudio de CrunchLabs — Free Replacement Parts:**

- Si falta una pieza o viene rota → repuesto **gratis** (incluyendo envío)
- Se solicita desde "My Account" o email a help@crunchlabs.com
- El equipo de soporte lo gestiona manualmente
- No hay coste para el cliente NUNCA

**Lo que hay que implementar:**

- [ ] **9a. Formulario de solicitud de repuestos**
  - Ruta: `/mi-cuenta/repuestos` o dentro de "Mi Cuenta"
  - Selector de caja (de las recibidas por el cliente)
  - Campo: ¿qué pieza? (selector con imagen del inventario o texto libre)
  - Campo: ¿falta o está rota?
  - Foto opcional de la pieza rota
  - Enviar solicitud → se crea ticket en backend

- [ ] **9b. Backend de repuestos**
  - Tabla `replacement_requests`: id, user_id, box_id, part_name, reason, status, created_at
  - Notificar al equipo de logística (email o webhook a n8n)
  - Estados: pending → approved → shipped → delivered
  - El cliente ve el estado desde "Mi Cuenta"

- [ ] **9c. Inventario de piezas por caja**
  - Cada caja tiene su BOM (bill of materials) con lista de piezas
  - Relacionado con la base de datos de producto
  - Permite al cliente seleccionar la pieza exacta del despiece

---

### 11. Páginas legales

- [ ] Términos y condiciones (`/terminos`)
- [ ] Política de privacidad (`/privacidad`)
- [ ] Política de devoluciones (`/devoluciones`)
- [ ] Política de envíos (`/envios`)
- [ ] Aviso legal (`/aviso-legal`)

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
