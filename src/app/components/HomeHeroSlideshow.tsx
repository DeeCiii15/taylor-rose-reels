'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { HERO_SLIDES } from '@/lib/siteImages';

const INTERVAL_MS = 6500;
/** Short fade avoids two semi-opaque layers stacking (reads as soft / “blurry”). */
const FADE_MS = 450;
/** Photographer-sharp web derivative — not default 75, which can soften grain. */
const HERO_QUALITY = 92;

type HomeHeroSlideshowProps = {
  children: ReactNode;
};

export default function HomeHeroSlideshow({ children }: HomeHeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState<number | null>(null);
  const prevIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const prev = prevIndexRef.current;
    prevIndexRef.current = index;
    if (prev === null || prev === index) return;

    setExiting(prev);
    const timeout = window.setTimeout(() => setExiting(null), FADE_MS);
    return () => window.clearTimeout(timeout);
  }, [index]);

  const nextIndex = (index + 1) % HERO_SLIDES.length;

  return (
    <section className="relative min-h-svh w-full" data-no-reveal>
      <div className="absolute inset-0" aria-hidden>
        {HERO_SLIDES.map((slide, idx) => {
          const isCurrent = idx === index;
          const isExiting = idx === exiting;
          const isNext = idx === nextIndex;
          if (!isCurrent && !isExiting && !isNext) return null;

          return (
            <div
              key={slide.src}
              className={`absolute inset-0 overflow-hidden ${
                isCurrent ? 'z-[1]' : 'z-0'
              }`}
              style={{
                opacity: isCurrent ? 1 : 0,
                transition: `opacity ${FADE_MS}ms ease-out`,
                backfaceVisibility: 'hidden',
              }}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                className="hero-photo-drift object-cover"
                style={{
                  objectPosition: slide.objectPosition,
                  animationDelay: `${-idx * 7}s`,
                }}
                sizes="100vw"
                quality={HERO_QUALITY}
                priority={idx === 0}
                fetchPriority={isCurrent ? 'high' : 'low'}
              />
            </div>
          );
        })}
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#2a231c]/65 via-[#2a231c]/10 to-[#2a231c]/25"
        aria-hidden
      />
      <div className="relative z-[3]">{children}</div>
    </section>
  );
}
