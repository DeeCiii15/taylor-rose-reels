'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type TransitionEvent,
} from 'react';

type ScrollRevealFromProps = {
  from?: 'up' | 'left' | 'right';
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

/**
 * One-shot scroll pop-in owned by React. Used on interior pages and for
 * Behind the lens so a parent re-render cannot wipe the motion classes.
 */
export default function ScrollRevealFrom({
  from = 'up',
  children,
  className = '',
  delayMs = 0,
}: ScrollRevealFromProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.revealArmed = '1';

    let cancelled = false;
    let revealed = false;
    let raf = 0;

    const viewportHeight = () =>
      window.innerHeight || document.documentElement.clientHeight || 0;

    const reveal = () => {
      if (cancelled || revealed) return;
      revealed = true;
      setVisible(true);
    };

    const check = () => {
      if (cancelled || revealed) return;
      const rect = el.getBoundingClientRect();
      const vh = viewportHeight();
      if (vh <= 0) return;
      if (rect.top < vh * 0.88 && rect.bottom > 48) {
        raf = window.requestAnimationFrame(() => {
          raf = window.requestAnimationFrame(reveal);
        });
      }
    };

    check();
    raf = window.requestAnimationFrame(check);
    const retryA = window.setTimeout(check, 50);
    const retryB = window.setTimeout(check, 250);

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(retryA);
      window.clearTimeout(retryB);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  const onTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== ref.current) return;
    if (event.propertyName !== 'transform' && event.propertyName !== 'opacity') {
      return;
    }
    if (visible) setSettled(true);
  };

  const style: CSSProperties | undefined =
    delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined;

  const motionClass = settled
    ? 'reveal-settled'
    : `reveal-pending reveal-from-${from} ${visible ? 'reveal-in' : ''}`;

  return (
    <div
      ref={ref}
      className={`${motionClass} ${className}`.trim()}
      style={style}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </div>
  );
}
