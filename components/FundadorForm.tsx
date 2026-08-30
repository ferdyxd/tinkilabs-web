'use client';

import { useState, type FormEvent } from 'react';
import { track } from '@vercel/analytics';

interface FundadorFormProps {
  variant?: 'light' | 'dark' | 'sobre-naranja' | 'troquel';
  location: string;
  onSuccess?: () => void;
}

/**
 * Formulario de captación "Fundador Tinkilabs".
 *
 * Diferencias con <EmailForm>:
 *  - Casilla de consentimiento RGPD explícita (obligatoria en España
 *    para captación de emails con finalidad comercial).
 *  - Información de responsable + finalidad junto al campo, no solo en el footer.
 *  - Evento de tracking con la posición del formulario en la página,
 *    para poder comparar hero vs. cierre.
 */
export function FundadorForm({ variant = 'light', location, onSuccess }: FundadorFormProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const isDark = variant === 'dark';
  const onOrange = variant === 'sobre-naranja';
  const troquel = variant === 'troquel';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Ese email no parece válido. Revísalo.');
      return;
    }
    if (!consent) {
      setStatus('error');
      setMessage('Necesitamos tu permiso para escribirte.');
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
        setMessage(data.message || '¡Dentro! Te escribimos en cuanto abramos.');
        setEmail('');
        track('waitlist_signup', { location, source: document.referrer || 'direct' });
        onSuccess?.();
      } else {
        setStatus('error');
        setMessage(data.error || 'Algo falló. Prueba otra vez en un momento.');
      }
    } catch {
      setStatus('error');
      setMessage('Algo falló. Prueba otra vez en un momento.');
    }
  }

  if (status === 'success') {
    return (
      <div
        className={`rounded border p-6 text-center ${
          troquel ? 'rounded-[20px] border-2 border-[var(--tk-ink)] bg-[var(--tk-card)]' : onOrange ? 'border-[#24120A]/30 bg-[#24120A]/[0.07]' : isDark ? 'border-white/25 bg-white/10' : 'border-tinki-green/30 bg-tinki-green/5'
        }`}
      >
        <p className={`text-lg font-semibold ${troquel ? 'text-[var(--tk-ink)]' : onOrange ? 'text-[#24120A]' : isDark ? 'text-white' : 'text-tinki-brown'}`}>
          ¡Estás dentro!
        </p>
        <p className={`mt-2 text-sm ${troquel ? 'text-[var(--tk-ink-soft)]' : onOrange ? 'text-[#24120A]/75' : isDark ? 'text-white/75' : 'text-tinki-brown/70'}`}>
          {message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="tu@email.com"
          autoComplete="email"
          className={
            troquel
              ? 'min-w-0 flex-1 rounded-full border-2 border-[var(--tk-ink)] bg-[var(--tk-card)] px-6 py-3.5 text-[15px] text-[var(--tk-ink)] placeholder:text-[var(--tk-ink-faint)] focus:outline-none'
              : onOrange
              ? 'min-w-0 flex-1 rounded border border-[#24120A]/30 bg-[#24120A]/[0.07] px-4 py-3.5 text-[#24120A] placeholder:text-[#24120A]/45 transition-colors focus:border-[#24120A] focus:bg-[#24120A]/[0.12] focus:outline-none'
              : isDark
              ? 'min-w-0 flex-1 rounded-xl border-2 border-white/25 bg-white/10 px-5 py-4 text-white placeholder:text-white/45 backdrop-blur-sm transition-all focus:border-white focus:outline-none'
              : 'min-w-0 flex-1 rounded-xl border-2 border-tinki-brown/15 bg-white px-5 py-4 text-tinki-brown placeholder:text-tinki-brown/35 transition-all focus:border-tinki-orange focus:outline-none'
          }
          disabled={status === 'loading'}
          aria-label="Tu dirección de email"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={
            troquel
              ? 'shrink-0 rounded-full border-2 border-[var(--tk-ink)] bg-[var(--tk-orange)] px-7 py-3.5 text-[15px] font-bold text-[var(--tk-ink)] transition-colors hover:bg-[var(--tk-orange-deep)] disabled:opacity-60'
              : onOrange
              ? 'shrink-0 rounded bg-[#24120A] px-6 py-3.5 text-[15px] font-semibold text-[#FF6B35] transition-colors hover:bg-[#3A1D0C] disabled:opacity-60'
              : isDark
              ? 'shrink-0 rounded-xl bg-white px-7 py-4 font-display text-base text-tinki-orange transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-60'
              : 'shrink-0 rounded-xl bg-tinki-orange px-7 py-4 font-display text-base text-white transition-all hover:bg-tinki-orange-dark active:scale-[0.98] disabled:opacity-60'
          }
        >
          {status === 'loading' ? 'Enviando…' : 'Quiero mi plaza'}
        </button>
      </div>

      <label
        className={`mt-3.5 flex cursor-pointer items-start gap-2.5 text-left text-[12.5px] leading-snug ${
          troquel ? 'text-[var(--tk-ink-soft)]' : onOrange ? 'text-[#24120A]/70' : isDark ? 'text-white/70' : 'text-tinki-brown/60'
        }`}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (status === 'error') setStatus('idle');
          }}
          className={`mt-0.5 h-4 w-4 shrink-0 ${troquel ? 'accent-[var(--tk-orange)]' : onOrange ? 'accent-[#24120A]' : 'accent-tinki-orange'}`}
        />
        <span>
          Acepto recibir emails de Tinkilabs sobre el lanzamiento. Responsable: Tinkilabs.
          Puedes darte de baja en cualquier momento.{' '}
          <a
            href="/privacidad"
            target="_blank"
            className={troquel ? 'underline underline-offset-2 hover:text-[var(--tk-ink)]' : onOrange ? 'underline underline-offset-2 hover:text-[#24120A]' : isDark ? 'underline hover:text-white' : 'underline hover:text-tinki-orange'}
          >
            Política de privacidad
          </a>
          .
        </span>
      </label>

      {message && status === 'error' && (
        <p className={`mt-3 text-sm ${isDark ? 'text-white' : 'text-red-600'}`}>{message}</p>
      )}
    </form>
  );
}
