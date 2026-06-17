'use client';

import Link from 'next/link';
import Image from 'next/image';

// ─── Datos del mega menú ────────────────────────────────────

interface MegaLink {
  nombre: string;
  link: string;
  descripcion?: string;
  icono?: string;
}

const suscripcionesCards = [
  {
    nombre: 'Tinki Cajas',
    edad: '6-9 años',
    subtitulo: 'Kits STEM mensuales de ingeniería real',
    link: '/suscribete',
    activo: true,
    imagen: '/images/navbar-tinki-cajas.png',
    icono: '📦',
    cta: 'Ver planes',
  },
  {
    nombre: 'Certificados de Regalo',
    edad: 'Regala Tinki',
    subtitulo: 'El mejor regalo para un pequeño ingeniero. Sin compromiso. Sin permanencia.',
    link: '/regalo',
    activo: true,
    imagen: null,
    icono: '🎁',
    cta: 'Regalar ahora',
  },
  {
    nombre: 'Tinki City',
    edad: 'Próximamente',
    subtitulo: 'Ciudad modular por meses. Construye un mundo pieza a pieza.',
    link: '',
    activo: false,
    imagen: null,
    icono: '🏙️',
    cta: '',
  },
];

const comprarLinks: MegaLink[] = [
  { nombre: 'Merch y Extras', link: '/tienda', descripcion: 'Camisetas, pósters y herramientas Tinkilabs', icono: '👕' },
  { nombre: 'Repuestos', link: '/repuestos', descripcion: '¿Falta una pieza? Te la enviamos gratis', icono: '🔧' },
];

const nosotrosLinks: MegaLink[] = [
  { nombre: 'Sobre nosotros', link: '/nosotros', descripcion: 'Quién está detrás de Tinkilabs', icono: '🤖' },
  { nombre: 'FAQ y Ayuda', link: '/ayuda', descripcion: 'Respuestas a todas tus preguntas', icono: '💬' },
  { nombre: 'Reseñas', link: '/resenas', descripcion: 'Lo que dicen los primeros Tinkers', icono: '⭐' },
];

// ─── Componente ──────────────────────────────────────────────

interface MegaMenuProps {
  seccion: string | null;
}

export function MegaMenu({ seccion }: MegaMenuProps) {
  if (!seccion || seccion === 'blog' || seccion === 'actividades') return null;

  return (
    <div className="absolute left-0 right-0 top-full overflow-hidden border-b bg-white shadow-2xl shadow-black/5"
      style={{ animation: 'megaMenuIn 0.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards' }}
    >
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* ─── SUSCRIPCIONES ─── */}
        {seccion === 'subs' && (
          <div>
            <div className="grid gap-5 sm:grid-cols-3">
              {suscripcionesCards.map((card) => (
                <div key={card.nombre}>
                  {card.activo ? (
                    <Link href={card.link}
                      className="group flex flex-col rounded-2xl border border-neutral-100 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-black/[0.06] hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Imagen grande arriba */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50">
                        {card.imagen ? (
                          <Image src={card.imagen} alt={card.nombre} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="400px" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-5xl transition-transform duration-500 group-hover:scale-110">
                            {card.icono}
                          </div>
                        )}
                      </div>
                      {/* Texto debajo */}
                      <div className="flex flex-col flex-1 p-5">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-tinki-orange mb-1.5">
                          {card.edad}
                        </span>
                        <p className="text-base font-bold text-tinki-dark">{card.nombre}</p>
                        <p className="mt-1 text-[13px] leading-relaxed text-tinki-dark/45 flex-1">{card.subtitulo}</p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-tinki-orange transition-all group-hover:gap-2">
                          {card.cta}
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 2l4 4-4 4"/></svg>
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex flex-col rounded-2xl border border-neutral-100 bg-white opacity-50 cursor-not-allowed overflow-hidden">
                      <div className="relative aspect-[4/3] bg-neutral-50 flex items-center justify-center text-5xl">
                        {card.icono}
                      </div>
                      <div className="flex flex-col flex-1 p-5">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-tinki-dark/30 mb-1.5">
                          {card.edad}
                        </span>
                        <p className="text-base font-bold text-tinki-dark">{card.nombre}</p>
                        <p className="mt-1 text-[13px] leading-relaxed text-tinki-dark/35 flex-1">{card.subtitulo}</p>
                        <span className="mt-4 inline-block rounded-md border border-tinki-orange/20 bg-tinki-orange/5 px-2.5 py-1 text-xs font-semibold text-tinki-orange">Próximamente</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-5">
              <Link href="/comparar" className="text-sm font-semibold text-tinki-orange transition-colors hover:text-tinki-orange-dark">Comparar planes →</Link>
              <p className="text-xs text-tinki-dark/30">Envío gratis a España peninsular. Sin permanencia. Cancela cuando quieras.</p>
            </div>
          </div>
        )}

        {/* ─── COMPRAR MÁS ─── */}
        {seccion === 'shop' && (
          <div>
            <div className="grid gap-3 sm:grid-cols-3">
              {comprarLinks.map((item) => (
                <Link key={item.nombre} href={item.link}
                  className="group flex items-start gap-3.5 rounded-xl border border-transparent p-4 transition-all duration-200 hover:border-tinki-orange/15 hover:bg-tinki-orange/[0.04]"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-tinki-orange/5 text-lg transition-colors group-hover:bg-tinki-orange/15">{item.icono}</span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-sm font-semibold text-tinki-dark transition-colors group-hover:text-tinki-orange">{item.nombre}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-tinki-dark/40">{item.descripcion}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ─── NOSOTROS ─── */}
        {seccion === 'about' && (
          <div>
            <div className="grid gap-3 sm:grid-cols-3">
              {nosotrosLinks.map((item) => (
                <Link key={item.nombre} href={item.link}
                  className="group flex items-start gap-3.5 rounded-xl border border-transparent p-4 transition-all duration-200 hover:border-tinki-orange/15 hover:bg-tinki-orange/[0.04]"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-tinki-orange/5 text-lg transition-colors group-hover:bg-tinki-orange/15">{item.icono}</span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-sm font-semibold text-tinki-dark transition-colors group-hover:text-tinki-orange">{item.nombre}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-tinki-dark/40">{item.descripcion}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4 rounded-xl border border-tinki-orange/10 bg-tinki-orange/[0.03] p-4">
              <span className="text-2xl">🔩</span>
              <div>
                <p className="text-sm font-semibold text-tinki-dark">Conoce a Tinki</p>
                <p className="text-xs text-tinki-dark/40">El castor ingeniero del casco naranja. Descubre su historia.</p>
              </div>
              <Link href="/nuestro-logo" className="ml-auto flex-shrink-0 text-xs font-semibold text-tinki-orange hover:underline">Ver más →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
