import type { ServiceVenueSuggestions as VenueSuggestionsData } from '@/lib/servicesData';
import { PRIMARY_CITY } from '@/lib/siteConfig';

function CategoryChevron() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-coral transition-transform duration-200 group-open:rotate-180 dark:text-[#d4a574]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

type ServiceVenueSuggestionsProps = {
  suggestions: VenueSuggestionsData;
  id?: string;
  /** Alternating page band — soft is the lighter cream */
  surface?: 'base' | 'soft';
};

const SURFACE = {
  base: 'bg-paper',
  soft: 'bg-paper-soft',
} as const;

export default function ServiceVenueSuggestions({
  suggestions,
  id = 'suggested-venues',
  surface = 'base',
}: ServiceVenueSuggestionsProps) {
  const heading =
    suggestions.heading ??
    `Suggested engagement venues in and around ${PRIMARY_CITY}`;
  const hasCategories = suggestions.categories.length > 0;

  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-[#e0d9ce] px-6 py-16 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-24 ${SURFACE[surface]}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center sm:text-left">
          <p className="section-eyebrow text-boho-sage">Locations</p>
          <h2
            id={`${id}-heading`}
            className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream sm:text-3xl md:text-[2.35rem] md:leading-[1.12]"
          >
            {heading}
          </h2>
          <p className="mt-4 font-body text-base font-light leading-[1.8] text-cream-dark/75 dark:text-cream/72">
            {suggestions.intro}
          </p>
        </div>

        {hasCategories ? (
          <div className="mt-12 space-y-3">
            {suggestions.categories.map((category) => (
              <details
                key={category.name}
                className="group lift-shadow rounded-2xl border border-[#e0d9ce] bg-[#faf8f4] ring-1 ring-[#e8e3db]/80 dark:border-boho-stone/40 dark:bg-boho-bark dark:ring-boho-stone/25"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 marker:content-none touch-manipulation sm:px-8 sm:py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-2xl leading-snug text-cream-dark dark:text-cream sm:text-[1.75rem]">
                    {category.name}
                  </span>
                  <CategoryChevron />
                </summary>
                <ul className="space-y-4 border-t border-[#e0d9ce] px-6 pb-6 pt-5 dark:border-boho-stone/35 sm:px-8 sm:pb-8 sm:pt-6">
                  {category.locations.map((location) => (
                    <li key={location.name}>
                      {location.mapsQuery ? (
                        <a
                          href={mapsUrl(location.mapsQuery)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-base font-light leading-snug text-cream-dark underline decoration-coral/35 underline-offset-4 transition hover:text-coral hover:decoration-coral/60 dark:text-cream dark:hover:text-[#e8b896]"
                        >
                          {location.name}
                        </a>
                      ) : (
                        <span className="font-body text-base font-light leading-snug text-cream-dark dark:text-cream">
                          {location.name}
                        </span>
                      )}
                      {location.detail ? (
                        <p className="mt-1 font-body text-sm font-light leading-relaxed text-cream-dark/55 dark:text-cream/50">
                          {location.detail}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
