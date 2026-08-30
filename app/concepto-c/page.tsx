'use client';

import { useEffect, useState } from 'react';
import { FundadorForm } from '@/components/FundadorForm';
import { TrenDeEngranajes, Despiece } from './mecanismo';
import { trackScrollDepth, trackSectionView, trackCTAClick } from '@/lib/tracking';

/* ═══════════════════════════════════════════════════════════════
   CONTRATO DE DIRECCIÓN — concepto-c

   TESIS      El taller de madera de noche. Rechaza la landing clara
              y aireada de suscripción infantil: aquí el naranja no
              es un acento, es el suelo.
   MUNDO      Naranja Tinki drenado alternando con timber oscuro.
              Reglas de 1px en vez de tarjetas. Radios de 4px.
              Display Bricolage Grotesque, texto Exo 2.
   HISTORIA   Esto es ingeniería de verdad, la monta tu hijo, y solo
              hay 100 sitios en el origen.
   1ª VISTA   Campo naranja completo. Titular enorme en timber, el
              formulario a un dedo de distancia, y un tren de
              engranajes que gira de verdad bajo el pliegue.
   FORMA      Dibujo técnico: el producto que no se puede fotografiar
              todavía se demuestra acotándolo, no insinuándolo.
   MOVIMIENTO Un solo momento: los engranajes engranan y giran.
              Nada más se mueve.
   ═══════════════════════════════════════════════════════════════ */

const CSS = `
.tkc {
  --ink:      #24120A;
  --timber:   #3A1D0C;
  --timber-2: #4B260E;
  --orange:   #FF6B35;
  --orange-2: #FF8C5A;
  --orange-d: #D8480F;
  --wood:     #BF946C;
  --wood-2:  #E4CDB4;
  --paper:    #F4EEE7;
  --green:    #2ECC71;
  --rule-dark:  rgba(244,238,231,.20);
  --rule-light: rgba(36,18,10,.16);
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-exo2), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.tkc ::selection { background: var(--orange); color: var(--ink); }
.tkc input { caret-color: var(--orange); }
.tkc .on-orange ::selection { background: var(--ink); color: var(--orange); }
.tkc :focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 3px;
  border-radius: 4px;
}
.tkc .on-dark :focus-visible { outline-color: var(--orange); }
/* Anton: un solo peso, muy condensada. Solo para momentos grandes.
   Su tracking natural ya es estrecho, así que casi no se aprieta. */
.tkc .disp {
  font-family: var(--font-tk-display), Impact, system-ui, sans-serif;
  font-weight: 400;
  letter-spacing: -0.005em;
  line-height: 0.92;
  text-wrap: balance;
}
/* Encabezados pequeños: Anton se apelmaza por debajo de ~1.75rem. */
.tkc .sub {
  font-family: var(--font-exo2), system-ui, sans-serif;
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.2;
}
.tkc .micro {
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
}
@keyframes tk-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .tkc *, .tkc *::before, .tkc *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
.tkc ::-webkit-scrollbar { width: 11px; height: 11px; }
.tkc ::-webkit-scrollbar-track { background: var(--ink); }
.tkc ::-webkit-scrollbar-thumb { background: var(--timber-2); border-radius: 99px; border: 3px solid var(--ink); }
.tkc ::-webkit-scrollbar-thumb:hover { background: var(--orange-d); }
`;

// ─── Hueco reservado para foto real ───────────────────────────
function Hueco({
  archivo,
  descripcion,
  ratio = 'aspect-[4/5]',
  tono = 'dark',
}: {
  archivo: string;
  descripcion: string;
  ratio?: string;
  tono?: 'dark' | 'orange';
}) {
  const borde = tono === 'orange' ? 'border-[#24120A]/35' : 'border-[#BF946C]/40';
  const texto = tono === 'orange' ? 'text-[#24120A]/70' : 'text-[#BF946C]';
  const fondo = tono === 'orange' ? 'bg-[#24120A]/[0.06]' : 'bg-[#BF946C]/[0.07]';
  return (
    <div className={`relative ${ratio} w-full overflow-hidden rounded border border-dashed ${borde} ${fondo}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-5 text-center">
        <span className={`micro ${texto}`}>Falta foto</span>
        <p className={`max-w-[24ch] text-[13px] leading-snug ${texto}`}>{descripcion}</p>
        <code className={`mt-1 text-[11px] tracking-tight ${texto} opacity-70`}>{archivo}</code>
      </div>
    </div>
  );
}

// ─── Contador honesto ─────────────────────────────────────────
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
// Hero — campo naranja completo
// ═══════════════════════════════════════════════════════════════

function Hero() {
  const restantes = usePlazas();

  return (
    <section id="hero" className="on-orange relative overflow-hidden bg-[var(--orange)] text-[var(--ink)]">
      <div className="mx-auto max-w-[1180px] px-5 pb-0 pt-10 sm:px-8 md:pt-16">
        <p className="micro text-[var(--ink)]/60">
          {restantes === null ? '100 plazas de Fundador' : `Quedan ${restantes} de 100 plazas`}
        </p>

        <h1 className="disp mt-5 text-[clamp(2.75rem,10.5vw,6.5rem)]">
          Una máquina
          <br />
          de verdad
          <br />
          cada mes.
        </h1>

        <div className="mt-7 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-[46ch]">
            <p className="text-[clamp(1.0625rem,2vw,1.3125rem)] leading-[1.55] text-[var(--ink)]/85">
              La monta tu hijo con sus manos. Madera, engranajes y mecanismos
              que funcionan. Sin pantallas, sin pilas, sin app.
            </p>

            <div className="mt-7 max-w-[30rem]">
              <FundadorForm location="hero" variant="sobre-naranja" />
            </div>
          </div>

          <p className="text-[13px] leading-relaxed text-[var(--ink)]/60 md:max-w-[16ch] md:text-right">
            Sin pago hoy.
            <br />
            Solo tu email.
          </p>
        </div>

        {/* El único momento de movimiento de la página */}
        <TrenDeEngranajes className="mt-10 h-[130px] w-full text-[var(--ink)] opacity-[0.28] sm:h-[170px] md:mt-14 md:h-[210px]" />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Franja de hechos
// ═══════════════════════════════════════════════════════════════

const HECHOS = [
  ['6 a 12', 'años'],
  ['0 €', 'de envío en España'],
  ['0', 'permanencia'],
  ['0', 'pantallas y pilas'],
];

function Hechos() {
  return (
    <section className="on-dark border-b border-[var(--rule-dark)] bg-[var(--ink)]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 px-5 sm:px-8 md:grid-cols-4">
        {HECHOS.map(([grande, chico], i) => (
          <div
            key={grande + chico}
            className={`py-7 md:py-9 ${i % 2 === 1 ? 'border-l border-[var(--rule-dark)] pl-5' : ''} ${
              i < 2 ? 'border-b border-[var(--rule-dark)] md:border-b-0' : ''
            } ${i === 2 ? 'md:border-l md:border-[var(--rule-dark)] md:pl-5' : ''} ${
              i === 3 ? 'border-l border-[var(--rule-dark)] pl-5' : ''
            }`}
          >
            <span className="disp block text-[clamp(1.75rem,4vw,2.75rem)] text-[var(--orange)]">{grande}</span>
            <span className="mt-1 block text-[13px] text-[var(--wood)]">{chico}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// No es un juguete — dibujo técnico en lugar de foto
// ═══════════════════════════════════════════════════════════════

const PIEZAS = [
  ['Madera de abedul', 'Cortada a láser, no troquelada. Las piezas encajan a presión y aguantan el desmontaje.'],
  ['Tren de engranajes', 'Relación calculada, no decorativa. El niño ve por qué gira más rápido la pequeña.'],
  ['Muelle de compresión', 'Acero real. Almacena la energía que dispara el mecanismo.'],
];

function NoEsUnJuguete() {
  return (
    <section id="ingenieria" className="on-dark relative overflow-hidden bg-[var(--timber)]">
      <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 md:py-28">
        <h2 className="disp max-w-[16ch] text-[clamp(2rem,5.5vw,3.75rem)] text-[var(--paper)]">
          Esto no es un juguete
          <br />
          <span className="text-[var(--orange)]">de plástico.</span>
        </h2>

        <div className="mt-12 grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-16">
          <Despiece className="w-full text-[var(--wood)]" />

          <div>
            {PIEZAS.map(([titulo, texto], i) => (
              <div
                key={titulo}
                className={`py-6 ${i > 0 ? 'border-t border-[var(--rule-dark)]' : ''}`}
              >
                <h3 className="sub text-[1.25rem] text-[var(--paper)]">{titulo}</h3>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.7] text-[var(--wood-2)]/75">{texto}</p>
              </div>
            ))}
            <p className="mt-6 border-t border-[var(--rule-dark)] pt-6 text-[13px] leading-relaxed text-[var(--wood)]">
              Plano del mecanismo del primer kit. Las fotos llegan cuando llega
              el prototipo — no antes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Cómo funciona — tres pasos
// ═══════════════════════════════════════════════════════════════

const PASOS = [
  {
    titulo: 'Llega la caja',
    texto: 'Cada mes, en tu puerta. Envío gratis a España peninsular.',
    archivo: '/images/producto/paso-1-entrega.jpg',
    hueco: 'Repartidor entregando la caja naranja en la puerta de casa',
  },
  {
    titulo: 'La montáis juntos',
    texto: 'Instrucciones ilustradas. Tú acompañas, él construye. Una tarde y una mesa.',
    archivo: '/images/producto/paso-2-montaje.jpg',
    hueco: 'Padre e hijo montando en la mesa del salón, manos y piezas',
  },
  {
    titulo: 'Funciona',
    texto: 'Se mueve, dispara o gira. Y la ha hecho él. Esa cara es el producto.',
    archivo: '/images/producto/paso-3-juego.jpg',
    hueco: 'Niño jugando con la máquina terminada, en movimiento',
  },
];

function Pasos() {
  return (
    <section id="como-funciona" className="on-dark bg-[var(--ink)]">
      <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 md:py-28">
        <h2 className="disp max-w-[14ch] text-[clamp(2rem,5.5vw,3.75rem)] text-[var(--paper)]">
          Tres pasos. Una tarde.
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {PASOS.map((p, i) => (
            <div key={p.titulo}>
              <Hueco archivo={p.archivo} descripcion={p.hueco} ratio="aspect-[4/3]" />
              <div className="mt-5 flex items-baseline gap-3 border-t border-[var(--rule-dark)] pt-5">
                <span className="disp text-[1.5rem] leading-none text-[var(--orange)]">{i + 1}</span>
                <div>
                  <h3 className="sub text-[1.25rem] text-[var(--paper)]">{p.titulo}</h3>
                  <p className="mt-1.5 text-[15px] leading-[1.65] text-[var(--wood-2)]/70">{p.texto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Fundador — el pico emocional
// ═══════════════════════════════════════════════════════════════

function Fundador() {
  const restantes = usePlazas();

  return (
    <section id="fundador" className="on-orange bg-[var(--orange)] text-[var(--ink)]">
      <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-16">
          <div className="disp text-[clamp(6rem,20vw,13rem)] leading-[0.8] text-[var(--ink)]">100</div>

          <div className="max-w-[52ch]">
            <h2 className="disp text-[clamp(1.75rem,4.5vw,3rem)]">
              plazas de Fundador. Ni una más.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.65] text-[var(--ink)]/80">
              Las cien primeras familias no reciben un descuento. Reciben algo
              que no se puede comprar después: quedar escritas en el origen de
              esto.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--ink)]/25">
          <div className="grid gap-8 border-b border-[var(--ink)]/25 py-9 md:grid-cols-[22ch_1fr] md:gap-14">
            <h3 className="sub text-[1.3125rem]">Su nombre, impreso en el manual</h3>
            <p className="max-w-[58ch] text-[1.0625rem] leading-[1.7] text-[var(--ink)]/80">
              El manual del primer kit lleva una página de Fundadores con los
              cien nombres. Tu hijo abrirá la caja, pasará la página y verá el
              suyo escrito ahí. Se imprime una vez y no se vuelve a imprimir.
            </p>
          </div>

          <div className="grid gap-8 border-b border-[var(--ink)]/25 py-9 md:grid-cols-[22ch_1fr] md:gap-14">
            <h3 className="sub text-[1.3125rem]">Una chapa de madera numerada</h3>
            <div>
              <p className="max-w-[58ch] text-[1.0625rem] leading-[1.7] text-[var(--ink)]/80">
                Abedul grabado: <strong className="font-semibold">Fundador #27</strong>. Su
                número, solo suyo. Existen cien en el mundo y no habrá más.
              </p>
              <div className="mt-6 max-w-[22rem]">
                <Hueco
                  archivo="/images/producto/chapa-fundador.jpg"
                  descripcion="La chapa de abedul grabada con su número"
                  ratio="aspect-[16/10]"
                  tono="orange"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-[34rem]">
          <p className="micro mb-4 text-[var(--ink)]/60">
            {restantes === null ? 'Entra en la lista' : `Quedan ${restantes} plazas`}
          </p>
          <FundadorForm location="fundador" variant="sobre-naranja" />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Preguntas
// ═══════════════════════════════════════════════════════════════

const FAQ = [
  ['¿Cuánto va a costar?', 'Todavía no hemos cerrado el precio. Estará donde están las cajas de suscripción de calidad en España, con envío incluido. Los de la lista lo sabrán antes que nadie y sin ningún compromiso de comprar.'],
  ['¿Me cobráis algo ahora?', 'No. Apuntarse es gratis y no pedimos tarjeta ni más datos que el email. Te escribimos cuando abramos.'],
  ['¿Para qué edad es?', 'La primera caja está pensada para 6-9 años y funciona hasta los 12 con menos ayuda. Los pequeños montan acompañados; los mayores, solos.'],
  ['¿Hay permanencia?', 'Ninguna. Se cancela cuando quieras, sin llamadas ni formularios raros.'],
  ['¿Sirve para regalar?', 'Sí, y es de las razones por las que más gente se apunta. Al abrir habrá opción de regalo para abuelos, tíos y padrinos.'],
];

function Preguntas() {
  const [abierta, setAbierta] = useState<number | null>(null);

  return (
    <section id="faq" className="on-dark bg-[var(--ink)]">
      <div className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 md:py-24">
        <h2 className="disp text-[clamp(1.75rem,4.5vw,2.75rem)] text-[var(--paper)]">
          Lo que nos preguntáis
        </h2>

        <div className="mt-10 border-t border-[var(--rule-dark)]">
          {FAQ.map(([p, r], i) => {
            const open = abierta === i;
            return (
              <div key={p} className="border-b border-[var(--rule-dark)]">
                <button
                  onClick={() => setAbierta(open ? null : i)}
                  aria-expanded={open}
                  className="flex min-h-[44px] w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-[var(--orange)]"
                >
                  <span className="sub text-[1.0625rem] text-[var(--paper)] sm:text-[1.125rem]">{p}</span>
                  <span
                    className={`shrink-0 text-[var(--orange)] transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                {open && (
                  <p className="max-w-[62ch] pb-6 text-[15px] leading-[1.75] text-[var(--wood-2)]/75">{r}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════

function Nav() {
  return (
    <nav className="on-dark sticky top-0 z-50 border-b border-[var(--rule-dark)] bg-[var(--ink)]/92 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <img src="/images/brand/wordmarks/wordmark-blanco.svg" alt="Tinkilabs" className="h-[18px] w-auto" />
        <a
          href="#fundador"
          onClick={() => trackCTAClick('nav')}
          className="inline-flex min-h-[44px] items-center rounded bg-[var(--orange)] px-4 text-[13px] font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--orange-2)]"
        >
          Ser Fundador
        </a>
      </div>
    </nav>
  );
}

function Pie() {
  return (
    <footer className="on-dark border-t border-[var(--rule-dark)] bg-[var(--ink)]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="micro text-[var(--wood)]">Tinkilabs · Hecho en España</span>
        <div className="-my-2 flex gap-1 text-[13px] text-[var(--wood)]">
          <a href="/terminos" className="inline-flex min-h-[44px] items-center px-2 transition-colors hover:text-[var(--orange)]">Términos</a>
          <a href="/privacidad" className="inline-flex min-h-[44px] items-center px-2 transition-colors hover:text-[var(--orange)]">Privacidad</a>
          <a href="/aviso-legal" className="inline-flex min-h-[44px] items-center px-2 transition-colors hover:text-[var(--orange)]">Aviso legal</a>
        </div>
      </div>
    </footer>
  );
}

export default function ConceptoC() {
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
    <main className="tkc">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Nav />
      <Hero />
      <Hechos />
      <NoEsUnJuguete />
      <Pasos />
      <Fundador />
      <Preguntas />
      <Pie />
    </main>
  );
}
