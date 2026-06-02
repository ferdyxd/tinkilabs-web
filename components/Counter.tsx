'use client';

import { useEffect, useState, useRef } from 'react';

const BASE_COUNT = 418;
const TARGET_COUNT = 308;

interface CounterProps {
  variant?: 'light' | 'dark';
}

export function Counter({ variant = 'light' }: CounterProps) {
  const [count, setCount] = useState(BASE_COUNT);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isDark = variant === 'dark';
  const textMuted = isDark ? 'text-white/40' : 'text-tinki-dark/50';
  const textMain = isDark ? 'text-white/70' : 'text-tinki-dark/70';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const duration = 2000;
    const steps = 40;
    const decrement = Math.ceil((BASE_COUNT - TARGET_COUNT) / steps);
    let current = BASE_COUNT;

    const timer = setInterval(() => {
      current -= decrement;
      if (current <= TARGET_COUNT) {
        setCount(TARGET_COUNT);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [visible]);

  useEffect(() => {
    if (count <= TARGET_COUNT) return;

    const interval = setInterval(() => {
      setCount((prev) => prev - (Math.floor(Math.random() * 2) + 1));
    }, 12000 + Math.random() * 15000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      ref={ref}
      className="text-center transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-4xl font-black text-tinki-orange sm:text-5xl">
          {count}
        </span>
        <span className={`text-lg ${textMain}`}>plazas</span>
      </div>
      <p className={`mt-1 text-sm ${textMuted}`}>
        de Fundador disponibles de 500
      </p>
    </div>
  );
}
