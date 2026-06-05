import type { Metadata } from 'next';
import { testimonios } from '@/lib/testimonios';

export const metadata: Metadata = {
  title: 'Reseñas — Tinkilabs',
  description: 'Esto es lo que dicen las familias que ya están construyendo con Tinkilabs.',
};

export default function ResenasPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-tinki-light py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 pattern-dots-orange" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinki-orange/5 blur-[100px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <span className="inline-block rounded-full border border-tinki-orange/15 bg-tinki-orange/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
            Reseñas
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            Familias que ya construyen
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-tinki-dark/45">
            Padres, madres, abuelos y peques que ya han probado Tinkilabs. Esto es lo que dicen.
          </p>
        </div>
      </section>

      {/* Grid de testimonios */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonios.map((t) => (
            <div
              key={t.nombre}
              className="flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:border-tinki-orange/15 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tinki-light text-2xl">
                  {t.avatar}
                </span>
                <div>
                  <p className="text-sm font-bold text-tinki-dark">{t.nombre}</p>
                  <p className="text-[11px] text-tinki-dark/35">{t.relacion}</p>
                </div>
              </div>
              <p className="text-[14px] leading-relaxed text-tinki-dark/55">
                &ldquo;{t.cita}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tinki-light py-20 sm:py-28">
        <div className="mx-auto max-w-xl px-6 text-center">
          <span className="text-4xl">📦</span>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-tinki-dark sm:text-3xl">
            ¿Quieres ser la próxima reseña?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-tinki-dark/45">
            Únete a las familias que ya reciben su caja cada mes. Sin permanencia. Desde 19.90€.
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
