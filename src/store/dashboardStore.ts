/**
 * Store del Dashboard con Zustand
 * Maneja el estado de los datos financieros
 */

import { create } from 'zustand';
import type {
  FinancialSummary,
  CategoryBreakdown,
  MonthlyTrends,
  Transaction,
  ApiError,
  DateRangeFilter,
} from '@/types/api.types';
import * as dashboardService from '@/services/dashboard.service';
import { getCurrentMonthRange } from '@/utils/formatters';

interface DashboardState {
  // Estado de datos
  summary: FinancialSummary | null;
  breakdown: CategoryBreakdown | null;
  trends: MonthlyTrends | null;
  recentTransactions: Transaction[];

  // Estado de UI
  isLoading: boolean;
  error: ApiError | null;
  dateFilter: DateRangeFilter;

  // Acciones
  loadDashboard: (filters?: DateRangeFilter) => Promise<void>;
  loadSummary: (filters?: DateRangeFilter) => Promise<void>;
  loadBreakdown: (filters?: DateRangeFilter) => Promise<void>;
  loadTrends: (months?: number) => Promise<void>;
  loadRecentTransactions: (limit?: number) => Promise<void>;
  setDateFilter: (filter: DateRangeFilter) => void;
  resetToCurrentMonth: () => void;
  clearError: () => void;
  reset: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Estado inicial
  summary: null,
  breakdown: null,
  trends: null,
  recentTransactions: [],
  isLoading: false,
  error: null,
  dateFilter: getCurrentMonthRange(),

  // Cargar todos los datos del dashboard
  loadDashboard: async (filters) => {
    const dateFilter = filters || get().dateFilter;
    set({ isLoading: true, error: null, dateFilter });

    try {
      const data = await dashboardService.getDashboardData(dateFilter);

      set({
        summary: data.summary,
        breakdown: data.breakdown,
        trends: data.trends,
        recentTransactions: data.recentTransactions,
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

  // Cargar solo el resumen financiero
  loadSummary: async (filters) => {
    const dateFilter = filters || get().dateFilter;
    set({ isLoading: true, error: null });

    try {
      const summary = await dashboardService.getFinancialSummary(dateFilter);

      set({
        summary,
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

  // Cargar desglose por categorías
  loadBreakdown: async (filters) => {
    const dateFilter = filters || get().dateFilter;
    set({ isLoading: true, error: null });

    try {
      const breakdown = await dashboardService.getCategoryBreakdown(dateFilter);

      set({
        breakdown,
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

  // Cargar tendencias mensuales
  loadTrends: async (months = 6) => {
    set({ isLoading: true, error: null });

    try {
      const trends = await dashboardService.getMonthlyTrends(months);

      set({
        trends,
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

  // Cargar transacciones recientes
  loadRecentTransactions: async (limit = 10) => {
    set({ isLoading: true, error: null });

    try {
      const transactions = await dashboardService.getRecentTransactions(limit);

      set({
        recentTransactions: transactions,
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

  // Actualizar filtro de fechas
  setDateFilter: (filter: DateRangeFilter) => {
    set({ dateFilter: filter });
  },

  // Resetear a mes actual
  resetToCurrentMonth: () => {
    const currentMonthRange = getCurrentMonthRange();
    set({ dateFilter: currentMonthRange });
  },

  // Limpiar error
  clearError: () => {
    set({ error: null });
  },

  // Reset completo
  reset: () => {
    set({
      summary: null,
      breakdown: null,
      trends: null,
      recentTransactions: [],
      isLoading: false,
      error: null,
      dateFilter: getCurrentMonthRange(),
    });
  },
}));

// Hooks selectivos para componentes
export const useSummary = () => useDashboardStore((state) => state.summary);
export const useBreakdown = () => useDashboardStore((state) => state.breakdown);
export const useTrends = () => useDashboardStore((state) => state.trends);
export const useRecentTransactions = () =>
  useDashboardStore((state) => state.recentTransactions);
export const useDashboardLoading = () => useDashboardStore((state) => state.isLoading);
export const useDateFilter = () => useDashboardStore((state) => state.dateFilter);