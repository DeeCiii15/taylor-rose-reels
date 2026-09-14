'use client';

import { useEffect, useRef, useState } from 'react';

const LETTER_MS = 52;

type WelcomeTypewriterProps = {
  text?: string;
  className?: string;
};

export default function WelcomeTypewriter({
  text = 'So glad you wandered in.',
  className = '',
}: WelcomeTypewriterProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setCount(text.length);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setStarted(true);
        io.disconnect();
      },
      { threshold: 0.45, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const id = window.setTimeout(() => setCount((n) => n + 1), LETTER_MS);
    return () => window.clearTimeout(id);
  }, [started, count, text]);

  return (
    <h2
      ref={ref}
      className={`relative mx-auto w-fit max-w-xl text-left ${className}`.trim()}
      aria-label={text}
    >
      <span className="invisible select-none" aria-hidden>
        {text}
      </span>
      <span className="absolute inset-0">
        {text.slice(0, count)}
      </span>
    </h2>
  );
}
