import api from '../config/axios';
import {
  DashboardSummary,
  CategoryExpense,
  TrendData,
  ComparisonData,
  Transaction,
  ApiResponse,
} from '../types';

export const dashboardService = {
  // Obtener resumen del dashboard
  getSummary: async (startDate?: string, endDate?: string): Promise<DashboardSummary> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await api.get<ApiResponse<DashboardSummary>>(
      `/dashboard/summary${params.toString() ? `?${params.toString()}` : ''}`
    );
    return response.data.data;
  },

  // Obtener gastos por categoría
  getCategoryExpenses: async (startDate?: string, endDate?: string): Promise<CategoryExpense[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await api.get<ApiResponse<CategoryExpense[]>>(
      `/dashboard/categories${params.toString() ? `?${params.toString()}` : ''}`
    );
    return response.data.data;
  },

  // Obtener tendencias
  getTrends: async (months: number = 6): Promise<TrendData[]> => {
    const response = await api.get<ApiResponse<TrendData[]>>(
      `/dashboard/trends?months=${months}`
    );
    return response.data.data;
  },

  // Obtener comparación entre períodos
  getComparison: async (
    period1Start: string,
    period1End: string,
    period2Start: string,
    period2End: string
  ): Promise<ComparisonData> => {
    const params = new URLSearchParams({
      period1Start,
      period1End,
      period2Start,
      period2End,
    });

    const response = await api.get<ApiResponse<ComparisonData>>(
      `/dashboard/comparison?${params.toString()}`
    );
    return response.data.data;
  },

  // Obtener transacciones recientes
  getRecentTransactions: async (limit: number = 10): Promise<Transaction[]> => {
    const response = await api.get<ApiResponse<Transaction[]>>(
      `/dashboard/recent?limit=${limit}`
    );
    return response.data.data;
  },
};