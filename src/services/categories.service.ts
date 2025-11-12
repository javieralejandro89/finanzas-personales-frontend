/**
 * Servicio de Categorías
 * Todos los endpoints de /api/categories
 */

import { get, post, patch, del, handleApiError } from '../utils/api';
import type {
  Category,
  CreateCategoryDTO,
  UpdateCategoryDTO,
  CategoryFilters,
  CategoryStats,
  DateRangeFilter,
} from '../types/api.types';

/**
 * Crear nueva categoría
 */
export const createCategory = async (data: CreateCategoryDTO): Promise<Category> => {
  try {
    const response = await post<Category>('/categories', data);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener todas las categorías del usuario
 * @param filters Filtros opcionales (type, isActive)
 */
export const getCategories = async (filters?: CategoryFilters): Promise<Category[]> => {
  try {
    const params = filters ? (filters as unknown as Record<string, unknown>) : undefined;
    const response = await get<Category[]>('/categories', params);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener categorías por tipo
 */
export const getCategoriesByType = async (
  type: 'income' | 'expense'
): Promise<Category[]> => {
  try {
    const response = await get<Category[]>('/categories', { type });
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener categorías activas de ingresos
 */
export const getActiveIncomeCategories = async (): Promise<Category[]> => {
  try {
    const response = await get<Category[]>('/categories', {
      type: 'income',
      isActive: true,
    });
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener categorías activas de gastos
 */
export const getActiveExpenseCategories = async (): Promise<Category[]> => {
  try {
    const response = await get<Category[]>('/categories', {
      type: 'expense',
      isActive: true,
    });
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener una categoría por ID
 */
export const getCategoryById = async (id: number): Promise<Category> => {
  try {
    const response = await get<Category>(`/categories/${id}`);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Actualizar categoría
 */
export const updateCategory = async (
  id: number,
  data: UpdateCategoryDTO
): Promise<Category> => {
  try {
    const response = await patch<Category>(`/categories/${id}`, data);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Eliminar o desactivar categoría
 * Si tiene transacciones asociadas, se desactiva. Si no, se elimina.
 */
export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await del(`/categories/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener estadísticas de categorías
 * @param filters Filtros de tipo y fecha
 */
export const getCategoryStats = async (
  filters?: DateRangeFilter & { type?: 'income' | 'expense' }
): Promise<CategoryStats> => {
  try {
    const params = filters ? (filters as unknown as Record<string, unknown>) : undefined;
    const response = await get<CategoryStats>('/categories/stats', params);
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};