import { dinero, toDecimal, add, subtract } from 'dinero.js';
import { MXN } from '@dinero.js/currencies';

/**
 * Formatea un número a moneda mexicana
 */
export const formatCurrency = (amount: number, currency: string = 'MXN'): string => {
  try {
    const dineroAmount = dinero({ amount: Math.round(amount * 100), currency: MXN });
    const decimal = toDecimal(dineroAmount);
    
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
    }).format(parseFloat(decimal));
  } catch (error) {
    return `$${amount.toFixed(2)}`;
  }
};

/**
 * Formatea un número sin símbolo de moneda
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Formatea una fecha a formato local
 */
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
};

/**
 * Formatea una fecha a formato corto
 */
export const formatDateShort = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
};

/**
 * Formatea una fecha para input type="date"
 */
export const formatDateForInput = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
};

/**
 * Obtiene el primer día del mes actual
 */
export const getStartOfMonth = (): string => {
  const date = new Date();
  date.setDate(1);
  return formatDateForInput(date);
};

/**
 * Obtiene el último día del mes actual
 */
export const getEndOfMonth = (): string => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return formatDateForInput(date);
};

/**
 * Obtiene el mes y año en formato texto
 */
export const getMonthYear = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
  }).format(dateObj);
};

/**
 * Traduce el tipo de transacción
 */
export const translateTransactionType = (type: string): string => {
  const translations: Record<string, string> = {
    income: 'Ingreso',
    expense: 'Gasto',
  };
  return translations[type] || type;
};

/**
 * Traduce el método de pago
 */
export const translatePaymentMethod = (method: string): string => {
  const translations: Record<string, string> = {
    cash: 'Efectivo',
    card: 'Tarjeta',
    transfer: 'Transferencia',
    check: 'Cheque',
    other: 'Otro',
  };
  return translations[method] || method;
};

/**
 * Obtiene el color para el tipo de transacción
 */
export const getTypeColor = (type: string): string => {
  return type === 'income' ? 'text-success-600' : 'text-danger-600';
};

/**
 * Obtiene el color de fondo para el tipo de transacción
 */
export const getTypeBgColor = (type: string): string => {
  return type === 'income' ? 'bg-success-100' : 'bg-danger-100';
};

/**
 * Valida un email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Trunca un texto
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Genera un color aleatorio para categorías
 */
export const generateRandomColor = (): string => {
  const colors = [
    '#10B981', // green
    '#3B82F6', // blue
    '#8B5CF6', // purple
    '#EF4444', // red
    '#F59E0B', // amber
    '#EC4899', // pink
    '#06B6D4', // cyan
    '#14B8A6', // teal
    '#6366F1', // indigo
    '#A855F7', // violet
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Calcula el porcentaje de cambio entre dos valores
 */
export const calculatePercentageChange = (oldValue: number, newValue: number): number => {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
};

/**
 * Formatea un porcentaje
 */
export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
};

/**
 * Obtiene el ícono para el método de pago
 */
export const getPaymentMethodIcon = (method: string): string => {
  const icons: Record<string, string> = {
    cash: '💵',
    card: '💳',
    transfer: '🏦',
    check: '📝',
    other: '💰',
  };
  return icons[method] || '💰';
};

/**
 * Debounce function para búsquedas
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};