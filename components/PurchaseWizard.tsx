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

const PRECIO_SINGLE = 27.00;
const PRECIO_BASE_MES = 24.90;

const PLANES: PlanInfo[] = [
  {
    slug: 'trimestral',
    nombre: '3 meses',
    meses: 3,
    precioMes: 22.90,
    precioTotal: 68.70,
    ahorro: 12.30,
    badge: 'Para probar',
  },
  {
    slug: 'semestral',
    nombre: '6 meses',
    meses: 6,
    precioMes: 20.90,
    precioTotal: 125.40,
    ahorro: 36.60,
    popular: true,
    badge: '1 caja gratis',
  },
  {
    slug: 'anual',
    nombre: '12 meses',
    meses: 12,
    precioMes: 19.90,
    precioTotal: 238.80,
    ahorro: 85.20,
    badge: '+2 cajas gratis',
  },
];

const LINEAS = [
  {
    slug: 'mini',
    nombre: 'Tinki Mini',
    edad: '3-5 años',
    emoji: '🧸',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-700',
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
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-700',
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
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
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

type Step = 0 | 1 | 2 | 3 | 4;

interface FormData {
  modo: 'single' | 'sub';
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
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<FormData>({
    modo: 'sub',
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

  const totalSteps = data.modo === 'single' ? 3 : 4;

  const goNext = (next: Step) => { setDir('fwd'); setAnimKey(k => k + 1); setStep(next); };
  const goBack = (prev: Step) => { setDir('back'); setAnimKey(k => k + 1); setStep(prev); };

  const update = (partial: Partial<FormData>) => setData((d) => ({ ...d, ...partial }));

  const progresso = totalSteps > 0 ? ((step) / totalSteps) * 100 : 0;

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modo: data.modo,
          nombreNino: data.nombreNino,
          linea: data.linea.slug,
          plan: data.modo === 'single' ? 'single' : data.plan.slug,
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
    const isSingle = data.modo === 'single';
    return (
      <div className="text-center py-16 px-4 animate-fade-in">
        <div className="text-7xl mb-6 animate-bounce" style={{ animationDuration: '600ms' }}>{isSingle ? '📦' : '🚀'}</div>
        <h2 className="text-3xl font-black text-tinki-dark mb-3">
          {isSingle ? `¡${data.nombreNino}, tu caja está en camino!` : `¡${data.nombreNino}, bienvenido a Tinkilabs!`}
        </h2>
        {isSingle ? (
          <>
            <p className="text-lg text-tinki-dark/50 mb-2">
              Tu <strong className="text-tinki-dark">{data.linea.nombre}</strong> sale en <strong className="text-tinki-orange">5-7 días</strong>. Envío gratis.
            </p>
            <p className="text-tinki-dark/30 mb-4">
              Te avisaremos cuando llegue. Si te mola, te esperamos con un plan y te bonificamos la diferencia. 🦫
            </p>
          </>
        ) : (
          <>
            <p className="text-lg text-tinki-dark/50 mb-2">
              Tu primera caja <strong className="text-tinki-dark">{data.linea.nombre}</strong> sale el día <strong className="text-tinki-orange">5 del mes que viene</strong>.
            </p>
            <p className="text-tinki-dark/30 mb-8">
              Te hemos enviado un email con todos los detalles. 🧰
            </p>
          </>
        )}
        <a
          href="/"
          className="inline-block px-8 py-4 bg-tinki-orange text-white font-black text-lg rounded-xl hover:shadow-lg hover:shadow-tinki-orange/25 hover:-translate-y-0.5 transition-all duration-200 ease-out"
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
          <div className="mb-10" role="progressbar" aria-valuenow={progresso} aria-valuemin={0} aria-valuemax={100} aria-label="Progreso de suscripción">
            <div className="flex justify-between text-xs font-bold mb-2">
              {(data.modo === 'single'
                ? ['¿Quién?', 'Envío', 'Pago']
                : ['¿Quién?', 'Plan', 'Envío', 'Pago']
              ).map((label, i) => {
                const num = data.modo === 'single' ? [1, 3, 4][i] : i + 1;
                const done = step > num;
                const active = step === num;
                return (
                  <span
                    key={label}
                    className={`flex items-center gap-1 ${active ? 'text-tinki-orange' : done ? 'text-emerald-600' : 'text-tinki-dark/25'}`}
                  >
                    {done && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {label}
                  </span>
                );
              })}
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
            {step === 0 && (
              <Step0
                modo={data.modo}
                onSelect={(modo) => update({ modo })}
                onNext={() => goNext(1)}
              />
            )}

            {step === 1 && (
              <Step1
                nombreNino={data.nombreNino}
                linea={data.linea}
                onNombre={(n) => update({ nombreNino: n })}
                onLinea={(l) => update({ linea: l })}
                onBack={() => goBack(0)}
                onNext={() => data.modo === 'single' ? goNext(3) : goNext(2)}
              />
            )}

            {step === 2 && data.modo === 'sub' && (
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
                onBack={() => data.modo === 'single' ? goBack(1) : goBack(2)}
                onNext={() => goNext(4)}
              />
            )}

            {step === 4 && (
              <Step4
                data={data}
                loading={loading}
                error={error}
                onBack={() => data.modo === 'single' ? goBack(3) : goBack(3)}
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
// PASO 0 — ¿1 caja o suscripción?
// ═══════════════════════════════════════════════════════════════

function Step0({
  modo,
  onSelect,
  onNext,
}: {
  modo: 'single' | 'sub';
  onSelect: (m: 'single' | 'sub') => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-black text-tinki-dark mb-2">¿Cómo quieres empezar?</h2>
        <p className="text-tinki-dark/40">Elige tu camino. Siempre puedes cambiar de opinión.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Caja única */}
        <button
          type="button"
          onClick={() => onSelect('single')}
          className={`relative rounded-2xl border-2 p-6 text-left transition-all ${
            modo === 'single'
              ? 'shadow-md shadow-tinki-orange/15 bg-orange-50 border-tinki-orange'
              : 'border-tinki-dark/5 bg-white hover:border-tinki-dark/15'
          }`}
        >
          <div className="text-3xl mb-3">📦</div>
          <h3 className="text-xl font-black text-tinki-dark mb-1">Una sola caja</h3>
          <p className="text-4xl font-black text-tinki-dark tracking-tight mb-1">
            27<span className="text-xl text-tinki-dark/30">€</span>
          </p>
          <p className="text-xs text-tinki-dark/35 mb-4">Envío gratis. Sin compromiso.</p>
          <ul className="space-y-1.5">
            {['Pruébalo sin ataduras', 'Si te mola, te bonificamos el plan', 'Envío en 5-7 días'].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-tinki-dark/50">
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-tinki-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </button>

        {/* Suscripción */}
        <button
          type="button"
          onClick={() => onSelect('sub')}
          className={`relative rounded-2xl border-2 p-6 text-left transition-all ${
            modo === 'sub'
              ? 'shadow-md shadow-tinki-orange/15 bg-orange-50 border-tinki-orange'
              : 'border-tinki-dark/5 bg-white hover:border-tinki-dark/15'
          }`}
        >
          <div className="text-3xl mb-3">🔄</div>
          <h3 className="text-xl font-black text-tinki-dark mb-1">Suscripción</h3>
          <p className="text-sm text-tinki-dark/50 mb-1">
            Desde <span className="font-bold text-tinki-dark">19,90€</span> /mes
          </p>
          <p className="text-xs text-tinki-dark/35 mb-4">El mejor precio. Cancela cuando quieras.</p>
          <ul className="space-y-1.5">
            {['1 caja nueva cada mes', 'Mejor precio garantizado', 'Sin permanencia', 'Envío gratis siempre'].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-tinki-dark/50">
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-tinki-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </button>
      </div>

      {/* Mensaje de bonificación */}
      <div className="bg-tinki-orange/5 border border-tinki-orange/15 rounded-2xl p-4 text-center">
        <p className="text-sm text-tinki-dark/60">
          💡 <strong>Si empiezas con 1 caja y luego te suscribes</strong>, te bonificamos la diferencia del plan que elijas. Como si hubieras empezado con suscripción desde el principio.
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-5 bg-tinki-orange text-white font-black text-xl rounded-2xl hover:shadow-lg hover:shadow-tinki-orange/25 hover:-translate-y-0.5 transition-all duration-200 ease-out active:scale-[0.98] active:shadow-none"
      >
        {modo === 'single' ? 'Quiero una caja →' : 'Quiero suscribirme →'}
      </button>
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
  onBack,
  onNext,
}: {
  nombreNino: string;
  linea: typeof LINEAS[0];
  onNombre: (n: string) => void;
  onLinea: (l: typeof LINEAS[0]) => void;
  onBack: () => void;
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
                  role="radio"
                  aria-checked={sel}
                  onClick={() => onLinea(l)}
                  className={`relative rounded-2xl border-2 p-4 text-left transition-all flex items-center gap-4 ${
                    sel
                      ? 'border-tinki-orange shadow-md shadow-tinki-orange/15 bg-orange-50'
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
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-5 border-2 border-tinki-dark/5 text-tinki-dark/50 font-bold rounded-2xl hover:border-tinki-dark/15 transition-colors"
        >
          ← Atrás
        </button>
        <button
          onClick={onNext}
          disabled={!nombreNino.trim()}
          className="flex-1 py-5 bg-tinki-orange text-white font-black text-xl rounded-2xl hover:shadow-lg hover:shadow-tinki-orange/25 hover:-translate-y-0.5 transition-all duration-200 ease-out active:scale-[0.98] active:shadow-none disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          Siguiente: elegir plan →
        </button>
      </div>
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
              role="radio"
              aria-checked={selected}
              onClick={() => onPlan(p)}
              className={`relative w-full rounded-2xl border-2 p-5 text-left transition-all ${
                selected
                  ? 'border-tinki-orange shadow-md shadow-tinki-orange/15 bg-orange-50'
                  : 'border-tinki-dark/5 bg-white hover:border-tinki-dark/15'
              }`}
            >
              {/* Badge */}
              {p.badge && (
                <span
                  className={`absolute -top-2.5 right-4 px-3 py-0.5 rounded-full text-xs font-black text-white ${
                    p.popular ? 'bg-tinki-orange' : 'bg-emerald-500'
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
                    <span className="text-4xl font-black text-tinki-dark tracking-tight">
                      {p.precioMes.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xl font-bold text-tinki-dark/30">€</span>
                    <span className="text-sm text-tinki-dark/25">/mes</span>
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
                      className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.round((p.ahorro / 85.20) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-black text-emerald-600 whitespace-nowrap">
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
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
        <span className="text-sm text-emerald-700">
          🌱 Todos los planes incluyen <strong>envío gratis</strong> y <strong>sin permanencia</strong> más allá del periodo elegido. Si no te convence, cancelas al terminar.
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
  const [compromisoAceptado, setCompromisoAceptado] = useState(false);
  const necesitaCompromiso = data.modo === 'sub' && data.plan.meses > 1;

  const puedePagar = necesitaCompromiso ? compromisoAceptado : true;

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
        {data.modo === 'sub' && (
          <div className="flex justify-between text-sm">
            <span className="text-tinki-dark/40">Plan</span>
            <span className="font-bold text-tinki-dark">
              {data.plan.nombre} — {data.plan.precioMes.toFixed(2).replace('.', ',')}€/mes
            </span>
          </div>
        )}
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
        {data.modo === 'single' ? (
          <>
            <div className="flex justify-between text-lg font-black text-tinki-dark">
              <span>Pago único</span>
              <span>27,00€</span>
            </div>
            <p className="text-xs text-tinki-dark/25 text-right">Envío gratis. Sin compromiso.</p>
          </>
        ) : (
          <>
            <div className="flex justify-between text-lg font-black text-tinki-dark">
              <span>Primer pago</span>
              <span>{data.plan.precioTotal.toFixed(2).replace('.', ',')}€</span>
            </div>
            <p className="text-xs text-tinki-dark/25 text-right">
              {data.plan.precioMes.toFixed(2).replace('.', ',')}€ al mes durante {data.plan.meses} meses.
            </p>
            {/* Bonificación por upgrade desde caja única */}
            <div className="mt-3 rounded-xl bg-tinki-orange/5 border border-tinki-orange/15 p-3">
              <p className="text-xs text-tinki-dark/50 leading-relaxed">
                🦫 <strong>¿Vienes de una caja única?</strong> Si ya compraste una caja suelta y ahora te suscribes, tu primera renovación incluye una bonificación de <strong>{(27 - data.plan.precioMes).toFixed(2).replace('.', ',')}€</strong> (la diferencia con tu caja única). El total será el mismo que si hubieras empezado con suscripción.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Compromiso (solo trimestral/anual) */}
      {necesitaCompromiso && (
        <label className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 cursor-pointer">
          <input
            type="checkbox"
            checked={compromisoAceptado}
            onChange={(e) => setCompromisoAceptado(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-amber-300 text-tinki-orange focus:ring-tinki-orange"
          />
          <span className="text-sm text-amber-900 leading-relaxed">
            Entiendo que el plan <strong>{data.plan.nombre.toLowerCase()}</strong> implica un compromiso de <strong>{data.plan.meses} meses</strong> ({data.plan.meses} cajas). Podré cancelar al finalizar el periodo. El descuento sobre el precio mensual está vinculado a este compromiso.
          </span>
        </label>
      )}

      {/* Pago */}
      <div className="bg-tinki-dark rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Pago seguro con Stripe</p>
            <p className="text-xs text-white/40">Tus datos viajan cifrados. No los almacenamos.</p>
          </div>
        </div>
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
          disabled={loading || !puedePagar}
          className="flex-1 py-5 bg-tinki-orange text-white font-black text-xl rounded-2xl hover:shadow-lg hover:shadow-tinki-orange/25 hover:-translate-y-0.5 transition-all duration-200 ease-out active:scale-[0.98] active:shadow-none disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Procesando...
            </span>
          ) : data.modo === 'single' ? (
            'Pagar 27,00€'
          ) : (
            `Pagar ${data.plan.precioTotal.toFixed(2).replace('.', ',')}€`
          )}
        </button>
      </div>
    </div>
  );
}
