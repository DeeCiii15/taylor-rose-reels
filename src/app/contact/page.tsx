import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import HomeStylePageIntro from '../components/HomeStylePageIntro';
import RevealMainChildren from '../components/RevealMainChildren';
import BookingForm from '../components/BookingForm';
import Image from 'next/image';
import { pageShareMeta } from '@/lib/shareMeta';
import {
  PHOTOGRAPHER_EMAIL,
  PHOTOGRAPHER_IMAGE_ALT,
  PHOTOGRAPHER_PHONE_DISPLAY,
  PHOTOGRAPHER_PHONE_TEL,
  SITE_NAME,
} from '@/lib/siteConfig';
import { SITE_IMAGES } from '@/lib/siteImages';

const CONTACT_TITLE = `Contact a Florence, SC Photographer | ${SITE_NAME}`;
const CONTACT_DESCRIPTION =
  'Book wedding, portrait, engagement, family & event photography in Florence, SC & the Pee Dee. Share your date or vision—Taylor reads every message.';

const contactShare = pageShareMeta({
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  url: '/contact',
  image: SITE_IMAGES.contactPhoto,
  imageAlt: PHOTOGRAPHER_IMAGE_ALT,
});

export const metadata: Metadata = {
  title: {
    absolute: CONTACT_TITLE,
  },
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: '/contact' },
  ...contactShare,
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HomeStylePageIntro />

      <main>
        <RevealMainChildren>
        <section className="scroll-mt-24 border-t border-[#e0d9ce] bg-paper-soft px-6 py-16 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="section-eyebrow text-boho-sage">Contact</p>
            <h1 className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream md:text-3xl lg:text-[2.35rem] md:leading-[1.12]">
              Share your event vision with me
            </h1>
            <p className="mt-5 max-w-xl font-body text-sm font-light leading-[1.75] text-cream-dark/78 dark:text-cream/72 md:text-base">
              Share your date, venue, or vision for weddings, portraits,
              engagements, motherhood sessions, family photos, or special
              events—I read every message myself.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-14">
              <div className="lift-shadow relative hidden aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-[#e8e3db] dark:bg-boho-ink sm:max-w-md lg:col-span-5 lg:block lg:aspect-auto lg:max-w-none lg:min-h-0 lg:h-full lg:rounded-2xl">
                <Image
                  src={SITE_IMAGES.contactPhoto}
                  alt={PHOTOGRAPHER_IMAGE_ALT}
                  fill
                  className="object-cover object-[center_15%]"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
              </div>
              <div className="min-w-0 flex min-h-0 flex-col lg:col-span-7">
                <div className="lift-shadow relative flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-visible rounded-2xl border border-[#e0d9ce] bg-[#faf8f4] p-6 ring-1 ring-[#e8e3db]/80 dark:border-boho-stone/40 dark:bg-boho-bark dark:ring-boho-stone/25 sm:p-8 md:p-10">
                  <h2 className="mb-6 font-display text-xl font-medium leading-snug text-cream-dark dark:text-cream md:text-2xl">
                    Send a message
                  </h2>
                  <BookingForm className="mx-0 max-w-xl" />
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-8 sm:gap-y-2">
              <a
                href={PHOTOGRAPHER_PHONE_TEL}
                className="font-display inline-block text-xl text-coral transition hover:text-coral-dark md:text-[1.65rem]"
              >
                {PHOTOGRAPHER_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${PHOTOGRAPHER_EMAIL}?subject=Inquiry%20from%20Taylor%20Rose%20Reels`}
                className="font-display inline-block text-xl text-coral transition hover:text-coral-dark md:text-[1.65rem]"
              >
                {PHOTOGRAPHER_EMAIL}
              </a>
            </div>
          </div>
        </section>
        </RevealMainChildren>
      </main>

      <SiteFooter />
    </div>
  );
}
