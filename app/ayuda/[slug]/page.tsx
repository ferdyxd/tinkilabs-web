import { notFound } from 'next/navigation';
import Link from 'next/link';
import { articulos } from '@/lib/articulos-data';

export function generateStaticParams() {
  return articulos.map(a => ({ slug: a.slug }));
}

export default function ArticuloPage({ params }: { params: { slug: string } }) {
  const articulo = articulos.find(a => a.slug === params.slug);
  if (!articulo) notFound();

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <div className="mx-auto max-w-2xl px-6 pb-24 pt-28">
        <Link href="/ayuda" className="text-sm" style={{ color: 'var(--color-text-muted)' }}>← Volver al FAQ</Link>

        <p className="mt-6 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
          {articulo.categoria}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
          {articulo.titulo}
        </h1>

        <div
          className="mt-8 space-y-4 text-sm leading-relaxed [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:pl-1 [&_strong]:font-semibold"
          style={{ color: 'var(--color-text-muted)' }}
          dangerouslySetInnerHTML={{ __html: articulo.contenido }}
        />

        <div className="mt-12 rounded-2xl border p-6" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>¿No has encontrado lo que buscabas?</p>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>Escríbenos y te ayudamos en menos de 24h.</p>
          <Link
            href="/ayuda/contacto"
            className="mt-3 inline-block rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
            style={{ background: 'var(--color-primary)' }}
          >
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}
