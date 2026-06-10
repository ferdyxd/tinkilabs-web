'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SkeletonDashboard } from '@/components/Skeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorToast, useErrorToast } from '@/components/ErrorToast';

interface DatosDashboard {
  nombre: string;
  suscripcion?: {
    linea: 'mini' | 'maker' | 'pro';
    plan: string;
    estado: string;
    proximaRenovacion: string;
    precioMesCents: number;
  } | null;
}

const LINEA_LABELS = { mini: 'Tinki Mini', maker: 'Tinki Maker', pro: 'Tinki Pro' };
const LINEA_EDAD = { mini: '3-5 años', maker: '6-9 años', pro: '10-14 años' };

export default function DashboardPage() {
  const [datos, setDatos] = useState<DatosDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const { error, showError, clearError } = useErrorToast();

  const cargarDatos = () => {
    setLoading(true);
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setDatos(d))
      .catch(() => showError('No pudimos cargar tu información. Comprueba tu conexión.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargarDatos(); }, []);

  if (loading) return <SkeletonDashboard />;

  return (
    <div className="space-y-8">
      {error && <ErrorToast message={error} onRetry={cargarDatos} onDismiss={clearError} />}

      <div>
        <h1 className="text-2xl font-black tracking-tight text-tinki-dark">Resumen</h1>
        <p className="mt-1 text-[13px] text-tinki-dark/40">Todo lo que necesitas saber de un vistazo.</p>
      </div>

      {/* Suscripción activa */}
      {datos?.suscripcion ? (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                {datos.suscripcion.estado === 'activa' ? 'Activa' : datos.suscripcion.estado}
              </span>
              <h2 className="mt-3 text-xl font-bold text-tinki-dark">
                {LINEA_LABELS[datos.suscripcion.linea]}
              </h2>
              <p className="mt-1 text-sm text-tinki-dark/45">{LINEA_EDAD[datos.suscripcion.linea]}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px] text-tinki-dark/50">
                <span>{datos.suscripcion.plan === 'mensual' ? 'Pago mensual' : `Plan ${datos.suscripcion.plan}`}</span>
                <span>·</span>
                <span className="font-semibold text-tinki-dark/70">{(datos.suscripcion.precioMesCents / 100).toFixed(2).replace('.', ',')}€/mes</span>
              </div>
              {datos.suscripcion.proximaRenovacion && (
                <p className="mt-3 flex items-center gap-2 text-[13px] text-tinki-dark/40">
                  <span>📅</span>
                  Próxima caja:{' '}
                  <span className="font-medium text-tinki-dark/60">
                    {new Date(datos.suscripcion.proximaRenovacion).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </p>
              )}
            </div>
            <span className="hidden sm:block text-5xl">📦</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-emerald-100 pt-4">
            <Link
              href="/mi-cuenta/suscripcion"
              className="rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-tinki-dark/70 shadow-sm transition-all hover:shadow-md"
            >
              Gestionar suscripción
            </Link>
          </div>
        </div>
      ) : (
        <EmptyState
          icono="📦"
          titulo="Aún no tienes suscripción"
          descripcion="Elige tu plan y empieza a recibir una caja de ingeniería cada mes. Sin permanencia. Cancela cuando quieras."
          accion={{ label: 'Ver planes', href: '/suscribete' }}
        />
      )}

      {/* Accesos rápidos */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { icono: '👦', titulo: 'Mis hijos', desc: 'Gestiona perfiles por edad', href: '/mi-cuenta/ninos' },
          { icono: '🔖', titulo: 'Guardados', desc: 'Proyectos y artículos que te gustan', href: '/mi-cuenta/guardados' },
          { icono: '🎁', titulo: 'Referidos', desc: '5€ para ti, 5€ para tu amigo', href: '/mi-cuenta/referidos' },
          { icono: '⚙️', titulo: 'Ajustes', desc: 'Datos personales y dirección', href: '/mi-cuenta/ajustes' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-start gap-4 rounded-xl border border-neutral-100 p-5 transition-all hover:border-tinki-orange/15 hover:shadow-sm"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-tinki-light text-xl">
              {item.icono}
            </span>
            <div>
              <p className="text-sm font-bold text-tinki-dark group-hover:text-tinki-orange transition-colors">{item.titulo}</p>
              <p className="mt-0.5 text-[12px] text-tinki-dark/40">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
