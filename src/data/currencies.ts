export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CNY'
  | 'INR'
  | 'NGN'
  | 'BRL'
  | 'AED'
  | 'SAR'
  | 'CHF'
  | 'ZAR'
  | 'SGD'
  | 'MXN'
  | 'KRW'
  | 'TRY'
  | 'KES'
  | 'GHS'
  | 'PHP'
  | 'IDR'
  | 'SEK'
  | 'NZD';

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  rateAgainstUSD: number; // 1 USD = X Currency units
  symbolPosition: 'before' | 'after';
  decimals: number;
  flag: string;
  region: 'Americas' | 'Europe' | 'Asia Pacific' | 'Middle East & Africa';
  popular?: boolean;
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    rateAgainstUSD: 1.0,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇺🇸',
    region: 'Americas',
    popular: true
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    rateAgainstUSD: 0.92,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇪🇺',
    region: 'Europe',
    popular: true
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    rateAgainstUSD: 0.79,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇬🇧',
    region: 'Europe',
    popular: true
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    rateAgainstUSD: 155.2,
    symbolPosition: 'before',
    decimals: 0,
    flag: '🇯🇵',
    region: 'Asia Pacific',
    popular: true
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
    rateAgainstUSD: 1.36,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇨🇦',
    region: 'Americas',
    popular: true
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    rateAgainstUSD: 1.52,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇦🇺',
    region: 'Asia Pacific',
    popular: true
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan',
    symbol: 'CN¥',
    rateAgainstUSD: 7.24,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇨🇳',
    region: 'Asia Pacific',
    popular: true
  },
  {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    rateAgainstUSD: 83.5,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇮🇳',
    region: 'Asia Pacific',
    popular: true
  },
  {
    code: 'NGN',
    name: 'Nigerian Naira',
    symbol: '₦',
    rateAgainstUSD: 1495.0,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇳🇬',
    region: 'Middle East & Africa',
    popular: true
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'AED ',
    rateAgainstUSD: 3.67,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇦🇪',
    region: 'Middle East & Africa',
    popular: true
  },
  {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: 'SAR ',
    rateAgainstUSD: 3.75,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇸🇦',
    region: 'Middle East & Africa'
  },
  {
    code: 'BRL',
    name: 'Brazilian Real',
    symbol: 'R$',
    rateAgainstUSD: 5.18,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇧🇷',
    region: 'Americas'
  },
  {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'CHF ',
    rateAgainstUSD: 0.91,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇨🇭',
    region: 'Europe'
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    rateAgainstUSD: 1.35,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇸🇬',
    region: 'Asia Pacific'
  },
  {
    code: 'ZAR',
    name: 'South African Rand',
    symbol: 'R ',
    rateAgainstUSD: 18.25,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇿🇦',
    region: 'Middle East & Africa'
  },
  {
    code: 'MXN',
    name: 'Mexican Peso',
    symbol: 'MX$',
    rateAgainstUSD: 16.85,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇲🇽',
    region: 'Americas'
  },
  {
    code: 'KRW',
    name: 'South Korean Won',
    symbol: '₩',
    rateAgainstUSD: 1375.0,
    symbolPosition: 'before',
    decimals: 0,
    flag: '🇰🇷',
    region: 'Asia Pacific'
  },
  {
    code: 'TRY',
    name: 'Turkish Lira',
    symbol: '₺',
    rateAgainstUSD: 32.25,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇹🇷',
    region: 'Europe'
  },
  {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'KSh ',
    rateAgainstUSD: 132.0,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇰🇪',
    region: 'Middle East & Africa'
  },
  {
    code: 'GHS',
    name: 'Ghanaian Cedi',
    symbol: 'GH₵',
    rateAgainstUSD: 14.8,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇬🇭',
    region: 'Middle East & Africa'
  },
  {
    code: 'PHP',
    name: 'Philippine Peso',
    symbol: '₱',
    rateAgainstUSD: 57.8,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇵🇭',
    region: 'Asia Pacific'
  },
  {
    code: 'IDR',
    name: 'Indonesian Rupiah',
    symbol: 'Rp ',
    rateAgainstUSD: 16250.0,
    symbolPosition: 'before',
    decimals: 0,
    flag: '🇮🇩',
    region: 'Asia Pacific'
  },
  {
    code: 'SEK',
    name: 'Swedish Krona',
    symbol: ' kr',
    rateAgainstUSD: 10.75,
    symbolPosition: 'after',
    decimals: 2,
    flag: '🇸🇪',
    region: 'Europe'
  },
  {
    code: 'NZD',
    name: 'New Zealand Dollar',
    symbol: 'NZ$',
    rateAgainstUSD: 1.65,
    symbolPosition: 'before',
    decimals: 2,
    flag: '🇳🇿',
    region: 'Asia Pacific'
  }
];

export const CURRENCY_MAP: Record<CurrencyCode, CurrencyConfig> = SUPPORTED_CURRENCIES.reduce(
  (acc, curr) => {
    acc[curr.code] = curr;
    return acc;
  },
  {} as Record<CurrencyCode, CurrencyConfig>
);

/**
 * Converts a base USD amount to any target currency
 */
export function convertFromUSD(amountInUSD: number, targetCurrency: CurrencyCode): number {
  const config = CURRENCY_MAP[targetCurrency] || CURRENCY_MAP.USD;
  return amountInUSD * config.rateAgainstUSD;
}

/**
 * Converts an amount from any currency back to USD
 */
export function convertToUSD(amountInForeign: number, sourceCurrency: CurrencyCode): number {
  const config = CURRENCY_MAP[sourceCurrency] || CURRENCY_MAP.USD;
  return amountInForeign / config.rateAgainstUSD;
}

/**
 * Formats a base USD amount into the target currency with proper symbol, decimal precision, and grouping
 */
export function formatCurrency(
  amountInUSD: number,
  currencyCode: CurrencyCode = 'USD',
  options?: { showCode?: boolean; customDecimals?: number }
): string {
  const config = CURRENCY_MAP[currencyCode] || CURRENCY_MAP.USD;
  const converted = convertFromUSD(amountInUSD, currencyCode);
  const decimals = options?.customDecimals !== undefined ? options.customDecimals : config.decimals;

  const formattedNum = converted.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  const withSymbol = config.symbolPosition === 'before'
    ? `${config.symbol}${formattedNum}`
    : `${formattedNum}${config.symbol}`;

  if (options?.showCode && currencyCode !== 'USD') {
    return `${withSymbol} ${currencyCode}`;
  }

  return withSymbol;
}
