import type { LocationEntry } from './locations';

export interface PriceRow {
  moment: string;
  duration?: string;
  basic: number;
  premium: number;
}

// Zone 1 base prices; other zones add travel (fuel, plus hotel and meals for zone 3).
const BASE_PRICES: PriceRow[] = [
  { moment: 'Ceremonia', duration: '~45 min', basic: 399, premium: 600 },
  { moment: 'Cóctel', duration: '1–1,5 h', basic: 450, premium: 700 },
  { moment: 'Banquete', duration: '~2 h', basic: 490, premium: 700 },
  { moment: 'Barra libre Saxo + DJ (DJ no incluido)', duration: 'En sets', basic: 550, premium: 780 },
  { moment: 'Ceremonia + cóctel', basic: 599, premium: 780 },
  { moment: 'Banquete + barra libre', basic: 650, premium: 840 },
  { moment: 'Boda completa', basic: 999, premium: 1299 },
  { moment: 'Eventos y fiestas', duration: '~1,5 h', basic: 399, premium: 780 },
];

const ZONE_1_PROVINCES = ['Murcia', 'Alicante', 'Almería'];
const ZONE_2_PROVINCES = ['Valencia', 'Madrid', 'Albacete', 'Ciudad Real', 'Cuenca', 'Guadalajara', 'Toledo', 'Málaga', 'Granada', 'Jaén'];

// Product + AggregateOffer pilot: one page per zone, away from the homepage/Murcia overlap.
export const PRICE_SCHEMA_PILOT_SLUGS = [
  'saxofonista-para-bodas-en-alicante',
  'saxofonista-para-bodas-en-valencia',
  'saxofonista-para-bodas-en-sevilla',
];

const travelSurcharge = (location?: LocationEntry) => {
  if (!location || ZONE_1_PROVINCES.includes(location.province)) return 0;
  return ZONE_2_PROVINCES.includes(location.province) ? 60 : 120;
};

export const getPriceRows = (location?: LocationEntry): PriceRow[] => {
  const surcharge = travelSurcharge(location);
  return BASE_PRICES.map((row) => ({ ...row, basic: row.basic + surcharge, premium: row.premium + surcharge }));
};

export const priceOf = (rows: PriceRow[], moment: string) => rows.find((row) => row.moment === moment)!;

export const priceRange = (rows: PriceRow[]) => ({
  min: Math.min(...rows.map((row) => row.basic)),
  max: Math.max(...rows.map((row) => row.premium)),
  basicMax: Math.max(...rows.map((row) => row.basic)),
  premiumMin: Math.min(...rows.map((row) => row.premium)),
});

// es-ES skips the thousands separator for 4-digit numbers; prices need "1.299 €".
export const euros = (amount: number) => `${String(amount).replace(/\B(?=(\d{3})+$)/g, '.')} €`;
