/**
 * Servicio de Dashboard
 * Todos los endpoints de /api/dashboard
 */

import { get, handleApiError } from '../utils/api';
import type {
  FinancialSummary,
  CategoryBreakdown,
  MonthlyTrends,
  PeriodComparison,
  Transaction,
  DateRangeFilter,
} from '../types/api.types';

/**
 * Obtener resumen financiero general
 * @param filters Filtros de fecha (opcional, por defecto mes actual)
 */
export const getFinancialSummary = async (
  filters?: DateRangeFilter
): Promise<FinancialSummary> => {
  try {
    const response = await get<FinancialSummary>('/dashboard/summary', filters as Record<string, unknown>);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener desglose por categorías (Top 5 de ingresos y gastos)
 * @param filters Filtros de fecha (opcional, por defecto mes actual)
 */
export const getCategoryBreakdown = async (
  filters?: DateRangeFilter
): Promise<CategoryBreakdown> => {
  try {
    const response = await get<CategoryBreakdown>('/dashboard/categories', filters as Record<string, unknown>);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener tendencias mensuales
 * @param months Número de meses a obtener (por defecto 6, máximo 12)
 */
export const getMonthlyTrends = async (months: number = 6): Promise<MonthlyTrends> => {
  try {
    const response = await get<MonthlyTrends>('/dashboard/trends', { months });
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Comparar dos períodos
 */
export const comparePeriods = async (params: {
  period1Start: string;
  period1End: string;
  period2Start: string;
  period2End: string;
}): Promise<PeriodComparison> => {
  try {
    const response = await get<PeriodComparison>('/dashboard/comparison', params);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener transacciones recientes
 * @param limit Límite de transacciones (por defecto 10, máximo 50)
 */
export const getRecentTransactions = async (limit: number = 10): Promise<Transaction[]> => {
  try {
    const response = await get<Transaction[]>('/dashboard/recent', { limit });
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener resumen completo del dashboard
 * Combina múltiples endpoints para obtener todos los datos necesarios
 */
export const getDashboardData = async (filters?: DateRangeFilter) => {
  try {
    const [summary, breakdown, trends, recentTransactions] = await Promise.all([
      getFinancialSummary(filters),
      getCategoryBreakdown(filters),
      getMonthlyTrends(6),
      getRecentTransactions(10),
    ]);

    return {
      summary,
      breakdown,
      trends,
      recentTransactions,
    };
  } catch (error) {
    throw handleApiError(error);
  }
};