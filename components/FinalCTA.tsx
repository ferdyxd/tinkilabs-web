'use client';

import { useEffect, useRef } from 'react';
import { EmailForm } from '@/components/EmailForm';
import { Counter } from '@/components/Counter';
import Link from 'next/link';

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('cta-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cta-final" className="relative overflow-hidden bg-tinki-light py-24 sm:py-36">
      {/* Fondo degradado naranja cálido */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-tinki-orange/[0.03] via-tinki-orange/[0.06] to-tinki-orange/[0.04]" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-tinki-orange/[0.07] blur-[150px]" />
        <div className="absolute -bottom-32 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-amber-400/[0.05] blur-[120px]" />
      </div>

      {/* Engranaje decorativo */}
      <div className="pointer-events-none absolute right-[8%] top-[15%] h-24 w-24 opacity-[0.04] sm:h-32 sm:w-32" aria-hidden="true">
        <svg viewBox="0 0 120 120" className="gear-decorative h-full w-full">
          <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-tinki-orange" />
          <circle cx="60" cy="60" r="15" fill="currentColor" className="text-tinki-orange" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect key={angle} x="52" y="8" width="16" height="18" rx="3" fill="currentColor" className="text-tinki-orange" transform={`rotate(${angle} 60 60)`} />
          ))}
        </svg>
      </div>

      <div
        ref={ref}
        className="cta-section relative z-10 mx-auto max-w-xl px-6 text-center"
      >
        {/* Tinki */}
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-tinki-orange/10 sm:h-20 sm:w-20">
          <img
            src="/images/brand/icons/tinki-head.svg"
            alt="Tinki"
            className="h-10 w-10 sm:h-12 sm:w-12"
          />
        </div>

        <h2 className="text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
          Sé Fundador Tinkilabs
        </h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-tinki-dark/50 sm:text-lg">
          Los <span className="font-semibold text-tinki-dark/70">primeros 500 Fundadores</span> tendrán{' '}
          <span className="font-bold text-tinki-orange">precio congelado de por vida</span>,{' '}
          acceso anticipado 3 días y una chapa de madera numerada con tu número de Fundador.
        </p>

        {/* Formulario */}
        <div className="mt-8 sm:mt-10">
          <EmailForm />
        </div>

        {/* Counter */}
        <div className="mt-8">
          <Counter />
        </div>

        {/* Acceso protegido */}
        <div className="mt-10 border-t border-tinki-orange/10 pt-8">
          <p className="text-xs font-medium uppercase tracking-widest text-tinki-dark/20">
            Acceso anticipado
          </p>
          <p className="mt-2 text-sm text-tinki-dark/35">
            ¿Tienes código de acceso?{' '}
            <Link
              href="/acceso"
              className="font-medium text-tinki-orange/60 underline underline-offset-4 transition-colors hover:text-tinki-orange"
            >
              Entra aquí
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
