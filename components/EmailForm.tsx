'use client';

import { useState } from 'react';

interface EmailFormProps {
  variant?: 'light' | 'dark';
}

export function EmailForm({ variant = 'light' }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const isDark = variant === 'dark';

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Oye, ese email no parece válido. Revísalo.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Bienvenido a bordo! Te avisaremos en cuanto lancemos.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Ups, algo falló. Prueba de nuevo en un momento.');
      }
    } catch {
      setStatus('error');
      setMessage('Ups, algo falló. Prueba de nuevo en un momento.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="tu@email.com"
          className={
            isDark
              ? 'flex-1 rounded-xl border-2 border-white/20 bg-white/10 px-5 py-4 text-white placeholder:text-white/50 backdrop-blur-sm transition-all focus:border-tinki-orange focus:outline-none focus:ring-2 focus:ring-tinki-orange/30'
              : 'flex-1 rounded-xl border-2 border-tinki-orange/15 bg-white px-5 py-4 text-tinki-dark placeholder:text-tinki-dark/30 shadow-sm transition-all focus:border-tinki-orange focus:outline-none focus:ring-2 focus:ring-tinki-orange/30'
          }
          disabled={status === 'loading' || status === 'success'}
          aria-label="Tu dirección de email"
        />
        <button
          onClick={handleSubmit}
          disabled={status === 'loading' || status === 'success'}
          className="rounded-xl bg-tinki-orange px-8 py-4 font-bold text-white transition-all hover:bg-tinki-orange-dark active:scale-95 disabled:opacity-70"
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Enviando...
            </span>
          ) : status === 'success' ? (
            'Apuntado!'
          ) : (
            'Me apunto'
          )}
        </button>
      </div>
      {message && (
        <p
          className={`mt-3 text-center text-sm ${
            status === 'success'
              ? isDark ? 'text-green-300' : 'text-green-600'
              : isDark ? 'text-red-300' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
