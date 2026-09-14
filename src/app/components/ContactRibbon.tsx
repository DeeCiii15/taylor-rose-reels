'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PHOTOGRAPHER_EMAIL, PHOTOGRAPHER_PHONE_DISPLAY, PHOTOGRAPHER_PHONE_TEL } from '@/lib/siteConfig';
import { getSocialLinks } from '@/lib/siteSocial';
import { SocialHubIcon, SocialNetworkIcon } from './SocialMediaIcons';

/** Classic handset — same stroke weight as the envelope */
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M7.4 3.7c.4-.4 1-.5 1.5-.4l2 .5c.6.1 1 .6 1.1 1.2l.5 2.1c.1.6-.1 1.1-.6 1.4l-1.4 1c1.1 2 2.7 3.6 4.8 4.8l1-1.4c.3-.5.8-.7 1.4-.6l2.1.5c.6.1 1.1.5 1.2 1.1l.5 2c.1.5 0 1.1-.4 1.5-1.1 1.2-2.9 1.8-4.6 1.3-5.4-1.6-9.8-6-11.4-11.4-.5-1.7.1-3.5 1.3-4.6Z"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Linen-fold envelope — gentle curves, same weight as phone */
function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 8.2 12 14l8-5.8"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M5.2 6.5h13.6c.7 0 1.3.6 1.3 1.3v8.4c0 .7-.6 1.3-1.3 1.3H5.2c-.7 0-1.3-.6-1.3-1.3V7.8c0-.7.6-1.3 1.3-1.3Z"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M4 17.3 9.2 12"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.85}
      />
      <path
        d="M20 17.3 14.8 12"
        stroke="currentColor"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.85}
      />
    </svg>
  );
}

function IconMat({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-boho-sage/30 bg-gradient-to-br from-[#faf8f4] to-[#ebe8df] text-coral shadow-[0_1px_0_rgba(255,255,253,0.8)_inset] dark:border-boho-stone/50 dark:from-boho-bark dark:to-boho-ink dark:text-[#e8b896] sm:h-7 sm:w-7">
      {children}
    </span>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

const fabBubbleClass =
  'pointer-events-auto flex h-14 w-14 shrink-0 touch-manipulation items-center justify-center rounded-full border border-boho-sage/30 bg-white/95 text-coral shadow-lg backdrop-blur-md transition-all duration-200 dark:border-boho-stone/50 dark:bg-boho-bark/90 dark:text-[#e8b896] active:scale-95';

/** Mobile: one FAB expands into social + contact; sheets unchanged */
function MobileContactRibbons() {
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const socialLinks = getSocialLinks();
  const hasSocials = socialLinks.length > 0;
  const sheetOpen = contactOpen || socialOpen;

  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContactOpen(false);
        setSocialOpen(false);
        setFabMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [sheetOpen]);

  useEffect(() => {
    if (!fabMenuOpen || sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFabMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fabMenuOpen, sheetOpen]);

  const openContact = () => {
    setSocialOpen(false);
    setFabMenuOpen(false);
    setContactOpen(true);
  };

  const openSocial = () => {
    setContactOpen(false);
    setFabMenuOpen(false);
    setSocialOpen(true);
  };

  const closeFabMenu = () => setFabMenuOpen(false);

  return (
    <div className="sm:hidden">
      {/* Dim + tap outside to collapse speed-dial (sheets use their own scrims) */}
      <div
        className={`fixed inset-0 z-40 bg-[#2a231c]/40 transition-opacity duration-200 dark:bg-black/50 ${
          fabMenuOpen && !sheetOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!fabMenuOpen || sheetOpen}
        onClick={closeFabMenu}
      />

      {/* Branch layout: satellites share bottom-right with the main FAB */}
      <div
        className="pointer-events-none fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] right-3 z-50 h-[min(11.75rem,calc(100dvh-6rem))] w-[min(10.75rem,calc(100vw-1.5rem))]"
        role="group"
        aria-label="Contact & social"
      >
        <div className="pointer-events-none relative h-full w-full">
          {fabMenuOpen && (
            <>
              <a
                href={PHOTOGRAPHER_PHONE_TEL}
                onClick={closeFabMenu}
                aria-label={`Call ${PHOTOGRAPHER_PHONE_DISPLAY}`}
                className={`absolute bottom-0 right-0 z-[5] origin-bottom-right ${
                  hasSocials
                    ? '-translate-x-[0.15rem] -translate-y-[5.35rem]'
                    : '-translate-x-[1.95rem] -translate-y-[4.65rem]'
                } ${fabBubbleClass}`}
              >
                <PhoneIcon className="h-6 w-6" />
              </a>
              {hasSocials && (
                <button
                  type="button"
                  onClick={openSocial}
                  aria-label="Open social links"
                  className={`absolute bottom-0 right-0 z-[5] origin-bottom-right -translate-x-[3.7rem] -translate-y-[3.7rem] ${fabBubbleClass}`}
                >
                  <SocialHubIcon className="h-6 w-6" />
                </button>
              )}
              <button
                type="button"
                onClick={openContact}
                aria-label="Open contact options"
                className={`absolute bottom-0 right-0 z-[5] origin-bottom-right ${
                  hasSocials
                    ? '-translate-x-[5.35rem] -translate-y-[0.2rem]'
                    : '-translate-x-[4.45rem] -translate-y-[1.2rem]'
                } ${fabBubbleClass}`}
              >
                <MailIcon className="h-6 w-6" />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setFabMenuOpen((o) => !o)}
            aria-expanded={fabMenuOpen}
            aria-haspopup="true"
            aria-label={fabMenuOpen ? 'Close quick actions' : 'Open quick actions'}
            className={`absolute bottom-0 right-0 z-10 ${fabBubbleClass}`}
          >
            {fabMenuOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <Image
                src="/images/rose-favicon.png"
                alt=""
                width={108}
                height={108}
                quality={100}
                sizes="36px"
                className="h-9 w-9 object-contain"
                aria-hidden
                unoptimized
              />
            )}
          </button>
        </div>
      </div>

      {hasSocials && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-[#2a231c]/40 transition-opacity duration-300 dark:bg-black/50 ${
              socialOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={!socialOpen}
            onClick={() => setSocialOpen(false)}
          />

          <div
            className={`fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-2xl border border-[#e0d9ce] bg-[#faf8f4]/98 shadow-[0_-8px_40px_rgba(61,52,44,0.15)] transition-transform duration-300 ease-out dark:border-boho-stone/40 dark:bg-boho-bark/98 ${
              socialOpen
                ? 'pointer-events-auto translate-y-0'
                : 'pointer-events-none translate-y-full'
            }`}
            style={{
              paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Social media"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-[#e0d9ce]/80 bg-[#faf8f4]/95 px-4 py-3 backdrop-blur-sm dark:border-boho-stone/35 dark:bg-boho-bark/95">
              <p className="font-display text-xl text-cream-dark dark:text-cream">
                Follow along
              </p>
              <button
                type="button"
                onClick={() => setSocialOpen(false)}
                className="touch-manipulation rounded-full p-2.5 text-coral transition hover:bg-boho-sage/15 dark:text-[#e8b896] dark:hover:bg-white/10"
                aria-label="Close social panel"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1 px-3 py-4">
              {socialLinks.map((link) => (
                <a
                  key={link.network}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSocialOpen(false)}
                  className="flex min-h-14 touch-manipulation items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-boho-sage/12 active:bg-boho-sage/18 dark:hover:bg-white/10"
                >
                  <IconMat>
                    <SocialNetworkIcon
                      network={link.network}
                      className="h-[15px] w-[15px]"
                    />
                  </IconMat>
                  <div className="min-w-0">
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-cream-dark/55 dark:text-cream/50">
                      {link.label}
                    </p>
                    <p className="truncate font-body text-base font-medium text-coral dark:text-[#e8b896]">
                      {link.href.replace(/^https?:\/\/(www\.)?/, '')}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      <div
        className={`fixed inset-0 z-40 bg-[#2a231c]/40 transition-opacity duration-300 dark:bg-black/50 ${
          contactOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!contactOpen}
        onClick={() => setContactOpen(false)}
      />

      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-2xl border border-[#e0d9ce] bg-[#faf8f4]/98 shadow-[0_-8px_40px_rgba(61,52,44,0.15)] transition-transform duration-300 ease-out dark:border-boho-stone/40 dark:bg-boho-bark/98 ${
          contactOpen
            ? 'pointer-events-auto translate-y-0'
            : 'pointer-events-none translate-y-full'
        }`}
        style={{
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Contact Taylor Rose Reels"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-[#e0d9ce]/80 bg-[#faf8f4]/95 px-4 py-3 backdrop-blur-sm dark:border-boho-stone/35 dark:bg-boho-bark/95">
          <p className="font-display text-xl text-cream-dark dark:text-cream">
            Get in touch
          </p>
          <button
            type="button"
            onClick={() => setContactOpen(false)}
            className="touch-manipulation rounded-full p-2.5 text-coral transition hover:bg-boho-sage/15 dark:text-[#e8b896] dark:hover:bg-white/10"
            aria-label="Close contact panel"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col gap-1 px-3 py-4">
          <a
            href={PHOTOGRAPHER_PHONE_TEL}
            onClick={() => setContactOpen(false)}
            className="flex min-h-14 touch-manipulation items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-boho-sage/12 active:bg-boho-sage/18 dark:hover:bg-white/10"
          >
            <IconMat>
              <PhoneIcon className="h-[15px] w-[15px]" />
            </IconMat>
            <div className="min-w-0">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-cream-dark/55 dark:text-cream/50">
                Call
              </p>
              <p className="font-body text-base font-medium text-coral dark:text-[#e8b896]">
                {PHOTOGRAPHER_PHONE_DISPLAY}
              </p>
            </div>
          </a>
          <a
            href={`mailto:${PHOTOGRAPHER_EMAIL}?subject=Inquiry%20from%20Taylor%20Rose%20Reels`}
            onClick={() => setContactOpen(false)}
            className="flex min-h-14 touch-manipulation items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-boho-sage/12 active:bg-boho-sage/18 dark:hover:bg-white/10"
          >
            <IconMat>
              <MailIcon className="h-[15px] w-[15px]" />
            </IconMat>
            <div className="min-w-0">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-cream-dark/55 dark:text-cream/50">
                Email
              </p>
              <p className="break-all font-body text-base font-medium text-coral dark:text-[#e8b896]">
                {PHOTOGRAPHER_EMAIL}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ContactRibbon() {
  return <MobileContactRibbons />;
}
