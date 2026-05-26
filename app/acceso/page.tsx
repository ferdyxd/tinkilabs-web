'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function AccesoForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/productos';

  const handleSubmit = async () => {
    if (!password.trim()) {
      setError('Escribe la contraseña');
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
        // Pequeña pausa para que vea el mensaje de bienvenida
        setTimeout(() => {
          router.push(redirect);
        }, 1200);
      } else {
        setError(data.error || 'Contraseña incorrecta');
      }
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#08080F] px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link
          href="/"
          className="mb-10 block text-center text-xl font-bold tracking-tight text-white hover:text-tinki-orange transition-colors"
        >
          Tinkilabs
        </Link>

        {/* Éxito: bienvenida */}
        {userName ? (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-8 text-center">
            <div className="text-3xl">👋</div>
            <h2 className="mt-3 text-lg font-bold text-white">
              ¡Hola, {userName}!
            </h2>
            <p className="mt-2 text-sm text-white/30">
              Accediendo al catálogo...
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
            <h2 className="text-lg font-bold text-white">Acceso privado</h2>
            <p className="mt-2 text-sm text-white/30">
              Esta sección es solo para candidatos seleccionados. Usa la contraseña que te hemos enviado.
            </p>

            <div className="mt-6 space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Contraseña"
                autoFocus
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-tinki-orange/50 focus:bg-white/[0.05]"
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-xl bg-tinki-orange px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-tinki-orange-light disabled:opacity-50"
              >
                {loading ? 'Verificando...' : 'Entrar'}
              </button>

              {error && (
                <p className="text-center text-xs text-red-400/80">{error}</p>
              )}
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-white/10">
          Tinkilabs &middot; Área restringida
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
