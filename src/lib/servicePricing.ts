import { GALLERY_UPLOAD_FOLDERS, shootCoverSrc } from './portfolioData';
import { SHOOTS_BY_CATEGORY } from './portfolioShoots';
import type { ServiceSlug } from './testimonialsData';

export type ServiceCollection = {
  name: string;
  /** Visible price, e.g. "$3,500" or "starting at $200" */
  price: string;
  detail: string;
  /** Optional scannable inclusions — used on wedding collections */
  includes?: string[];
  /** Polaroid beside the collection — not a link */
  image: string;
  imageAlt: string;
  /** Numeric amount for schema.org Offer */
  priceAmount: number;
  unitText?: 'HOUR';
};

function collectionPhoto(
  category: keyof typeof SHOOTS_BY_CATEGORY,
  slug: string,
  imageAlt: string,
): Pick<ServiceCollection, 'image' | 'imageAlt'> {
  const folder = GALLERY_UPLOAD_FOLDERS[category];
  const shoot = SHOOTS_BY_CATEGORY[category]?.find((entry) => entry.slug === slug);
  if (!folder || !shoot) {
    return { image: '/images/wedding_1.jpg', imageAlt };
  }
  return { image: shootCoverSrc(folder, shoot), imageAlt };
}

export type ServicePricing = {
  intro?: string;
  collections: ServiceCollection[];
};

const SESSION_INCLUDES = [
  'All usable images',
  'Creative direction',
  'Private online gallery',
] as const;

export const SERVICE_PRICING: Record<ServiceSlug, ServicePricing> = {
  'wedding-photography': {
    intro:
      'Three collections, each with a second photographer, full printing & sharing rights, and a private online gallery. Choose the hours that match the shape of your day.',
    collections: [
      {
        name: 'Standard collection',
        price: '$3,500',
        detail:
          'Six hours from the last getting-ready details through your send-off—enough to hold the heart of the day without missing the moments that matter most.',
        includes: [
          '6 hours of wedding day coverage',
          'Second photographer',
          'Complimentary bridal or engagement session',
          'Full printing & sharing rights',
          'Private online gallery',
        ],
        ...collectionPhoto(
          'Weddings',
          'pamplico-sc-wedding-sawtooth-acres',
          'Wedding day portraits from Jessica & Gage at Sawtooth Acres',
        ),
        priceAmount: 3500,
      },
      {
        name: 'Premium collection',
        price: '$4,000',
        detail:
          'Eight hours with a little more room to breathe—from getting-ready anticipation through the celebration that carries you to send-off.',
        includes: [
          '8 hours of wedding day coverage',
          'Second photographer',
          'Complimentary bridal and engagement sessions',
          'Full printing & sharing rights',
          'Private online gallery',
        ],
        ...collectionPhoto(
          'Weddings',
          'florence-sc-wedding-glenview-farms',
          'Wedding day coverage from Madelyn & Max at Glenview Farms',
        ),
        priceAmount: 4000,
      },
      {
        name: 'Gold collection',
        price: '$4,500',
        detail:
          'Ten hours for the couple who wants it all—the quiet beginning, the in-betweens, the last dance, and the final send-off as the day unfolds.',
        includes: [
          '10 hours of wedding day coverage',
          'Second photographer',
          'Complimentary bridal and engagement sessions',
          'Full printing & sharing rights',
          'Private online gallery',
        ],
        ...collectionPhoto(
          'Weddings',
          'florence-sc-wedding-collins-grove',
          'Wedding day coverage from Heather & Will at Collins Grove',
        ),
        priceAmount: 4500,
      },
    ],
  },
  'motherhood-photography': {
    intro:
      'The maternity collection covers three sessions across pregnancy and baby’s first year. A single portrait session is available if you only need one sitting.',
    collections: [
      {
        name: 'Maternity collection',
        price: '$810',
        detail:
          'Three customizable sessions: two 30-minute visits and one hour-long session, used however you want across this season.',
        includes: [
          'Two 30-minute sessions & one 1-hour session',
          'Use for announcement, gender reveal, maternity, newborn, fresh-48, or family',
          ...SESSION_INCLUDES,
        ],
        ...collectionPhoto(
          'Motherhood',
          'charleston-sc-motherhood-sullivans-island',
          'Maternity portraits of Kalayah & Chase on Sullivan’s Island',
        ),
        priceAmount: 810,
      },
      {
        name: 'Single portrait session',
        price: 'starting at $200',
        detail:
          'One sitting instead of the collection. Thirty minutes starts at $200; one hour starts at $390.',
        includes: [
          '30 minutes or 1 hour of coverage',
          ...SESSION_INCLUDES,
        ],
        ...collectionPhoto(
          'Motherhood',
          'florence-sc-gender-reveal-anpov-studios',
          'A single motherhood session with Peden & Quinton',
        ),
        priceAmount: 200,
      },
    ],
  },
  'engagement-photography': {
    intro:
      'Two engagement session lengths. Each includes all usable images, creative direction, & a private online gallery.',
    collections: [
      {
        name: '30 minutes',
        price: 'starting at $200',
        detail:
          'Thirty minutes of engagement coverage—a focused set of portraits of the two of you.',
        includes: ['30 minutes of coverage', ...SESSION_INCLUDES],
        ...collectionPhoto(
          'Couples / Engagement',
          'florence-sc-engagement-downtown',
          'Engagement portraits of Riley & Bradley',
        ),
        priceAmount: 200,
      },
      {
        name: '1 hour',
        price: 'starting at $390',
        detail:
          'A full hour of engagement coverage, with time for more variety and a change of look if you want one.',
        includes: ['1 hour of coverage', ...SESSION_INCLUDES],
        ...collectionPhoto(
          'Couples / Engagement',
          'charleston-sc-engagement-beach',
          'Engagement portraits of Carrington & Jewitt',
        ),
        priceAmount: 390,
      },
    ],
  },
  'portrait-photography': {
    intro:
      'Two session lengths for seniors, bridals, headshots, & individual portraits. Each includes all usable images, creative direction, & a private online gallery.',
    collections: [
      {
        name: '30 minutes',
        price: 'starting at $200',
        detail:
          'Thirty minutes of portrait coverage—a focused window for headshots or a shorter senior or bridal session.',
        includes: ['30 minutes of coverage', ...SESSION_INCLUDES],
        ...collectionPhoto(
          'Portraits',
          'florence-sc-professional-portraits-anpov-studios',
          'Professional portraits of Abby',
        ),
        priceAmount: 200,
      },
      {
        name: '1 hour',
        price: 'starting at $390',
        detail:
          'A full hour of portrait coverage, with time to settle in and change outfits if you’d like.',
        includes: ['1 hour of coverage', ...SESSION_INCLUDES],
        ...collectionPhoto(
          'Portraits',
          'camden-sc-bridal-portraits-the-terraces',
          'Bridal portraits of Alli at The Terraces',
        ),
        priceAmount: 390,
      },
    ],
  },
  'family-portrait-photography': {
    intro:
      'Two session lengths for family portraits. Each includes all usable images, creative direction, & a private online gallery.',
    collections: [
      {
        name: '30 minutes',
        price: 'starting at $200',
        detail:
          'Thirty minutes of family coverage—the better fit when little ones won’t last a full hour.',
        includes: ['30 minutes of coverage', ...SESSION_INCLUDES],
        ...collectionPhoto(
          'Family',
          'florence-sc-family',
          'Family portraits of the Biddles',
        ),
        priceAmount: 200,
      },
      {
        name: '1 hour',
        price: 'starting at $390',
        detail:
          'A full hour of family coverage, with more time for variety across the whole group.',
        includes: ['1 hour of coverage', ...SESSION_INCLUDES],
        ...collectionPhoto(
          'Family',
          'sunset-beach-nc-family',
          'Family portraits of the Haydens',
        ),
        priceAmount: 390,
      },
    ],
  },
  'special-events-photography': {
    intro:
      'Event coverage is quoted by the hour. You’ll receive all usable images in a private online gallery, with sharing & printing rights.',
    collections: [
      {
        name: 'Hourly coverage',
        price: 'starting at $400/hr',
        detail:
          'Hourly coverage for birthdays, rehearsal dinners, prom, work parties, & other milestones.',
        includes: [
          'Coverage starting at $400 per hour',
          'All usable images',
          'Sharing & printing rights',
          'Private online gallery',
        ],
        ...collectionPhoto(
          'Special Events',
          'hartsville-sc-prom-kalmia-garden',
          'Prom portraits at Kalmia Gardens',
        ),
        priceAmount: 400,
        unitText: 'HOUR',
      },
    ],
  },
};

export function getServicePricing(slug: ServiceSlug): ServicePricing {
  return SERVICE_PRICING[slug];
}
