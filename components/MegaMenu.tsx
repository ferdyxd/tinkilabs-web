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
    imagen: '/images/productos/01-launcher.jpg',
    icono: '📦',
  },
  {
    nombre: 'Tinki City',
    edad: 'Próximamente',
    subtitulo: 'Ciudad modular por meses. Construye un mundo pieza a pieza.',
    link: '',
    activo: false,
    imagen: null,
    icono: '🏙️',
  },
];

const comprarLinks: MegaLink[] = [
  { nombre: 'Certificados de Regalo', link: '/regalo', descripcion: 'El mejor regalo para un pequeño ingeniero', icono: '🎁' },
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
  if (!seccion) return null;

  return (
    <div className="absolute left-0 right-0 top-full overflow-hidden border-b bg-white shadow-2xl shadow-black/5"
      style={{ animation: 'megaMenuIn 0.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards' }}
    >
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* ─── SUSCRIPCIONES ─── */}
        {seccion === 'subs' && (
          <div>
            <div className="grid gap-6 sm:grid-cols-2">
              {suscripcionesCards.map((card) => (
                <div key={card.nombre}>
                  {card.activo ? (
                    <Link href={card.link}
                      className="group flex items-start gap-5 rounded-xl border border-neutral-100 p-5 transition-all duration-200 hover:border-tinki-orange/20 hover:bg-tinki-orange/[0.03] hover:shadow-md hover:shadow-tinki-orange/5"
                    >
                      <div className="relative h-28 w-36 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-50">
                        {card.imagen ? (
                          <Image src={card.imagen} alt={card.nombre} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="144px" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-3xl">{card.icono}</div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex items-center gap-2">
                          <p className="text-[15px] font-bold text-tinki-dark">{card.nombre}</p>
                          <span className="rounded-md bg-tinki-orange/10 px-1.5 py-0.5 text-[10px] font-semibold text-tinki-orange">{card.edad}</span>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-tinki-dark/45">{card.subtitulo}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-tinki-orange transition-transform group-hover:translate-x-0.5">
                          Ver planes
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 2l4 4-4 4"/></svg>
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-start gap-5 rounded-xl border border-neutral-100 p-5 opacity-50 cursor-not-allowed">
                      <div className="flex h-28 w-36 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-3xl">{card.icono}</div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex items-center gap-2">
                          <p className="text-[15px] font-bold text-tinki-dark">{card.nombre}</p>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-tinki-dark/45">{card.subtitulo}</p>
                        <span className="mt-2 inline-block rounded-md border border-tinki-orange/20 bg-tinki-orange/5 px-2 py-0.5 text-[10px] font-semibold text-tinki-orange">Próximamente</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-5">
              <p className="text-[12px] text-tinki-dark/30">Envío gratis a España peninsular. Sin permanencia. Cancela cuando quieras.</p>
              <Link href="/comparar" className="text-[13px] font-semibold text-tinki-orange transition-colors hover:text-tinki-orange-dark">Comparar planes →</Link>
            </div>
          </div>
        )}

        {/* ─── COMPRAR MÁS ─── */}
        {seccion === 'shop' && (
          <div>
            <div className="grid gap-3 sm:grid-cols-3">
              {comprarLinks.map((item) => (
                <Link key={item.nombre} href={item.link}
                  className="group flex items-start gap-3.5 rounded-xl border border-transparent p-4 transition-all duration-200 hover:border-neutral-100 hover:bg-neutral-50"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-lg transition-colors group-hover:bg-tinki-orange/10">{item.icono}</span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[14px] font-semibold text-tinki-dark transition-colors group-hover:text-tinki-orange">{item.nombre}</p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-tinki-dark/40">{item.descripcion}</p>
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
                  className="group flex items-start gap-3.5 rounded-xl border border-transparent p-4 transition-all duration-200 hover:border-neutral-100 hover:bg-neutral-50"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-lg transition-colors group-hover:bg-tinki-orange/10">{item.icono}</span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[14px] font-semibold text-tinki-dark transition-colors group-hover:text-tinki-orange">{item.nombre}</p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-tinki-dark/40">{item.descripcion}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4 rounded-xl border border-tinki-orange/10 bg-tinki-orange/[0.03] p-4">
              <span className="text-2xl">🔩</span>
              <div>
                <p className="text-[13px] font-semibold text-tinki-dark">Conoce a Tinki</p>
                <p className="text-[12px] text-tinki-dark/40">El castor ingeniero con una rueda dentada en el pecho. Descubre su historia.</p>
              </div>
              <Link href="/nuestro-logo" className="ml-auto flex-shrink-0 text-[12px] font-semibold text-tinki-orange hover:underline">Ver más →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
