'use client';

import { useState, useEffect } from 'react';
import { EmptyState } from '@/components/EmptyState';
import { SkeletonCard } from '@/components/Skeleton';
import { ErrorToast, useErrorToast } from '@/components/ErrorToast';

interface Nino {
  id: number;
  nombre: string;
  fechaNacimiento: string;
}

export default function NinosPage() {
  const [ninos, setNinos] = useState<Nino[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const { error, showError, clearError } = useErrorToast();

  const cargar = () => {
    setLoading(true);
    fetch('/api/ninos')
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setNinos(d.ninos || []))
      .catch(() => showError('No pudimos cargar los perfiles.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargar(); }, []);

  const handleAdd = async () => {
    if (!nombre.trim() || !fecha) return;
    try {
      const r = await fetch('/api/ninos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), fechaNacimiento: fecha }),
      });
      if (r.ok) {
        setNombre('');
        setFecha('');
        setAdding(false);
        cargar();
      } else {
        const d = await r.json();
        showError(d.error || 'No pudimos añadir el perfil.');
      }
    } catch { showError('Error de conexión.'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este perfil?')) return;
    try {
      const r = await fetch(`/api/ninos?id=${id}`, { method: 'DELETE' });
      if (r.ok) cargar();
      else showError('No pudimos eliminar el perfil.');
    } catch { showError('Error de conexión.'); }
  };

  return (
    <div className="space-y-8">
      {error && <ErrorToast message={error} onDismiss={clearError} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-tinki-dark">Mis hijos</h1>
          <p className="mt-1 text-[13px] text-tinki-dark/40">Perfiles de tus pequeños ingenieros.</p>
        </div>
        {ninos.length > 0 && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="rounded-xl bg-tinki-orange px-4 py-2 text-[13px] font-semibold text-white transition-all hover:bg-tinki-orange-dark active:scale-[0.97]"
          >
            Añadir hijo
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <SkeletonCard /><SkeletonCard />
        </div>
      ) : ninos.length === 0 && !adding ? (
        <EmptyState
          icono="👦"
          titulo="Añade a tu primer ingeniero"
          descripcion="Guarda el nombre y la fecha de cumpleaños de tus hijos para personalizar su experiencia. Te avisaremos cuando se acerque su cumple."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {ninos.map((n) => {
            const edad = Math.floor((Date.now() - new Date(n.fechaNacimiento).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
            return (
              <div key={n.id} className="flex items-center justify-between rounded-xl border border-neutral-100 bg-white p-5 transition-all hover:border-tinki-orange/15">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-tinki-light text-xl">👦</span>
                  <div>
                    <p className="text-sm font-bold text-tinki-dark">{n.nombre}</p>
                    <p className="text-[12px] text-tinki-dark/40">
                      {new Date(n.fechaNacimiento).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })} · {edad} años
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(n.id)}
                  className="rounded-lg p-2 text-tinki-dark/20 transition-colors hover:bg-red-50 hover:text-red-400"
                  aria-label={`Eliminar a ${n.nombre}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Formulario añadir */}
      {(adding || ninos.length === 0) && (
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 p-6">
          <h3 className="text-sm font-bold text-tinki-dark">Añadir hijo</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="nombre-nino" className="block text-[12px] font-medium text-tinki-dark/50 mb-1">Nombre</label>
              <input
                id="nombre-nino"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Mateo"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-[13px] text-tinki-dark placeholder:text-tinki-dark/20 focus:border-tinki-orange focus:outline-none focus:ring-2 focus:ring-tinki-orange/10"
              />
            </div>
            <div>
              <label htmlFor="fecha-nino" className="block text-[12px] font-medium text-tinki-dark/50 mb-1">Fecha de nacimiento</label>
              <input
                id="fecha-nino"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-[13px] text-tinki-dark focus:border-tinki-orange focus:outline-none focus:ring-2 focus:ring-tinki-orange/10"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleAdd}
              disabled={!nombre.trim() || !fecha}
              className="rounded-xl bg-tinki-orange px-5 py-2 text-[13px] font-semibold text-white transition-all hover:bg-tinki-orange-dark disabled:opacity-40 active:scale-[0.97]"
            >
              Guardar
            </button>
            {ninos.length > 0 && (
              <button
                type="button"
                onClick={() => { setAdding(false); setNombre(''); setFecha(''); }}
                className="rounded-xl border border-neutral-200 bg-white px-5 py-2 text-[13px] font-semibold text-tinki-dark/50 transition-all hover:bg-neutral-50"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
