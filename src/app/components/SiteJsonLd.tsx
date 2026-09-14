import { getSameAsLinks } from '@/lib/siteSocial';
import {
  DEFAULT_OG_IMAGE_PATH,
  GEO_COORDINATES,
  getSiteUrl,
  PHOTOGRAPHER_EMAIL,
  PHOTOGRAPHER_NAME,
  PHOTOGRAPHER_PHONE_E164,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  schemaAreaServed,
  SITE_DESCRIPTION,
  SITE_LOGO_PATH,
  SITE_NAME,
} from '@/lib/siteConfig';

/** Local business + website schema for rich results */
export default function SiteJsonLd() {
  const url = getSiteUrl();
  const sameAs = getSameAsLinks();
  const logoUrl = `${url}${SITE_LOGO_PATH}`;

  const business: Record<string, unknown> = {
    '@type': ['LocalBusiness', 'ProfessionalService', 'Photographer'],
    '@id': `${url}#business`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url,
    image: `${url}${DEFAULT_OG_IMAGE_PATH}`,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
    },
    email: PHOTOGRAPHER_EMAIL,
    telephone: PHOTOGRAPHER_PHONE_E164,
    priceRange: '$$',
    founder: { '@id': `${url}#person` },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHOTOGRAPHER_PHONE_E164,
      email: PHOTOGRAPHER_EMAIL,
      contactType: 'customer service',
      areaServed: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: PRIMARY_CITY,
      addressRegion: PRIMARY_STATE_ABBR,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO_COORDINATES.latitude,
      longitude: GEO_COORDINATES.longitude,
    },
    areaServed: schemaAreaServed(),
    serviceType: [
      'Wedding photography',
      'Family photography',
      'Portrait photography',
      'Elopement photography',
      'Couples & engagement photography',
      'Motherhood photography',
      'Event photography',
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        name: SITE_NAME,
        url,
        description: SITE_DESCRIPTION,
        publisher: { '@id': `${url}#business` },
      },
      {
        '@type': 'Person',
        '@id': `${url}#person`,
        name: PHOTOGRAPHER_NAME,
        url,
        jobTitle: 'Photographer',
        email: PHOTOGRAPHER_EMAIL,
        telephone: PHOTOGRAPHER_PHONE_E164,
        image: `${url}${DEFAULT_OG_IMAGE_PATH}`,
        worksFor: { '@id': `${url}#business` },
      },
      business,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
