import Link from 'next/link';

interface EmptyStateProps {
  icono: string;
  titulo: string;
  descripcion: string;
  accion?: { label: string; href: string };
}

export function EmptyState({ icono, titulo, descripcion, accion }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-4xl">{icono}</span>
      <h3 className="mt-4 text-lg font-bold text-tinki-dark">{titulo}</h3>
      <p className="mt-1 max-w-sm text-sm text-tinki-dark/45">{descripcion}</p>
      {accion && (
        <Link
          href={accion.href}
          className="mt-6 inline-block rounded-xl bg-tinki-orange px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-tinki-orange-dark active:scale-[0.97]"
        >
          {accion.label}
        </Link>
      )}
    </div>
  );
}
