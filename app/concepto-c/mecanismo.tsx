'use client';

// ═══════════════════════════════════════════════════════════════
// Geometría autoral: engranajes y despiece técnico.
//
// Sustituye a las fotos de producto que todavía no existen. NO es
// una ilustración que finge ser una foto: es dibujo técnico real,
// que es exactamente lo que vende Tinkilabs. Cuando haya producto
// físico, el despiece puede convivir con las fotos en vez de
// desaparecer.
// ═══════════════════════════════════════════════════════════════

/** Perfil de engranaje con dientes trapezoidales. Determinista. */
export function gearPath(r: number, teeth: number, toothH: number, toothW = 0.42) {
  const step = (Math.PI * 2) / teeth;
  const ro = r + toothH;
  const pts: string[] = [];
  const P = (rad: number, a: number) =>
    `${(Math.cos(a) * rad).toFixed(3)},${(Math.sin(a) * rad).toFixed(3)}`;

  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const half = step * toothW * 0.5;
    const flank = step * 0.09;
    pts.push(i === 0 ? `M${P(r, a - step * 0.5 + flank)}` : `L${P(r, a - step * 0.5 + flank)}`);
    pts.push(`L${P(ro, a - half)}`);
    pts.push(`L${P(ro, a + half)}`);
    pts.push(`L${P(r, a + step * 0.5 - flank)}`);
  }
  return pts.join(' ') + ' Z';
}

export function Gear({
  r,
  teeth,
  toothH,
  cx,
  cy,
  spin,
  reverse = false,
  stroke = 'currentColor',
  width = 1.5,
  hub = true,
}: {
  r: number; teeth: number; toothH: number; cx: number; cy: number;
  spin: number; reverse?: boolean; stroke?: string; width?: number; hub?: boolean;
}) {
  return (
    <g transform={`translate(${cx} ${cy})`} style={{ color: stroke }}>
      <g
        style={{
          animation: `tk-spin ${spin}s linear infinite${reverse ? ' reverse' : ''}`,
          transformOrigin: 'center',
        }}
      >
        <path d={gearPath(r, teeth, toothH)} fill="none" stroke={stroke} strokeWidth={width} strokeLinejoin="round" />
        {hub && (
          <>
            <circle r={r * 0.34} fill="none" stroke={stroke} strokeWidth={width} />
            <circle r={r * 0.1} fill={stroke} />
            {[0, 1, 2].map((i) => (
              <line
                key={i}
                x1={Math.cos((i * Math.PI * 2) / 3) * r * 0.14}
                y1={Math.sin((i * Math.PI * 2) / 3) * r * 0.14}
                x2={Math.cos((i * Math.PI * 2) / 3) * r * 0.3}
                y2={Math.sin((i * Math.PI * 2) / 3) * r * 0.3}
                stroke={stroke}
                strokeWidth={width}
              />
            ))}
          </>
        )}
      </g>
    </g>
  );
}

/** Tren de engranajes del hero. Engrana de verdad: los radios y las
 *  distancias entre centros están calculados, no puestos a ojo. */
export function TrenDeEngranajes({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 200"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <Gear cx={96} cy={100} r={68} teeth={18} toothH={11} spin={26} width={2} />
      <Gear cx={272} cy={100} r={96} teeth={26} toothH={11} spin={38} reverse width={2} />
      <Gear cx={436} cy={128} r={56} teeth={15} toothH={10} spin={22} width={2} />
      {/* eje y bancada */}
      <line x1="0" y1="186" x2="520" y2="186" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <line x1="96" y1="100" x2="96" y2="186" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <line x1="272" y1="100" x2="272" y2="186" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <line x1="436" y1="128" x2="436" y2="186" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

/** Despiece acotado: sustituye a la foto en "esto no es un juguete". */
export function Despiece({ className = '' }: { className?: string }) {
  const acot = 'currentColor';
  return (
    <svg viewBox="0 0 640 420" className={className} fill="none" aria-hidden="true">
      <defs>
        <marker id="tk-ar" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill={acot} />
        </marker>
      </defs>

      {/* retícula de plano */}
      <g opacity="0.13">
        {Array.from({ length: 17 }, (_, i) => (
          <line key={'v' + i} x1={i * 40} y1="0" x2={i * 40} y2="420" stroke="currentColor" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={'h' + i} x1="0" y1={i * 42} x2="640" y2={i * 42} stroke="currentColor" strokeWidth="0.5" />
        ))}
      </g>

      {/* engranaje principal */}
      <Gear cx={196} cy={196} r={84} teeth={22} toothH={12} spin={44} width={2} />

      {/* piñón */}
      <Gear cx={340} cy={150} r={44} teeth={12} toothH={10} spin={24} reverse width={2} />

      {/* muelle de compresión */}
      <g transform="translate(410 250)" opacity="0.95">
        <path
          d="M0,0 q14,-16 28,0 q14,16 28,0 q14,-16 28,0 q14,16 28,0 q14,-16 28,0"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <line x1="-6" y1="-16" x2="-6" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="146" y1="-16" x2="146" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* eje */}
      <line x1="196" y1="196" x2="340" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="5 4" opacity="0.5" />

      {/* acotaciones */}
      <g opacity="0.85">
        <line x1="112" y1="320" x2="280" y2="320" stroke={acot} strokeWidth="1" markerStart="url(#tk-ar)" markerEnd="url(#tk-ar)" />
        <line x1="112" y1="312" x2="112" y2="328" stroke={acot} strokeWidth="1" />
        <line x1="280" y1="312" x2="280" y2="328" stroke={acot} strokeWidth="1" />
      </g>
      <g opacity="0.85">
        <line x1="470" y1="196" x2="470" y2="240" stroke={acot} strokeWidth="1" markerEnd="url(#tk-ar)" />
      </g>
    </svg>
  );
}
