/**
 * Utilidades de dinero.js para el frontend
 * Mismas funciones que el backend para consistencia
 */

import { dinero, add, subtract, multiply, toDecimal, Dinero } from 'dinero.js';
import { MXN, USD, EUR } from '@dinero.js/currencies';

/**
 * Mapeo de códigos de moneda a objetos de moneda de dinero.js
 */
const currencyMap = {
  MXN,
  USD,
  EUR,
};

export type SupportedCurrency = keyof typeof currencyMap;

/**
 * Crear un objeto Dinero desde un número o string
 * @param amount Cantidad en formato decimal (ej: 123.45)
 * @param currencyCode Código de moneda ISO (MXN, USD, EUR)
 * @returns Objeto Dinero
 */
export const createMoney = (
  amount: number | string,
  currencyCode: SupportedCurrency = 'MXN'
): Dinero<number> => {
  const currency = currencyMap[currencyCode];

  if (!currency) {
    throw new Error(`Moneda no soportada: ${currencyCode}`);
  }

  // Convertir a número si viene como string
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numericAmount)) {
    throw new Error(`Cantidad inválida: ${amount}`);
  }

  // Convertir a centavos (scale = 2 para MXN, USD, EUR)
  const amountInCents = Math.round(numericAmount * Math.pow(10, currency.exponent));

  return dinero({ amount: amountInCents, currency });
};

/**
 * Sumar dos cantidades monetarias
 */
export const addMoney = (a: Dinero<number>, b: Dinero<number>): Dinero<number> => {
  return add(a, b);
};

/**
 * Restar dos cantidades monetarias
 */
export const subtractMoney = (a: Dinero<number>, b: Dinero<number>): Dinero<number> => {
  return subtract(a, b);
};

/**
 * Multiplicar una cantidad monetaria por un factor
 */
export const multiplyMoney = (amount: Dinero<number>, multiplier: number): Dinero<number> => {
  return multiply(amount, { amount: multiplier, scale: 0 });
};

/**
 * Convertir objeto Dinero a string decimal
 */
export const moneyToDecimal = (amount: Dinero<number>): string => {
  return toDecimal(amount);
};

/**
 * Convertir objeto Dinero a número
 */
export const moneyToNumber = (amount: Dinero<number>): number => {
  return parseFloat(toDecimal(amount));
};

/**
 * Formatear cantidad monetaria para mostrar en la UI
 * @param amount Objeto Dinero, número o string
 * @param currencyCode Código de moneda
 * @param options Opciones de formato
 * @returns String formateado (ej: "$1,234.56")
 */
export const formatMoney = (
  amount: Dinero<number> | number | string,
  currencyCode: SupportedCurrency = 'MXN',
  options: { showCurrency?: boolean; locale?: string } = {}
): string => {
  const { showCurrency = false, locale = 'es-MX' } = options;

  let dineroAmount: Dinero<number>;

  if (typeof amount === 'number' || typeof amount === 'string') {
    dineroAmount = createMoney(amount, currencyCode);
  } else {
    dineroAmount = amount;
  }

  const numericValue = moneyToNumber(dineroAmount);

  // Usar Intl.NumberFormat para formateo según locale
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);

  // Si no queremos mostrar el código de moneda, lo removemos
  if (!showCurrency) {
    return formatted.replace(/[A-Z]{3}/, '').trim();
  }

  return formatted;
};

/**
 * Formatear cantidad monetaria de forma compacta (para gráficas)
 * Ejemplos: 1.2K, 3.5M, 1.8B
 */
export const formatMoneyCompact = (
  amount: number | string,
  currencyCode: SupportedCurrency = 'MXN'
): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numericAmount)) return '$0';

  const absAmount = Math.abs(numericAmount);
  const sign = numericAmount < 0 ? '-' : '';

  let formatted: string;

  if (absAmount >= 1_000_000_000) {
    formatted = `${sign}$${(absAmount / 1_000_000_000).toFixed(1)}B`;
  } else if (absAmount >= 1_000_000) {
    formatted = `${sign}$${(absAmount / 1_000_000).toFixed(1)}M`;
  } else if (absAmount >= 1_000) {
    formatted = `${sign}$${(absAmount / 1_000).toFixed(1)}K`;
  } else {
    formatted = `${sign}$${absAmount.toFixed(2)}`;
  }

  return formatted;
};

/**
 * Sumar un array de cantidades monetarias
 */
export const sumMoney = (amounts: Dinero<number>[]): Dinero<number> => {
  if (amounts.length === 0) {
    return createMoney(0);
  }

  return amounts.reduce((acc, curr) => add(acc, curr));
};

/**
 * Calcular porcentaje de una cantidad respecto a un total
 */
export const calculatePercentage = (amount: Dinero<number>, total: Dinero<number>): number => {
  const amountNum = moneyToNumber(amount);
  const totalNum = moneyToNumber(total);

  if (totalNum === 0) return 0;

  return (amountNum / totalNum) * 100;
};

/**
 * Validaciones de cantidades
 */
export const isPositive = (amount: Dinero<number>): boolean => {
  return moneyToNumber(amount) > 0;
};

export const isNegative = (amount: Dinero<number>): boolean => {
  return moneyToNumber(amount) < 0;
};

export const isZero = (amount: Dinero<number>): boolean => {
  return moneyToNumber(amount) === 0;
};

/**
 * Obtener símbolo de moneda
 */
export const getCurrencySymbol = (currencyCode: SupportedCurrency): string => {
  const symbols: Record<SupportedCurrency, string> = {
    MXN: '$',
    USD: '$',
    EUR: '€',
  };

  return symbols[currencyCode] || '$';
};

/**
 * Obtener nombre de moneda
 */
export const getCurrencyName = (currencyCode: SupportedCurrency): string => {
  const names: Record<SupportedCurrency, string> = {
    MXN: 'Peso Mexicano',
    USD: 'Dólar Estadounidense',
    EUR: 'Euro',
  };

  return names[currencyCode] || currencyCode;
};

/**
 * Parsear string que viene del backend como Decimal
 * El backend envía los montos como strings (ej: "1234.56")
 */
export const parseMoneyFromAPI = (
  amountString: string,
  currencyCode: SupportedCurrency = 'MXN'
): Dinero<number> => {
  return createMoney(amountString, currencyCode);
};

/**
 * Convertir valor de input a Dinero
 * Útil para formularios donde el usuario ingresa montos
 */
export const parseMoneyFromInput = (
  input: string,
  currencyCode: SupportedCurrency = 'MXN'
): Dinero<number> | null => {
  // Remover todo excepto números, punto y signo negativo
  const cleaned = input.replace(/[^\d.-]/g, '');

  const numericValue = parseFloat(cleaned);

  if (isNaN(numericValue)) {
    return null;
  }

  return createMoney(numericValue, currencyCode);
};