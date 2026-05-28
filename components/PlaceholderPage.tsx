import Link from 'next/link';

export function PlaceholderPage({ title, icon, description }: { title: string; icon: string; description: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6" style={{ background: 'var(--color-background)' }}>
      <div className="max-w-md text-center">
        <div className="text-5xl">{icon}</div>
        <h1 className="mt-6 text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{title}</h1>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'var(--color-primary)' }}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
