/**
 * Store de Categorías con Zustand
 * Maneja el estado de las categorías
 */

import { create } from 'zustand';
import type {
  Category,
  CreateCategoryDTO,
  UpdateCategoryDTO,
  CategoryFilters,
  ApiError,
} from '@/types/api.types';
import * as categoriesService from '@/services/categories.service';

interface CategoriesState {
  // Estado
  categories: Category[];
  incomeCategories: Category[];
  expenseCategories: Category[];
  isLoading: boolean;
  error: ApiError | null;

  // Acciones
  loadCategories: (filters?: CategoryFilters) => Promise<void>;
  loadActiveCategories: () => Promise<void>;
  createCategory: (data: CreateCategoryDTO) => Promise<Category>;
  updateCategory: (id: number, data: UpdateCategoryDTO) => Promise<Category>;
  deleteCategory: (id: number) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  // Estado inicial
  categories: [],
  incomeCategories: [],
  expenseCategories: [],
  isLoading: false,
  error: null,

  // Cargar todas las categorías
  loadCategories: async (filters) => {
    set({ isLoading: true, error: null });

    try {
      const categories = await categoriesService.getCategories(filters);

      set({
        categories,
        incomeCategories: categories.filter((cat) => cat.type === 'income'),
        expenseCategories: categories.filter((cat) => cat.type === 'expense'),
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error as ApiError,
      });
      throw error;
    }
  },

  // Cargar solo categorías activas
  loadActiveCategories: async () => {
    set({ isLoading: true, error: null });

    try {
      const [incomeCategories, expenseCategories] = await Promise.all([
        categoriesService.getActiveIncomeCategories(),
        categoriesService.getActiveExpenseCategories(),
      ]);

      set({
        incomeCategories,
        expenseCategories,
        categories: [...incomeCategories, ...expenseCategories],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error as ApiError,
      });
      throw error;
    }
  },

  // Crear nueva categoría
  createCategory: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const newCategory = await categoriesService.createCategory(data);

      // Actualizar estado local
      const categories = [...get().categories, newCategory];

      set({
        categories,
        incomeCategories: categories.filter((cat) => cat.type === 'income'),
        expenseCategories: categories.filter((cat) => cat.type === 'expense'),
        isLoading: false,
        error: null,
      });

      return newCategory;
    } catch (error) {
      set({
        isLoading: false,
        error: error as ApiError,
      });
      throw error;
    }
  },

  // Actualizar categoría
  updateCategory: async (id, data) => {
    set({ isLoading: true, error: null });

    try {
      const updatedCategory = await categoriesService.updateCategory(id, data);

      // Actualizar estado local
      const categories = get().categories.map((cat) =>
        cat.id === id ? updatedCategory : cat
      );

      set({
        categories,
        incomeCategories: categories.filter((cat) => cat.type === 'income'),
        expenseCategories: categories.filter((cat) => cat.type === 'expense'),
        isLoading: false,
        error: null,
      });

      return updatedCategory;
    } catch (error) {
      set({
        isLoading: false,
        error: error as ApiError,
      });
      throw error;
    }
  },

  // Eliminar categoría
  deleteCategory: async (id) => {
    set({ isLoading: true, error: null });

    try {
      await categoriesService.deleteCategory(id);

      // Actualizar estado local
      const categories = get().categories.filter((cat) => cat.id !== id);

      set({
        categories,
        incomeCategories: categories.filter((cat) => cat.type === 'income'),
        expenseCategories: categories.filter((cat) => cat.type === 'expense'),
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error as ApiError,
      });
      throw error;
    }
  },

  // Limpiar error
  clearError: () => {
    set({ error: null });
  },

  // Reset
  reset: () => {
    set({
      categories: [],
      incomeCategories: [],
      expenseCategories: [],
      isLoading: false,
      error: null,
    });
  },
}));

// Hooks selectivos
export const useCategories = () => useCategoriesStore((state) => state.categories);
export const useIncomeCategories = () =>
  useCategoriesStore((state) => state.incomeCategories);
export const useExpenseCategories = () =>
  useCategoriesStore((state) => state.expenseCategories);
export const useCategoriesLoading = () => useCategoriesStore((state) => state.isLoading);