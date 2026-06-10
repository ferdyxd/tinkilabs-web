'use client';

import { testimonios, type Testimonial } from '@/lib/testimonios';

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex w-[320px] flex-shrink-0 flex-col gap-3 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
      {/* Avatar + nombre */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tinki-light text-xl">
          {t.avatar}
        </span>
        <div>
          <p className="text-sm font-bold text-tinki-dark">{t.nombre}</p>
          <p className="text-[11px] text-tinki-dark/35">{t.relacion}</p>
        </div>
      </div>
      {/* Cita */}
      <p className="text-[13px] leading-relaxed text-tinki-dark/55">
        &ldquo;{t.cita}&rdquo;
      </p>
    </div>
  );
}

function MarqueeRow({ direction }: { direction: 'left' | 'right' }) {
  // Duplicamos para el bucle infinito sinSaltos
  const items = [...testimonios, ...testimonios];

  return (
    <div className="flex overflow-hidden py-3">
      <div
        className="flex gap-4"
        style={{
          animation: `${direction === 'left' ? 'marqueeLeft' : 'marqueeRight'} 40s linear infinite`,
        }}
      >
        {items.map((t, i) => (
          <TestimonialCard key={`${t.nombre}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialMarquee() {
  return (
    <section className="overflow-hidden bg-tinki-light py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        {/* Cabecera */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-tinki-orange/15 bg-tinki-orange/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
            Lo que dicen
          </span>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            Familias que ya construyen
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-tinki-dark/45">
            No nos creas a nosotros. Cree a los padres, madres, abuelos y peques que ya han probado Tinkilabs.
          </p>
        </div>
      </div>

      {/* Fila 1 → izquierda */}
      <MarqueeRow direction="left" />

      {/* Fila 2 → derecha (dirección opuesta) */}
      <MarqueeRow direction="right" />

      {/* CSS keyframes inyectados una sola vez */}
      <style jsx>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* CTA */}
      <div className="mx-auto mt-12 max-w-md px-6 text-center">
        <a
          href="/resenas"
          className="text-sm font-semibold text-tinki-orange transition-colors hover:text-tinki-orange-dark hover:underline"
        >
          Ver todas las reseñas →
        </a>
      </div>
    </section>
  );
}
