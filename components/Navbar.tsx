'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── Datos ──────────────────────────────────────────────────

const suscripciones = [
  { nombre: 'Tinki Cajas', edad: '6-14 años', subtitulo: 'Kits STEM mensuales', link: '/suscribete', activo: true, icon: '📦' },
  { nombre: 'Tinki City', edad: 'Próximamente', subtitulo: 'Ciudad modular por meses', link: '', activo: false, icon: '🏙️' },
];

const comprarMas = [
  { nombre: 'Certificados de Regalo', link: '/regalo' },
  { nombre: 'Merch y Extras', link: '/tienda' },
  { nombre: 'Repuestos', link: '/repuestos' },
];

const nosotros = [
  { nombre: 'Sobre nosotros', link: '/nosotros' },
  { nombre: 'FAQ y Ayuda', link: '/ayuda' },
  { nombre: 'Reseñas', link: '/resenas' },
];

// ─── Iconos SVG (18px, finos) ───────────────────────────────

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4.5" />
      <path d="M4 21v-1.5a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5V21" />
    </svg>
  );
}

function CartIcon({ count }: { count: number }) {
  return (
    <div className="relative">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M3 3h2.5l1.6 11.7h10.4L20 6H5.5" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--color-primary)] text-[9px] font-bold text-white leading-none">
          {count}
        </span>
      )}
    </div>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <div className="flex h-4 w-4 flex-col items-center justify-center gap-[3px]">
      <span className={`block h-px w-4 rounded bg-current transition-all origin-center ${open ? 'translate-y-[2px] rotate-45' : ''}`} />
      <span className={`block h-px w-4 rounded bg-current transition-all ${open ? 'opacity-0' : ''}`} />
      <span className={`block h-px w-4 rounded bg-current transition-all origin-center ${open ? '-translate-y-[2px] -rotate-45' : ''}`} />
    </div>
  );
}

// ─── Navbar ─────────────────────────────────────────────────

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cb = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', cb, { passive: true });
    return () => window.removeEventListener('scroll', cb);
  }, []);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setUserName(d.name))
      .catch(() => {});
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(name);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setDropdown(null), 120);
  };

  const hasBg = scrolled || open;
  const navTextColor = hasBg ? 'var(--color-text)' : '#ffffff';

  return (
    <>
      {/* ─── Navbar ─────────────────────────────────────── */}
      <nav
        className="fixed top-0 z-50 w-full transition-all duration-300"
        style={{
          background: hasBg ? 'var(--color-background)' : 'transparent',
          borderBottom: hasBg ? '1px solid var(--color-border)' : '1px solid transparent',
          color: navTextColor,
        }}
      >
        <div className="mx-auto flex h-[58px] max-w-7xl items-center gap-5 px-5">
          {/* Hamburguesa móvil */}
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
            <Hamburger open={open} />
          </button>

          {/* ─── Izquierda: dropdowns ─────────────────── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {/* Suscripciones */}
            <div className="relative" onMouseEnter={() => handleEnter('subs')} onMouseLeave={handleLeave}>
              <button
                onClick={() => setDropdown(dropdown === 'subs' ? null : 'subs')}
                className={`rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors ${
                  dropdown === 'subs' ? 'opacity-100' : 'opacity-65 hover:opacity-100'
                }`}
              >
                Suscripciones
              </button>
              {dropdown === 'subs' && (
                <div
                  className="absolute left-0 top-full mt-0.5 w-[440px] rounded-xl border p-3 shadow-xl"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {suscripciones.map(s => (
                      <div key={s.nombre}>
                        {s.activo ? (
                          <Link
                            href={s.link}
                            onClick={() => setDropdown(null)}
                            className="flex items-start gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-neutral-100 dark:hover:bg-white/5"
                          >
                            <span className="mt-0.5 text-xl leading-none">{s.icon}</span>
                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold leading-tight" style={{ color: 'var(--color-text)' }}>{s.nombre}</p>
                              <p className="text-[11px] leading-tight mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{s.subtitulo}</p>
                              <p className="text-[10px] mt-1" style={{ color: 'var(--color-text-muted)' }}>{s.edad}</p>
                            </div>
                          </Link>
                        ) : (
                          <div className="flex items-start gap-2.5 rounded-lg p-2.5 opacity-45 cursor-not-allowed">
                            <span className="mt-0.5 text-xl leading-none">{s.icon}</span>
                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold leading-tight" style={{ color: 'var(--color-text)' }}>{s.nombre}</p>
                              <p className="text-[11px] leading-tight mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{s.subtitulo}</p>
                              <span className="inline-block mt-1 rounded-md bg-[var(--color-primary)]/10 px-1.5 py-0.5 text-[10px] font-semibold" style={{ color: 'var(--color-primary)' }}>
                                Próximamente
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Comprar más */}
            <div className="relative" onMouseEnter={() => handleEnter('shop')} onMouseLeave={handleLeave}>
              <button
                onClick={() => setDropdown(dropdown === 'shop' ? null : 'shop')}
                className={`rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors ${
                  dropdown === 'shop' ? 'opacity-100' : 'opacity-65 hover:opacity-100'
                }`}
              >
                Comprar más
              </button>
              {dropdown === 'shop' && (
                <div
                  className="absolute left-0 top-full mt-0.5 w-48 rounded-xl border py-1.5 shadow-xl"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  {comprarMas.map(item => (
                    <Link
                      key={item.nombre}
                      href={item.link}
                      onClick={() => setDropdown(null)}
                      className="block px-3.5 py-2 text-[13px] transition-colors hover:bg-neutral-100 dark:hover:bg-white/5"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {item.nombre}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Nosotros */}
            <div className="relative" onMouseEnter={() => handleEnter('about')} onMouseLeave={handleLeave}>
              <button
                onClick={() => setDropdown(dropdown === 'about' ? null : 'about')}
                className={`rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors ${
                  dropdown === 'about' ? 'opacity-100' : 'opacity-65 hover:opacity-100'
                }`}
              >
                Nosotros
              </button>
              {dropdown === 'about' && (
                <div
                  className="absolute left-0 top-full mt-0.5 w-48 rounded-xl border py-1.5 shadow-xl"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  {nosotros.map(item => (
                    <Link
                      key={item.nombre}
                      href={item.link}
                      onClick={() => setDropdown(null)}
                      className="block px-3.5 py-2 text-[13px] transition-colors hover:bg-neutral-100 dark:hover:bg-white/5"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {item.nombre}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ─── Logo ────────────────────────────────────── */}
          <div className="flex-1 lg:flex-none lg:mx-auto text-center lg:text-left">
            <Link href="/" className="text-base font-bold tracking-tight transition-colors hover:opacity-70" style={{ color: navTextColor }}>
              Tinkilabs
            </Link>
          </div>

          {/* ─── Derecha ─────────────────────────────────── */}
          <div className="flex items-center gap-2.5">
            {/* Badge evento */}
            <Link
              href="/campamento"
              className="hidden sm:inline-block rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-all hover:bg-white/10"
              style={{ color: navTextColor, opacity: hasBg ? 0.65 : 0.85 }}
            >
              Verano 🏕️
            </Link>

            {/* Cuenta */}
            <Link
              href={userName ? '/mi-cuenta' : '/acceso'}
              className="rounded-md p-1 transition-colors hover:opacity-60"
              style={{ color: navTextColor }}
              title={userName || 'Acceder'}
            >
              <UserIcon />
            </Link>

            {/* Carrito */}
            <Link
              href="/cart"
              className="rounded-md p-1 transition-colors hover:opacity-60"
              style={{ color: navTextColor }}
            >
              <CartIcon count={0} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Móvil full-screen ──────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto pt-[58px] transition-all duration-300 lg:hidden ${
          open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        style={{ background: 'var(--color-background)', color: 'var(--color-text)' }}
      >
        <div className="flex-1 space-y-6 px-5 py-6">
          {/* Suscripciones móvil */}
          <div>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Suscripciones</h3>
            <div className="space-y-1.5">
              {suscripciones.map(s => (
                <div key={s.nombre}>
                  {s.activo ? (
                    <Link href={s.link} onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg border p-3"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <span className="text-xl">{s.icon}</span>
                      <div>
                        <p className="text-[13px] font-semibold">{s.nombre}</p>
                        <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{s.subtitulo} &middot; {s.edad}</p>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 rounded-lg border p-3 opacity-45"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <span className="text-xl">{s.icon}</span>
                      <div>
                        <p className="text-[13px] font-semibold">{s.nombre}</p>
                        <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{s.subtitulo}</p>
                        <span className="inline-block mt-1 rounded-md bg-[var(--color-primary)]/10 px-1.5 py-0.5 text-[10px] font-semibold" style={{ color: 'var(--color-primary)' }}>Próximamente</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Comprar más móvil */}
          <div>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Comprar más</h3>
            <div className="space-y-0.5">
              {comprarMas.map(item => (
                <Link key={item.nombre} href={item.link} onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-[13px] transition-colors hover:bg-neutral-100 dark:hover:bg-white/5"
                >
                  {item.nombre}
                </Link>
              ))}
            </div>
          </div>

          {/* Nosotros móvil */}
          <div>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Nosotros</h3>
            <div className="space-y-0.5">
              {nosotros.map(item => (
                <Link key={item.nombre} href={item.link} onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-[13px] transition-colors hover:bg-neutral-100 dark:hover:bg-white/5"
                >
                  {item.nombre}
                </Link>
              ))}
            </div>
          </div>

          {/* Evento móvil */}
          <Link href="/campamento" onClick={() => setOpen(false)}
            className="block rounded-lg border px-4 py-2.5 text-center text-[13px] font-medium"
            style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
          >
            Verano 🏕️
          </Link>
        </div>

        <div className="border-t px-5 py-3" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-center text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
            {userName ? `Hola, ${userName}` : 'Tinkilabs'}
          </p>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
