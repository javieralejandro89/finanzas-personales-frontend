import api from '../config/axios';
import {
  Account,
  CreateAccountData,
  UpdateAccountData,
  ApiResponse,
} from '../types';

export const accountService = {
  // Obtener todas las cuentas
  getAll: async (): Promise<Account[]> => {
    const response = await api.get<ApiResponse<Account[]>>('/accounts');
    return response.data.data;
  },

  // Obtener cuenta por ID
  getById: async (id: string): Promise<Account> => {
    const response = await api.get<ApiResponse<Account>>(`/accounts/${id}`);
    return response.data.data;
  },

  // Crear cuenta
  create: async (data: CreateAccountData): Promise<Account> => {
    const response = await api.post<ApiResponse<Account>>('/accounts', data);
    return response.data.data;
  },

  // Actualizar cuenta
  update: async (id: string, data: UpdateAccountData): Promise<Account> => {
    const response = await api.put<ApiResponse<Account>>(`/accounts/${id}`, data);
    return response.data.data;
  },

  // Eliminar cuenta
  delete: async (id: string): Promise<void> => {
    await api.delete(`/accounts/${id}`);
  },
};