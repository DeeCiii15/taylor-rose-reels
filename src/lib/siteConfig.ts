/**
 * Canonical site URL for metadata, OG tags, sitemap, and JSON-LD.
 * Override in any environment: NEXT_PUBLIC_SITE_URL=https://yourdomain.com
 */
export const CANONICAL_SITE_URL = 'https://taylorrosereels.com';

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  if (fromEnv) return fromEnv;

  // Always use the custom domain in production so Google, OG tags, and favicons
  // never point at *.vercel.app (which can serve the default Vercel icon).
  if (process.env.VERCEL_ENV === 'production') {
    return CANONICAL_SITE_URL;
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, '')}`;
  return 'http://localhost:3000';
}

export const SITE_NAME = 'Taylor Rose Reels';

/** Person behind the brand — used in JSON-LD Person / BlogPosting author */
export const PHOTOGRAPHER_NAME = 'Taylor Hayden';

/** Square brand mark for Organization.logo (Google Article: ≥112px, 1:1) */
export const SITE_LOGO_PATH = '/icon-192.png';

export const PRIMARY_CITY = 'Florence';
export const PRIMARY_STATE = 'South Carolina';
export const PRIMARY_STATE_ABBR = 'SC';
export const PRIMARY_REGION = 'Pee Dee';

/** Cities and towns commonly served across the Pee Dee */
export const SERVICE_AREAS = [
  'Florence',
  'Hartsville',
  'Darlington',
  'Marion',
  'Lake City',
  'Dillon',
  'Bennettsville',
  'Mullins',
  'Pamplico',
  'Kingstree',
] as const;

/** Florence, SC — approximate center for local business schema */
export const GEO_COORDINATES = {
  latitude: 34.1954,
  longitude: -79.7626,
} as const;

export const PHOTOGRAPHER_EMAIL =
  process.env.NEXT_PUBLIC_PHOTOGRAPHER_EMAIL?.trim() ||
  'taylorrosereels@gmail.com';

/** Public inquiry line — city-only NAP (no street). Display matches GBP. */
export const PHOTOGRAPHER_PHONE_DISPLAY = '843-942-9472';
/** E.164 for tel: links and LocalBusiness telephone */
export const PHOTOGRAPHER_PHONE_E164 = '+18439429472';
export const PHOTOGRAPHER_PHONE_TEL = `tel:${PHOTOGRAPHER_PHONE_E164}`;

export const PHOTOGRAPHER_IMAGE_ALT = `${SITE_NAME}, ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR} wedding & portrait photographer`;

export const SERVICE_AREA_LABEL = `Based in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} · Serving the ${PRIMARY_REGION} & beyond`;

export const SITE_TAGLINE = `Wedding & portrait photography in natural light across ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the ${PRIMARY_REGION}`;

/** Default meta description (home + fallback) */
export const SITE_DESCRIPTION = `${SITE_NAME} is a ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} wedding & portrait photographer serving the ${PRIMARY_REGION}—${SERVICE_AREAS.slice(1, 5).join(', ')}, & beyond.`;

export const LOCAL_KEYWORDS = [
  `${PRIMARY_CITY} ${PRIMARY_STATE_ABBR} photographer`,
  `${PRIMARY_REGION} wedding photographer`,
  `${PRIMARY_CITY} wedding photographer`,
  `${PRIMARY_STATE} portrait photographer`,
  `${PRIMARY_STATE_ABBR} engagement photographer`,
  `wedding photographer ${PRIMARY_CITY} ${PRIMARY_STATE_ABBR}`,
  `elopement photographer ${PRIMARY_REGION}`,
  'natural light photography',
  'true to color',
  'timeless',
  SITE_NAME,
] as const;

/** Used for Open Graph / Twitter when a page does not set its own image */
export const DEFAULT_OG_IMAGE_PATH = '/images/Taylor_site.jpg';

/** Canonical path for the Florence, SC wedding photography SEO landing page */
export const FLORENCE_WEDDINGS_PATH = '/florence-sc-wedding-photography';

/** Hero used on the Florence hub (OG + JSON-LD primary image) */
export const FLORENCE_WEDDINGS_HERO_PATH =
  '/images/galleries/weddings/latta-sc-wedding-parker-pines-lee/04.jpg';

/** schema.org areaServed list reused by LocalBusiness / Service JSON-LD */
export function schemaAreaServed() {
  return [
    {
      '@type': 'AdministrativeArea' as const,
      name: `${PRIMARY_REGION} region, ${PRIMARY_STATE}`,
    },
    ...SERVICE_AREAS.map((city) => ({
      '@type': 'City' as const,
      name: `${city}, ${PRIMARY_STATE_ABBR}`,
    })),
  ];
}

/** Display / SEO title pattern: location first, then service */
export const FLORENCE_WEDDINGS_TITLE = `${PRIMARY_CITY}, ${PRIMARY_STATE} Wedding Photography`;
export const FLORENCE_WEDDINGS_TITLE_SHORT = `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Wedding Photography`;

/**
 * Query flag appended to gallery links opened from the Florence weddings landing
 * page, so a shoot page can offer a "back to Florence weddings" link instead of
 * sending visitors to the generic weddings gallery. Used as `?from=<value>`.
 *
 * Future city pages: add entries in `weddingLocations.ts` (path + status: 'live').
 */
export const FLORENCE_WEDDINGS_REF = 'florence-weddings';
