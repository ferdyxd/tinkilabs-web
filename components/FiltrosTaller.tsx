'use client';

import {
  Edad,
  TipoActividad,
  NivelMancha,
  Duracion,
  Material,
  Mecanismo,
  EDAD_LABELS,
  TIPO_LABELS,
  MANCHA_LABELS,
  DURACION_LABELS,
  MATERIAL_LABELS,
  MECANISMO_LABELS,
} from '@/lib/actividades-data';

export interface FiltrosState {
  edad: Edad | null;
  tipo: TipoActividad[];
  mancha: NivelMancha | null;
  duracion: Duracion | null;
  material: Material[];
  mecanismo: Mecanismo[];
  search: string;
}

interface Props {
  filtros: FiltrosState;
  onChange: (filtros: FiltrosState) => void;
  total: number;
  totalFiltradas: number;
}

function TogglePill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${
        active
          ? 'bg-tinki-dark text-white shadow-sm'
          : 'bg-neutral-50 text-tinki-dark/50 hover:bg-neutral-100 hover:text-tinki-dark/65'
      }`}
    >
      {label}
    </button>
  );
}

function ToggleChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
        active
          ? 'bg-tinki-orange/10 text-tinki-orange border border-tinki-orange/20'
          : 'border border-neutral-100 text-tinki-dark/40 hover:border-neutral-200 hover:text-tinki-dark/55'
      }`}
    >
      {label}
    </button>
  );
}

export function FiltrosTaller({ filtros, onChange, total, totalFiltradas }: Props) {
  const toggleArray = <T extends string>(
    arr: T[],
    val: T,
  ): T[] => (arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  return (
    <aside className="filtros-sticky space-y-6 rounded-xl border border-neutral-100 bg-white/80 backdrop-blur-sm p-5">
      {/* Buscador */}
      <div>
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-tinki-dark/25">
          Buscar
        </label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tinki-dark/20"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={filtros.search}
            onChange={(e) => onChange({ ...filtros, search: e.target.value })}
            placeholder="engranajes, volcán..."
            className="w-full rounded-lg border border-neutral-200 py-2 pl-9 pr-3 text-[13px] text-tinki-dark placeholder:text-tinki-dark/20 focus:border-tinki-orange focus:outline-none focus:ring-2 focus:ring-tinki-orange/10"
          />
        </div>
      </div>

      {/* Edad */}
      <div>
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-tinki-dark/25">
          Edad
        </label>
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(EDAD_LABELS) as [Edad, string][]).map(([k, label]) => (
            <TogglePill
              key={k}
              active={filtros.edad === k}
              onClick={() => onChange({ ...filtros, edad: filtros.edad === k ? null : k })}
              label={label}
            />
          ))}
        </div>
      </div>

      {/* Tipo */}
      <div>
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-tinki-dark/25">
          Tipo de actividad
        </label>
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(TIPO_LABELS) as [TipoActividad, string][]).map(([k, label]) => (
            <ToggleChip
              key={k}
              active={filtros.tipo.includes(k)}
              onClick={() => onChange({ ...filtros, tipo: toggleArray(filtros.tipo, k) })}
              label={label}
            />
          ))}
        </div>
      </div>

      {/* Nivel de mancha */}
      <div>
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-tinki-dark/25">
          Nivel de mancha
        </label>
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(MANCHA_LABELS) as [NivelMancha, string][]).map(([k, label]) => (
            <ToggleChip
              key={k}
              active={filtros.mancha === k}
              onClick={() => onChange({ ...filtros, mancha: filtros.mancha === k ? null : k })}
              label={label}
            />
          ))}
        </div>
      </div>

      {/* Duración */}
      <div>
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-tinki-dark/25">
          Duración
        </label>
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(DURACION_LABELS) as [Duracion, string][]).map(([k, label]) => (
            <ToggleChip
              key={k}
              active={filtros.duracion === k}
              onClick={() => onChange({ ...filtros, duracion: filtros.duracion === k ? null : k })}
              label={label}
            />
          ))}
        </div>
      </div>

      {/* Material */}
      <div>
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-tinki-dark/25">
          Material principal
        </label>
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(MATERIAL_LABELS) as [Material, string][]).map(([k, label]) => (
            <ToggleChip
              key={k}
              active={filtros.material.includes(k)}
              onClick={() => onChange({ ...filtros, material: toggleArray(filtros.material, k) })}
              label={label}
            />
          ))}
        </div>
      </div>

      {/* Mecanismo */}
      <div>
        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-tinki-dark/25">
          Mecanismo
        </label>
        <div className="flex flex-wrap gap-1.5">
          {(Object.entries(MECANISMO_LABELS) as [Mecanismo, string][]).map(([k, label]) => (
            <ToggleChip
              key={k}
              active={filtros.mecanismo.includes(k)}
              onClick={() => onChange({ ...filtros, mecanismo: toggleArray(filtros.mecanismo, k) })}
              label={label}
            />
          ))}
        </div>
      </div>

      {/* Contador */}
      <p className="text-[11px] text-tinki-dark/25">
        {totalFiltradas === total
          ? `${total} actividades`
          : `${totalFiltradas} de ${total} actividades`}
      </p>
    </aside>
  );
}
