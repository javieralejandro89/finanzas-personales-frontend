/**
 * Servicio de Gastos
 * Todos los endpoints de /api/expenses
 */

import { get, post, patch, del, handleApiError } from '../utils/api';
import type {
  Expense,
  CreateExpenseDTO,
  UpdateExpenseDTO,
  ExpenseFilters,
  ExpenseSummary,
  DateRangeFilter,
  PaginatedResponse,
  PaymentMethod,
} from '../types/api.types';

/**
 * Crear nuevo gasto
 */
export const createExpense = async (data: CreateExpenseDTO): Promise<Expense> => {
  try {
    const response = await post<Expense>('/expenses', data);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener todos los gastos del usuario con paginación y filtros
 */
export const getExpenses = async (
  filters?: ExpenseFilters
): Promise<PaginatedResponse<Expense>> => {
  try {
    const response = await get<never>('/expenses', filters as Record<string, unknown> | undefined);
    return response as unknown as PaginatedResponse<Expense>;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener un gasto por ID
 */
export const getExpenseById = async (id: number): Promise<Expense> => {
  try {
    const response = await get<Expense>(`/expenses/${id}`);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Actualizar gasto
 */
export const updateExpense = async (
  id: number,
  data: UpdateExpenseDTO
): Promise<Expense> => {
  try {
    const response = await patch<Expense>(`/expenses/${id}`, data);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Eliminar gasto
 */
export const deleteExpense = async (id: number): Promise<void> => {
  try {
    await del(`/expenses/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener resumen de gastos
 * @param filters Filtros de fecha
 */
export const getExpenseSummary = async (
  filters?: DateRangeFilter
): Promise<ExpenseSummary> => {
  try {
    const response = await get<ExpenseSummary>(
      '/expenses/summary',
      filters as Record<string, unknown> | undefined
    );
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener gastos por categoría
 */
export const getExpensesByCategory = async (
  categoryId: number,
  filters?: DateRangeFilter & { page?: number; limit?: number }
): Promise<PaginatedResponse<Expense>> => {
  try {
    const response = await get<never>('/expenses', {
      ...filters,
      categoryId,
    } as Record<string, unknown>);
    return response as unknown as PaginatedResponse<Expense>;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener gastos por método de pago
 */
export const getExpensesByPaymentMethod = async (
  paymentMethod: PaymentMethod,
  filters?: DateRangeFilter & { page?: number; limit?: number }
): Promise<PaginatedResponse<Expense>> => {
  try {
    const response = await get<never>('/expenses', {
      ...filters,
      paymentMethod,
    } as Record<string, unknown>);
    return response as unknown as PaginatedResponse<Expense>;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener gastos del mes actual
 */
export const getCurrentMonthExpenses = async (): Promise<PaginatedResponse<Expense>> => {
  try {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split('T')[0];
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split('T')[0];

    const response = await get<never>('/expenses', {
      startDate,
      endDate,
    });
    return response as unknown as PaginatedResponse<Expense>;
  } catch (error) {
    throw handleApiError(error);
  }
};