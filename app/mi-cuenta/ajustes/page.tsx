'use client';

import { useState, useEffect } from 'react';
import { SkeletonDashboard } from '@/components/Skeleton';
import { ErrorToast, useErrorToast } from '@/components/ErrorToast';

export default function AjustesPage() {
  const [datos, setDatos] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [cp, setCp] = useState('');
  const { error, showError, clearError } = useErrorToast();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setDatos(d);
          setNombre(d.nombre || '');
          setDireccion(d.direccion || '');
          setCiudad(d.ciudad || '');
          setCp(d.cp || '');
        }
      })
      .catch(() => showError('No pudimos cargar tus datos.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const r = await fetch('/api/auth/ajustes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, direccion, ciudad, cp }),
      });
      if (r.ok) {
        showError(''); // hack: muestra toast success
      } else {
        showError('No pudimos guardar los cambios.');
      }
    } catch { showError('Error de conexión.'); }
    setSaving(false);
  };

  if (loading) return <SkeletonDashboard />;

  return (
    <div className="space-y-8">
      {error && <ErrorToast message={error || 'Cambios guardados'} onDismiss={clearError} />}

      <div>
        <h1 className="text-2xl font-black tracking-tight text-tinki-dark">Ajustes</h1>
        <p className="mt-1 text-[13px] text-tinki-dark/40">Tus datos personales y dirección de envío.</p>
      </div>

      {/* Datos cuenta */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8">
        <h2 className="text-sm font-bold text-tinki-dark">Datos de la cuenta</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="aj-nombre" className="block text-[12px] font-medium text-tinki-dark/50 mb-1">Nombre</label>
            <input id="aj-nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-[13px] text-tinki-dark focus:border-tinki-orange focus:outline-none focus:ring-2 focus:ring-tinki-orange/10" />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-tinki-dark/50 mb-1">Email</label>
            <input type="email" value={datos?.email || ''} disabled
              className="w-full rounded-lg border border-neutral-100 bg-neutral-50 px-3 py-2 text-[13px] text-tinki-dark/40 cursor-not-allowed" />
          </div>
        </div>
      </div>

      {/* Dirección */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8">
        <h2 className="text-sm font-bold text-tinki-dark">Dirección de envío</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="aj-dir" className="block text-[12px] font-medium text-tinki-dark/50 mb-1">Dirección</label>
            <input id="aj-dir" type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)}
              placeholder="Calle, número, piso"
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-[13px] text-tinki-dark placeholder:text-tinki-dark/20 focus:border-tinki-orange focus:outline-none focus:ring-2 focus:ring-tinki-orange/10" />
          </div>
          <div>
            <label htmlFor="aj-ciudad" className="block text-[12px] font-medium text-tinki-dark/50 mb-1">Ciudad</label>
            <input id="aj-ciudad" type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-[13px] text-tinki-dark focus:border-tinki-orange focus:outline-none focus:ring-2 focus:ring-tinki-orange/10" />
          </div>
          <div>
            <label htmlFor="aj-cp" className="block text-[12px] font-medium text-tinki-dark/50 mb-1">Código postal</label>
            <input id="aj-cp" type="text" value={cp} onChange={(e) => setCp(e.target.value)} maxLength={5}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-[13px] text-tinki-dark focus:border-tinki-orange focus:outline-none focus:ring-2 focus:ring-tinki-orange/10" />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="rounded-xl bg-tinki-orange px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-tinki-orange-dark disabled:opacity-50 active:scale-[0.97]"
      >
        {saving ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </div>
  );
}
