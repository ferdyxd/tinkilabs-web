'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function LoginForm() {
  const [modo, setModo] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [password, setPassword] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/mi-cuenta';

  const handleSubmit = async () => {
    setError('');
    setFieldErrors({});

    const errors: Record<string, string> = {};
    if (modo === 'register') {
      if (!nombre.trim()) errors.nombre = 'El nombre es obligatorio.';
      if (!apellido.trim()) errors.apellido = 'El apellido es obligatorio.';
    }
    if (!email.trim()) errors.email = 'El email es obligatorio.';
    if (!password) errors.password = 'La contraseña es obligatoria.';
    else if (password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres.';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const endpoint = modo === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = modo === 'login'
        ? { email, password }
        : { email, nombre, apellido, password, newsletter };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(redirect);
      } else {
        setError(data.error || 'Algo salió mal. Inténtalo de nuevo.');
      }
    } catch {
      setError('Error de conexión. Comprueba tu internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-tinki-light px-6">
      {/* Fondo decorativo sutil */}
      <div className="pointer-events-none absolute inset-0 pattern-dots-orange" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinki-orange/5 blur-[120px]" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-tinki-dark hover:text-tinki-orange transition-colors">
            <span className="text-2xl">🦫</span>
            Tinkilabs
          </Link>
        </div>

        {/* Tarjeta */}
        <div className="rounded-2xl border border-white/60 bg-white p-8 shadow-lg shadow-tinki-orange/5">
          {/* Tabs login/register */}
          <div className="mb-8 flex rounded-lg bg-neutral-50 p-1">
            <button
              type="button"
              onClick={() => { setModo('login'); setError(''); }}
              className={`flex-1 rounded-md py-2 text-[13px] font-semibold transition-all duration-200 ${
                modo === 'login' ? 'bg-white text-tinki-dark shadow-sm' : 'text-tinki-dark/35 hover:text-tinki-dark/55'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => { setModo('register'); setError(''); }}
              className={`flex-1 rounded-md py-2 text-[13px] font-semibold transition-all duration-200 ${
                modo === 'register' ? 'bg-white text-tinki-dark shadow-sm' : 'text-tinki-dark/35 hover:text-tinki-dark/55'
              }`}
            >
              Crear cuenta
            </button>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-tinki-dark">
              {modo === 'login' ? 'Bienvenido de vuelta' : 'Únete a Tinkilabs'}
            </h2>
            {modo === 'register' && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTooltip(!showTooltip)}
                  onBlur={() => setTimeout(() => setShowTooltip(false), 200)}
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-tinki-dark/15 text-[11px] font-semibold text-tinki-dark/30 transition-all hover:border-tinki-orange/40 hover:text-tinki-orange"
                  aria-label="¿Por qué crear una cuenta?"
                >
                  ?
                </button>
                {showTooltip && (
                  <div className="absolute left-0 top-7 z-10 w-56 rounded-xl border border-neutral-100 bg-white p-4 shadow-lg shadow-black/[0.04] animate-in fade-in slide-in-from-top-2">
                    <p className="text-[12px] font-semibold text-tinki-dark">¿Por qué crear una cuenta?</p>
                    <ul className="mt-2 space-y-1.5">
                      {[
                        'Compra más rápido',
                        'Guarda varias direcciones de envío',
                        'Consulta y sigue tus pedidos',
                        'Y mucho más',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[12px] text-tinki-dark/50">
                          <span className="mt-0.5 text-[10px] text-tinki-orange">●</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-tinki-dark/40">
            {modo === 'login'
              ? 'Entra para gestionar tu cuenta y tus cajas.'
              : 'Crea tu cuenta y empieza a construir.'}
          </p>

          <div className="mt-6 space-y-3.5">
            {modo === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => { setNombre(e.target.value); setFieldErrors({}); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      placeholder="Nombre"
                      autoFocus
                      className={`w-full rounded-xl border px-4 py-3 text-[14px] text-tinki-dark placeholder:text-tinki-dark/20 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-tinki-orange/10 ${
                        fieldErrors.nombre ? 'border-red-300 bg-red-50/30 focus:border-red-400' : 'border-neutral-200 bg-neutral-50/50 focus:border-tinki-orange/50'
                      }`}
                    />
                    {fieldErrors.nombre && <p className="mt-1 text-[11px] text-red-500">{fieldErrors.nombre}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={apellido}
                      onChange={(e) => { setApellido(e.target.value); setFieldErrors({}); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      placeholder="Apellido"
                      className={`w-full rounded-xl border px-4 py-3 text-[14px] text-tinki-dark placeholder:text-tinki-dark/20 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-tinki-orange/10 ${
                        fieldErrors.apellido ? 'border-red-300 bg-red-50/30 focus:border-red-400' : 'border-neutral-200 bg-neutral-50/50 focus:border-tinki-orange/50'
                      }`}
                    />
                    {fieldErrors.apellido && <p className="mt-1 text-[11px] text-red-500">{fieldErrors.apellido}</p>}
                  </div>
                </div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-tinki-orange focus:ring-tinki-orange/20"
                  />
                  <span className="text-[12px] leading-relaxed text-tinki-dark/45 group-hover:text-tinki-dark/60 transition-colors">
                    Enviarme emails con promos exclusivas, ideas DIY y actividades adaptadas a la edad de mis hijos.
                  </span>
                </label>
              </>
            )}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors({}); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Email"
                autoFocus={modo === 'login'}
                className={`w-full rounded-xl border px-4 py-3 text-[14px] text-tinki-dark placeholder:text-tinki-dark/20 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-tinki-orange/10 ${
                  fieldErrors.email ? 'border-red-300 bg-red-50/30 focus:border-red-400' : 'border-neutral-200 bg-neutral-50/50 focus:border-tinki-orange/50'
                }`}
              />
              {fieldErrors.email && <p className="mt-1 text-[11px] text-red-500">{fieldErrors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFieldErrors({}); }}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Contraseña"
                className={`w-full rounded-xl border px-4 py-3 text-[14px] text-tinki-dark placeholder:text-tinki-dark/20 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-tinki-orange/10 ${
                  fieldErrors.password ? 'border-red-300 bg-red-50/30 focus:border-red-400' : 'border-neutral-200 bg-neutral-50/50 focus:border-tinki-orange/50'
                }`}
              />
              {fieldErrors.password && <p className="mt-1 text-[11px] text-red-500">{fieldErrors.password}</p>}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="mt-1 w-full rounded-xl bg-tinki-orange px-4 py-3 text-sm font-semibold text-white shadow-md shadow-tinki-orange/20 transition-all hover:bg-tinki-orange-dark hover:shadow-lg hover:shadow-tinki-orange/25 disabled:opacity-50 active:scale-[0.97]"
            >
              {loading ? 'Un momento...' : modo === 'login' ? 'Entrar' : 'Crear cuenta'}
            </button>

            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-2.5 text-center text-[13px] text-red-500">{error}</p>
            )}

            {modo === 'register' && (
              <p className="text-center text-[11px] leading-relaxed text-tinki-dark/25">
                Al crear una cuenta, aceptas nuestros{' '}
                <Link href="/terminos" className="underline hover:text-tinki-dark/45 transition-colors">Términos</Link>
                {' '}y{' '}
                <Link href="/privacidad" className="underline hover:text-tinki-dark/45 transition-colors">Política de privacidad</Link>.
              </p>
            )}
          </div>
        </div>

        {/* Link al acceso del catálogo */}
        <p className="mt-8 text-center text-[12px] text-tinki-dark/20">
          ¿Buscas el acceso al catálogo?{' '}
          <Link href="/acceso" className="text-tinki-dark/35 hover:text-tinki-orange transition-colors underline">
            Entra aquí
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-tinki-light">
        <p className="text-sm text-tinki-dark/20">Cargando...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
