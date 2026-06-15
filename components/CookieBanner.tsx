'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

const STORAGE_KEY = 'tinkilabs_cookies';

type Consent = 'accepted' | 'rejected' | null;

function getStored(): Consent {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === 'accepted' || v === 'rejected') return v;
  return null;
}

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null); // null = loading
  const reduce = useReducedMotion();

  useEffect(() => {
    setConsent(getStored());
  }, []);

  const decide = useCallback((value: 'accepted' | 'rejected') => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }, []);

  // Don't render anything during SSR or if decision already made
  if (consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={reduce ? false : { y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 left-4 right-4 z-[100] sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm"
        role="dialog"
        aria-label="Consentimiento de cookies"
      >
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.02]">
          <p className="text-[13px] leading-relaxed text-tinki-dark/65">
            Usamos cookies propias para que la web funcione y cookies de Vercel
            Analytics para saber si nos lee alguien.{' '}
            <a
              href="/privacidad"
              className="font-medium text-tinki-orange underline underline-offset-2 hover:text-tinki-orange-dark transition-colors"
            >
              Más info
            </a>
          </p>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => decide('rejected')}
              className="flex-1 rounded-xl border border-neutral-200 px-4 py-2.5 text-[13px] font-semibold text-tinki-dark/50 transition-all hover:bg-neutral-50 hover:text-tinki-dark/70 active:scale-[0.98]"
            >
              Solo necesarias
            </button>
            <button
              type="button"
              onClick={() => decide('accepted')}
              className="flex-1 rounded-xl bg-tinki-orange px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#E55A2B] active:scale-[0.98]"
            >
              Aceptar
            </button>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
