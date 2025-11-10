import api from '../config/axios';
import {
  Transaction,
  CreateTransactionData,
  UpdateTransactionData,
  TransactionFilters,
  ApiResponse,
  PaginatedResponse,
} from '../types';

export const transactionService = {
  // Obtener todas las transacciones
  getAll: async (filters?: TransactionFilters): Promise<Transaction[]> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const response = await api.get<ApiResponse<Transaction[]>>(
      `/transactions${params.toString() ? `?${params.toString()}` : ''}`
    );
    return response.data.data;
  },

  // Obtener transacción por ID
  getById: async (id: string): Promise<Transaction> => {
    const response = await api.get<ApiResponse<Transaction>>(`/transactions/${id}`);
    return response.data.data;
  },

  // Crear transacción
  create: async (data: CreateTransactionData): Promise<Transaction> => {
    const response = await api.post<ApiResponse<Transaction>>('/transactions', data);
    return response.data.data;
  },

  // Actualizar transacción
  update: async (id: string, data: UpdateTransactionData): Promise<Transaction> => {
    const response = await api.put<ApiResponse<Transaction>>(`/transactions/${id}`, data);
    return response.data.data;
  },

  // Eliminar transacción
  delete: async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}`);
  },

  // Obtener estadísticas de transacciones
  getStats: async (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await api.get(
      `/transactions/stats${params.toString() ? `?${params.toString()}` : ''}`
    );
    return response.data.data;
  },
};