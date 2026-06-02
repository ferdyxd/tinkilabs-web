'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { ActividadCard } from '@/components/ActividadCard';
import { FiltrosTaller, type FiltrosState } from '@/components/FiltrosTaller';
import { actividades } from '@/lib/actividades-data';

const filtrosIniciales: FiltrosState = {
  edad: null,
  tipo: [],
  mancha: null,
  duracion: null,
  material: [],
  mecanismo: [],
  search: '',
};

function useStaggerReveal(selector: string, deps: unknown[]) {
  useEffect(() => {
    const cards = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-stagger-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, deps);
}

export default function TallerPage() {
  const [filtros, setFiltros] = useState<FiltrosState>(filtrosIniciales);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtradas = useMemo(() => {
    return actividades.filter((a) => {
      // Búsqueda
      if (filtros.search) {
        const q = filtros.search.toLowerCase();
        const match =
          a.titulo.toLowerCase().includes(q) ||
          a.descripcionCorta.toLowerCase().includes(q) ||
          a.mecanismo.some((m) => m.includes(q));
        if (!match) return false;
      }

      // Edad
      if (filtros.edad && a.edad !== filtros.edad) return false;

      // Tipo (OR — la actividad debe tener al menos uno de los tipos seleccionados)
      if (filtros.tipo.length > 0 && !filtros.tipo.some((t) => a.tipo.includes(t))) return false;

      // Mancha
      if (filtros.mancha && a.mancha !== filtros.mancha) return false;

      // Duración
      if (filtros.duracion && a.duracion !== filtros.duracion) return false;

      // Material (OR)
      if (filtros.material.length > 0 && !filtros.material.some((m) => a.material.includes(m))) return false;

      // Mecanismo (OR)
      if (filtros.mecanismo.length > 0 && !filtros.mecanismo.some((m) => a.mecanismo.includes(m))) return false;

      return true;
    });
  }, [filtros]);

  useStaggerReveal('.card-stagger', [filtradas]);

  const filtrosActivos = Object.values(filtros).some((v) =>
    Array.isArray(v) ? v.length > 0 : v !== null && v !== ''
  );

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
            El taller de Tinki
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            Proyectos que puedes hacer en casa
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-tinki-dark/45">
            Construye, experimenta, crea y juega con materiales que tienes por casa. Sin pantallas, sin pilas, solo tus manos y tus ganas.
          </p>
          <p className="mt-6 text-[13px] font-medium text-tinki-dark/25">
            {actividades.length} actividades · Nuevas cada semana
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTENIDO: Sidebar + Grid
          ════════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* Sidebar filtros */}
          <FiltrosTaller
            filtros={filtros}
            onChange={setFiltros}
            total={actividades.length}
            totalFiltradas={filtradas.length}
          />

          {/* Grid */}
          <div>
            {filtradas.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-center">
                <span className="text-5xl">🔍</span>
                <p className="mt-4 text-lg font-semibold text-tinki-dark">Nada por aquí</p>
                <p className="mt-1 text-sm text-tinki-dark/40">
                  Prueba a quitar filtros o buscar con otras palabras.
                </p>
                {filtrosActivos && (
                  <button
                    type="button"
                    onClick={() => setFiltros(filtrosIniciales)}
                    className="mt-4 text-sm font-semibold text-tinki-orange hover:underline"
                  >
                    Limpiar filtros →
                  </button>
                )}
              </div>
            ) : (
              <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtradas.map((a, i) => (
                  <div
                    key={a.slug}
                    className="card-stagger"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <ActividadCard actividad={a} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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
