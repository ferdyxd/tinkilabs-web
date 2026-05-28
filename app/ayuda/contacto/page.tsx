'use client';

import { useState } from 'react';
import Link from 'next/link';

const categorias = ['Suscripción', 'Envío', 'Pago', 'Piezas/Repuestos', 'Regalo', 'Web/Técnico', 'Otro'];

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', categoria: '', mensaje: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!form.email || !form.mensaje) return;
    setStatus('loading');

    try {
      await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const update = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (status === 'error') setStatus('idle');
  };

  if (status === 'sent') {
    return (
      <div className="flex min-h-screen items-center justify-center px-6" style={{ background: 'var(--color-background)' }}>
        <div className="max-w-sm text-center">
          <div className="text-4xl">📬</div>
          <h1 className="mt-4 text-2xl font-bold" style={{ color: 'var(--color-text)' }}>¡Mensaje enviado!</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Te responderemos en menos de 24 horas. Mientras, puedes consultar nuestro{' '}
            <Link href="/ayuda" className="text-[var(--color-primary)] underline">FAQ</Link>.
          </p>
          <Link href="/" className="mt-6 inline-block rounded-xl px-6 py-3 text-sm font-semibold text-white"
            style={{ background: 'var(--color-primary)' }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <div className="mx-auto max-w-lg px-6 pb-24 pt-28">
        <Link href="/ayuda" className="text-sm" style={{ color: 'var(--color-text-muted)' }}>← Volver al FAQ</Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Contacto</h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>¿Tienes una duda que no está en el FAQ? Escríbenos.</p>

        <div className="mt-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text)' }}>Nombre</label>
              <input type="text" value={form.nombre} onChange={e => update('nombre', e.target.value)}
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]/50"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text)' }}>Email *</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]/50"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text)' }}>Categoría</label>
            <select value={form.categoria} onChange={e => update('categoria', e.target.value)}
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]/50"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text)' }}>Mensaje *</label>
            <textarea value={form.mensaje} onChange={e => update('mensaje', e.target.value)} rows={5}
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:border-[var(--color-primary)]/50 resize-none"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={status === 'loading' || !form.email || !form.mensaje}
            className="w-full rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: 'var(--color-primary)' }}
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          {status === 'error' && (
            <p className="text-center text-sm" style={{ color: 'var(--color-error)' }}>Error al enviar. Intenta de nuevo o escríbenos a hola@tinkilabs.com.</p>
          )}
        </div>
      </div>
    </div>
  );
}
