'use client';

import { useEffect, useRef } from 'react';

interface Plan {
  nombre: string;
  edad: string;
  precio: string;
  color: string;
  colorBg: string;
  colorBorder: string;
  destacado: boolean;
  descripcion: string;
  incluye: string[];
}

const planes: Plan[] = [
  {
    nombre: 'Tinki Mini',
    edad: '3 — 5 años',
    precio: '19,90 €',
    color: '#F59E0B',
    colorBg: 'rgba(245, 158, 11, 0.06)',
    colorBorder: 'rgba(245, 158, 11, 0.15)',
    destacado: false,
    descripcion:
      'Proyectos sencillos con piezas grandes, pensados para manitas pequeñas. Montaje asistido por un adulto.',
    incluye: ['Piezas grandes y seguras', 'Montaje 10-15 min', '1 proyecto al mes', 'Guía visual ilustrada'],
  },
  {
    nombre: 'Tinki Maker',
    edad: '6 — 9 años',
    precio: '24,90 €',
    color: '#FF6B35',
    colorBg: 'rgba(255, 107, 53, 0.08)',
    colorBorder: 'rgba(255, 107, 53, 0.25)',
    destacado: true,
    descripcion:
      'La línea principal. Mecanismos reales, madera, engranajes. Ellos construyen solos y alucinan con el resultado.',
    incluye: ['Mecanismos de ingeniería real', 'Montaje 20-40 min', '1 proyecto al mes', 'Vídeo paso a paso', 'Pack de bienvenida con herramientas'],
  },
  {
    nombre: 'Tinki Pro',
    edad: '10 — 14 años',
    precio: '29,90 €',
    color: '#E55A2B',
    colorBg: 'rgba(229, 90, 43, 0.06)',
    colorBorder: 'rgba(229, 90, 43, 0.15)',
    destacado: false,
    descripcion:
      'Proyectos más complejos con electrónica básica y mecánica avanzada. Para mentes inquietas que quieren más.',
    incluye: ['Electrónica básica incluida', 'Montaje 45-90 min', '1 proyecto al mes', 'Vídeo + ficha técnica', 'Acceso a comunidad Pro'],
  },
];

export function PlanCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.plan-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('plan-card-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-tinki-light py-24 sm:py-32">
      {/* Fondo: blueprint técnico sutil */}
      <div className="pointer-events-none absolute inset-0 pattern-blueprint" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Cabecera */}
        <div className="mb-16 text-center sm:mb-20">
          <span className="inline-block rounded-full border border-tinki-orange/15 bg-tinki-orange/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
            Planes
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            Elige tu línea
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-tinki-dark/45 sm:text-base">
            Una caja diferente cada mes, adaptada a la edad. Sin permanencia. Cancela cuando quieras.
          </p>
        </div>

        {/* 3 cards */}
        <div ref={containerRef} className="grid items-start gap-6 sm:grid-cols-3 sm:gap-5 lg:gap-8">
          {planes.map((plan, i) => (
            <div
              key={plan.nombre}
              className={`plan-card group relative flex flex-col rounded-2xl border bg-white p-6 transition-all duration-500 sm:p-7 lg:p-8 ${
                plan.destacado
                  ? 'shadow-lg shadow-tinki-orange/10 sm:-mt-4 sm:mb-4 sm:py-9 lg:py-10'
                  : 'shadow-sm'
              }`}
              style={{
                borderColor: plan.colorBorder,
                transitionDelay: `${i * 150}ms`,
              }}
            >
              {/* Badge "Más popular" en la card destacada */}
              {plan.destacado && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="inline-block rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md"
                    style={{ background: plan.color }}
                  >
                    Más popular
                  </span>
                </div>
              )}

              {/* Color de línea */}
              <div
                className="mb-4 h-1.5 w-12 rounded-full sm:mb-5"
                style={{ background: plan.color }}
              />

              {/* Nombre + edad */}
              <h3 className="text-xl font-black tracking-tight text-tinki-dark sm:text-2xl">
                {plan.nombre}
              </h3>
              <p className="mt-1 text-sm font-medium text-tinki-dark/35">{plan.edad}</p>

              {/* Precio */}
              <div className="mt-4 flex items-baseline gap-1 sm:mt-5">
                <span className="text-3xl font-black tracking-tight text-tinki-dark sm:text-4xl">
                  {plan.precio}
                </span>
                <span className="text-sm text-tinki-dark/35">/ mes</span>
              </div>

              {/* Descripción */}
              <p className="mt-4 text-sm leading-relaxed text-tinki-dark/50 sm:mt-5">
                {plan.descripcion}
              </p>

              {/* Qué incluye */}
              <ul className="mt-5 flex-1 space-y-2.5 border-t pt-5" style={{ borderColor: plan.colorBorder }}>
                {plan.incluye.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-tinki-dark/55">
                    <svg
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                    >
                      <circle cx="8" cy="8" r="7" fill={plan.color} opacity="0.15" />
                      <path d="M5 8l2 2 4-4" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA — scroll al formulario */}
              <button
                type="button"
                onClick={() => {
                  document.getElementById('cta-final')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`mt-6 block w-full rounded-xl px-5 py-3.5 text-center text-sm font-bold transition-all duration-200 active:scale-[0.97] sm:mt-7 ${
                  plan.destacado
                    ? 'text-white shadow-md shadow-tinki-orange/25 hover:shadow-lg hover:shadow-tinki-orange/30'
                    : 'border-2 hover:border-transparent hover:text-white'
                }`}
                style={
                  plan.destacado
                    ? { background: plan.color }
                    : { borderColor: plan.color, color: plan.color }
                }
                onMouseEnter={(e) => {
                  if (!plan.destacado) {
                    e.currentTarget.style.background = plan.color;
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.destacado) {
                    e.currentTarget.style.background = '';
                    e.currentTarget.style.color = plan.color;
                  }
                }}
              >
                {plan.destacado ? 'Quiero mi caja' : 'Elegir ' + plan.nombre}
              </button>
            </div>
          ))}
        </div>

        {/* Nota al pie */}
        <p className="mx-auto mt-10 max-w-md text-center text-xs leading-relaxed text-tinki-dark/25 sm:mt-12">
          Todos los planes incluyen envío gratuito a España peninsular. El primer envío sale en 3-5 días laborables.
          Puedes cancelar, pausar o cambiar de plan en cualquier momento desde tu cuenta.
        </p>
      </div>
    </section>
  );
}
