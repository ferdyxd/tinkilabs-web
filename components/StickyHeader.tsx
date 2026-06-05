'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog-data';
import { EDAD_LABELS, MANCHA_LABELS, AYUDA_LABELS, TIEMPO_IMG } from '@/lib/blog-data';

function formatTiempo(min: number): string {
  if (min < 60) return `~${min} min`;
  if (min === 60) return '~1 h';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `~${h} h ${m} min` : `~${h} h`;
}

export function StickyHeader({ post }: { post: BlogPost }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('blog-hero');
      if (!hero) return;
      setVisible(hero.getBoundingClientRect().bottom < 58);

      // Barra de progreso de lectura
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tieneFicha = post.edad && post.tiempoMin && post.mancha && post.ayuda;

  return (
    <header
      className={`fixed top-[58px] left-0 right-0 z-40 bg-tinki-light border-b border-tinki-dark/5 transition-transform duration-300 ease-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="pointer-events-none absolute inset-0 pattern-dots-orange opacity-60" aria-hidden="true" />
      <nav className="relative z-10 mx-auto max-w-6xl px-6 py-2.5 flex items-center gap-5 overflow-visible min-h-[64px]">
        <span className="text-2xl shrink-0">{post.coverEmoji}</span>
        <span className="text-base font-bold text-tinki-dark flex-1 min-w-0 leading-snug">
          {post.titulo}
        </span>

        {tieneFicha && (
          <span className="hidden md:flex items-center gap-3 text-xs font-medium text-tinki-dark/50 shrink-0">
            <span className="flex items-center gap-1.5">
              <Image src={EDAD_LABELS[post.edad!].img} alt="" width={36} height={36} className="object-contain" />
              <span>{EDAD_LABELS[post.edad!].edad}</span>
            </span>
            <span className="text-tinki-dark/15">·</span>
            <span className="flex items-center gap-1.5">
              <Image src={TIEMPO_IMG} alt="" width={32} height={32} className="object-contain" />
              <span>{formatTiempo(post.tiempoMin!)}</span>
            </span>
            <span className="text-tinki-dark/15">·</span>
            <span className="flex items-center gap-1.5">
              <Image src={MANCHA_LABELS[post.mancha!].img} alt="" width={36} height={36} className="object-contain" />
              <span>{MANCHA_LABELS[post.mancha!].texto}</span>
            </span>
            <span className="text-tinki-dark/15">·</span>
            <span className="flex items-center gap-1.5">
              <Image src={AYUDA_LABELS[post.ayuda!].img} alt="" width={36} height={36} className="object-contain" />
              <span>{AYUDA_LABELS[post.ayuda!].texto}</span>
            </span>
          </span>
        )}

        <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-tinki-dark/25 shrink-0">
          <span>Proyectos</span>
          <span className="text-tinki-dark/15">›</span>
          <a href="/blog" className="hover:text-tinki-orange transition-colors">Blog</a>
        </span>
      </nav>

      {/* Barra de progreso de lectura */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-tinki-orange transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
    </header>
  );
}
