'use client';

import Link from 'next/link';
import { Actividad, EDAD_LABELS, TIPO_LABELS, DURACION_LABELS, MANCHA_LABELS } from '@/lib/actividades-data';

interface Props {
  actividad: Actividad;
}

export function ActividadCard({ actividad }: Props) {
  return (
    <Link
      href={`/taller/${actividad.slug}`}
      className="group flex flex-col rounded-xl border border-neutral-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-tinki-orange/20 hover:shadow-md hover:shadow-tinki-orange/5 sm:p-6"
    >
      {/* Emoji + edad */}
      <div className="mb-4 flex items-start justify-between">
        <span className="card-emoji flex h-14 w-14 items-center justify-center rounded-2xl bg-tinki-light text-3xl shadow-sm">
          {actividad.imagenEmoji}
        </span>
        <span className="rounded-full bg-tinki-orange/8 px-2.5 py-1 text-[11px] font-semibold text-tinki-orange">
          {EDAD_LABELS[actividad.edad]}
        </span>
      </div>

      {/* Título */}
      <h3 className="text-base font-bold tracking-tight text-tinki-dark group-hover:text-tinki-orange transition-colors">
        {actividad.titulo}
      </h3>

      {/* Descripción corta */}
      <p className="mt-2 text-[13px] leading-relaxed text-tinki-dark/45 line-clamp-2">
        {actividad.descripcionCorta}
      </p>

      {/* Tags */}
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {/* Tipo */}
        {actividad.tipo.slice(0, 2).map((t) => (
          <span key={t} className="inline-block rounded-md bg-neutral-50 px-2 py-0.5 text-[10px] font-medium text-tinki-dark/40">
            {TIPO_LABELS[t]}
          </span>
        ))}

        {/* Duración */}
        <span className="inline-block rounded-md bg-neutral-50 px-2 py-0.5 text-[10px] font-medium text-tinki-dark/40">
          {DURACION_LABELS[actividad.duracion].split(' ')[0]}
        </span>

        {/* Mancha */}
        <span className="inline-block rounded-md bg-neutral-50 px-2 py-0.5 text-[10px] font-medium text-tinki-dark/40">
          {MANCHA_LABELS[actividad.mancha].split(' ')[0]}
        </span>
      </div>
    </Link>
  );
}
