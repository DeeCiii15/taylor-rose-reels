'use client';

import { useForm, ValidationError } from '@formspree/react';
import { PHOTOGRAPHER_EMAIL, PHOTOGRAPHER_PHONE_DISPLAY, PHOTOGRAPHER_PHONE_TEL } from '@/lib/siteConfig';

const FORMSPREE_FORM_ID = 'mykrjdqn';

type BookingFormProps = {
  className?: string;
};

const fieldClass =
  'font-body box-border w-full min-w-0 max-w-full rounded-xl border border-boho-sage/35 bg-white/80 px-5 py-4 text-lg leading-normal text-cream-dark shadow-sm transition-all focus:border-coral focus:outline-none focus:ring-2 focus:ring-boho-sage/20 dark:border-boho-stone/55 dark:bg-boho-stone/80 dark:text-cream dark:focus:ring-coral/30';

const fieldWrapClass = 'min-w-0 w-full max-w-full';

const labelClass =
  'font-display mb-3 block text-xl leading-snug text-cream-dark dark:text-cream md:text-2xl';

const errorClass =
  'font-body rounded-xl border border-boho-sage/35 bg-white/85 p-5 text-base leading-relaxed text-cream-dark dark:border-boho-stone/55 dark:bg-boho-bark/40 dark:text-cream';

export default function BookingForm({ className }: BookingFormProps) {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <div
        className={`rounded-2xl border border-boho-sage/30 bg-cream-light/95 p-10 text-center shadow-soft backdrop-blur-sm dark:border-boho-stone/50 dark:bg-boho-bark/45 ${className ?? ''}`}
      >
        <p className="font-display text-2xl leading-relaxed text-cream-dark dark:text-cream md:text-3xl">
          Your message is on its way—I can&rsquo;t wait to read it.
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-cream-dark/88 dark:text-cream/85 md:text-lg">
          I&rsquo;ll reply as soon as I can. If you need me sooner, call{' '}
          <a
            href={PHOTOGRAPHER_PHONE_TEL}
            className="text-coral underline decoration-coral/40 underline-offset-2 hover:text-coral-dark dark:text-[#e8b896]"
          >
            {PHOTOGRAPHER_PHONE_DISPLAY}
          </a>{' '}
          or email me directly at{' '}
          <a
            href={`mailto:${PHOTOGRAPHER_EMAIL}`}
            className="text-coral underline decoration-coral/40 underline-offset-2 hover:text-coral-dark dark:text-[#e8b896]"
          >
            {PHOTOGRAPHER_EMAIL}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="font-display mt-8 rounded-full border border-boho-sage/35 px-11 py-4 text-2xl text-cream-dark transition hover:bg-cream sm:text-3xl dark:border-boho-stone/50 dark:text-cream dark:hover:bg-boho-stone"
        >
          Write another note
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mx-auto min-w-0 w-full max-w-xl space-y-8 text-left ${className ?? ''}`}
    >
      {/* Honeypot — bots fill this; Formspree silently rejects the submission */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <ValidationError
        prefix=""
        errors={state.errors}
        className={errorClass}
      />

      <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
        <div className="min-w-0">
          <label htmlFor="name" className={labelClass}>
            Your name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={state.submitting}
            className={fieldClass}
            placeholder="What should I call you?"
          />
          <ValidationError
            prefix=""
            field="name"
            errors={state.errors}
            className="mt-2 font-body text-sm text-coral dark:text-[#e8b896]"
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={state.submitting}
            className={fieldClass}
            placeholder="So I can reply"
          />
          <ValidationError
            prefix=""
            field="email"
            errors={state.errors}
            className="mt-2 font-body text-sm text-coral dark:text-[#e8b896]"
          />
        </div>
      </div>

      <div className="grid min-w-0 w-full max-w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
        <div className={fieldWrapClass}>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            disabled={state.submitting}
            className={fieldClass}
            placeholder="Optional"
          />
        </div>
        <div className={`booking-form-date-field ${fieldWrapClass}`}>
          <label htmlFor="event_date" className={labelClass}>
            Dream date or season
          </label>
          <input
            id="event_date"
            name="event_date"
            type="date"
            disabled={state.submitting}
            className={`${fieldClass} booking-form-date-input [color-scheme:light] dark:[color-scheme:dark]`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className={labelClass}>
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          disabled={state.submitting}
          className={fieldClass}
          placeholder="City, venue, or general area"
        />
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          What are we celebrating?
        </label>
        <select
          id="service"
          name="service"
          required
          disabled={state.submitting}
          className={fieldClass}
          defaultValue=""
        >
          <option value="" disabled>
            Choose one&hellip;
          </option>
          <option value="Wedding">Wedding</option>
          <option value="Couples / Engagement">Couples / Engagement</option>
          <option value="Motherhood">Motherhood</option>
          <option value="Family">Family</option>
          <option value="Portraits">Portraits</option>
          <option value="Event">Event or brand</option>
          <option value="Other">Something else lovely</option>
        </select>
        <ValidationError
          prefix=""
          field="service"
          errors={state.errors}
          className="mt-2 font-body text-sm text-coral dark:text-[#e8b896]"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          The heart of it
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          disabled={state.submitting}
          className={`${fieldClass} resize-none`}
          placeholder="Tell me all the details. What is your vibe, vision & style?"
        />
        <ValidationError
          prefix=""
          field="message"
          errors={state.errors}
          className="mt-2 font-body text-sm text-coral dark:text-[#e8b896]"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={state.submitting}
          className="font-display min-h-14 w-full max-w-md touch-manipulation rounded-full border border-boho-bark/10 bg-coral px-11 py-4 text-2xl text-white shadow-soft transition hover:bg-coral-dark hover:shadow-soft-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:text-3xl"
        >
          {state.submitting ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
