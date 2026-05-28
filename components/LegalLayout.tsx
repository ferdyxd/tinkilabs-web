export function LegalLayout({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <div className="mx-auto max-w-2xl px-6 pb-24 pt-28">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
          {title}
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Última actualización: {updated}
        </p>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
