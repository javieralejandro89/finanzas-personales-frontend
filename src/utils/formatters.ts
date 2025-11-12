/**
 * Utilidades de formateo para el frontend
 */

/**
 * Formatear fecha a string legible
 * @param date Fecha como string ISO o Date
 * @param format Formato deseado
 * @returns Fecha formateada
 */
export const formatDate = (
    date: string | Date,
    format: 'short' | 'long' | 'numeric' = 'short'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Fecha inválida';
  }

  const formats: Record<'short' | 'long' | 'numeric', Intl.DateTimeFormatOptions> = {
    short: { day: '2-digit', month: 'short', year: 'numeric' },
    long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
    numeric: { day: '2-digit', month: '2-digit', year: 'numeric' },
  };

  const options = formats[format];

  return new Intl.DateTimeFormat('es-MX', options).format(dateObj);
};

/**
 * Formatear fecha para inputs type="date"
 * @param date Fecha como string ISO o Date
 * @returns String en formato YYYY-MM-DD
 */
export const formatDateForInput = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Formatear fecha relativa (hace 2 días, hace 1 mes, etc.)
 */
export const formatRelativeDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSecs < 60) {
    return 'Hace un momento';
  } else if (diffMins < 60) {
    return `Hace ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`;
  } else if (diffHours < 24) {
    return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
  } else if (diffDays < 30) {
    return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
  } else if (diffMonths < 12) {
    return `Hace ${diffMonths} ${diffMonths === 1 ? 'mes' : 'meses'}`;
  } else {
    return `Hace ${diffYears} ${diffYears === 1 ? 'año' : 'años'}`;
  }
};

/**
 * Obtener nombre del mes
 */
export const getMonthName = (monthNumber: number): string => {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  return months[monthNumber] || 'Desconocido';
};

/**
 * Obtener mes y año actual
 */
export const getCurrentMonthYear = (): { month: number; year: number; label: string } => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  return {
    month,
    year,
    label: `${getMonthName(month)} ${year}`,
  };
};

/**
 * Obtener inicio y fin del mes actual
 */
export const getCurrentMonthRange = (): { startDate: string; endDate: string } => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    startDate: formatDateForInput(startDate),
    endDate: formatDateForInput(endDate),
  };
};

/**
 * Formatear número con separadores de miles
 */
export const formatNumber = (num: number | string, decimals: number = 2): string => {
  const numericValue = typeof num === 'string' ? parseFloat(num) : num;

  if (isNaN(numericValue)) {
    return '0';
  }

  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numericValue);
};

/**
 * Formatear porcentaje
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  if (isNaN(value)) {
    return '0%';
  }

  return `${value.toFixed(decimals)}%`;
};

/**
 * Truncar texto con ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.substring(0, maxLength)}...`;
};

/**
 * Capitalizar primera letra
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Traducir método de pago a español
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
 * Traducir tipo de categoría
 */
export const translateCategoryType = (type: 'income' | 'expense'): string => {
  return type === 'income' ? 'Ingreso' : 'Gasto';
};

/**
 * Obtener color según el valor (positivo/negativo)
 */
export const getBalanceColor = (value: number | string): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (numericValue > 0) {
    return 'text-green-600';
  } else if (numericValue < 0) {
    return 'text-red-600';
  } else {
    return 'text-gray-600';
  }
};

/**
 * Obtener clase de badge según el estado
 */
export const getStatusBadgeClass = (isActive: boolean): string => {
  return isActive
    ? 'bg-green-100 text-green-800 border-green-200'
    : 'bg-gray-100 text-gray-800 border-gray-200';
};

/**
 * Validar si una fecha está en el futuro
 */
export const isFutureDate = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();

  return dateObj > now;
};

/**
 * Obtener rango de fechas para filtros comunes
 */
export const getDateRangePreset = (
  preset: 'today' | 'week' | 'month' | 'year' | 'last30days'
): { startDate: string; endDate: string } => {
  const now = new Date();
  const today = formatDateForInput(now);

  switch (preset) {
    case 'today':
      return { startDate: today, endDate: today };

    case 'week': {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      return {
        startDate: formatDateForInput(weekStart),
        endDate: today,
      };
    }

    case 'month': {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return {
        startDate: formatDateForInput(monthStart),
        endDate: today,
      };
    }

    case 'year': {
      const yearStart = new Date(now.getFullYear(), 0, 1);
      return {
        startDate: formatDateForInput(yearStart),
        endDate: today,
      };
    }

    case 'last30days': {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      return {
        startDate: formatDateForInput(thirtyDaysAgo),
        endDate: today,
      };
    }

    default:
      return getCurrentMonthRange();
  }
};

/**
 * Sanitizar input de usuario
 */
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ');
};

/**
 * Validar email básico
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Obtener iniciales de un nombre
 */
export const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

/**
 * Generar clase de color de avatar según el nombre
 */
export const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];

  const charCode = name.charCodeAt(0);
  return colors[charCode % colors.length];
};