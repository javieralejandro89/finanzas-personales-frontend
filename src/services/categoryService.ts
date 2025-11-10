import api from '../config/axios';
import {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
  ApiResponse,
} from '../types';

export const categoryService = {
  // Obtener todas las categorías
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  },

  // Obtener categoría por ID
  getById: async (id: string): Promise<Category> => {
    const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data;
  },

  // Crear categoría
  create: async (data: CreateCategoryData): Promise<Category> => {
    const response = await api.post<ApiResponse<Category>>('/categories', data);
    return response.data.data;
  },

  // Actualizar categoría
  update: async (id: string, data: UpdateCategoryData): Promise<Category> => {
    const response = await api.put<ApiResponse<Category>>(`/categories/${id}`, data);
    return response.data.data;
  },

  // Eliminar categoría
  delete: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },

  // Obtener categorías por tipo
  getByType: async (type: 'income' | 'expense'): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>(`/categories?type=${type}`);
    return response.data.data;
  },
};