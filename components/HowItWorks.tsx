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
      <img src="/images/brand/icons/rocket.svg" alt="" width="40" height="40" className="text-tinki-orange" />
    ),
  },
  {
    numero: '02',
    titulo: 'Recibe la caja',
    descripcion:
      'Cada mes llega a tu buzón una caja con piezas de madera, engranajes y un proyecto nuevo.',
    icono: (
      <img src="/images/brand/icons/gear.svg" alt="" width="40" height="40" className="text-tinki-orange" />
    ),
  },
  {
    numero: '03',
    titulo: 'Construye y alucina',
    descripcion:
      'Monta pieza a pieza. Sin pantallas. Solo física real y la sensación de decir "lo he hecho yo".',
    icono: (
      <img src="/images/brand/icons/wrench.svg" alt="" width="40" height="40" className="text-tinki-orange" />
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
    <section className="relative overflow-hidden bg-tinki-light py-24 sm:py-32">
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
