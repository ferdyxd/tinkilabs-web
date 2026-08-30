'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FooterLink {
  nombre: string;
  link: string;
  ext?: boolean;
}

const footerPublico: Record<string, FooterLink[]> = {
  Ayuda: [
    { nombre: 'FAQ', link: '/ayuda' },
    { nombre: 'Contacto', link: '/ayuda/contacto' },
    { nombre: 'Envíos', link: '/envios' },
    { nombre: 'Devoluciones', link: '/devoluciones' },
  ],
  Legal: [
    { nombre: 'Términos', link: '/terminos' },
    { nombre: 'Privacidad', link: '/privacidad' },
    { nombre: 'Aviso Legal', link: '/aviso-legal' },
  ],
};

const rrss = [
  {
    nombre: 'Instagram',
    link: 'https://www.instagram.com/tinkilabs',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    nombre: 'TikTok',
    link: 'https://www.tiktok.com/@tinkilabs',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    nombre: 'YouTube',
    link: 'https://www.youtube.com/@tinkilabs',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const footerProducto: Record<string, FooterLink[]> = {
  Producto: [
    { nombre: 'Suscripciones', link: '/suscribete' },
    { nombre: 'Certificados de Regalo', link: '/regalo' },
    { nombre: 'Merch y Extras', link: '/tienda' },
    { nombre: 'Repuestos', link: '/repuestos' },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.ok && r.json())
      .then((d) => d && setAutenticado(true))
      .catch(() => {});
  }, []);

  const secciones = autenticado
    ? { ...footerProducto, ...footerPublico }
    : footerPublico;

  // Landings autónomas (concepto-c): traen su propio pie de página.
  if (['/concepto-c', '/concepto-d'].includes(pathname)) return null;

  return (
    <footer className="border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {Object.entries(secciones).map(([titulo, links]) => (
            <div key={titulo}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>
                {titulo}
              </h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.nombre}>
                    {l.ext ? (
                      <a
                        href={l.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors hover:opacity-70"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {l.nombre} ↗
                      </a>
                    ) : (
                      <Link
                        href={l.link}
                        className="text-sm transition-colors hover:opacity-70"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {l.nombre}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Redes sociales */}
        <div className="mt-10 flex justify-center gap-4">
          {rrss.map((rs) => (
            <a
              key={rs.nombre}
              href={rs.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2.5 transition-all hover:opacity-60"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label={rs.nombre}
              title={rs.nombre}
            >
              {rs.icon}
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row" style={{ borderColor: 'var(--color-border)' }}>
          <Link href="/" className="transition-colors hover:opacity-70">
            <img
              src="/images/brand/wordmarks/wordmark-naranja.svg"
              alt="Tinkilabs"
              className="h-6 w-auto"
            />
          </Link>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Imagina. Construye. Alucina. &middot; Hecho con mimo en España
          </p>
        </div>
      </div>
    </footer>
  );
}
