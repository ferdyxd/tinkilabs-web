import { notFound } from 'next/navigation';
import Link from 'next/link';
import { productosDetalle } from '@/lib/productos-data';

export function generateStaticParams() {
  return productosDetalle.map(p => ({ slug: p.slug }));
}

export default function ProductoPage({ params }: { params: { slug: string } }) {
  const p = productosDetalle.find(prod => prod.slug === params.slug);
  if (!p) notFound();

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-28">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <Link href="/productos" className="hover:underline">Catálogo</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-text)' }}>{p.nombre}</span>
        </div>

        {/* Hero */}
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          {/* Imagen */}
          <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--color-border)' }}>
            <img src={p.imagen} alt={p.nombre} className="h-full w-full object-cover aspect-square" />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
                {p.linea}
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{p.edad}</span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Mes {p.mes}</span>
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>{p.nombre}</h1>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{p.descripcion}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/suscribete"
                className="rounded-xl px-8 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'var(--color-primary)' }}
              >
                Suscríbete
              </Link>
              <a
                href={p.referenciaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border px-8 py-3.5 text-sm font-semibold transition-all hover:bg-neutral-50 dark:hover:bg-white/5"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                {p.referenciaLabel} →
              </a>
            </div>
          </div>
        </div>

        {/* Detalles */}
        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {/* Qué incluye */}
          <div className="rounded-2xl border p-6" style={{ borderColor: 'var(--color-border)' }}>
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Qué incluye</h3>
            <ul className="mt-4 space-y-2">
              {p.incluye.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="mt-0.5 text-[var(--color-primary)]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Detalles */}
          <div className="rounded-2xl border p-6" style={{ borderColor: 'var(--color-border)' }}>
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Detalles</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="font-medium" style={{ color: 'var(--color-text)' }}>Mecanismo</p>
                <p style={{ color: 'var(--color-text-muted)' }}>{p.mecanismo}</p>
              </div>
              <div>
                <p className="font-medium" style={{ color: 'var(--color-text)' }}>Tiempo de montaje</p>
                <p style={{ color: 'var(--color-text-muted)' }}>{p.tiempoMontaje}</p>
              </div>
              <div>
                <p className="font-medium" style={{ color: 'var(--color-text)' }}>Edad recomendada</p>
                <p style={{ color: 'var(--color-text-muted)' }}>{p.edad}</p>
              </div>
            </div>
          </div>

          {/* Conceptos */}
          <div className="rounded-2xl border p-6" style={{ borderColor: 'var(--color-border)' }}>
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Conceptos que aprende</h3>
            <ul className="mt-4 space-y-2">
              {p.conceptos.map(c => (
                <li key={c} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="mt-0.5 text-[var(--color-primary)]">▸</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vídeo */}
        {p.videoUrl && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Mira cómo funciona</h2>
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--color-border)' }}>
              <iframe
                src={p.videoUrl.replace('watch?v=', 'embed/')}
                title={p.nombre}
                className="aspect-video w-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* CTA final */}
        <div className="mt-16 rounded-2xl p-10 text-center" style={{ background: 'var(--color-background-alt)' }}>
          <h2 className="text-2xl font-bold text-white">¿Listo para construir?</h2>
          <p className="mt-3 text-sm text-white/50">Suscríbete hoy y recibe tu primera caja el próximo mes.</p>
          <Link
            href="/suscribete"
            className="mt-6 inline-block rounded-xl px-10 py-4 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--color-primary)' }}
          >
            Me apunto
          </Link>
        </div>
      </div>
    </div>
  );
}
