'use client';

import { useEffect, useRef } from 'react';

interface HeroTitleProps {
  words: string[];
}

export function HeroTitle({ words }: HeroTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('hero-title-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <h1
      ref={containerRef}
      className="hero-title"
      aria-label={words.join(' ')}
    >
      {words.map((word, i) => {
        const side = i % 2 === 0 ? 'left' : 'right';
        return (
          <span
            key={i}
            className={`hero-word hero-word-${side}`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            {word}
          </span>
        );
      })}
    </h1>
  );
}
