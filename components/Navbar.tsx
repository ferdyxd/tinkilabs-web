'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MegaMenu } from '@/components/MegaMenu';

// ─── Datos ──────────────────────────────────────────────────

const suscripciones = [
  { nombre: 'Tinki Cajas', edad: '6-9 años', subtitulo: 'Kits STEM mensuales', link: '/suscribete', activo: true, icon: '📦' },
  { nombre: 'Tinki City', edad: 'Próximamente', subtitulo: 'Ciudad modular por meses', link: '', activo: false, icon: '🏙️' },
];

const comprarMas = [
  { nombre: 'Merch y Extras', link: '/tienda' },
  { nombre: 'Repuestos', link: '/repuestos' },
];

const nosotros = [
  { nombre: 'Sobre nosotros', link: '/nosotros' },
  { nombre: 'FAQ y Ayuda', link: '/ayuda' },
  { nombre: 'Reseñas', link: '/resenas' },
  { nombre: 'Nuestro logo', link: '/nuestro-logo' },
];

// ─── Iconos ─────────────────────────────────────────────────

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
  const [autenticado, setAutenticado] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const paginasOscuras = ['/concepto-b', '/productos'];
  const isDarkPage = paginasOscuras.includes(pathname);
  const esLandingPublica = pathname === '/' && !autenticado;


  useEffect(() => {
    const cb = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', cb, { passive: true });
    return () => window.removeEventListener('scroll', cb);
  }, []);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.autenticado || d?.name) {
          setUserName(d.nombre || d.name);
          setAutenticado(true);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Abrir sección al pasar el ratón por encima del botón
  const openSection = useCallback((name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(name);
  }, []);

  // Cerrar con un pequeño retardo al salir del nav
  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setDropdown(null), 200);
  }, []);

  // Cancelar cierre si el ratón vuelve al nav o al mega menú
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const closeDropdown = useCallback(() => setDropdown(null), []);

  const megaMenuOpen = dropdown !== null;
  const hasBg = scrolled || open || !isDarkPage || megaMenuOpen;

  // Navbar con glass effect cuando es transparente
  const navBg = isDarkPage && !hasBg
    ? 'transparent'
    : '#FFFFFF';

  const glassEffect = isDarkPage && !hasBg
    ? 'backdrop-blur-[6px] bg-white/[0.03]'
    : '';

  const navBorder = isDarkPage && !hasBg
    ? 'border-b border-white/[0.06]'
    : 'border-b border-[var(--color-border)]';

  const navTextColor = isDarkPage && !hasBg ? '#ffffff' : 'var(--color-text)';

  return (
    <>
      {/* Overlay — solo cubre el contenido, NO el navbar (top-[58px]) */}
      {megaMenuOpen && (
        <div
          className="fixed inset-0 top-[58px] z-40 bg-black/15 transition-opacity duration-200"
          onClick={closeDropdown}
        />
      )}

      {/* ─── Navbar ─────────────────────────────────────── */}
      <nav
        ref={navRef}
        className={`fixed top-0 z-50 w-full transition-shadow duration-500 ${glassEffect} ${navBorder} shadow-md shadow-black/[0.04]`}
        style={{
          background: navBg,
          color: navTextColor,
        }}
        onMouseLeave={esLandingPublica ? undefined : scheduleClose}
        onMouseEnter={esLandingPublica ? undefined : cancelClose}
      >
        <div className="relative z-10 mx-auto flex h-[58px] max-w-6xl items-center gap-5 px-5">
          {esLandingPublica ? (
            <>
              {/* ─── Navbar mínimo (landing pública) ─── */}
              <div className="flex-1" />
              <Link
                href="/"
                className="flex items-center gap-2.5 transition-opacity hover:opacity-70"
                style={{ color: navTextColor }}
              >
                <Image
                  src="/images/brand/icons/tinki-navbar.svg"
                  alt="Tinki"
                  width={52}
                  height={52}
                  className="h-[52px] w-[52px] flex-shrink-0"
                  priority
                />
                <Image
                  src="/images/brand/wordmarks/wordmark-naranja.png"
                  alt="Tinkilabs"
                  width={130}
                  height={26}
                  className="h-[26px] w-auto"
                  priority
                />
              </Link>
              <div className="flex-1 flex justify-end">
                <Link
                  href="/acceso"
                  className="rounded-md p-1.5 text-tinki-dark/15 transition-all hover:text-tinki-orange/50"
                  title="Acceso privado"
                  aria-label="Acceso privado"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Hamburguesa móvil */}
              <button type="button" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
                <Hamburger open={open} />
              </button>

              {/* ─── Izquierda: navegación principal ────────── */}
              <div className="hidden lg:flex items-center gap-1">
                <Link
                  href="/suscribete"
                  onMouseEnter={() => openSection('subs')}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    dropdown === 'subs' ? 'text-tinki-orange bg-tinki-orange/10' : 'text-tinki-dark/65 hover:text-tinki-dark hover:bg-neutral-50'
                  }`}
                >
                  Suscripciones
                </Link>

                <Link
                  href="/tienda"
                  onMouseEnter={() => openSection('shop')}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    dropdown === 'shop' ? 'text-tinki-orange bg-tinki-orange/10' : 'text-tinki-dark/65 hover:text-tinki-dark hover:bg-neutral-50'
                  }`}
                >
                  Comprar más
                </Link>

                <Link
                  href="/blog"
                  onMouseEnter={() => openSection('blog')}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    dropdown === 'blog' ? 'text-tinki-orange bg-tinki-orange/10' : 'text-tinki-dark/65 hover:text-tinki-dark hover:bg-neutral-50'
                  }`}
                >
                  Blog
                </Link>

                <Link
                  href="/actividades"
                  onMouseEnter={() => openSection('actividades')}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    dropdown === 'actividades' ? 'text-tinki-orange bg-tinki-orange/10' : 'text-tinki-dark/65 hover:text-tinki-dark hover:bg-neutral-50'
                  }`}
                >
                  Actividades
                </Link>

                <Link
                  href="/nosotros"
                  onMouseEnter={() => openSection('about')}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    dropdown === 'about' ? 'text-tinki-orange bg-tinki-orange/10' : 'text-tinki-dark/65 hover:text-tinki-dark hover:bg-neutral-50'
                  }`}
                >
                  Nosotros
                </Link>
              </div>

              {/* ─── Logo ────────────────────────────────────── */}
              <div className="flex-1 lg:flex-none lg:mx-auto text-center lg:text-left">
                <Link href="/" className="flex items-center justify-center lg:justify-start gap-2 text-base font-bold tracking-tight transition-colors hover:opacity-70" style={{ color: navTextColor }}>
                  <Image
                    src="/images/brand/wordmarks/wordmark-naranja.svg"
                    alt="Tinkilabs"
                    width={130}
                    height={28}
                    className="h-7 w-auto"
                    priority
                  />
                </Link>
              </div>

              {/* ─── Derecha ─────────────────────────────────── */}
              <div className="flex items-center gap-3">
                <Link
                  href="/campamento"
                  className="hidden sm:inline-block rounded-md px-3 py-1.5 text-xs font-medium transition-all hover:bg-white/10"
                  style={{ color: navTextColor, opacity: hasBg ? 0.65 : 0.85 }}
                >
                  Verano 🏕️
                </Link>

                <Link
                  href={userName ? '/mi-cuenta' : '/login'}
                  className="rounded-md p-1.5 transition-colors hover:opacity-60"
                  style={{ color: navTextColor }}
                  title={userName || 'Acceder'}
                >
                  <UserIcon />
                </Link>

                <Link
                  href="/cart"
                  className="rounded-md p-1.5 transition-colors hover:opacity-60"
                  style={{ color: navTextColor }}
                >
                  <CartIcon count={0} />
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Mega menú full-width */}
        {!esLandingPublica && <MegaMenu seccion={dropdown} />}
      </nav>

      {/* ─── Móvil full-screen ──────────────────────────────── */}
      {!esLandingPublica && (
      <div
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto pt-[58px] transition-all duration-300 lg:hidden ${
          open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        style={{ background: 'var(--color-background)', color: 'var(--color-text)' }}
      >
        <div className="flex-1 space-y-6 px-5 py-6">
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
              <Link href="/regalo" onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-neutral-100 dark:hover:bg-white/5"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span className="text-xl">🎁</span>
                <div>
                  <p className="text-[13px] font-semibold">Certificados de Regalo</p>
                  <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>El mejor regalo para un pequeño ingeniero</p>
                </div>
              </Link>
            </div>
          </div>

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

          <div>
            <Link href="/actividades" onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-[13px] font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-white/5"
              style={{ color: 'var(--color-primary)' }}
            >
              Actividades DIY 🔧
            </Link>
            <Link href="/blog" onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-[13px] font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-white/5"
              style={{ color: 'var(--color-primary)' }}
            >
              Blog de Tinki 📝
            </Link>
          </div>

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
      )}

      {/* Overlay móvil */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
