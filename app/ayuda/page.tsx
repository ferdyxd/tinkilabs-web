'use client';

import { useState } from 'react';
import { faqData } from '@/lib/faq-data';
import { FAQSchema } from '@/components/JsonLd';
import Link from 'next/link';

export default function AyudaPage() {
  const [search, setSearch] = useState('');
  const [abiertas, setAbiertas] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(abiertas);
    next.has(id) ? next.delete(id) : next.add(id);
    setAbiertas(next);
  };

  const todas = faqData.flatMap(c => c.preguntas.map(p => ({ ...p, categoria: c.titulo, catSlug: c.slug })));
  const filtradas = search.trim()
    ? todas.filter(p =>
        p.pregunta.toLowerCase().includes(search.toLowerCase()) ||
        p.respuesta.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const schemaData = faqData.flatMap(c => c.preguntas.map(p => ({ question: p.pregunta, answer: p.respuesta })));

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <FAQSchema data={schemaData} />

      <div className="mx-auto max-w-2xl px-6 pb-24 pt-28">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
          FAQ y Ayuda
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Encuentra respuestas a las preguntas más comunes. Si no encuentras lo que buscas,{' '}
          <Link href="/ayuda/contacto" className="text-[var(--color-primary)] underline">contáctanos</Link>.
        </p>

        {/* Buscador */}
        <div className="mt-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar en el FAQ..."
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all focus:border-[var(--color-primary)]/50"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          />
        </div>

        {/* Resultados de búsqueda */}
        {search.trim() && (
          <div className="mt-6 space-y-3">
            {filtradas.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                No hay resultados para &quot;{search}&quot;. Prueba con otras palabras o{' '}
                <Link href="/ayuda/contacto" className="text-[var(--color-primary)] underline">escríbenos</Link>.
              </p>
            ) : (
              <>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{filtradas.length} resultado{filtradas.length !== 1 ? 's' : ''}</p>
                {filtradas.map(p => (
                  <div key={p.id} className="rounded-xl border p-4" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{p.pregunta}</p>
                    <p className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>{p.categoria}</p>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{p.respuesta}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Categorías (acordeón) — solo si no hay búsqueda */}
        {!search.trim() && (
          <div className="mt-10 space-y-6">
            {faqData.map(cat => (
              <section key={cat.slug}>
                <h2 className="mb-3 flex items-center gap-2 text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                  <span>{cat.icono}</span> {cat.titulo}
                </h2>
                <div className="space-y-2">
                  {cat.preguntas.map(p => (
                    <div key={p.id} className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--color-border)' }}>
                      <button
                        onClick={() => toggle(p.id)}
                        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium transition-colors hover:bg-neutral-50 dark:hover:bg-white/[0.02]"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {p.pregunta}
                        <svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round"
                          className={`transition-transform duration-200 ${abiertas.has(p.id) ? 'rotate-180' : ''}`}
                          style={{ flexShrink: 0, marginLeft: '12px' }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {abiertas.has(p.id) && (
                        <div className="px-5 pb-4 pt-0">
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{p.respuesta}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Botón contacto */}
        <div className="mt-12 rounded-2xl border p-8 text-center" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>¿No encuentras lo que buscas?</h3>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>Escríbenos y te responderemos en menos de 24 horas.</p>
          <Link
            href="/ayuda/contacto"
            className="mt-4 inline-block rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--color-primary)' }}
          >
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}
