'use client';

import { useEffect, useRef, useState } from 'react';
import type { PasoProyecto as PasoProyectoType } from '@/lib/blog-data';

export function PasoProyecto({ paso }: { paso: PasoProyectoType }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5, rootMargin: '-80px 0px -40% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="not-prose group">
      {/* Cabecera del paso: burbuja numerada + título */}
      <div className="flex items-center gap-4 mb-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-extrabold text-white shadow-sm transition-all duration-500 ease-out
            ${inView ? 'bg-[#2ECC71] scale-110 shadow-md' : 'bg-tinki-orange scale-100'}
            group-hover:bg-[#2ECC71] group-hover:scale-110 group-hover:shadow-md`}
        >
          {paso.numero}
        </span>
        <h3 className="text-lg font-bold text-tinki-dark leading-snug">
          {paso.titulo}
        </h3>
      </div>

      {/* Texto del paso */}
      <div className="ml-[52px]">
        <p className="text-base leading-relaxed text-tinki-dark/65">
          {paso.texto}
        </p>

        {/* Placeholder de imagen */}
        {paso.imagenDescripcion && (
          <div className="mt-4 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 p-6 text-center">
            <span className="text-[13px] font-medium text-tinki-dark/25">
              Tinki está preparando esta foto... <span className="text-tinki-dark/15">({paso.imagenDescripcion})</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
