'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FLORENCE_WEDDINGS_PATH } from '@/lib/siteConfig';
import { FOOTER_SERVICE_LINKS } from '@/lib/servicesData';

/** Routes that open with a full-bleed hero the nav floats over (transparent until scrolled) */
const HERO_ROUTES = new Set<string>(['/', FLORENCE_WEDDINGS_PATH]);

function ServicesChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`ml-1 h-3 w-3 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const onHero = HERO_ROUTES.has(pathname) && !scrolled;
  const onServices = pathname.startsWith('/services');

  const clearServicesCloseTimer = () => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
  };

  const openServices = () => {
    clearServicesCloseTimer();
    setServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    clearServicesCloseTimer();
    servicesCloseTimer.current = setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimer.current = null;
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    clearServicesCloseTimer();
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => clearServicesCloseTimer();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        clearServicesCloseTimer();
        setServicesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearServicesCloseTimer();
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [servicesOpen]);

  /** Lora, small caps label style (aligned with site eyebrows, slightly looser tracking for words) */
  const linkClass = onHero
    ? 'font-body rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/95 transition hover:bg-white/15 hover:text-white xl:px-3.5 xl:tracking-[0.2em]'
    : 'font-body rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-coral transition hover:bg-coral/12 hover:text-coral-dark dark:text-[#e8c4a8] dark:hover:bg-white/10 dark:hover:text-[#f2dcc4] xl:px-3.5 xl:tracking-[0.2em]';

  const mobileLinkClass =
    'touch-manipulation rounded-xl px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream-dark active:bg-boho-sage/15 dark:text-cream';

  const mobileSubLinkClass =
    'touch-manipulation rounded-xl py-2.5 pl-8 pr-5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream-dark/80 active:bg-boho-sage/15 dark:text-cream/80';

  const dropdownItemClass =
    'font-body block rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-cream-dark transition hover:bg-coral/10 hover:text-coral dark:text-cream dark:hover:bg-white/10 dark:hover:text-[#e8b896]';

  const navSurface = onHero
    ? 'border-transparent bg-transparent'
    : 'paper-bar border-b border-boho-sage/25 shadow-soft dark:border-boho-stone/40';

  const desktopPill = onHero
    ? 'border-white/30 bg-white/15 shadow-sm backdrop-blur-lg dark:border-white/20 dark:bg-black/25'
    : 'border-coral/25 bg-white/70 shadow-soft backdrop-blur-md dark:border-[#c9a574]/35 dark:bg-boho-bark/75';

  const servicesDropdownSurface = onHero
    ? 'border-white/25 bg-[#2a2622]/95 shadow-soft backdrop-blur-lg'
    : 'border-[#e0d9ce] bg-[#faf8f4]/98 shadow-[0_16px_40px_rgba(61,52,44,0.12)] backdrop-blur-md dark:border-boho-stone/40 dark:bg-boho-bark/95';

  const servicesDropdownItemClass = onHero
    ? 'font-body block rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 transition hover:bg-white/15 hover:text-white'
    : dropdownItemClass;

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[60] transition-[background-color,border-color,box-shadow,color] duration-300 ${navSurface}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        <div className="relative flex h-14 shrink-0 items-center justify-between gap-3 md:h-16">
          <Link
            href="/"
            className="group flex min-w-0 max-w-[min(100%,14rem)] shrink-0 flex-col justify-center gap-0.5 sm:max-w-[16rem] md:max-w-[18rem]"
          >
            {onHero ? (
              <span className="font-script text-2xl leading-none text-white drop-shadow-md transition-opacity group-hover:opacity-90 md:text-[1.85rem]">
                Taylor Rose Reels
              </span>
            ) : (
              <span className="font-script text-2xl text-coral transition-opacity group-hover:opacity-85 dark:text-[#e8c4a8] md:text-[1.85rem]">
                Taylor Rose Reels
              </span>
            )}
          </Link>

          <div className="absolute left-1/2 hidden max-w-[min(52rem,calc(100vw_-_9rem))] -translate-x-1/2 lg:flex lg:justify-center">
            <div
              className={`flex max-w-full flex-nowrap items-center justify-center gap-0 rounded-full border px-2 py-1 font-body ${desktopPill}`}
            >
              <Link href="/#about" className={linkClass}>
                About
              </Link>
              <Link href="/portfolio" className={linkClass}>
                Portfolio
              </Link>

              <div
                ref={servicesRef}
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={scheduleCloseServices}
              >
                <button
                  type="button"
                  className={`${linkClass} inline-flex items-center ${onServices ? (onHero ? 'bg-white/15' : 'bg-coral/12') : ''}`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  onClick={() => {
                    clearServicesCloseTimer();
                    setServicesOpen((open) => !open);
                  }}
                >
                  Services
                  <ServicesChevron open={servicesOpen} />
                </button>

                {servicesOpen && (
                  <div
                    role="menu"
                    aria-label="Photography services"
                    className="absolute left-1/2 top-full z-[70] w-56 -translate-x-1/2 pt-2"
                  >
                    {/* pt-2 keeps a hover bridge so the menu doesn’t close while moving down */}
                    <div
                      className={`rounded-2xl border p-2 ${servicesDropdownSurface}`}
                    >
                      {FOOTER_SERVICE_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          role="menuitem"
                          className={servicesDropdownItemClass}
                          onClick={() => {
                            clearServicesCloseTimer();
                            setServicesOpen(false);
                          }}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/blog" className={linkClass}>
                Blog
              </Link>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`touch-manipulation shrink-0 rounded-full p-3 transition hover:bg-coral/10 dark:hover:bg-white/10 lg:hidden ${onHero ? 'text-white hover:bg-white/15' : 'text-coral hover:bg-coral/10 dark:text-[#e8c4a8] dark:hover:bg-white/10'}`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className={`border-t pb-6 lg:hidden ${onHero ? 'border-white/20' : 'border-dusty-rose/25 dark:border-boho-stone/40'}`}
          >
            <div className="mt-4 flex flex-col gap-0.5 rounded-2xl border border-boho-sage/25 bg-white/95 p-3 font-body shadow-sm backdrop-blur-md dark:border-boho-stone/40 dark:bg-boho-bark/90">
              <Link
                href="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                About
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                Portfolio
              </Link>

              <div>
                <button
                  type="button"
                  className={`${mobileLinkClass} flex w-full items-center justify-between`}
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((open) => !open)}
                >
                  Services
                  <ServicesChevron open={mobileServicesOpen} />
                </button>
                {mobileServicesOpen && (
                  <div className="mb-1 flex flex-col gap-0.5 border-l border-boho-sage/25 ml-5 dark:border-boho-stone/40">
                    {FOOTER_SERVICE_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={mobileSubLinkClass}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
