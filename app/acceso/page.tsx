'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Lang = 'es' | 'en';

const t = {
  es: {
    title: 'Acceso privado',
    subtitle: 'Esta sección es solo para candidatos seleccionados. Usa la contraseña que te hemos enviado.',
    placeholder: 'Contraseña',
    button: 'Entrar',
    loading: 'Verificando...',
    emptyError: 'Escribe la contraseña',
    wrongPassword: 'Contraseña incorrecta',
    connectionError: 'Error de conexión. Inténtalo de nuevo.',
    welcome: '¡Hola,',
    welcomeSuffix: '!',
    redirecting: 'Accediendo al catálogo...',
    footer: 'Área restringida',
  },
  en: {
    title: 'Private Access',
    subtitle: 'This section is for selected candidates only. Use the password we sent you.',
    placeholder: 'Password',
    button: 'Enter',
    loading: 'Verifying...',
    emptyError: 'Enter your password',
    wrongPassword: 'Incorrect password',
    connectionError: 'Connection error. Please try again.',
    welcome: 'Hi,',
    welcomeSuffix: '!',
    redirecting: 'Accessing the catalog...',
    footer: 'Restricted area',
  },
};

function AccesoForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [lang, setLang] = useState<Lang>('es');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/productos';
  const tx = t[lang];

  const handleSubmit = async () => {
    if (!password.trim()) {
      setError(tx.emptyError);
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUserName(data.name);
        setTimeout(() => {
          router.push(redirect);
        }, 1200);
      } else {
        setError(data.error === 'Contraseña incorrecta' ? tx.wrongPassword : (data.error || tx.wrongPassword));
      }
    } catch {
      setError(tx.connectionError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#08080F] px-6">
      <div className="w-full max-w-sm">
        {/* Logo + toggle idioma */}
        <div className="mb-10 flex items-center justify-between">
          <span className="w-16" />
          <Link
            href="/"
            className="block text-center text-xl font-bold tracking-tight text-white hover:text-tinki-orange transition-colors"
          >
            Tinkilabs
          </Link>
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="rounded-full border border-white/10 px-2.5 py-1 text-xs font-medium text-white/50 transition-all hover:border-tinki-orange/30 hover:text-tinki-orange/70"
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
          >
            {lang === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
          </button>
        </div>

        {/* Éxito: bienvenida */}
        {userName ? (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-8 text-center">
            <div className="text-3xl">👋</div>
            <h2 className="mt-3 text-lg font-bold text-white">
              {tx.welcome} {userName}{tx.welcomeSuffix}
            </h2>
            <p className="mt-2 text-sm text-white/30">
              {tx.redirecting}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
            <h2 className="text-lg font-bold text-white">{tx.title}</h2>
            <p className="mt-2 text-sm text-white/30">{tx.subtitle}</p>

            <div className="mt-6 space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder={tx.placeholder}
                autoFocus
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-tinki-orange/50 focus:bg-white/[0.05]"
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-xl bg-tinki-orange px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-tinki-orange-light disabled:opacity-50"
              >
                {loading ? tx.loading : tx.button}
              </button>

              {error && (
                <p className="text-center text-xs text-red-400/80">{error}</p>
              )}
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-white/10">
          Tinkilabs &middot; {tx.footer}
        </p>
      </div>
    </div>
  );
}

export default function AccesoPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#08080F]">
        <p className="text-white/30">Cargando...</p>
      </div>
    }>
      <AccesoForm />
    </Suspense>
  );
}
