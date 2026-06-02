import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  actividades,
  EDAD_LABELS,
  TIPO_LABELS,
  MANCHA_LABELS,
  DURACION_LABELS,
  MATERIAL_LABELS,
  MECANISMO_LABELS,
} from '@/lib/actividades-data';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return actividades.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const a = actividades.find((x) => x.slug === params.slug);
  if (!a) return { title: 'Actividad no encontrada — Tinkilabs' };

  return {
    title: `${a.titulo} — Tinkilabs`,
    description: a.descripcionCorta,
    openGraph: {
      title: a.titulo,
      description: a.descripcionCorta,
      type: 'article',
    },
  };
}

export default function ActividadPage({ params }: Props) {
  const a = actividades.find((x) => x.slug === params.slug);
  if (!a) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: a.titulo,
    description: a.descripcion,
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: '0' },
    supply: a.materialesReales.map((m) => ({ '@type': 'HowToSupply', name: m })),
    tool: [],
    step: a.pasos.map((texto, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `Paso ${i + 1}`,
      text: texto,
    })),
  };

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════════════════════════════════════════════
          HERO del proyecto
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-tinki-light py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 pattern-dots-orange" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link
              href="/taller"
              className="text-[13px] font-medium text-tinki-orange hover:underline"
            >
              ← Volver al taller
            </Link>
          </nav>

          {/* Emoji grande */}
          <span className="text-6xl sm:text-7xl">{a.imagenEmoji}</span>

          <h1 className="mt-6 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            {a.titulo}
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-tinki-dark/45 sm:text-lg">
            {a.descripcion}
          </p>

          {/* Chips de metadata */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-tinki-orange/10 px-3 py-1 text-xs font-semibold text-tinki-orange">
              {EDAD_LABELS[a.edad]}
            </span>
            {a.tipo.map((t) => (
              <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-tinki-dark/45 border border-neutral-100">
                {TIPO_LABELS[t]}
              </span>
            ))}
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-tinki-dark/45 border border-neutral-100">
              {MANCHA_LABELS[a.mancha]}
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-tinki-dark/45 border border-neutral-100">
              {DURACION_LABELS[a.duracion]}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTENIDO: Materiales + Pasos
          ════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          {/* Columna izquierda: Materiales */}
          <div>
            <h2 className="text-lg font-black tracking-tight text-tinki-dark">
              Materiales
            </h2>
            <p className="mt-1 text-[13px] text-tinki-dark/35">
              Cosas que tienes por casa o encuentras fácil.
            </p>

            <ul className="mt-5 space-y-2.5">
              {a.materialesReales.map((m) => (
                <li key={m} className="flex items-start gap-3 text-[14px]">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-tinki-orange/8 text-[10px]">
                    ✓
                  </span>
                  <span className="text-tinki-dark/60">{m}</span>
                </li>
              ))}
            </ul>

            {/* Mecanismos */}
            {a.mecanismo.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-bold text-tinki-dark">Conceptos que se trabajan</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {a.mecanismo.map((m) => (
                    <span
                      key={m}
                      className="rounded-md bg-tinki-orange/5 px-2.5 py-1 text-[11px] font-medium text-tinki-orange/80 border border-tinki-orange/10"
                    >
                      {MECANISMO_LABELS[m]}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Materiales tipo */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {a.material.map((m) => (
                <span
                  key={m}
                  className="rounded-md bg-neutral-50 px-2 py-0.5 text-[11px] font-medium text-tinki-dark/35 border border-neutral-100"
                >
                  {MATERIAL_LABELS[m]}
                </span>
              ))}
            </div>
          </div>

          {/* Columna derecha: Pasos */}
          <div>
            <h2 className="text-lg font-black tracking-tight text-tinki-dark">
              Paso a paso
            </h2>
            <p className="mt-1 text-[13px] text-tinki-dark/35">
              Síguelos en orden. Si algo no sale a la primera, no pasa nada: itera.
            </p>

            <ol className="mt-5 space-y-5">
              {a.pasos.map((paso, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-tinki-dark text-[12px] font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-[14px] leading-relaxed text-tinki-dark/60 pt-0.5">
                    {paso}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Volver */}
        <div className="mt-16 border-t border-neutral-100 pt-8 text-center">
          <Link
            href="/taller"
            className="text-sm font-semibold text-tinki-orange hover:underline"
          >
            ← Volver al taller
          </Link>
        </div>
      </div>
    </main>
  );
}
