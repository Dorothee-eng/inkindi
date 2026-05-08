// Multi-currency support. USD is the canonical price. Rates are illustrative
// and should be replaced with a live FX feed (e.g. open.er-api.com, BNR feed
// for RWF) when wiring real checkout. Symbols and locales are kept local so
// the component layer stays simple and SSR-safe.

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'RWF' | 'KES' | 'NGN' | 'ZAR';

interface CurrencyMeta {
  code: CurrencyCode;
  label: string;
  symbol: string;
  // Multiplier from 1 USD.
  rate: number;
  // Whether the currency is conventionally written without decimals.
  zeroDecimal: boolean;
  locale: string;
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  USD: { code: 'USD', label: 'US Dollar',         symbol: '$',    rate: 1,        zeroDecimal: false, locale: 'en-US',  flag: '🇺🇸' },
  EUR: { code: 'EUR', label: 'Euro',              symbol: '€',    rate: 0.92,     zeroDecimal: false, locale: 'fr-FR',  flag: '🇪🇺' },
  GBP: { code: 'GBP', label: 'British Pound',     symbol: '£',    rate: 0.79,     zeroDecimal: false, locale: 'en-GB',  flag: '🇬🇧' },
  RWF: { code: 'RWF', label: 'Rwandan Franc',     symbol: 'RF',   rate: 1300,     zeroDecimal: true,  locale: 'rw-RW',  flag: '🇷🇼' },
  KES: { code: 'KES', label: 'Kenyan Shilling',   symbol: 'KSh',  rate: 129,      zeroDecimal: true,  locale: 'en-KE',  flag: '🇰🇪' },
  NGN: { code: 'NGN', label: 'Nigerian Naira',    symbol: '₦',    rate: 1580,     zeroDecimal: true,  locale: 'en-NG',  flag: '🇳🇬' },
  ZAR: { code: 'ZAR', label: 'South African Rand',symbol: 'R',    rate: 18.4,     zeroDecimal: false, locale: 'en-ZA',  flag: '🇿🇦' },
};

export const DEFAULT_CURRENCY: CurrencyCode = 'USD';

export function convert(amountUSD: number, to: CurrencyCode) {
  const meta = CURRENCIES[to];
  return amountUSD * meta.rate;
}

export function formatPrice(amountUSD: number, currency: CurrencyCode = DEFAULT_CURRENCY) {
  const meta = CURRENCIES[currency];
  const value = convert(amountUSD, currency);
  try {
    return new Intl.NumberFormat(meta.locale, {
      style: 'currency',
      currency: meta.code,
      maximumFractionDigits: meta.zeroDecimal ? 0 : 2,
      minimumFractionDigits: meta.zeroDecimal ? 0 : 2,
    }).format(value);
  } catch {
    const rounded = meta.zeroDecimal ? Math.round(value) : value.toFixed(2);
    return `${meta.symbol}${rounded}`;
  }
}
