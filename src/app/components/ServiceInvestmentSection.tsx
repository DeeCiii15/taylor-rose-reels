import Image from 'next/image';
import Link from 'next/link';
import type { ServicePricing } from '@/lib/servicePricing';

const POLAROID_TILTS = [
  '-rotate-[2.25deg]',
  'rotate-[1.85deg]',
  '-rotate-[1.5deg]',
] as const;

type ServiceInvestmentSectionProps = {
  pricing: ServicePricing;
  ctaLabel: string;
};

export default function ServiceInvestmentSection({
  pricing,
  ctaLabel,
}: ServiceInvestmentSectionProps) {
  return (
    <section
      id="investment"
      className="scroll-mt-24 border-t border-[#e0d9ce] bg-paper px-6 py-14 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-16"
      aria-labelledby="service-investment-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="service-investment-heading"
          className="section-eyebrow text-boho-sage"
        >
          Investment
        </h2>
        <p className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream sm:text-3xl md:text-[2.35rem] md:leading-[1.12]">
          Pricing options
        </p>
        {pricing.intro ? (
          <p className="mt-4 font-body text-base font-light leading-[1.8] text-cream-dark/75 dark:text-cream/72">
            {pricing.intro}
          </p>
        ) : null}

        <ol className="mt-10 divide-y divide-[#e0d9ce] dark:divide-boho-stone/40">
          {pricing.collections.map((collection, index) => (
            <li
              key={collection.name}
              className="py-7 first:pt-0 last:pb-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-medium text-cream-dark dark:text-cream sm:text-2xl">
                  {collection.name}
                </h3>
                <p className="font-script text-2xl text-coral dark:text-[#d4a574] sm:text-[1.75rem]">
                  {collection.price}
                </p>
              </div>
              <p className="mt-3 font-body text-sm font-light leading-[1.8] text-cream-dark/78 dark:text-cream/72 sm:text-base">
                {collection.detail}
              </p>
              <div className="mt-4 flex items-end justify-between gap-4 sm:gap-6">
                {collection.includes && collection.includes.length > 0 ? (
                  <ul className="min-w-0 flex-1 space-y-1.5 font-body text-sm font-light leading-relaxed text-cream-dark/70 dark:text-cream/65">
                    {collection.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden className="text-coral dark:text-[#d4a574]">
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="min-w-0 flex-1" />
                )}
                <div
                  className={`mb-0.5 w-[4.5rem] shrink-0 sm:w-[5.75rem] md:w-[6.35rem] ${POLAROID_TILTS[index % POLAROID_TILTS.length]}`}
                >
                  <div className="scrapbook-mat rounded-[2px] bg-[#faf8f4] p-1.5 pb-4 dark:bg-[#2a2622] sm:pb-5">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#e8e3db] dark:bg-boho-ink">
                      <Image
                        src={collection.image}
                        alt={collection.imageAlt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 20vw, 102px"
                        quality={85}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <Link
          href="/contact"
          className="font-display mt-10 inline-flex min-h-14 touch-manipulation items-center justify-center rounded-full border border-boho-sage/30 bg-coral px-11 py-4 text-2xl text-white shadow-soft transition hover:border-coral/40 hover:bg-coral-dark hover:shadow-soft-lg dark:border-boho-stone/45 sm:text-3xl"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
