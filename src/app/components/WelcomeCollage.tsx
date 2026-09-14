'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { SITE_IMAGES } from '@/lib/siteImages';

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

type WelcomeCollageProps = {
  children?: ReactNode;
};

/**
 * Welcome triptych: one photograph until you scroll in, then the frames
 * pop out left-to-right into the original overlapping, tilted collage.
 */
export default function WelcomeCollage({ children }: WelcomeCollageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.92;
      const end = vh * 0.34;
      const next = clamp01((start - rect.top) / (start - end));
      setProgress(next);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const leftSpread = easeOutCubic(clamp01(progress / 0.7));
  const midSpread = easeOutCubic(clamp01((progress - 0.08) / 0.7));
  const rightSpread = easeOutCubic(clamp01((progress - 0.3) / 0.7));

  return (
    <>
      <div ref={ref} className="mx-auto max-w-[2000px]">
        <div
          className="welcome-collage-grid grid grid-cols-3 px-3 pb-10 pt-10 sm:pb-8 sm:pt-12 md:px-4 md:pb-24 md:pt-20 lg:px-6 lg:pb-28 lg:pt-24"
          style={{
            ['--left-spread' as string]: String(leftSpread),
            ['--mid-spread' as string]: String(midSpread),
            ['--right-spread' as string]: String(rightSpread),
            ['--collage-spread' as string]: String(midSpread),
          }}
        >
          <div className="welcome-pop-left relative z-[1] aspect-[4/5] md:h-auto md:min-h-[min(85vh,900px)]">
            <div className="mood-board-bob lift-shadow relative h-full overflow-hidden rounded-none md:min-h-[min(85vh,900px)]">
              <Image
                src={SITE_IMAGES.moodField}
                alt="Inspiration one — portrait & light"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 34vw, 33vw"
              />
            </div>
          </div>
          <div className="welcome-pop-mid relative z-[2] aspect-[4/5] md:h-auto md:min-h-[min(85vh,900px)]">
            <div className="mood-board-bob mood-board-bob--b lift-shadow relative h-full overflow-hidden rounded-none md:min-h-[min(85vh,900px)]">
              <Image
                src={SITE_IMAGES.moodArch}
                alt="Inspiration two — color & mood"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 34vw, 33vw"
              />
            </div>
          </div>
          <div className="welcome-pop-right relative z-[1] aspect-[4/5] md:h-auto md:min-h-[min(85vh,900px)]">
            <div className="mood-board-bob mood-board-bob--c lift-shadow relative h-full overflow-hidden rounded-none md:min-h-[min(85vh,900px)]">
              <Image
                src={SITE_IMAGES.moodFilm}
                alt="Inspiration three — tone & texture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 34vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
