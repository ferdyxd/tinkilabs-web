'use client';

import { useState, useMemo } from 'react';
import { BlogCard } from '@/components/BlogCard';
import { posts, CATEGORIA_LABELS, type CategoriaBlog } from '@/lib/blog-data';

export default function BlogPage() {
  const [categoria, setCategoria] = useState<CategoriaBlog | null>(null);
  const [search, setSearch] = useState('');

  const filtrados = useMemo(() => {
    return posts.filter((p) => {
      if (categoria && p.categoria !== categoria) return false;
      if (search) {
        const q = search.toLowerCase();
        const match =
          p.titulo.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [categoria, search]);

  const categorias = Object.entries(CATEGORIA_LABELS) as [CategoriaBlog, string][];

  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-tinki-light py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 pattern-dots-orange" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinki-orange/5 blur-[100px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <span className="inline-block rounded-full border border-tinki-orange/15 bg-tinki-orange/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
            Blog de Tinki
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            Construye, experimenta, alucina
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-tinki-dark/45">
            Proyectos, ciencia, ingeniería e historias del castor constructor. Sin pantallas, sin rollos, solo ganas de crear.
          </p>
          <p className="mt-6 text-[13px] font-medium text-tinki-dark/25">
            {posts.length} artículos · Nuevos cada semana
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FILTROS + GRID
          ════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
        {/* Buscador + categorías */}
        <div className="mb-10 space-y-5">
          {/* Buscador */}
          <div className="relative mx-auto max-w-md">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tinki-dark/20"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="engranajes, Newton, proyectos..."
              className="w-full rounded-lg border border-neutral-200 py-2.5 pl-9 pr-3 text-[13px] text-tinki-dark placeholder:text-tinki-dark/20 focus:border-tinki-orange focus:outline-none focus:ring-2 focus:ring-tinki-orange/10"
            />
          </div>

          {/* Pills de categoría */}
          <div className="flex flex-wrap justify-center gap-1.5">
            <button
              type="button"
              onClick={() => setCategoria(null)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${
                categoria === null
                  ? 'bg-tinki-dark text-white shadow-sm'
                  : 'bg-neutral-50 text-tinki-dark/50 hover:bg-neutral-100 hover:text-tinki-dark/65'
              }`}
            >
              Todo
            </button>
            {categorias.map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCategoria(categoria === key ? null : key)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${
                  categoria === key
                    ? 'bg-tinki-dark text-white shadow-sm'
                    : 'bg-neutral-50 text-tinki-dark/50 hover:bg-neutral-100 hover:text-tinki-dark/65'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtrados.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <span className="text-5xl">🔍</span>
            <p className="mt-4 text-lg font-semibold text-tinki-dark">Nada por aquí</p>
            <p className="mt-1 text-sm text-tinki-dark/40">
              Prueba con otras palabras o quita los filtros.
            </p>
            {(categoria || search) && (
              <button
                type="button"
                onClick={() => { setCategoria(null); setSearch(''); }}
                className="mt-4 text-sm font-semibold text-tinki-orange hover:underline"
              >
                Limpiar filtros →
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════
          CTA — Suscripción
          ════════════════════════════════════════════════════ */}
      <section className="bg-tinki-light py-20 sm:py-28">
        <div className="mx-auto max-w-xl px-6 text-center">
          <span className="text-4xl">📦</span>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-tinki-dark sm:text-3xl">
            ¿Quieres la experiencia completa?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-tinki-dark/45">
            Cada mes te enviamos una caja con un proyecto de ingeniería real. Piezas de madera, instrucciones paso a paso y la revista de Tinki.
          </p>
          <a
            href="/suscribete"
            className="mt-6 inline-block rounded-xl bg-tinki-orange px-8 py-4 text-sm font-bold text-white shadow-lg shadow-tinki-orange/20 transition-all hover:bg-tinki-orange-dark hover:shadow-xl hover:shadow-tinki-orange/25 active:scale-[0.97]"
          >
            Ver planes de suscripción
          </a>
        </div>
      </section>
    </main>
  );
}
