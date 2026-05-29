import Link from 'next/link';

const fondos = [
  {
    id: 'pattern-grid-blue',
    nombre: '1. Grid azul — Papel milimetrado',
    desc: 'El clásico de CrunchLabs. Cuadrícula azul que evoca planos de ingeniería y drafting table.',
    vibra: 'Técnico, serio, profesional',
    color: '#0a0a1a',
  },
  {
    id: 'pattern-grid-orange',
    nombre: '2. Grid naranja — Tinkilabs',
    desc: 'Misma cuadrícula pero con el naranja de la marca. Reconocible al instante.',
    vibra: 'Energético, de marca, reconocible',
    color: '#0d0d14',
  },
  {
    id: 'pattern-dots-blue',
    nombre: '3. Puntos azules — Blueprint',
    desc: 'Patrón de puntos en lugar de líneas. Más sutil, menos agresivo. Parece papel de calco técnico.',
    vibra: 'Sutil, elegante, moderno',
    color: '#08081a',
  },
  {
    id: 'pattern-dots-orange',
    nombre: '4. Puntos naranjas — Tinkilabs',
    desc: 'Puntos con el naranja corporativo. Ligero, apenas se nota, pero unifica la marca.',
    vibra: 'Marca sutil, premium, cálido',
    color: '#0d0d14',
  },
  {
    id: 'pattern-blueprint',
    nombre: '5. Blueprint — Grid + diagonales',
    desc: 'Tres capas: grid horizontal, vertical y diagonales a 45º. Parece un plano técnico de taller mecánico.',
    vibra: 'Ingeniería total, taller, máquina',
    color: '#0a1020',
  },
  {
    id: 'pattern-crosshair',
    nombre: '6. Crosshair — Miras técnicas',
    desc: 'Grid muy fino (16px) con tono naranja. Parece topografía o mira telescópica de precisión.',
    vibra: 'Precisión, detalle, alta tecnología',
    color: '#0d0d18',
  },
];

export default function FondosPage() {
  return (
    <div className="min-h-screen bg-[#08080F] text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black">Fondos de ingeniería</h1>
            <p className="mt-2 text-white/40">6 opciones para el fondo de la web. Elige la que más te mole.</p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/50 hover:border-tinki-orange/30 hover:text-tinki-orange transition-colors"
          >
            ← Volver
          </Link>
        </div>

        <div className="grid gap-6">
          {fondos.map((f) => (
            <div key={f.id} className="overflow-hidden rounded-2xl border border-white/10">
              {/* Preview del fondo */}
              <div className={`${f.id} flex h-64 items-center justify-center relative`} style={{ backgroundColor: f.color }}>
                {/* Card simulada encima para ver contraste */}
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 px-8 py-5 text-center max-w-sm">
                  <span className="text-2xl">🔧</span>
                  <h3 className="mt-2 text-lg font-bold">Tinki Launcher</h3>
                  <p className="mt-1 text-xs text-white/40">Lanzador con tren de engranajes</p>
                  <span className="inline-block mt-3 rounded-full bg-tinki-orange/80 px-4 py-1.5 text-xs font-bold text-white">
                    Ver producto
                  </span>
                </div>
                {/* Label esquina */}
                <span className="absolute bottom-3 right-4 text-[10px] font-mono text-white/15">
                  .{f.id}
                </span>
              </div>
              {/* Info */}
              <div className="border-t border-white/5 bg-white/[0.02] px-6 py-4">
                <h2 className="text-lg font-bold">{f.nombre}</h2>
                <p className="mt-1 text-sm text-white/45">{f.desc}</p>
                <p className="mt-1 text-xs text-tinki-orange/60">
                  Vibra: {f.vibra}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="font-bold">¿Cómo se usa?</h2>
          <p className="mt-2 text-sm text-white/40">
            Una vez elegido el fondo, se añade la clase CSS al contenedor principal de cada página.
            Ejemplo: <code className="rounded bg-white/10 px-2 py-0.5 text-xs text-tinki-orange">&lt;main className=&quot;bg-grid-blue&quot;&gt;</code>
          </p>
          <p className="mt-2 text-sm text-white/40">
            También se puede poner como fondo global del body para que toda la web tenga el mismo estilo,
            o solo en secciones específicas (hero, catálogo, footer).
          </p>
        </div>
      </div>
    </div>
  );
}
