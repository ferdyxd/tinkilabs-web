'use client';

import { useState, useEffect } from 'react';
import { SkeletonDashboard } from '@/components/Skeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorToast, useErrorToast } from '@/components/ErrorToast';

const LINEA_LABELS: Record<string, string> = { mini: 'Tinki Mini', maker: 'Tinki Maker', pro: 'Tinki Pro' };
const LINEA_EDAD: Record<string, string> = { mini: '3-5 años', maker: '6-9 años', pro: '10-14 años' };

export default function SuscripcionPage() {
  const [datos, setDatos] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pausando, setPausando] = useState(false);
  const { error, showError, clearError } = useErrorToast();

  const cargar = () => {
    setLoading(true);
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setDatos(d))
      .catch(() => showError('No pudimos cargar tu suscripción.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargar(); }, []);

  if (loading) return <SkeletonDashboard />;

  const sub = datos?.suscripcion;

  if (!sub) {
    return (
      <div>
        <h1 className="text-2xl font-black tracking-tight text-tinki-dark">Mi suscripción</h1>
        <EmptyState
          icono="📦"
          titulo="No tienes suscripción activa"
          descripcion="Elige tu plan y recibe una caja de ingeniería cada mes."
          accion={{ label: 'Ver planes', href: '/suscribete' }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && <ErrorToast message={error} onRetry={cargar} onDismiss={clearError} />}

      <div>
        <h1 className="text-2xl font-black tracking-tight text-tinki-dark">Mi suscripción</h1>
        <p className="mt-1 text-[13px] text-tinki-dark/40">Gestiona tu plan, pausa o cancela cuando quieras.</p>
      </div>

      {/* Detalle */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-tinki-dark/25">Plan</dt>
            <dd className="mt-1 text-sm font-bold text-tinki-dark">{LINEA_LABELS[sub.linea]} · {LINEA_EDAD[sub.linea]}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-tinki-dark/25">Precio</dt>
            <dd className="mt-1 text-sm font-bold text-tinki-dark">{(sub.precioMesCents / 100).toFixed(2).replace('.', ',')}€/mes</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-tinki-dark/25">Frecuencia</dt>
            <dd className="mt-1 text-sm font-bold text-tinki-dark">{sub.plan === 'mensual' ? 'Mensual' : sub.plan}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-tinki-dark/25">Próximo envío</dt>
            <dd className="mt-1 text-sm font-bold text-tinki-dark">
              {sub.proximaRenovacion
                ? new Date(sub.proximaRenovacion).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
                : 'Por determinar'}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-tinki-dark/25">Estado</dt>
            <dd className="mt-1">
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                sub.estado === 'activa' ? 'bg-emerald-50 text-emerald-700' :
                sub.estado === 'pausada' ? 'bg-amber-50 text-amber-700' :
                'bg-red-50 text-red-700'
              }`}>
                {sub.estado === 'activa' ? 'Activa' : sub.estado === 'pausada' ? 'Pausada' : sub.estado}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Acciones */}
      <div className="flex flex-wrap gap-3">
        {sub.estado === 'activa' && (
          <button
            type="button"
            disabled={pausando}
            onClick={async () => {
              setPausando(true);
              try {
                const r = await fetch('/api/suscripcion/pausar', { method: 'POST' });
                if (r.ok) cargar();
                else showError('No pudimos pausar la suscripción.');
              } catch { showError('Error de conexión.'); }
              setPausando(false);
            }}
            className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-2.5 text-[13px] font-semibold text-amber-700 transition-all hover:bg-amber-100 disabled:opacity-50"
          >
            {pausando ? 'Pausando...' : 'Pausar envíos'}
          </button>
        )}
        {sub.estado === 'pausada' && (
          <button
            type="button"
            onClick={async () => {
              try {
                const r = await fetch('/api/suscripcion/reanudar', { method: 'POST' });
                if (r.ok) cargar();
                else showError('No pudimos reanudar la suscripción.');
              } catch { showError('Error de conexión.'); }
            }}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-emerald-700"
          >
            Reanudar envíos
          </button>
        )}
        <button
          type="button"
          onClick={async () => {
            if (!confirm('¿Seguro que quieres cancelar tu suscripción? Dejarás de recibir cajas.')) return;
            try {
              const r = await fetch('/api/suscripcion/cancelar', { method: 'POST' });
              if (r.ok) cargar();
              else showError('No pudimos cancelar. Escríbenos a hola@tinkilabs.com.');
            } catch { showError('Error de conexión.'); }
          }}
          className="rounded-xl border border-red-100 bg-white px-5 py-2.5 text-[13px] font-semibold text-red-500 transition-all hover:bg-red-50"
        >
          Cancelar suscripción
        </button>
      </div>
    </div>
  );
}
