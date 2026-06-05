'use client';

import { useState, useEffect, useCallback } from 'react';

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function getSavedPosts(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('tinkilabs_saved');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePosts(slugs: string[]) {
  localStorage.setItem('tinkilabs_saved', JSON.stringify(slugs));
}

export function SaveButton({ slug }: { slug: string }) {
  const [saved, setSaved] = useState(false);
  const [beating, setBeating] = useState(false);

  useEffect(() => {
    const savedPosts = getSavedPosts();
    setSaved(savedPosts.includes(slug));
  }, [slug]);

  const toggle = useCallback(() => {
    const savedPosts = getSavedPosts();
    const next = savedPosts.includes(slug)
      ? savedPosts.filter((s: string) => s !== slug)
      : [...savedPosts, slug];
    savePosts(next);
    setSaved(next.includes(slug));

    if (next.includes(slug)) {
      setBeating(true);
      setTimeout(() => setBeating(false), 400);
    }
  }, [slug]);

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium
        transition-colors duration-200 ease-out
        active:scale-95
        ${saved
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'text-tinki-dark/35 hover:text-tinki-dark hover:bg-neutral-100'
        }`}
      style={{ transition: 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1), background-color 200ms ease-out, color 200ms ease-out' }}
      aria-label={saved ? 'Quitar de guardados' : 'Guardar proyecto'}
    >
      <span
        className={`inline-flex ${beating ? 'animate-bounce' : ''}`}
        style={beating ? { animationDuration: '400ms' } : undefined}
      >
        <HeartIcon filled={saved} />
      </span>
      <span>{saved ? 'Guardado' : 'Guardar'}</span>
    </button>
  );
}
