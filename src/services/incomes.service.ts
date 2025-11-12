/**
 * Servicio de Ingresos
 * Todos los endpoints de /api/incomes
 */

import { get, post, patch, del, handleApiError } from '../utils/api';
import type {
  Income,
  CreateIncomeDTO,
  UpdateIncomeDTO,
  IncomeFilters,
  IncomeSummary,
  DateRangeFilter,
  PaginatedResponse,
} from '../types/api.types';

/**
 * Crear nuevo ingreso
 */
export const createIncome = async (data: CreateIncomeDTO): Promise<Income> => {
  try {
    const response = await post<Income>('/incomes', data);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener todos los ingresos del usuario con paginación y filtros
 */
export const getIncomes = async (
  filters?: IncomeFilters
): Promise<PaginatedResponse<Income>> => {
  try {
    const response = await get<never>('/incomes', filters as unknown as Record<string, unknown> | undefined);
    // El tipo de response es PaginatedResponse que viene en el formato esperado
    return response as unknown as PaginatedResponse<Income>;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener un ingreso por ID
 */
export const getIncomeById = async (id: number): Promise<Income> => {
  try {
    const response = await get<Income>(`/incomes/${id}`);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Actualizar ingreso
 */
export const updateIncome = async (id: number, data: UpdateIncomeDTO): Promise<Income> => {
  try {
    const response = await patch<Income>(`/incomes/${id}`, data);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Eliminar ingreso
 */
export const deleteIncome = async (id: number): Promise<void> => {
  try {
    await del(`/incomes/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener resumen de ingresos
 * @param filters Filtros de fecha
 */
export const getIncomeSummary = async (
  filters?: DateRangeFilter
): Promise<IncomeSummary> => {
  try {
    const response = await get<IncomeSummary>('/incomes/summary', filters as unknown as Record<string, unknown> | undefined);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener ingresos por categoría
 */
export const getIncomesByCategory = async (
  categoryId: number,
  filters?: DateRangeFilter & { page?: number; limit?: number }
): Promise<PaginatedResponse<Income>> => {
  try {
    const params = filters ? { ...filters, categoryId } : { categoryId };
    const response = await get<never>('/incomes', params as Record<string, unknown>);
    return response as unknown as PaginatedResponse<Income>;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener ingresos del mes actual
 */
export const getCurrentMonthIncomes = async (): Promise<PaginatedResponse<Income>> => {
  try {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split('T')[0];
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split('T')[0];

    const response = await get<never>('/incomes', {
      startDate,
      endDate,
    });
    return response as unknown as PaginatedResponse<Income>;
  } catch (error) {
    throw handleApiError(error);
  }
};