import type { LocationEntry } from './locations';

type PriceId =
  | 'ceremonia'
  | 'coctel'
  | 'banquete'
  | 'barraLibre'
  | 'ceremoniaCoctel'
  | 'banqueteBarraLibre'
  | 'bodaCompleta'
  | 'eventos';

export interface PriceRow {
  id: PriceId;
  moment: string;
  duration?: string;
  basic: number;
  premium: number;
}

// Update together with BASE_PRICES: shown as "Precios actualizados · …".
export const PRICES_UPDATED = 'noviembre 2026';

// Zone 1 base prices; other zones add travel (fuel, plus hotel and meals for zone 3).
const BASE_PRICES: PriceRow[] = [
  { id: 'ceremonia', moment: 'Ceremonia', duration: '~45 min', basic: 399, premium: 600 },
  { id: 'coctel', moment: 'Cóctel', duration: '1–1,5 h', basic: 450, premium: 700 },
  { id: 'banquete', moment: 'Banquete', duration: '~2 h', basic: 490, premium: 700 },
  { id: 'barraLibre', moment: 'Barra libre Saxo + DJ (DJ no incluido)', duration: 'En sets', basic: 550, premium: 780 },
  { id: 'ceremoniaCoctel', moment: 'Ceremonia + cóctel', basic: 599, premium: 780 },
  { id: 'banqueteBarraLibre', moment: 'Banquete + barra libre', basic: 650, premium: 840 },
  { id: 'bodaCompleta', moment: 'Boda completa', basic: 999, premium: 1299 },
  { id: 'eventos', moment: 'Eventos y fiestas', duration: '~1,5 h', basic: 399, premium: 780 },
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

export const priceOf = (rows: PriceRow[], id: PriceId) => rows.find((row) => row.id === id)!;

export const priceRange = (rows: PriceRow[]) => ({
  min: Math.min(...rows.map((row) => row.basic)),
  max: Math.max(...rows.map((row) => row.premium)),
  basicMax: Math.max(...rows.map((row) => row.basic)),
  premiumMin: Math.min(...rows.map((row) => row.premium)),
});

// es-ES skips the thousands separator for 4-digit numbers; prices need "1.299 €".
export const euros = (amount: number) => `${String(amount).replace(/\B(?=(\d{3})+$)/g, '.')} €`;

export const eurosEn = (amount: number) => `€${amount.toLocaleString('en-GB')}`;
