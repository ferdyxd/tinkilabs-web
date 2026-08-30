'use client';

import { useEffect, useState } from 'react';
import { FundadorForm } from '@/components/FundadorForm';
import { Engranaje, Sticker, Marquesina, Hueco } from './piezas';
import { trackScrollDepth, trackSectionView, trackCTAClick } from '@/lib/tracking';

/* ═══════════════════════════════════════════════════════════════
   CONCEPTO D — sistema "papel de taller recortado a troquel"
   Especificación: web/designs/DESIGN tinkilabs.md

   TESIS      La página se lee como cartón cortado, no como interfaz.
              Todo lleva filo de troquel de 2px.
   MUNDO      Crema cálido + Timber Brown en todos los contornos +
              Birch Wood en los rellenos. El naranja NO es el suelo:
              es la señal, y aparece una vez por pantalla.
   HISTORIA   Una caja al mes para inventores. La monta él, funciona
              de verdad, y entiende por qué. 100 plazas.
   1ª VISTA   Marquesina del manifiesto, engranaje enorme cortado por
              el borde, titular Anton aplastado a 0.78, y el
              formulario con el único botón naranja de la pantalla.
   FORMA      Collage: stickers rotados, elementos que se salen del
              encuadre, nada encajado en rejilla.
   MOVIMIENTO La marquesina y los engranajes. Nada más.
   ═══════════════════════════════════════════════════════════════ */

const CSS = `
.tkd {
  --tk-paper:      #FAF3EA;
  --tk-card:       #FFFFFF;
  --tk-ink:        #4B260E;
  --tk-ink-soft:   #7A5540;
  --tk-ink-faint:  #A98A72;
  --tk-wood:       #BF946C;
  --tk-wood-pale:  #E4CDB4;
  --tk-orange:     #FF6B35;
  --tk-orange-deep:#D8480F;
  --tk-green:      #2ECC71;

  background: var(--tk-paper);
  color: var(--tk-ink);
  font-family: var(--font-exo2), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: clip;
}
.tkd ::selection { background: var(--tk-orange); color: var(--tk-ink); }
.tkd input { caret-color: var(--tk-orange); }
.tkd :focus-visible { outline: 3px solid var(--tk-orange); outline-offset: 3px; border-radius: 999px; }

/* Anton: interlineado aplastado — las palabras son objetos, no frases. */
.tkd .disp {
  font-family: var(--font-tk-display), Impact, system-ui, sans-serif;
  font-weight: 400;
  line-height: 0.78;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}
.tkd .sub  { font-weight: 700; letter-spacing: -0.015em; line-height: 1.2; }
.tkd .micro{ font-size: 12px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; }

/* Troquel: toda superficie lleva filo. */
.tkd .troquel { border: 2px solid var(--tk-ink); }

@keyframes tk-giro { to { transform: rotate(360deg); } }
@keyframes tk-marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.tkd .tk-marquesina { animation: tk-marq 38s linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .tkd *, .tkd *::before, .tkd *::after {
    animation-duration: .01ms !important; animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
.tkd ::-webkit-scrollbar { width: 12px; }
.tkd ::-webkit-scrollbar-track { background: var(--tk-paper); }
.tkd ::-webkit-scrollbar-thumb { background: var(--tk-wood); border: 3px solid var(--tk-paper); border-radius: 99px; }
`;

function usePlazas() {
  const [restantes, setRestantes] = useState<number | null>(null);
  useEffect(() => {
    fetch('/api/waitlist/count')
      .then((r) => r.json())
      .then((d) => { if (d?.disponible && typeof d.restantes === 'number') setRestantes(d.restantes); })
      .catch(() => {});
  }, []);
  return restantes;
}

// ═══════════════════════════════════════════════════════════════

function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-[var(--tk-ink)] bg-[var(--tk-paper)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        {/* Wordmark oficial, recortado a su caja real y sin el fondo
            blanco del asset de marca (que era 1080x1080 a sangre). */}
        <img
          src="/images/brand/wordmarks/wordmark-tinkilabs.svg"
          alt="Tinkilabs"
          className="h-[22px] w-auto sm:h-[26px]"
        />

        <div className="flex items-center gap-3">
          {/* El CTA del nav es secundario a propósito: el naranja de esta
              pantalla es el del formulario del héroe. */}
          <a
            href="#fundador"
            onClick={() => trackCTAClick('nav')}
            className="troquel inline-flex min-h-[44px] items-center rounded-full bg-[var(--tk-card)] px-4 text-[13px] font-bold transition-colors hover:bg-[var(--tk-wood-pale)] sm:px-5"
          >
            Ser Fundador
          </a>
          {/* Tinki. El logotipo queda exento de la regla del acento único:
              es identidad, no señal. */}
          <img
            src="/images/brand/icons/tinki-profile-light.svg"
            alt=""
            aria-hidden="true"
            className="h-10 w-10 shrink-0"
          />
        </div>
      </div>
    </nav>
  );
}

// ─── Héroe ────────────────────────────────────────────────────

function Hero() {
  const restantes = usePlazas();
  return (
    <section id="hero" className="relative overflow-hidden border-b-2 border-[var(--tk-ink)]">
      {/* Motivo: se sale del encuadre por la derecha */}
      <Engranaje
        dientes={22}
        segundos={90}
        className="pointer-events-none absolute -right-[38%] top-[6%] w-[95vw] max-w-[720px] opacity-[0.5] sm:-right-[22%] md:-right-[10%] md:w-[58vw]"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 py-12 sm:px-8 md:py-20">
        <div className="flex flex-wrap items-center gap-3">
          <Sticker icono="gear" relleno="wood" giro={-8} tam={44} />
          <span className="micro rounded-full border-2 border-[var(--tk-ink)] bg-[var(--tk-card)] px-3.5 py-2">
            {restantes === null ? '100 plazas de Fundador' : `Quedan ${restantes} de 100`}
          </span>
        </div>

        <h1 className="disp mt-7 max-w-[15ch] text-[clamp(2.75rem,11vw,7.5rem)]">
          Una caja cada mes.
          <br />
          <span className="text-[var(--tk-ink)]">Para inventores de 6 a 12 años.</span>
        </h1>

        <div className="mt-8 grid gap-9 md:grid-cols-[minmax(0,32rem)_auto] md:items-end">
          <div>
            {/* Cuatro líneas, una idea cada una. En párrafo no se leen. */}
            <ul className="space-y-1.5 text-[clamp(1.0625rem,2vw,1.3125rem)] leading-[1.45] text-[var(--tk-ink-soft)]">
              <li>Un kit nuevo cada mes.</li>
              <li>Lo monta con sus manos.</li>
              <li>Funciona de verdad.</li>
              <li className="font-bold text-[var(--tk-ink)]">Y entiende por qué.</li>
            </ul>
            <div className="mt-7">
              <FundadorForm location="hero" variant="troquel" />
            </div>
          </div>

          <div className="flex gap-3 md:flex-col md:pb-2">
            <Sticker icono="spring" relleno="pale" giro={7} tam={52} />
            <Sticker icono="ruler" relleno="card" giro={-5} tam={52} />
            <Sticker icono="rocket" relleno="wood" giro={9} tam={52} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Hechos ───────────────────────────────────────────────────

const HECHOS: [string, string, string][] = [
  ['6-12', 'años', 'ruler'],
  ['0 €', 'de envío', 'rocket'],
  ['0', 'permanencia', 'target'],
  ['0', 'pantallas', 'screw'],
];

function Hechos() {
  return (
    <section className="border-b-2 border-[var(--tk-ink)] bg-[var(--tk-wood-pale)]">
      <div className="mx-auto grid max-w-[1200px] gap-3 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {HECHOS.map(([grande, chico, ico], i) => (
          <div
            key={grande + chico}
            className="troquel flex items-center gap-4 rounded-[20px] bg-[var(--tk-card)] px-5 py-4"
          >
            <Sticker icono={ico} relleno="pale" giro={i % 2 ? 6 : -6} tam={44} />
            <div>
              <span className="disp block text-[2rem]">{grande}</span>
              <span className="text-[13px] text-[var(--tk-ink-soft)]">{chico}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Cómo funciona ────────────────────────────────────────────

const PASOS = [
  { t: 'Llega la caja', d: 'Cada mes, en tu puerta. Envío gratis a España peninsular.', a: '/images/producto/paso-1-entrega.jpg', h: 'Repartidor entregando la caja naranja', ico: 'crane' },
  { t: 'La montáis juntos', d: 'Instrucciones ilustradas. Tú acompañas, él construye.', a: '/images/producto/paso-2-montaje.jpg', h: 'Padre e hijo montando en la mesa', ico: 'hammer' },
  { t: 'A jugar', d: 'Cuando termina, funciona. Y ahí empieza lo bueno.', a: '/images/producto/paso-3-juego.jpg', h: 'Niño jugando con lo que ha construido', ico: 'rocket' },
];

function Pasos() {
  return (
    <section id="como-funciona" className="relative overflow-hidden border-b-2 border-[var(--tk-ink)] bg-[var(--tk-card)]">
      <Engranaje
        dientes={16}
        segundos={70}
        invertido
        className="pointer-events-none absolute -left-[28%] bottom-[-12%] w-[70vw] max-w-[460px] opacity-[0.35] md:-left-[8%]"
      />
      <div className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-8 md:py-24">
        <h2 className="disp max-w-[11ch] text-[clamp(2.25rem,7vw,4.5rem)]">
          Tres pasos. Una tarde.
        </h2>

        <div className="mt-11 grid gap-6 md:grid-cols-3">
          {PASOS.map((p, i) => (
            <div key={p.t} className="troquel rounded-[20px] bg-[var(--tk-paper)] p-4">
              <Hueco archivo={p.a} descripcion={p.h} />
              <div className="mt-4 flex items-start gap-3 px-1 pb-1">
                <Sticker icono={p.ico} relleno="pale" giro={i % 2 ? 5 : -7} tam={44} />
                <div>
                  <h3 className="sub text-[1.25rem]">{p.t}</h3>
                  <p className="mt-1 text-[14px] leading-[1.6] text-[var(--tk-ink-soft)]">{p.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── El antes y el después ────────────────────────────────────

const SECUNDARIOS: [string, string, string][] = [
  ['Entiende por qué funciona', 'No monta siguiendo dibujos sin más: ve qué hace cada pieza. Cuando termina puede explicarte por qué gira, por qué salta o por qué cae justo ahí.', 'ruler'],
  ['Una tarde juntos, sin prisa', 'Tú al lado, él construyendo. No es tenerlo entretenido: es un rato que os pertenece a los dos y que luego los dos recordáis.', 'hammer'],
  ['Y en todo ese rato, ninguna pantalla', 'Ni tablet, ni móvil, ni app. Y no porque se lo prohíbas: porque lo que tiene delante le engancha más.', 'wrench'],
];

function AntesYDespues() {
  return (
    <section id="antes-despues" className="relative overflow-hidden border-b-2 border-[var(--tk-ink)]">
      <Engranaje
        dientes={19}
        segundos={85}
        className="pointer-events-none absolute -right-[34%] top-[4%] w-[80vw] max-w-[540px] opacity-[0.32] md:-right-[12%]"
      />
      <div className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-8 md:py-24">
        <h2 className="disp max-w-[14ch] text-[clamp(2.25rem,7vw,4.5rem)]">
          No es solo una caja. Es un antes y un después.
        </h2>

        {/* El bloque grande es el núcleo: el reto superado. */}
        <div className="troquel mt-11 rounded-[20px] bg-[var(--tk-card)] p-7 md:p-10">
          <div className="flex flex-wrap items-start gap-5">
            <Sticker icono="rocket" relleno="wood" giro={-8} tam={60} />
            <div className="min-w-[16rem] flex-1">
              <h3 className="disp text-[clamp(1.75rem,4vw,2.75rem)]">Lo consigue. Y lo sabe.</h3>
              <p className="mt-3 max-w-[54ch] text-[clamp(1rem,1.6vw,1.1875rem)] leading-[1.65] text-[var(--tk-ink-soft)]">
                Se atasca. Lo intenta otra vez. Y de repente encaja y funciona. Esa
                cara de &ldquo;lo he hecho yo&rdquo; no se compra hecha, y es la razón
                de todo lo demás.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {SECUNDARIOS.map(([t, d, ico], i) => (
            <div key={t} className="troquel rounded-[20px] bg-[var(--tk-wood-pale)] p-6">
              <Sticker icono={ico} relleno="card" giro={i % 2 ? 6 : -6} tam={48} />
              <h3 className="sub mt-5 text-[1.1875rem]">{t}</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-[var(--tk-ink-soft)]">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── No es magia, es física ───────────────────────────────────
// Principios derivados de los mecanismos REALES del roadmap.
// Sin nombrar ningún kit (decisión de Alby 2026-08-28).

const FISICA: [string, string, string][] = [
  [
    'Energía que se guarda y se suelta de golpe',
    'Un muelle comprimido o una goma estirada guardan fuerza. Al soltarla, sale disparada. Lo monta, lo dispara, y ve exactamente dónde estaba escondida esa energía.',
    'spring',
  ],
  [
    'Por qué algo que gira no se cae',
    'Una peonza de pie desafía el sentido común hasta que entiendes el efecto giroscópico. Es la misma razón por la que un disco lanzado vuela plano y no da vueltas de campana.',
    'gear',
  ],
  [
    'Cómo un giro se convierte en un paso',
    'Levas, bielas y engranajes: las piezas que transforman un movimiento en otro distinto. Es lo que hace que algo ande, se incline o dispare una reacción en cadena.',
    'robot',
  ],
  [
    'Equilibrio, choques y trayectorias',
    'Dónde está el centro de gravedad, qué pasa cuando una bola golpea a otra, y por qué lo que lanzas dibuja una curva y no una recta.',
    'target',
  ],
];

function Fisica() {
  return (
    <section id="fisica" className="relative overflow-hidden border-b-2 border-[var(--tk-ink)] bg-[var(--tk-card)]">
      <Engranaje
        dientes={14}
        segundos={62}
        invertido
        className="pointer-events-none absolute -left-[26%] bottom-[-10%] w-[62vw] max-w-[420px] opacity-[0.3] md:-left-[7%]"
      />
      <div className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-8 md:py-24">
        <h2 className="disp max-w-[10ch] text-[clamp(2.5rem,9vw,6rem)]">
          No es magia. Es física.
        </h2>

        {/* Filas con regla, no rejilla de tarjetas: cambia el ritmo
            respecto a la sección anterior. */}
        <div className="mt-12 border-t-2 border-[var(--tk-ink)]/15">
          {FISICA.map(([t, d, ico], i) => (
            <div
              key={t}
              className="grid gap-4 border-b-2 border-[var(--tk-ink)]/15 py-7 md:grid-cols-[auto_22ch_1fr] md:items-start md:gap-8"
            >
              <Sticker icono={ico} relleno={i % 2 ? 'wood' : 'pale'} giro={i % 2 ? 7 : -7} tam={52} />
              <h3 className="sub text-[1.1875rem]">{t}</h3>
              <p className="max-w-[60ch] text-[15px] leading-[1.7] text-[var(--tk-ink-soft)]">{d}</p>
            </div>
          ))}
        </div>

        <p className="disp mt-10 max-w-[20ch] text-[clamp(1.375rem,3.4vw,2.25rem)]">
          Nadie le va a examinar de esto. Simplemente lo sabrá.
        </p>
      </div>
    </section>
  );
}

// ─── Fundador (sin CTA: el naranja de esta pantalla es el "100") ──

function Fundador() {
  return (
    <section id="fundador" className="relative overflow-hidden border-b-2 border-[var(--tk-ink)] bg-[var(--tk-ink)] text-[var(--tk-paper)]">
      <div className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center md:gap-14">
          <span className="disp block text-[clamp(6.5rem,26vw,15rem)] text-[var(--tk-orange)]">100</span>
          <div>
            <h2 className="disp text-[clamp(1.75rem,5vw,3.25rem)]">plazas de Fundador. Ni una más.</h2>
            <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-[1.65] text-[var(--tk-wood-pale)]">
              Las cien primeras familias no reciben un descuento. Reciben algo que no
              se puede comprar después: quedar escritas en el origen de esto.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="troquel rounded-[20px] bg-[var(--tk-paper)] p-7 text-[var(--tk-ink)]">
            <Sticker icono="ruler" relleno="wood" giro={-7} tam={52} />
            <h3 className="sub mt-5 text-[1.3125rem]">Su nombre, impreso en el manual</h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-[var(--tk-ink-soft)]">
              El manual del primer kit lleva una página de Fundadores con los cien
              nombres. Tu hijo abrirá la caja, pasará la página y verá el suyo escrito
              ahí. Se imprime una vez y no se vuelve a imprimir.
            </p>
          </div>

          <div className="troquel rounded-[20px] bg-[var(--tk-paper)] p-7 text-[var(--tk-ink)]">
            <Sticker icono="target" relleno="pale" giro={6} tam={52} />
            <h3 className="sub mt-5 text-[1.3125rem]">Una chapa de madera numerada</h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-[var(--tk-ink-soft)]">
              Abedul grabado: <strong className="font-bold text-[var(--tk-ink)]">Fundador #27</strong>. Su
              número, solo suyo. Existen cien en el mundo y no habrá más.
            </p>
            <div className="mt-5">
              <Hueco
                archivo="/images/producto/chapa-fundador.jpg"
                descripcion="La chapa de abedul grabada con su número"
                ratio="aspect-[16/10]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Cierre ───────────────────────────────────────────────────

function Cierre() {
  const restantes = usePlazas();
  return (
    <section id="cierre" className="relative overflow-hidden border-b-2 border-[var(--tk-ink)] bg-[var(--tk-wood-pale)]">
      <Engranaje
        dientes={18}
        segundos={80}
        className="pointer-events-none absolute -right-[30%] -top-[20%] w-[80vw] max-w-[520px] opacity-[0.4] md:-right-[6%]"
      />
      <div className="relative mx-auto max-w-[640px] px-5 py-16 text-center sm:px-8 md:py-24">
        <div className="mb-6 flex justify-center gap-3">
          <Sticker icono="hammer" relleno="card" giro={-9} tam={48} />
          <Sticker icono="gear" relleno="wood" giro={5} tam={48} />
          <Sticker icono="pulley" relleno="card" giro={-4} tam={48} />
        </div>
        <h2 className="disp text-[clamp(2rem,7vw,3.75rem)]">Entra en la lista</h2>
        <p className="mx-auto mt-4 max-w-[42ch] text-[1.0625rem] leading-[1.6] text-[var(--tk-ink-soft)]">
          {restantes === null
            ? 'Sin pago hoy. Solo tu email. Te avisamos el día que abrimos.'
            : `Quedan ${restantes} plazas. Sin pago hoy, solo tu email.`}
        </p>
        <div className="mx-auto mt-8 max-w-[30rem] text-left">
          <FundadorForm location="cierre" variant="troquel" />
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────

const FAQ: [string, string][] = [
  ['¿Cuánto va a costar?', 'Los de la lista lo sabrán antes que nadie, y sin ningún compromiso de comprar. Envío incluido siempre.'],
  ['¿Me cobráis algo ahora?', 'No. Apuntarse es gratis y no pedimos tarjeta ni más datos que el email.'],
  ['¿Para qué edad es?', 'De 6 a 12 años. Los más pequeños montan acompañados; a partir de los 9 o 10 lo hacen solos y tú solo miras.'],
  ['¿Hay permanencia?', 'Ninguna. Se cancela cuando quieras, sin llamadas ni formularios raros.'],
  ['¿Sirve para regalar?', 'Sí, y es de las razones por las que más gente se apunta. Al abrir habrá opción de regalo para abuelos, tíos y padrinos.'],
];

function Preguntas() {
  const [abierta, setAbierta] = useState<number | null>(null);
  return (
    <section id="faq" className="border-b-2 border-[var(--tk-ink)] bg-[var(--tk-card)]">
      <div className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 md:py-24">
        <h2 className="disp text-[clamp(2rem,6vw,3.25rem)]">Lo que nos preguntáis</h2>
        <div className="mt-9 space-y-3">
          {FAQ.map(([p, r], i) => {
            const open = abierta === i;
            return (
              <div key={p} className="troquel overflow-hidden rounded-[20px] bg-[var(--tk-paper)]">
                <button
                  onClick={() => setAbierta(open ? null : i)}
                  aria-expanded={open}
                  className="flex min-h-[56px] w-full items-center justify-between gap-5 px-6 py-4 text-left"
                >
                  <span className="sub text-[1.0625rem]">{p}</span>
                  <span
                    className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                {open && (
                  <p className="max-w-[62ch] px-6 pb-5 text-[15px] leading-[1.7] text-[var(--tk-ink-soft)]">{r}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Pie() {
  return (
    <footer className="bg-[var(--tk-ink)] text-[var(--tk-wood-pale)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <img src="/images/brand/wordmarks/wordmark-tinkilabs-claro.svg" alt="Tinkilabs" className="h-[20px] w-auto" />
          <span className="text-[12px] opacity-70">Hecho en España</span>
        </div>
        <div className="-my-2 flex gap-1 text-[13px]">
          <a href="/terminos" className="inline-flex min-h-[44px] items-center px-2 hover:text-[var(--tk-orange)]">Términos</a>
          <a href="/privacidad" className="inline-flex min-h-[44px] items-center px-2 hover:text-[var(--tk-orange)]">Privacidad</a>
          <a href="/aviso-legal" className="inline-flex min-h-[44px] items-center px-2 hover:text-[var(--tk-orange)]">Aviso legal</a>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════

export default function ConceptoD() {
  useEffect(() => {
    const fired = new Set<number>();
    function onScroll() {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      for (const d of [25, 50, 75, 100]) if (pct >= d && !fired.has(d)) { fired.add(d); trackScrollDepth(d); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const fired = new Set<string>();
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting && !fired.has(e.target.id)) { fired.add(e.target.id); trackSectionView(e.target.id); }
      }),
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="tkd">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Marquesina texto="Imagina. Construye. Alucina." />
      <Nav />
      <Hero />
      <Hechos />
      <AntesYDespues />
      <Fisica />
      <Pasos />
      <Fundador />
      <Cierre />
      <Preguntas />
      <Pie />
    </main>
  );
}
