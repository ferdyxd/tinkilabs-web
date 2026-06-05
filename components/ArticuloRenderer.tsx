import type { ArticuloEstructurado } from '@/lib/blog-data';
import { PasoProyecto } from '@/components/PasoProyecto';

export function ArticuloRenderer({ data }: { data: ArticuloEstructurado }) {
  return (
    <div className="max-w-none">

      {/* Intro */}
      <div
        className="prose prose-neutral prose-lg max-w-none
          prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-tinki-dark/65
          prose-strong:text-tinki-dark prose-strong:font-bold"
        dangerouslySetInnerHTML={{ __html: data.intro }}
      />

      {/* ═══ PASO A PASO ═══ */}
      <div className="mt-10 rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-black tracking-tight text-tinki-dark mb-6">
          Paso a paso
        </h2>

        {data.pasos.map((paso, i) => (
          <div key={paso.numero}>
            <PasoProyecto paso={paso} />
            {i < data.pasos.length - 1 && (
              <hr className="mb-10 border-neutral-100" />
            )}
          </div>
        ))}
      </div>

      {/* ═══ CÓMO FUNCIONA ═══ */}
      <div className="mt-12">
        <h2 className="text-xl font-black tracking-tight text-tinki-dark mb-4">
          {data.cienciaTitulo}
        </h2>
        <div
          className="prose prose-neutral prose-lg max-w-none
            prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-tinki-dark/65
            prose-strong:text-tinki-dark prose-strong:font-bold
            prose-li:text-[15px] prose-li:leading-relaxed prose-li:text-tinki-dark/65"
          dangerouslySetInnerHTML={{ __html: data.cienciaTexto }}
        />
      </div>

      {/* ═══ SOLUCIÓN DE PROBLEMAS ═══ */}
      {data.soluciones.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-black tracking-tight text-tinki-dark mb-4">
            Solución de problemas
          </h2>
          <ul className="space-y-2">
            {data.soluciones.map((s, i) => (
              <li key={i} className="text-base leading-relaxed text-tinki-dark/65">
                <strong className="text-tinki-dark">{s.problema}:</strong> {s.solucion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ═══ CONVIÉRTELO EN UN JUEGO ═══ */}
      {data.juegoTexto && (
        <div className="mt-10">
          <h2 className="text-xl font-black tracking-tight text-tinki-dark mb-4">
            {data.juegoTitulo}
          </h2>
          <div
            className="prose prose-neutral prose-lg max-w-none
              prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-tinki-dark/65
              prose-li:text-[15px] prose-li:leading-relaxed prose-li:text-tinki-dark/65
              prose-strong:text-tinki-dark prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: data.juegoTexto }}
          />
        </div>
      )}

      {/* ═══ CTA TINKILABS ═══ */}
      <hr className="mt-12 border-neutral-100" />
      <div
        className="mt-8 prose prose-neutral prose-lg max-w-none
          prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-tinki-dark/65
          prose-strong:text-tinki-dark prose-strong:font-bold"
        dangerouslySetInnerHTML={{ __html: data.cta }}
      />
    </div>
  );
}
