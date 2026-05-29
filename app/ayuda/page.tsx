'use client';

import { useState, useMemo } from 'react';
import { faqData } from '@/lib/faq-data';
import { FAQSchema } from '@/components/JsonLd';
import Link from 'next/link';

export default function AyudaPage() {
  const [search, setSearch] = useState('');
  const [abiertas, setAbiertas] = useState<Set<string>>(new Set());
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);

  const toggle = (id: string) => {
    const next = new Set(abiertas);
    next.has(id) ? next.delete(id) : next.add(id);
    setAbiertas(next);
  };

  const todas = faqData.flatMap((c) =>
    c.preguntas.map((p) => ({ ...p, categoria: c.titulo, catSlug: c.slug, icono: c.icono }))
  );

  const filtradas = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return todas.filter(
      (p) => p.pregunta.toLowerCase().includes(q) || p.respuesta.toLowerCase().includes(q)
    );
  }, [search, todas]);

  const categoriasVisibles = categoriaActiva
    ? faqData.filter((c) => c.slug === categoriaActiva)
    : faqData;

  const schemaData = faqData.flatMap((c) =>
    c.preguntas.map((p) => ({ question: p.pregunta, answer: p.respuesta }))
  );

  return (
    <main id="main-content" className="min-h-screen bg-white">
      <FAQSchema data={schemaData} />

      {/* ═══════════════════════════════════════════════════════
          HERO — Buscador principal
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-tinki-light py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 pattern-dots-orange" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinki-orange/5 blur-[120px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <span className="inline-block rounded-full border border-tinki-orange/15 bg-tinki-orange/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
            Centro de ayuda
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            ¿En qué podemos ayudarte?
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-tinki-dark/45">
            Busca entre nuestras preguntas frecuentes o contáctanos directamente.
          </p>

          {/* Buscador */}
          <div className="relative mt-8">
            <svg
              className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-tinki-dark/20"
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                if (e.target.value) setCategoriaActiva(null);
              }}
              placeholder='Prueba con "envío", "cancelar", "piezas"...'
              className="w-full rounded-2xl border-2 border-tinki-orange/10 bg-white py-5 pl-14 pr-5 text-base text-tinki-dark shadow-sm transition-all placeholder:text-tinki-dark/20 focus:border-tinki-orange focus:outline-none focus:ring-4 focus:ring-tinki-orange/10"
            />
          </div>

          {/* Resultados de búsqueda */}
          {search.trim() && (
            <div className="mt-8 text-left">
              <p className="mb-4 text-xs font-medium text-tinki-dark/30">
                {filtradas.length === 0
                  ? 'Sin resultados. Prueba con otras palabras.'
                  : `${filtradas.length} resultado${filtradas.length !== 1 ? 's' : ''}`}
              </p>
              <div className="space-y-3">
                {filtradas.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl border border-neutral-100 bg-white p-5 text-left shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-lg">{p.icono}</span>
                      <div>
                        <p className="text-sm font-semibold text-tinki-dark">{p.pregunta}</p>
                        <p className="mt-1 text-[11px] font-medium text-tinki-orange/60">
                          {p.categoria}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-tinki-dark/50">
                          {p.respuesta}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {filtradas.length === 0 && (
                  <div className="rounded-xl border border-neutral-100 bg-white p-8 text-center">
                    <p className="text-3xl">🔍</p>
                    <p className="mt-3 text-sm text-tinki-dark/40">
                      No hay resultados para &quot;{search}&quot;. ¿Probamos con otras palabras?
                    </p>
                    <Link
                      href="/ayuda/contacto"
                      className="mt-4 inline-block text-sm font-semibold text-tinki-orange hover:underline"
                    >
                      Mejor pregúntanos directamente →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          NAVEGACIÓN POR CATEGORÍAS (solo si no hay búsqueda)
          ════════════════════════════════════════════════════ */}
      {!search.trim() && (
        <>
          {/* Pills de categorías */}
          <div className="border-b border-neutral-100 bg-white">
            <div className="mx-auto max-w-4xl px-6 py-4">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCategoriaActiva(null)}
                  className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                    categoriaActiva === null
                      ? 'bg-tinki-dark text-white shadow-md'
                      : 'bg-neutral-50 text-tinki-dark/50 hover:bg-neutral-100 hover:text-tinki-dark/70'
                  }`}
                >
                  Todo
                </button>
                {faqData.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setCategoriaActiva(cat.slug)}
                    className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                      categoriaActiva === cat.slug
                        ? 'bg-tinki-dark text-white shadow-md'
                        : 'bg-neutral-50 text-tinki-dark/50 hover:bg-neutral-100 hover:text-tinki-dark/70'
                    }`}
                  >
                    {cat.icono} {cat.titulo}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Acordeón */}
          <div className="bg-white py-12 sm:py-20">
            <div className="mx-auto max-w-2xl px-6">
              <div className="space-y-12">
                {categoriasVisibles.map((cat) => (
                  <section key={cat.slug}>
                    <h2 className="mb-4 flex items-center gap-3 text-lg font-black tracking-tight text-tinki-dark">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-tinki-orange/8 text-lg">
                        {cat.icono}
                      </span>
                      {cat.titulo}
                    </h2>
                    <div className="space-y-2">
                      {cat.preguntas.map((p) => {
                        const abierta = abiertas.has(p.id);
                        return (
                          <div
                            key={p.id}
                            className="overflow-hidden rounded-xl border transition-all duration-200"
                            style={{
                              borderColor: abierta
                                ? 'var(--color-primary)'
                                : 'var(--color-border, #e5e5e5)',
                              boxShadow: abierta ? '0 4px 20px rgba(255,107,53,0.08)' : 'none',
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => toggle(p.id)}
                              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors hover:bg-neutral-50"
                            >
                              <span style={{ color: abierta ? 'var(--color-primary)' : 'var(--color-text)' }}>
                                {p.pregunta}
                              </span>
                              <svg
                                width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                className={`flex-shrink-0 transition-all duration-300 ${
                                  abierta
                                    ? 'rotate-180 text-tinki-orange'
                                    : 'text-tinki-dark/25'
                                }`}
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </button>
                            <div
                              className="grid transition-all duration-300"
                              style={{
                                gridTemplateRows: abierta ? '1fr' : '0fr',
                              }}
                            >
                              <div className="overflow-hidden">
                                <div className="px-5 pb-5">
                                  <div className="h-px bg-neutral-100" />
                                  <p className="mt-4 text-sm leading-relaxed text-tinki-dark/55">
                                    {p.respuesta}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════
          CTA — Contacto
          ════════════════════════════════════════════════════ */}
      <section className="bg-tinki-light py-20 sm:py-28">
        <div className="mx-auto max-w-xl px-6 text-center">
          <div className="rounded-2xl border border-tinki-orange/10 bg-white p-8 shadow-lg shadow-tinki-orange/5 sm:p-10">
            <span className="text-4xl">💬</span>
            <h2 className="mt-4 text-2xl font-black tracking-tight text-tinki-dark sm:text-3xl">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-tinki-dark/45">
              Escríbenos y te responderemos en menos de 24 horas. De persona a persona, sin robots.
            </p>
            <Link
              href="/ayuda/contacto"
              className="mt-6 inline-block rounded-xl bg-tinki-orange px-8 py-4 text-sm font-bold text-white shadow-lg shadow-tinki-orange/20 transition-all hover:bg-tinki-orange-dark hover:shadow-xl hover:shadow-tinki-orange/25 active:scale-[0.97]"
            >
              Contactar con soporte
            </Link>
            <p className="mt-4 text-[12px] text-tinki-dark/25">
              O escríbenos directamente a{' '}
              <a href="mailto:hola@tinkilabs.com" className="text-tinki-orange/60 hover:underline">
                hola@tinkilabs.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
