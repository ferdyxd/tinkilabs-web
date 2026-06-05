'use client';

import { useState, useCallback } from 'react';
import type { BlogPost } from '@/lib/blog-data';

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

const btn = 'flex h-8 w-8 items-center justify-center rounded-full text-tinki-dark/30 transition-all duration-150 ease-out active:scale-90 hover:text-tinki-orange hover:bg-tinki-orange/5';

export function RightSidebar({ post, url, title }: { post: BlogPost; url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-4">

        {/* ═══ COMPARTIR ═══ */}
        <div className="rounded-xl border border-neutral-200 bg-white p-3">
          <span className="block text-[10px] font-medium text-tinki-dark/25 text-center mb-2">Compartir</span>
          <div className="grid grid-cols-3 gap-1 place-items-center">
            <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="WhatsApp">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
            </a>
            <button onClick={handleCopy} className={`${btn} relative`} aria-label="Copiar enlace">
              <CopyIcon />
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-tinki-dark px-2 py-0.5 text-[10px] font-medium text-white shadow-sm animate-fade-in">
                  ¡Enlace listo! 🦫
                </span>
              )}
            </button>
            <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Twitter/X">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <button onClick={handleCopy} className={btn} aria-label="Copiar para Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </button>
            <button onClick={handleCopy} className={btn} aria-label="Copiar para TikTok">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>
            </button>
          </div>
        </div>

        {/* ═══ MATERIALES ═══ */}
        {post.materialesEmoji && post.materialesEmoji.length > 0 && (
          <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
            <div className="bg-tinki-dark px-4 py-2.5">
              <span className="text-xs font-bold text-white">🧰 Materiales</span>
            </div>
            <ul className="px-4 py-3 space-y-1.5">
              {post.materialesEmoji.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-tight text-tinki-dark/65">
                  <span className="mt-px flex-shrink-0">{m.emoji}</span>
                  <span>{m.texto}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ═══ ¿QUÉ APRENDES? ═══ */}
        {post.aprendeCallout && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-base">🧠</span>
              <span className="text-xs font-bold text-amber-800">¿Qué aprendes?</span>
            </div>
            <p className="text-xs leading-relaxed text-amber-900/75 mb-2">{post.aprendeCallout.concepto}</p>
            <ul className="space-y-1">
              {post.aprendeCallout.puntos.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs leading-relaxed text-amber-900/70">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ═══ ¿SABÍAS QUE...? ═══ */}
        {post.sabiasCallout && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-base">💡</span>
              <span className="text-xs font-bold text-blue-800">¿Sabías que...?</span>
            </div>
            <p className="text-xs leading-relaxed text-blue-900/75">{post.sabiasCallout.dato}</p>
          </div>
        )}

      </div>
    </aside>
  );
}
