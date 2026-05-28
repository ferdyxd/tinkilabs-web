import Link from 'next/link';

const footerLinks = {
  Producto: [
    { nombre: 'Suscripciones', link: '/suscribete' },
    { nombre: 'Certificados de Regalo', link: '/regalo' },
    { nombre: 'Merch y Extras', link: '/tienda' },
    { nombre: 'Repuestos', link: '/repuestos' },
  ],
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
  Social: [
    { nombre: 'Instagram', link: 'https://www.instagram.com/tinkilabs', ext: true },
    { nombre: 'TikTok', link: 'https://www.tiktok.com/@tinkilabs', ext: true },
    { nombre: 'YouTube', link: 'https://www.youtube.com/@tinkilabs', ext: true },
  ],
};

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {Object.entries(footerLinks).map(([titulo, links]) => (
            <div key={titulo}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>
                {titulo}
              </h4>
              <ul className="space-y-2">
                {links.map(l => (
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
                        href={'link' in l ? l.link : '/'}
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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row" style={{ borderColor: 'var(--color-border)' }}>
          <Link href="/" className="text-sm font-bold tracking-tight transition-colors hover:opacity-70" style={{ color: 'var(--color-text)' }}>
            Tinkilabs
          </Link>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Construye. Aprende. Alucina. &middot; Hecho con mimo en España
          </p>
        </div>
      </div>
    </footer>
  );
}
