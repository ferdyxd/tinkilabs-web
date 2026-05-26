'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Animation = 'rise' | 'scale' | 'left' | 'right';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
}

const baseClass: Record<Animation, string> = {
  rise: 'anim-rise',
  scale: 'anim-scale',
  left: 'anim-left',
  right: 'anim-right',
};

export function ScrollReveal({ children, animation = 'rise', delay = 0, className = '' }: ScrollRevealProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${baseClass[animation]} ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
