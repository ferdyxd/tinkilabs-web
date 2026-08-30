'use client';

/* Piezas del sistema "papel de taller recortado a troquel".
   Especificación completa en `web/designs/DESIGN tinkilabs.md`.
   Este fichero es autónomo: no importa nada de concepto-b ni concepto-c. */

// ─── Engranaje: geometría autoral, relleno plano + contorno ───
// Sustituible por renders 3D con grano cuando existan.
function perfilEngranaje(r: number, dientes: number, altoDiente: number, anchoDiente = 0.42) {
  const paso = (Math.PI * 2) / dientes;
  const ro = r + altoDiente;
  const P = (rad: number, a: number) =>
    `${(Math.cos(a) * rad).toFixed(2)},${(Math.sin(a) * rad).toFixed(2)}`;
  const d: string[] = [];
  for (let i = 0; i < dientes; i++) {
    const a = i * paso;
    const medio = paso * anchoDiente * 0.5;
    const flanco = paso * 0.09;
    d.push(i === 0 ? `M${P(r, a - paso * 0.5 + flanco)}` : `L${P(r, a - paso * 0.5 + flanco)}`);
    d.push(`L${P(ro, a - medio)}`, `L${P(ro, a + medio)}`, `L${P(r, a + paso * 0.5 - flanco)}`);
  }
  return d.join(' ') + ' Z';
}

export function Engranaje({
  dientes = 20,
  className = '',
  gira = true,
  segundos = 60,
  invertido = false,
  relleno = 'var(--tk-wood)',
}: {
  dientes?: number;
  className?: string;
  gira?: boolean;
  segundos?: number;
  invertido?: boolean;
  relleno?: string;
}) {
  const r = 78;
  const ro = r + 14;
  const vb = (ro + 4) * 2;
  return (
    <svg
      viewBox={`${-vb / 2} ${-vb / 2} ${vb} ${vb}`}
      className={className}
      aria-hidden="true"
      style={
        gira
          ? { animation: `tk-giro ${segundos}s linear infinite${invertido ? ' reverse' : ''}` }
          : undefined
      }
    >
      <path
        d={perfilEngranaje(r, dientes, 14)}
        fill={relleno}
        stroke="var(--tk-ink)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle r={r * 0.3} fill="var(--tk-paper)" stroke="var(--tk-ink)" strokeWidth="4" />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i * Math.PI * 2) / 5;
        return (
          <circle
            key={i}
            cx={Math.cos(a) * r * 0.62}
            cy={Math.sin(a) * r * 0.62}
            r="7"
            fill="var(--tk-paper)"
            stroke="var(--tk-ink)"
            strokeWidth="3.5"
          />
        );
      })}
    </svg>
  );
}

// ─── Sticker: icono de marca recoloreado por mask, en chip troquelado ───
const RELLENOS = {
  wood: 'var(--tk-wood)',
  pale: 'var(--tk-wood-pale)',
  card: 'var(--tk-card)',
} as const;

export function Sticker({
  icono,
  relleno = 'pale',
  giro = -6,
  tam = 56,
  className = '',
}: {
  icono: string;
  relleno?: keyof typeof RELLENOS;
  giro?: number;
  tam?: number;
  className?: string;
}) {
  const url = `/images/brand/icons/${icono}.svg`;
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[14px] border-2 border-[var(--tk-ink)] ${className}`}
      style={{
        width: tam,
        height: tam,
        background: RELLENOS[relleno],
        transform: `rotate(${giro}deg)`,
      }}
      aria-hidden="true"
    >
      <span
        style={{
          width: tam * 0.5,
          height: tam * 0.5,
          background: 'var(--tk-ink)',
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          display: 'block',
        }}
      />
    </span>
  );
}

// ─── Marquesina ───
//
// Dos niveles de separación, y son necesarios los dos:
//  · DENTRO de la frase, los puntos del claim aprobado
//    ("Imagina. Construye. Alucina.").
//  · ENTRE repeticiones, un rombo troquelado con aire generoso.
// Con un único separador uniforme la frase deja de leerse como frase y
// se convierte en una lista infinita de palabras sin principio ni final.
//
// El empalme del bucle: la animación desplaza -50%, y ese porcentaje se
// calcula sobre la anchura del PROPIO elemento. Un flex de nivel bloque
// hereda la anchura del padre (la ventana), no la del contenido, así que
// -50% no equivaldría a una copia. De ahí `w-max`: el contenedor mide
// exactamente su contenido y -50% cae justo en la costura.
// Las dos copias deben ser idénticas, remate incluido.

function UnidadManifiesto({ texto }: { texto: string }) {
  return (
    <span className="flex shrink-0 items-center">
      <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--tk-paper)]">
        {texto}
      </span>
      <span
        className="mx-7 h-[7px] w-[7px] shrink-0 rotate-45 bg-[var(--tk-wood)]"
        aria-hidden="true"
      />
    </span>
  );
}

export function Marquesina({ texto, repeticiones = 4 }: { texto: string; repeticiones?: number }) {
  return (
    <div className="overflow-hidden border-b-2 border-[var(--tk-ink)] bg-[var(--tk-ink)] py-2.5">
      <div className="tk-marquesina flex w-max items-center">
        {[0, 1].map((copia) => (
          <span key={copia} className="flex items-center" aria-hidden={copia === 1}>
            {Array.from({ length: repeticiones }, (_, k) => (
              <UnidadManifiesto key={k} texto={texto} />
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Hueco reservado para foto real ───
export function Hueco({
  archivo,
  descripcion,
  ratio = 'aspect-[4/3]',
}: {
  archivo: string;
  descripcion: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden rounded-[16px] border-2 border-dashed border-[var(--tk-ink)]/45 bg-[var(--tk-wood-pale)]/45`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-5 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--tk-ink)]/60">
          Falta foto
        </span>
        <p className="max-w-[26ch] text-[13px] leading-snug text-[var(--tk-ink-soft)]">{descripcion}</p>
        <code className="text-[11px] text-[var(--tk-ink)]/45">{archivo}</code>
      </div>
    </div>
  );
}
