export const SITE_URL = 'https://benitogonzalezsax.com';

export const PROBODA_URL = 'https://proboda.es';

export const BUSINESS = {
  name: 'Benito González Sax',
  legalName: 'Benito González García',
  phone: '+34 615 97 71 90',
  phoneHref: 'tel:+34615977190',
  whatsappHref: 'https://wa.me/34615977190',
  email: 'info@benitogonzalezsax.com',
  emailHref: 'mailto:info@benitogonzalezsax.com',
  addressLocality: 'Mazarrón',
  addressRegion: 'Murcia',
  addressCountry: 'ES',
  latitude: 37.5989,
  longitude: -1.3147,
  // Profile URL shown in Google's knowledge panel; pfbid permalinks rotate and 404.
  facebook: 'https://www.facebook.com/profile.php?id=61561180926141',
  instagram: 'https://www.instagram.com/benitogonzalezsax/',
  youtube: 'https://www.youtube.com/@benitogonzalezsax',
  tiktok: 'https://www.tiktok.com/@saxofonistaparabodas',
  // Canonical Maps URL for the Google Business Profile (mid /g/11w839lz5t);
  // share.google links are redirects and weaker as sameAs entity signals.
  googleBusiness: 'https://www.google.com/maps?cid=3246363565904711550',
};

export const DEFAULT_OG_IMAGE = '/apple-touch-icon.png';

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();

export const buildWhatsAppHref = (message: string) =>
  `${BUSINESS.whatsappHref}?text=${encodeURIComponent(message)}`;
