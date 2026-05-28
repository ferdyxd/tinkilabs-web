'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ─── Datos de los dropdowns ──────────────────────────────────

const suscripciones = [
  { nombre: 'Tinki Cajas', desc: 'Suscripción mensual de kits STEM', link: '/suscribete', activo: true, icon: '📦' },
  { nombre: 'Tinki City', desc: 'Ciudad modular por meses', link: '', activo: false, icon: '🏙️' },
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

const eventoEspecial = { nombre: 'Verano 🏕️', link: '/campamento' };

// ─── Iconos SVG inline ─────────────────────────────────────

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
    </svg>
  );
}

function CartIcon({ count }: { count: number }) {
  return (
    <div className="relative">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M3 3h2l1.5 12h11l1.5-9H6" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </div>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <div className="flex h-5 w-5 flex-col items-center justify-center gap-1">
      <span className={`block h-[1.5px] w-4 rounded bg-current transition-all ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
      <span className={`block h-[1.5px] w-4 rounded bg-current transition-all ${open ? 'opacity-0' : ''}`} />
      <span className={`block h-[1.5px] w-4 rounded bg-current transition-all ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
    </div>
  );
}

// ─── Componente principal ───────────────────────────────────

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detectar scroll para backdrop
  useEffect(() => {
    const cb = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', cb, { passive: true });
    return () => window.removeEventListener('scroll', cb);
  }, []);

  // Cargar usuario autenticado
  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setUserName(d.name))
      .catch(() => {});
  }, []);

  // Bloquear scroll cuando menú móvil abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleEnter = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(name);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setDropdown(null), 150);
  };

  const hasBg = scrolled || open;
  const navColor = hasBg ? 'var(--color-text)' : '#ffffff';

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          hasBg
            ? 'border-b shadow-sm backdrop-blur-xl'
            : ''
        }`}
        style={{
          background: hasBg ? 'var(--color-background)' : 'transparent',
          borderColor: 'var(--color-border)',
          color: navColor,
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
          {/* Hamburguesa (móvil) */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            <Hamburger open={open} />
          </button>

          {/* Izquierda: dropdowns (desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Suscripciones */}
            <div
              className="relative"
              onMouseEnter={() => handleEnter('subs')}
              onMouseLeave={handleLeave}
            >
              <button
                onClick={() => setDropdown(dropdown === 'subs' ? null : 'subs')}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  dropdown === 'subs' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                Suscripciones
              </button>
              {dropdown === 'subs' && (
                <div
                  className="absolute left-0 top-full mt-1 w-72 rounded-2xl border p-3 shadow-xl backdrop-blur-xl"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  {suscripciones.map(s => (
                    <div key={s.nombre} className="mb-1 last:mb-0">
                      {s.activo ? (
                        <Link
                          href={s.link}
                          onClick={() => setDropdown(null)}
                          className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[var(--color-primary)]/5"
                        >
                          <span className="text-2xl">{s.icon}</span>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{s.nombre}</p>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.desc}</p>
                          </div>
                        </Link>
                      ) : (
                        <div className="flex items-start gap-3 rounded-xl p-3 opacity-50 cursor-not-allowed">
                          <span className="text-2xl">{s.icon}</span>
                          <div>
                            <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{s.nombre}</p>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.desc}</p>
                            <span className="mt-1 inline-block rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[10px] font-semibold" style={{ color: 'var(--color-primary)' }}>
                              Próximamente
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Comprar más */}
            <div
              className="relative"
              onMouseEnter={() => handleEnter('shop')}
              onMouseLeave={handleLeave}
            >
              <button
                onClick={() => setDropdown(dropdown === 'shop' ? null : 'shop')}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  dropdown === 'shop' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                Comprar más
              </button>
              {dropdown === 'shop' && (
                <div
                  className="absolute left-0 top-full mt-1 w-52 rounded-2xl border py-2 shadow-xl backdrop-blur-xl"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  {comprarMas.map(item => (
                    <Link
                      key={item.nombre}
                      href={item.link}
                      onClick={() => setDropdown(null)}
                      className="block px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-primary)]/5"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {item.nombre}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Nosotros */}
            <div
              className="relative"
              onMouseEnter={() => handleEnter('about')}
              onMouseLeave={handleLeave}
            >
              <button
                onClick={() => setDropdown(dropdown === 'about' ? null : 'about')}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  dropdown === 'about' ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                Nosotros
              </button>
              {dropdown === 'about' && (
                <div
                  className="absolute left-0 top-full mt-1 w-52 rounded-2xl border py-2 shadow-xl backdrop-blur-xl"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  {nosotros.map(item => (
                    <Link
                      key={item.nombre}
                      href={item.link}
                      onClick={() => setDropdown(null)}
                      className="block px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-primary)]/5"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {item.nombre}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Logo (centrado en desktop) */}
          <div className="flex-1 text-center lg:flex-none lg:mx-auto">
            <Link href="/" className="text-lg font-bold tracking-tight transition-colors hover:opacity-70" style={{ color: 'var(--color-text)' }}>
              Tinkilabs
            </Link>
          </div>

          {/* Derecha: evento + cuenta + carrito */}
          <div className="flex items-center gap-3">
            {/* Evento especial */}
            {eventoEspecial && (
              <Link
                href={eventoEspecial.link}
                className="hidden sm:inline-block rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:border-[var(--color-primary)]/30"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
              >
                {eventoEspecial.nombre}
              </Link>
            )}

            {/* Cuenta */}
            <Link
              href={userName ? '/mi-cuenta' : '/acceso'}
              className="rounded-lg p-1.5 transition-colors hover:opacity-70"
              style={{ color: 'var(--color-text)' }}
              title={userName || 'Acceder'}
            >
              <UserIcon />
            </Link>

            {/* Carrito */}
            <Link
              href="/cart"
              className="rounded-lg p-1.5 transition-colors hover:opacity-70"
              style={{ color: 'var(--color-text)' }}
            >
              <CartIcon count={0} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Menú móvil full-screen ────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto pt-16 transition-all duration-300 lg:hidden ${
          open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        style={{ background: 'var(--color-background)', color: 'var(--color-text)' }}
      >
        <div className="flex-1 space-y-6 px-6 py-8">
          {/* Suscripciones */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Suscripciones</h3>
            <div className="space-y-2">
              {suscripciones.map(s => (
                <div key={s.nombre}>
                  {s.activo ? (
                    <Link href={s.link} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl border p-4"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <p className="text-sm font-semibold">{s.nombre}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.desc}</p>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border p-4 opacity-50"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <p className="text-sm font-semibold">{s.nombre}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.desc}</p>
                        <span className="mt-1 inline-block rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[10px] font-semibold" style={{ color: 'var(--color-primary)' }}>Próximamente</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Comprar más */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Comprar más</h3>
            <div className="space-y-1">
              {comprarMas.map(item => (
                <Link key={item.nombre} href={item.link} onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[var(--color-primary)]/5"
                >
                  {item.nombre}
                </Link>
              ))}
            </div>
          </div>

          {/* Nosotros */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Nosotros</h3>
            <div className="space-y-1">
              {nosotros.map(item => (
                <Link key={item.nombre} href={item.link} onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[var(--color-primary)]/5"
                >
                  {item.nombre}
                </Link>
              ))}
            </div>
          </div>

          {/* Evento especial (móvil) */}
          {eventoEspecial && (
            <Link href={eventoEspecial.link} onClick={() => setOpen(false)}
              className="block rounded-xl border px-4 py-3 text-center text-sm font-medium"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              {eventoEspecial.nombre}
            </Link>
          )}
        </div>

        {/* Footer menú móvil */}
        <div className="border-t px-6 py-4" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {userName ? `Hola, ${userName}` : 'Tinkilabs'}
          </p>
        </div>
      </div>

      {/* ─── Overlay ────────────────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
