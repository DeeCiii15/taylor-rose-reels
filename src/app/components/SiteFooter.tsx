'use client';

import Link from 'next/link';
import { FOOTER_SERVICE_LINKS } from '@/lib/servicesData';
import {
  FLORENCE_WEDDINGS_PATH,
  FLORENCE_WEDDINGS_TITLE_SHORT,
  PHOTOGRAPHER_PHONE_DISPLAY,
  PHOTOGRAPHER_PHONE_TEL,
  SERVICE_AREA_LABEL,
  SITE_NAME,
} from '@/lib/siteConfig';
import { getSocialLinks } from '@/lib/siteSocial';
import { SocialNetworkIcon } from './SocialMediaIcons';

/** Centered brand footer — matches home page */
export default function SiteFooter() {
  const socialLinks = getSocialLinks();

  return (
    <footer className="paper-bar relative border-t border-boho-sage/25 px-6 py-12 dark:border-boho-stone/40 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <address className="flex flex-col items-center not-italic">
          <p className="font-script text-3xl text-coral dark:text-[#d4a574] md:text-4xl">
            {SITE_NAME}
          </p>
          <a
            href={PHOTOGRAPHER_PHONE_TEL}
            className="mt-3 font-body text-xs font-light leading-relaxed text-cream-dark/65 transition hover:text-coral dark:text-cream/60 dark:hover:text-[#e8b896]"
          >
            {PHOTOGRAPHER_PHONE_DISPLAY}
          </a>
          <p className="mt-3 max-w-md font-body text-xs font-light leading-relaxed text-cream-dark/55 dark:text-cream/50">
            {SERVICE_AREA_LABEL}
          </p>
        </address>
        <nav
          aria-label="Photography services"
          className="flex max-w-xl flex-col items-center gap-3"
        >
          <p className="section-eyebrow text-boho-sage">Services</p>
          <ul className="flex flex-wrap items-center justify-center gap-y-2">
            {FOOTER_SERVICE_LINKS.map((link, index) => (
              <li key={link.href} className="inline-flex items-center">
                {index > 0 && (
                  <span
                    aria-hidden
                    className="mx-2.5 text-cream-dark/30 dark:text-cream/25"
                  >
                    ·
                  </span>
                )}
                <Link
                  href={link.href}
                  className="font-body text-xs font-light text-cream-dark/65 transition hover:text-coral dark:text-cream/60 dark:hover:text-[#e8b896]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={FLORENCE_WEDDINGS_PATH}
            className="font-body text-xs font-light text-cream-dark/65 transition hover:text-coral dark:text-cream/60 dark:hover:text-[#e8b896]"
          >
            {FLORENCE_WEDDINGS_TITLE_SHORT}
          </Link>
        </nav>
        {socialLinks.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.network}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-boho-sage/30 bg-gradient-to-br from-[#faf8f4] to-[#ebe8df] text-coral shadow-[0_1px_0_rgba(255,255,253,0.8)_inset] transition hover:border-boho-sage/45 hover:bg-boho-sage/10 active:bg-boho-sage/15 dark:border-boho-stone/50 dark:from-boho-bark dark:to-boho-ink dark:text-[#e8b896] dark:hover:bg-white/10"
              >
                <SocialNetworkIcon
                  network={link.network}
                  className="h-[17px] w-[17px]"
                />
              </a>
            ))}
          </div>
        )}
        <p className="text-xs text-cream-dark/50 dark:text-cream/45">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
