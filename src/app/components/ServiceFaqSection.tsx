import type { ServiceFaq } from '@/lib/servicesData';

function FaqChevron() {
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

const SURFACE = {
  base: 'bg-paper',
  soft: 'bg-paper-soft',
} as const;

type ServiceFaqSectionProps = {
  faqs: ServiceFaq[];
  /** H2 text, e.g. "Straight answers about weddings" */
  heading?: string;
  id?: string;
  /** Alternating page band — soft is the lighter cream */
  surface?: keyof typeof SURFACE;
};

export default function ServiceFaqSection({
  faqs,
  heading = 'Straight answers',
  id = 'faq',
  surface = 'base',
}: ServiceFaqSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-[#e0d9ce] px-6 py-16 dark:border-boho-stone/40 sm:px-10 lg:px-16 lg:py-24 ${SURFACE[surface]}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-3xl text-center sm:text-left">
        <p className="section-eyebrow text-boho-sage">Questions</p>
        <h2
          id={`${id}-heading`}
          className="mt-4 font-display text-2xl font-medium leading-snug text-cream-dark dark:text-cream sm:text-3xl md:text-[2.35rem] md:leading-[1.12]"
        >
          {heading}
        </h2>
        <p className="mt-4 font-body text-base font-light leading-[1.8] text-cream-dark/75 dark:text-cream/72">
          A few things clients often ask—tap any row to read more.
        </p>
        <div className="mt-12 space-y-3 text-left">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group lift-shadow rounded-2xl border border-[#e0d9ce] bg-[#faf8f4] text-center ring-1 ring-[#e8e3db]/80 dark:border-boho-stone/40 dark:bg-boho-bark dark:ring-boho-stone/25 sm:text-left"
            >
              <summary className="flex min-h-14 cursor-pointer list-none flex-col items-center gap-2 px-6 py-5 marker:content-none touch-manipulation sm:min-h-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:py-6 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 max-w-md pr-0 font-body text-base font-light leading-[1.8] text-cream-dark sm:max-w-none sm:pr-2 dark:text-cream">
                  {faq.question}
                </span>
                <FaqChevron />
              </summary>
              <div className="border-t border-[#e0d9ce] px-6 pb-6 pt-5 text-center font-body text-base font-light leading-[1.85] text-cream-dark/88 dark:border-boho-stone/35 dark:text-cream/84 sm:px-8 sm:pb-8 sm:pt-6 sm:text-left">
                {faq.answer}
                {faq.link ? (
                  <a
                    href={faq.link.href}
                    className="text-coral underline decoration-coral/40 underline-offset-2 transition hover:text-coral-dark dark:text-[#e8b896]"
                  >
                    {faq.link.label}
                  </a>
                ) : null}
                {faq.answerAfter ?? null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
