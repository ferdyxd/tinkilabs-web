'use client';

import { useState } from 'react';

// ─── Datos de planes ────────────────────────────────────────

interface PlanInfo {
  slug: string;
  nombre: string;
  meses: number;
  precioMes: number;
  precioTotal: number;
  ahorro: number; // euros ahorrados vs mensual
  popular?: boolean;
  badge?: string;
}

const PRECIO_BASE_MES = 24.90;

const PLANES: PlanInfo[] = [
  {
    slug: 'mensual',
    nombre: 'Mensual',
    meses: 1,
    precioMes: 24.90,
    precioTotal: 24.90,
    ahorro: 0,
  },
  {
    slug: 'trimestral',
    nombre: 'Trimestral',
    meses: 3,
    precioMes: 22.90,
    precioTotal: 68.70,
    ahorro: 6.00,
    popular: true,
    badge: 'El más elegido',
  },
  {
    slug: 'anual',
    nombre: 'Anual',
    meses: 12,
    precioMes: 19.90,
    precioTotal: 238.80,
    ahorro: 60.00,
    badge: 'Mejor precio',
  },
];

const LINEAS = [
  {
    slug: 'mini',
    nombre: 'Tinki Mini',
    edad: '3-5 años',
    emoji: '🧸',
    color: 'from-amber-400 to-yellow-500',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-700',
    tag: 'tag-amber',
    descripcion: 'Proyectos grandes para manos pequeñas. Piezas extra grandes, montaje sin herramientas, colores vivos. Todo pensado para que construyan solos sin frustrarse.',
    incluye: [
      'Piezas de madera extra grandes (fáciles de agarrar)',
      'Montaje sin pegamento ni herramientas',
      'Manual con dibujos (sin texto, paso a paso visual)',
      '1 caja nueva cada mes, envío gratis',
    ],
    precioDesde: '19.90',
  },
  {
    slug: 'maker',
    nombre: 'Tinki Maker',
    edad: '6-9 años',
    emoji: '🔧',
    color: 'from-orange-500 to-tinki-orange',
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-700',
    tag: 'tag-orange',
    descripcion: 'Mecanismos de verdad que se montan, funcionan y molan. Engranajes, muelles, palancas. Cada caja es una máquina nueva que sorprende y engancha.',
    incluye: [
      'Proyectos mecánicos: lanzadores, robots, vehículos',
      'Piezas de madera cortadas con láser de precisión',
      'Manual ilustrado paso a paso (autonomía total)',
      '1 caja nueva cada mes, envío gratis',
    ],
    precioDesde: '22.90',
  },
  {
    slug: 'pro',
    nombre: 'Tinki Pro',
    edad: '10-14 años',
    emoji: '🚀',
    color: 'from-red-500 to-pink-500',
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
    tag: 'tag-red',
    descripcion: 'Proyectos de ingeniería de verdad. Electrónica básica, circuitos, motores, programación con Arduino. Para los que ya quieren ir más allá del "mola" al "¿cómo funciona?".',
    incluye: [
      'Electrónica: motores, LEDs, sensores, Arduino',
      'Proyectos que se conectan al ordenador',
      'Manual técnico con conceptos de física e ingeniería',
      '1 caja nueva cada mes, envío gratis',
    ],
    precioDesde: '24.90',
  },
];

// ─── Componente principal ───────────────────────────────────

type Step = 1 | 2 | 3 | 4;

interface FormData {
  nombreNino: string;
  linea: typeof LINEAS[0];
  plan: PlanInfo;
  email: string;
  direccion: string;
  ciudad: string;
  cp: string;
  telefono: string;
}

export function PurchaseWizard() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormData>({
    nombreNino: '',
    linea: LINEAS[1],
    plan: PLANES[1],
    email: '',
    direccion: '',
    ciudad: '',
    cp: '',
    telefono: '',
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [dir, setDir] = useState<'fwd' | 'back'>('fwd');
  const [animKey, setAnimKey] = useState(0);

  const goNext = (next: Step) => { setDir('fwd'); setAnimKey(k => k + 1); setStep(next); };
  const goBack = (prev: Step) => { setDir('back'); setAnimKey(k => k + 1); setStep(prev); };

  const update = (partial: Partial<FormData>) => setData((d) => ({ ...d, ...partial }));

  const progresso = ((step - 1) / 4) * 100;

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreNino: data.nombreNino,
          linea: data.linea.slug,
          plan: data.plan.slug,
          email: data.email,
          direccion: data.direccion,
          ciudad: data.ciudad,
          cp: data.cp,
          telefono: data.telefono,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error');
      setDone(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Confirmación final ─────────────────────────────────

  if (done) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-7xl mb-6">🚀</div>
        <h2 className="text-3xl font-black text-tinki-dark mb-3">
          ¡{data.nombreNino}, bienvenido a Tinkilabs!
        </h2>
        <p className="text-lg text-tinki-dark/50 mb-2">
          Tu primera caja <strong>{data.linea.nombre}</strong> sale el día <strong>5 del mes que viene</strong>.
        </p>
        <p className="text-tinki-dark/30 mb-8">
          Te hemos enviado un email con todos los detalles.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-4 bg-tinki-orange text-white font-black text-lg rounded-xl hover:opacity-90 transition-opacity"
        >
          Seguir explorando
        </a>
      </div>
    );
  }

  // ─── Wizard ─────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Columna izquierda: wizard */}
        <div className="flex-1 min-w-0">
          {/* Barra de progreso */}
          <div className="mb-10">
            <div className="flex justify-between text-xs text-tinki-dark/30 font-bold mb-2">
              <span className={step >= 1 ? 'text-tinki-orange' : ''}>¿Quién?</span>
              <span className={step >= 2 ? 'text-tinki-orange' : ''}>Plan</span>
              <span className={step >= 3 ? 'text-tinki-orange' : ''}>Envío</span>
              <span className={step >= 4 ? 'text-tinki-orange' : ''}>Pago</span>
            </div>
            <div className="h-2 bg-tinki-dark/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-tinki-orange rounded-full transition-all duration-500"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>

          {/* Pasos animados */}
          <div key={animKey} className={dir === 'fwd' ? 'animate-slide-in-right' : 'animate-slide-in-left'}>
            {step === 1 && (
              <Step1
                nombreNino={data.nombreNino}
                linea={data.linea}
                onNombre={(n) => update({ nombreNino: n })}
                onLinea={(l) => update({ linea: l })}
                onNext={() => goNext(2)}
              />
            )}

            {step === 2 && (
              <Step2
                plan={data.plan}
                onPlan={(p) => update({ plan: p })}
                onBack={() => goBack(1)}
                onNext={() => goNext(3)}
              />
            )}

            {step === 3 && (
              <Step3
                email={data.email}
                direccion={data.direccion}
                ciudad={data.ciudad}
                cp={data.cp}
                telefono={data.telefono}
                onChange={(f) => update(f)}
                onBack={() => goBack(2)}
                onNext={() => goNext(4)}
              />
            )}

            {step === 4 && (
              <Step4
                data={data}
                loading={loading}
                error={error}
                onBack={() => goBack(3)}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PASO 1 — ¿Para quién es?
// ═══════════════════════════════════════════════════════════════

function Step1({
  nombreNino,
  linea,
  onNombre,
  onLinea,
  onNext,
}: {
  nombreNino: string;
  linea: typeof LINEAS[0];
  onNombre: (n: string) => void;
  onLinea: (l: typeof LINEAS[0]) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black text-tinki-dark mb-2">¿Para quién es?</h2>
        <p className="text-tinki-dark/40">Cuéntanos un poco sobre el constructor.</p>
      </div>

      {/* Nombre */}
      <div>
        <label className="block text-sm font-bold text-tinki-dark/50 mb-2">
          Nombre del peque
        </label>
        <input
          type="text"
          value={nombreNino}
          onChange={(e) => onNombre(e.target.value)}
          placeholder="Lucas"
          className="w-full rounded-2xl border-2 border-tinki-dark/5 px-5 py-4 text-xl font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow bg-white"
        />
      </div>

      {/* Edad + panel lateral */}
      <div>
        <label className="block text-sm font-bold text-tinki-dark/50 mb-3">
          ¿Cuántos años tiene?
        </label>

        {/* Layout: opciones izquierda + panel derecha */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Opciones de edad — columna izquierda */}
          <div className="lg:w-[45%] flex flex-col gap-3">
            {LINEAS.map((l) => {
              const sel = linea.slug === l.slug;
              return (
                <button
                  key={l.slug}
                  type="button"
                  onClick={() => onLinea(l)}
                  className={`relative rounded-2xl border-2 p-4 text-left transition-all flex items-center gap-4 ${
                    sel
                      ? 'border-tinki-orange ring-2 ring-tinki-orange ring-offset-2 bg-orange-50'
                      : 'border-tinki-dark/5 bg-white hover:border-tinki-dark/15'
                  }`}
                >
                  <span className="text-3xl flex-shrink-0">{l.emoji}</span>
                  <div>
                    <span className="block text-base font-black text-tinki-dark">{l.nombre}</span>
                    <span className="block text-xs text-tinki-dark/40">{l.edad}</span>
                  </div>
                  {sel && (
                    <span className="ml-auto w-3 h-3 rounded-full bg-tinki-orange flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panel lateral — info de la línea seleccionada */}
          <div
            className={`lg:w-[55%] rounded-2xl p-5 border-2 transition-all duration-300 ${
              linea.bg
            } ${linea.border}`}
          >
            {/* Cabecera */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{linea.emoji}</span>
                <span className="font-black text-tinki-dark text-lg">{linea.nombre}</span>
              </div>
              <span className="text-xs font-bold text-tinki-dark/30">{linea.edad}</span>
            </div>

            {/* Descripción */}
            <p className={`text-sm mb-4 leading-relaxed ${linea.text}`}>
              {linea.descripcion}
            </p>

            {/* Qué incluye */}
            <ul className="space-y-2 mb-4">
              {linea.incluye.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-tinki-dark/60">{item}</span>
                </li>
              ))}
            </ul>

            {/* Precio desde — oculto, se muestra en paso 2 */}
            <div className="flex items-baseline gap-1 pt-3 border-t border-tinki-dark/10">
              <span className="text-xs text-tinki-dark/40">A partir de</span>
              <span className="text-sm font-bold text-tinki-dark/50">
                {linea.edad}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!nombreNino.trim()}
        className="w-full py-5 bg-tinki-orange text-white font-black text-xl rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Siguiente: elegir plan →
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PASO 2 — Elige plan (con ahorro brutal)
// ═══════════════════════════════════════════════════════════════

function Step2({
  plan,
  onPlan,
  onBack,
  onNext,
}: {
  plan: PlanInfo;
  onPlan: (p: PlanInfo) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black text-tinki-dark mb-2">Elige tu ritmo</h2>
        <p className="text-tinki-dark/40">Cuanto más tiempo, más ahorras. Y sin permanencia.</p>
      </div>

      {/* Cards de planes */}
      <div className="space-y-4">
        {PLANES.map((p) => {
          const selected = plan.slug === p.slug;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => onPlan(p)}
              className={`relative w-full rounded-2xl border-2 p-5 text-left transition-all ${
                selected
                  ? 'border-tinki-orange ring-2 ring-tinki-orange ring-offset-2 bg-orange-50'
                  : 'border-tinki-dark/5 bg-white hover:border-tinki-dark/15'
              }`}
            >
              {/* Badge */}
              {p.badge && (
                <span
                  className={`absolute -top-2.5 right-4 px-3 py-0.5 rounded-full text-xs font-black text-white ${
                    p.popular ? 'bg-tinki-orange' : 'bg-green-500'
                  }`}
                >
                  {p.badge}
                </span>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-black text-tinki-dark">{p.nombre}</span>
                  <span className="text-sm text-tinki-dark/30 ml-2">
                    {p.meses === 1 ? '1 caja al mes' : `${p.meses} cajas (1 al mes)`}
                  </span>
                </div>

                <div className="text-right">
                  {/* Precio por mes grande */}
                  <div className="flex items-baseline gap-0.5 justify-end">
                    <span className="text-3xl font-black text-tinki-dark">
                      {p.precioMes.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-lg font-bold text-tinki-dark/40">€</span>
                    <span className="text-sm text-tinki-dark/30">/mes</span>
                  </div>

                  {/* Total */}
                  {p.meses > 1 && (
                    <span className="text-xs text-tinki-dark/30">
                      {p.precioTotal.toFixed(2).replace('.', ',')}€ total
                    </span>
                  )}
                </div>
              </div>

              {/* Barra de ahorro */}
              {p.ahorro > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-tinki-dark/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.round((p.ahorro / 60) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-black text-green-600 whitespace-nowrap">
                    Ahorras {p.ahorro.toFixed(0).replace('.', ',')}€
                  </span>
                </div>
              )}

              {/* Radio custom */}
              <div
                className={`absolute top-5 left-5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selected ? 'border-tinki-orange bg-tinki-orange' : 'border-tinki-dark/15'
                }`}
              >
                {selected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Comparativa rápida */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
        <span className="text-sm text-green-700">
          🌱 Con el plan anual <strong>ahorras 60€</strong> — ¡son más de 2 cajas gratis!
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-5 border-2 border-tinki-dark/5 text-tinki-dark/50 font-bold rounded-2xl hover:border-tinki-dark/15 transition-colors"
        >
          ← Atrás
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-5 bg-tinki-orange text-white font-black text-xl rounded-2xl hover:opacity-90 transition-all active:scale-[0.98]"
        >
          Siguiente: envío →
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PASO 3 — Dirección de envío
// ═══════════════════════════════════════════════════════════════

function Step3({
  email,
  direccion,
  ciudad,
  cp,
  telefono,
  onChange,
  onBack,
  onNext,
}: {
  email: string;
  direccion: string;
  ciudad: string;
  cp: string;
  telefono: string;
  onChange: (f: Partial<FormData>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const valido = direccion.trim() && ciudad.trim() && cp.trim() && /^\d{5}$/.test(cp.trim()) && email.includes('@');
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black text-tinki-dark mb-2">¿Dónde lo enviamos?</h2>
        <p className="text-tinki-dark/40">La primera caja sale en 5-7 días. Envío gratis siempre.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-tinki-dark/50 mb-1">Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="tunombre@email.com"
            className="w-full rounded-2xl border-2 border-tinki-dark/5 px-5 py-4 text-lg font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow bg-white"
          />
          <p className="text-xs text-tinki-dark/25 mt-1">Te enviaremos la confirmación y los avisos de envío aquí.</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-tinki-dark/50 mb-1">Dirección *</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => onChange({ direccion: e.target.value })}
            placeholder="Calle Mayor, 12, 3º B"
            className="w-full rounded-2xl border-2 border-tinki-dark/5 px-5 py-4 text-lg font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-tinki-dark/50 mb-1">Ciudad *</label>
            <input
              type="text"
              value={ciudad}
              onChange={(e) => onChange({ ciudad: e.target.value })}
              placeholder="Madrid"
              className="w-full rounded-2xl border-2 border-tinki-dark/5 px-5 py-4 font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-tinki-dark/50 mb-1">Código postal *</label>
            <input
              type="text"
              value={cp}
              onChange={(e) => onChange({ cp: e.target.value.replace(/\D/g, '').slice(0, 5) })}
              placeholder="28001"
              inputMode="numeric"
              maxLength={5}
              className="w-full rounded-2xl border-2 border-tinki-dark/5 px-5 py-4 font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-tinki-dark/50 mb-1">
            Teléfono <span className="font-normal text-tinki-dark/20">(opcional, solo para avisos de envío)</span>
          </label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => onChange({ telefono: e.target.value })}
            placeholder="612 345 678"
            className="w-full rounded-2xl border-2 border-tinki-dark/5 px-5 py-4 font-bold text-tinki-dark placeholder:text-tinki-dark/15 focus:outline-none focus:ring-2 focus:ring-tinki-orange focus:border-transparent transition-shadow bg-white"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-5 border-2 border-tinki-dark/5 text-tinki-dark/50 font-bold rounded-2xl hover:border-tinki-dark/15 transition-colors"
        >
          ← Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!valido}
          className="flex-1 py-5 bg-tinki-orange text-white font-black text-xl rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Siguiente: pagar →
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PASO 4 — Resumen + pago
// ═══════════════════════════════════════════════════════════════

function Step4({
  data,
  loading,
  error,
  onBack,
  onSubmit,
}: {
  data: FormData;
  loading: boolean;
  error: string;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black text-tinki-dark mb-2">Todo listo</h2>
        <p className="text-tinki-dark/40">Revisa tu pedido y paga para que empiece la aventura.</p>
      </div>

      {/* Resumen */}
      <div className="bg-white border-2 border-tinki-dark/5 rounded-2xl p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-tinki-dark/40">Para</span>
          <span className="font-bold text-tinki-dark">{data.nombreNino}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-tinki-dark/40">Email</span>
          <span className="font-bold text-tinki-dark">{data.email}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-tinki-dark/40">Línea</span>
          <span className="font-bold text-tinki-dark">
            {data.linea.emoji} {data.linea.nombre} ({data.linea.edad})
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-tinki-dark/40">Plan</span>
          <span className="font-bold text-tinki-dark">
            {data.plan.nombre} — {data.plan.precioMes.toFixed(2).replace('.', ',')}€/mes
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-tinki-dark/40">Envío a</span>
          <span className="font-bold text-tinki-dark text-right max-w-[200px]">
            {data.direccion}, {data.cp} {data.ciudad}
          </span>
        </div>
        {data.telefono && (
          <div className="flex justify-between text-sm">
            <span className="text-tinki-dark/40">Teléfono</span>
            <span className="font-bold text-tinki-dark">{data.telefono}</span>
          </div>
        )}
        <hr className="border-tinki-dark/5" />
        <div className="flex justify-between text-lg font-black text-tinki-dark">
          <span>Primer pago</span>
          <span>{data.plan.precioTotal.toFixed(2).replace('.', ',')}€</span>
        </div>
        <p className="text-xs text-tinki-dark/25 text-right">
          Luego {data.plan.precioMes.toFixed(2).replace('.', ',')}€ cada {data.plan.meses === 1 ? 'mes' : `${data.plan.meses} meses`}. Sin permanencia.
        </p>
      </div>

      {/* Placeholder tarjeta */}
      <div className="bg-tinki-dark rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 text-white/60 text-sm font-bold">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Tarjeta de crédito o débito
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-white/5">
          <div className="flex gap-3 mb-3">
            <div className="flex-1 h-10 bg-white/10 rounded-lg" />
            <div className="flex-1 h-10 bg-white/10 rounded-lg" />
          </div>
          <div className="h-10 bg-white/10 rounded-lg w-1/3" />
        </div>
        <p className="text-white/25 text-xs text-center">
          🔒 Pago seguro con Stripe. Tus datos viajan cifrados y no los almacenamos.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm text-center font-bold">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-5 border-2 border-tinki-dark/5 text-tinki-dark/50 font-bold rounded-2xl hover:border-tinki-dark/15 transition-colors"
        >
          ←
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex-1 py-5 bg-tinki-orange text-white font-black text-xl rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Procesando...
            </span>
          ) : (
            `Pagar ${data.plan.precioTotal.toFixed(2).replace('.', ',')}€`
          )}
        </button>
      </div>
    </div>
  );
}
