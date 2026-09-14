'use client';

import Navigation from './components/Navigation';
import SiteFooter from './components/SiteFooter';
import TestimonialsSection from './components/TestimonialsSection';
import HomeHeroSlideshow from './components/HomeHeroSlideshow';
import Image from 'next/image';
import Link from 'next/link';
import PortfolioHomeGallery from './components/PortfolioHomeGallery';
import ScrollRevealFrom from './components/ScrollRevealFrom';
import WelcomeCollage from './components/WelcomeCollage';
import WelcomeTypewriter from './components/WelcomeTypewriter';
import { SITE_IMAGES } from '@/lib/siteImages';
import {
  PHOTOGRAPHER_IMAGE_ALT,
  PRIMARY_CITY,
  PRIMARY_REGION,
  PRIMARY_STATE_ABBR,
  SERVICE_AREAS,
} from '@/lib/siteConfig';

/**
 * Home: editorial sequence around your inspiration imagery.
 * Type stays small & quiet; photos carry the site.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main id="home">
        {/* Full-viewport hero — rotating inspiration set */}
        <HomeHeroSlideshow>
          <div className="flex min-h-svh flex-col items-center justify-end px-6 pb-16 pt-28 text-center sm:items-start sm:px-10 sm:pb-20 sm:text-left md:pb-24 lg:px-16">
            <h1 className="mx-auto max-w-xl sm:mx-0">
              <span className="type-eyebrow block text-white/88">
                {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} photographer ·{' '}
                {PRIMARY_REGION} · Weddings &amp; portraits
              </span>
              <span className="font-display mt-6 block text-2xl leading-snug text-white/95 sm:text-3xl md:text-[2.15rem]">
                Soft light, honest color, warmth that feels like memory.
              </span>
            </h1>
            <div className="mx-auto mt-6 flex w-full max-w-md flex-row flex-wrap justify-center gap-2 sm:mt-10 sm:mx-0 sm:max-w-none sm:justify-start sm:gap-3 md:flex-row">
              <Link
                href="/portfolio"
                className="font-body inline-flex min-h-10 flex-1 touch-manipulation items-center justify-center border border-white/40 bg-white/95 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#3d342c] transition hover:bg-white sm:min-h-11 sm:w-auto sm:flex-none sm:px-6 sm:py-3 md:tracking-[0.2em]"
              >
                View work
              </Link>
              <Link
                href="/contact"
                className="font-body inline-flex min-h-10 flex-1 touch-manipulation items-center justify-center border border-white/35 bg-transparent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10 sm:min-h-11 sm:w-auto sm:flex-none sm:px-6 sm:py-3 md:tracking-[0.2em]"
              >
                Inquire
              </Link>
            </div>
          </div>
        </HomeHeroSlideshow>

        {/* Breathing room between full-bleed hero & triptych */}
        <div
          className="relative z-[1] border-t border-[#cfc4b2]/60 bg-paper-rule py-10 dark:border-boho-stone/50 md:py-14"
          aria-hidden
        >
          <div className="mx-auto max-w-md border-t border-dashed border-[#b5a892]/70 dark:border-boho-stone/40" />
        </div>

        {/* Moodboards = the palette & range you shoot */}
        <section
          className="relative z-0 border-y border-[#e0d9ce] bg-paper-warm shadow-[inset_0_1px_0_rgba(255,255,253,0.5)] dark:border-boho-stone/40"
          aria-label="Inspiration: three frames"
          data-no-reveal
        >
          <WelcomeCollage>
            <div className="mx-auto max-w-2xl px-5 py-6 text-center sm:px-6 sm:py-10 md:py-12">
              <WelcomeTypewriter
                text="So glad you wandered in."
                className="font-display text-[1.35rem] font-medium leading-snug text-cream-dark dark:text-cream sm:text-4xl md:text-[2.65rem] md:leading-[1.12]"
              />
              <p className="mt-4 font-body text-sm font-light leading-[1.75] text-cream-dark/78 dark:text-cream/72 sm:mt-6 sm:text-[0.975rem] md:text-base">
                This little corner of the internet is a slow scroll through the
                kind of light I love—golden fields, quiet ceremony corners, &
                film-soft black & white. Based in {PRIMARY_CITY}, I&apos;m a
                photographer for weddings & portraits across the {PRIMARY_REGION}{' '}
                & surrounding {PRIMARY_STATE_ABBR} towns like{' '}
                {SERVICE_AREAS.slice(1, 4).join(', ')}, & beyond. Stay as long as
                you like; when you&apos;re ready, we&apos;ll dream up a session
                that feels like you, not a pose list.
              </p>
            </div>
          </WelcomeCollage>
        </section>

        {/* 4 — Photographer (Taylor_site) */}
        <section
          id="about"
          className="scroll-mt-24 overflow-x-clip bg-paper px-4 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28"
          data-no-reveal
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 sm:grid-cols-2 sm:items-center sm:gap-10 lg:gap-20">
            <ScrollRevealFrom
              from="left"
              className="lift-shadow relative mx-auto aspect-[3/4] w-full max-w-md min-w-0 sm:mx-0 sm:max-w-lg lg:max-w-none"
            >
              <Image
                src={SITE_IMAGES.photographer}
                alt={PHOTOGRAPHER_IMAGE_ALT}
                fill
                className="object-cover object-[center_15%]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
            </ScrollRevealFrom>
            <ScrollRevealFrom from="right" delayMs={120} className="min-w-0 w-full sm:text-left">
              <p className="section-eyebrow text-boho-sage">Behind the lens</p>
              <h2 className="mt-2 font-display text-[1.35rem] font-medium leading-snug text-cream-dark dark:text-cream sm:mt-4 sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
                Every photo tells a story; I'd love to help you tell yours.
              </h2>
              <div className="mx-auto mt-4 max-w-md space-y-3 text-center font-body text-[0.8rem] font-light leading-[1.75] text-cream-dark/82 dark:text-cream/78 max-sm:px-1 sm:mt-8 sm:max-w-none sm:space-y-5 sm:px-0 sm:text-left sm:text-[0.95rem] sm:leading-[1.8]">
                <p>
                  Hi, friend! I&apos;m Taylor Hayden, the owner & heart behind
                  Taylor Rose Reels. I&apos;m so glad you&apos;re here!
                </p>
                <p>
                  I photograph weddings, families, and portraits in{' '}
                  {PRIMARY_CITY}, {PRIMARY_STATE_ABBR} and across the{' '}
                  {PRIMARY_REGION}.
                </p>
                <p>
                  Photography is more than just taking pictures—it&apos;s about
                  preserving the moments that make your story uniquely yours.
                  Whether it&apos;s the joyful chaos of family life, a milestone
                  worth celebrating, or the little in-between moments you never
                  want to forget, I&apos;m here to capture it all.
                </p>
                <p>
                  When I&apos;m not behind the camera, you can usually find me
                  wandering through a thrift store treasure hunting, chasing
                  after my three sweet girls, or curled up editing galleries &
                  reliving the beautiful memories I&apos;ve had the honor of
                  documenting. I&apos;m a wife, a mama, & an artist with a
                  passion for turning fleeting moments into lasting keepsakes.
                </p>
                <p>
                  My goal is to create a fun, relaxed experience where you can
                  simply be yourself while I capture the genuine smiles,
                  laughter, & connections that matter most.
                </p>
                <p>
                  Take a look around, explore my work, & when you&apos;re
                  ready, I&apos;d love to connect. Let&apos;s create something
                  beautiful together & turn your moments into memories
                  you&apos;ll cherish for years to come.
                </p>
              </div>
            </ScrollRevealFrom>
          </div>
        </section>

        {/* 5 — More work (portfolio categories) */}
        <ScrollRevealFrom from="up">
        <section
          id="portfolio"
          className="scroll-mt-24 border-t border-[#e0d9ce] bg-paper-soft px-6 py-20 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-xl lg:mb-16">
              <p className="section-eyebrow text-boho-sage">Galleries</p>
              <h2 className="mt-3 font-display text-2xl font-medium text-cream-dark dark:text-cream md:text-3xl">
                More stories, same light
              </h2>
              <p className="mt-4 font-body text-sm font-light leading-relaxed text-cream-dark/72 dark:text-cream/68">
                True to color and timeless by design—click any card to wander deeper.
              </p>
            </div>
            <PortfolioHomeGallery variant="home" />
          </div>
        </section>
        </ScrollRevealFrom>

        <ScrollRevealFrom from="up">
          <TestimonialsSection />
        </ScrollRevealFrom>
      </main>

      <SiteFooter />
    </div>
  );
}
