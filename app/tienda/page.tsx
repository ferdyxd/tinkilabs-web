import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Comprar más — Tinkilabs',
  description: 'Certificados de regalo, merch, repuestos y más. Todo lo que necesitas para seguir construyendo.',
};

const secciones = [
  {
    nombre: 'Certificados de Regalo',
    descripcion: 'El mejor regalo para un pequeño ingeniero. Elige el importe y ellos eligen la caja.',
    link: '/regalo',
    icono: '🎁',
    activo: true,
  },
  {
    nombre: 'Merch y Extras',
    descripcion: 'Camisetas, pósters, pegatinas y herramientas Tinkilabs. Próximamente.',
    link: '',
    icono: '👕',
    activo: false,
  },
  {
    nombre: 'Repuestos',
    descripcion: '¿Falta una pieza o se ha roto? Pídela aquí y te la enviamos gratis.',
    link: '/repuestos',
    icono: '🔧',
    activo: true,
  },
];

export default function TiendaPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-tinki-light py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 pattern-dots-orange" aria-hidden="true" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinki-orange/5 blur-[100px]" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <span className="inline-block rounded-full border border-tinki-orange/15 bg-tinki-orange/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tinki-orange">
            Tienda
          </span>
          <h1 className="mt-6 text-3xl font-black tracking-tight text-tinki-dark sm:text-5xl">
            Más que cajas
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-tinki-dark/45">
            Regala ingeniería, repón piezas o llévate algo de merch. Todo lo que necesitas para seguir construyendo.
          </p>
        </div>
      </section>

      {/* Grid de secciones */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {secciones.map((item) => (
            <div key={item.nombre}>
              {item.activo ? (
                <Link
                  href={item.link}
                  className="group flex flex-col items-center rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-tinki-orange/20 hover:shadow-md hover:shadow-tinki-orange/5 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-tinki-light text-3xl shadow-sm">
                    {item.icono}
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-tinki-dark group-hover:text-tinki-orange transition-colors">
                    {item.nombre}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-tinki-dark/45">
                    {item.descripcion}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-tinki-orange transition-transform group-hover:translate-x-0.5">
                    Explorar
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 2l4 4-4 4"/></svg>
                  </span>
                </Link>
              ) : (
                <div className="flex flex-col items-center rounded-2xl border border-neutral-100 bg-neutral-50/50 p-8 text-center opacity-50 cursor-not-allowed">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-3xl">
                    {item.icono}
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-tinki-dark">
                    {item.nombre}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-tinki-dark/45">
                    {item.descripcion}
                  </p>
                  <span className="mt-5 inline-block rounded-md border border-tinki-orange/20 bg-tinki-orange/5 px-3 py-1 text-xs font-semibold text-tinki-orange">
                    Próximamente
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-tinki-light py-20 sm:py-28">
        <div className="mx-auto max-w-xl px-6 text-center">
          <span className="text-4xl">📦</span>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-tinki-dark sm:text-3xl">
            ¿Aún no tienes suscripción?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-tinki-dark/45">
            Una caja con un proyecto de ingeniería real cada mes. Sin permanencia. Desde 19.90€.
          </p>
          <Link
            href="/suscribete"
            className="mt-6 inline-block rounded-xl bg-tinki-orange px-8 py-4 text-sm font-bold text-white shadow-lg shadow-tinki-orange/20 transition-all hover:bg-tinki-orange-dark hover:shadow-xl hover:shadow-tinki-orange/25 active:scale-[0.97]"
          >
            Ver planes de suscripción
          </Link>
        </div>
      </section>
    </main>
  );
}
