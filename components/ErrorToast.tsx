'use client';

import { useState, useCallback } from 'react';

export function useErrorToast() {
  const [error, setError] = useState<string | null>(null);
  const showError = useCallback((msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 6000);
  }, []);
  const clearError = useCallback(() => setError(null), []);
  return { error, showError, clearError };
}

export function ErrorToast({ message, onRetry, onDismiss }: { message: string; onRetry?: () => void; onDismiss: () => void }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-red-100 bg-white px-5 py-4 shadow-lg shadow-red-500/5 animate-in slide-in-from-bottom-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-xs">⚠</span>
        <p className="flex-1 text-[13px] leading-relaxed text-tinki-dark/70">{message}</p>
        <button onClick={onDismiss} className="flex-shrink-0 text-tinki-dark/25 hover:text-tinki-dark/50 transition-colors">✕</button>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 text-[12px] font-semibold text-tinki-orange hover:underline"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
