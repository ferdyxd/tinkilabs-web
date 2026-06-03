'use client';

import { useEffect, useRef } from 'react';

interface Paso {
  numero: string;
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
}

const pasos: Paso[] = [
  {
    numero: '01',
    titulo: 'Suscríbete',
    descripcion:
      'Elige tu línea Mini, Maker o Pro. Recibirás una caja diferente cada mes, sin permanencia.',
    icono: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Sobre */}
        <rect x="6" y="14" width="36" height="24" rx="2" />
        <path d="M6 14l18 12L42 14" />
        {/* Chispa de suscripción */}
        <circle cx="36" cy="12" r="6" fill="currentColor" stroke="none" opacity="0.2" />
        <path d="M36 7v10M31 12h10" strokeWidth="3" />
      </svg>
    ),
  },
  {
    numero: '02',
    titulo: 'Recibe la caja',
    descripcion:
      'Cada mes llega a tu buzón una caja con piezas de madera, engranajes y un proyecto nuevo.',
    icono: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Caja */}
        <rect x="8" y="16" width="32" height="26" rx="2" />
        <path d="M8 16l16-10 16 10" />
        {/* Línea de cierre */}
        <line x1="24" y1="16" x2="24" y2="42" strokeDasharray="3 3" opacity="0.5" />
        {/* Cinta */}
        <path d="M16 16v-4a4 4 0 014-4h8a4 4 0 014 4v4" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    numero: '03',
    titulo: 'Construye y alucina',
    descripcion:
      'Monta pieza a pieza. Sin pantallas. Solo física real y la sensación de decir "lo he hecho yo".',
    icono: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Engranaje */}
        <circle cx="24" cy="24" r="10" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3" />
        {/* Dientes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const rad = (a * Math.PI) / 180;
          const x = 24 + 14 * Math.cos(rad);
          const y = 24 + 14 * Math.sin(rad);
          return <line key={a} x1={x - 2} y1={y - 2} x2={x + 2} y2={y + 2} strokeWidth="3" />;
        })}
        {/* Destello */}
        <path d="M34 14l-4 4M14 34l4-4" opacity="0.5" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.how-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('how-card-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Fondo: puntos de ingeniería */}
      <div className="pointer-events-none absolute inset-0 pattern-dots-orange" aria-hidden="true" />

      {/* Línea conectora horizontal (solo desktop) */}
      <div className="pointer-events-none absolute left-[15%] right-[15%] top-[45%] hidden h-px bg-gradient-to-r from-transparent via-tinki-orange/15 to-transparent sm:block" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Cabecera */}
        <div className="mb-16 text-center sm:mb-20">
          <span className="inline-block rounded-full border border-tinki-orange/15 bg-tinki-orange/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
            Cómo funciona
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            De tu buzón a tus manos
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-tinki-dark/45 sm:text-base">
            Sin complicaciones. Sin letra pequeña. Una caja, un proyecto, una sonrisa cada mes.
          </p>
        </div>

        {/* 3 pasos */}
        <div ref={containerRef} className="grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {pasos.map((paso, i) => (
            <div
              key={paso.numero}
              className="how-card group relative flex flex-col items-center text-center"
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              {/* Número gigante en fondo */}
              <span
                className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 text-8xl font-black leading-none tracking-tighter text-tinki-orange/[0.04] sm:-top-8 sm:text-9xl"
                aria-hidden="true"
              >
                {paso.numero}
              </span>

              {/* Icono */}
              <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-tinki-orange/10 bg-white text-tinki-orange shadow-sm shadow-tinki-orange/5 transition-all duration-300 group-hover:shadow-md group-hover:shadow-tinki-orange/10 group-hover:-translate-y-1 sm:mb-6">
                {paso.icono}
                {/* Brillo hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-tinki-orange/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Texto */}
              <h3 className="relative z-10 text-lg font-bold tracking-tight text-tinki-dark sm:text-xl">
                {paso.titulo}
              </h3>
              <p className="relative z-10 mt-2 max-w-xs text-sm leading-relaxed text-tinki-dark/45">
                {paso.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
