/**
 * Store de Transacciones con Zustand
 * Maneja el estado de ingresos y gastos
 */

import { create } from 'zustand';
import type {
  Income,
  Expense,
  CreateIncomeDTO,
  CreateExpenseDTO,
  UpdateIncomeDTO,
  UpdateExpenseDTO,
  IncomeFilters,
  ExpenseFilters,
  PaginatedResponse,
  ApiError,
} from '@/types/api.types';
import * as incomesService from '@/services/incomes.service';
import * as expensesService from '@/services/expenses.service';

interface TransactionsState {
  // Estado de ingresos
  incomes: Income[];
  incomePagination: PaginatedResponse<Income>['pagination'] | null;
  
  // Estado de gastos
  expenses: Expense[];
  expensePagination: PaginatedResponse<Expense>['pagination'] | null;

  // Estado de UI
  isLoading: boolean;
  error: ApiError | null;
  activeTab: 'income' | 'expense';

  // Acciones de Ingresos
  loadIncomes: (filters?: IncomeFilters) => Promise<void>;
  createIncome: (data: CreateIncomeDTO) => Promise<Income>;
  updateIncome: (id: number, data: UpdateIncomeDTO) => Promise<Income>;
  deleteIncome: (id: number) => Promise<void>;

  // Acciones de Gastos
  loadExpenses: (filters?: ExpenseFilters) => Promise<void>;
  createExpense: (data: CreateExpenseDTO) => Promise<Expense>;
  updateExpense: (id: number, data: UpdateExpenseDTO) => Promise<Expense>;
  deleteExpense: (id: number) => Promise<void>;

  // Acciones generales
  setActiveTab: (tab: 'income' | 'expense') => void;
  clearError: () => void;
  reset: () => void;
}

export const useTransactionsStore = create<TransactionsState>((set, get) => ({
  // Estado inicial
  incomes: [],
  incomePagination: null,
  expenses: [],
  expensePagination: null,
  isLoading: false,
  error: null,
  activeTab: 'expense',

  // ============ ACCIONES DE INGRESOS ============

  loadIncomes: async (filters) => {
    set({ isLoading: true, error: null });

    try {
      const response = await incomesService.getIncomes(filters);

      set({
        incomes: response.data,
        incomePagination: response.pagination,
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

  createIncome: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const newIncome = await incomesService.createIncome(data);

      // Recargar ingresos después de crear
      await get().loadIncomes();

      set({
        isLoading: false,
        error: null,
      });

      return newIncome;
    } catch (error) {
      set({
        isLoading: false,
        error: error as ApiError,
      });
      throw error;
    }
  },

  updateIncome: async (id, data) => {
    set({ isLoading: true, error: null });

    try {
      const updatedIncome = await incomesService.updateIncome(id, data);

      // Actualizar en el estado local
      const incomes = get().incomes.map((income) =>
        income.id === id ? updatedIncome : income
      );

      set({
        incomes,
        isLoading: false,
        error: null,
      });

      return updatedIncome;
    } catch (error) {
      set({
        isLoading: false,
        error: error as ApiError,
      });
      throw error;
    }
  },

  deleteIncome: async (id) => {
    set({ isLoading: true, error: null });

    try {
      await incomesService.deleteIncome(id);

      // Eliminar del estado local
      const incomes = get().incomes.filter((income) => income.id !== id);

      set({
        incomes,
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

  // ============ ACCIONES DE GASTOS ============

  loadExpenses: async (filters) => {
    set({ isLoading: true, error: null });

    try {
      const response = await expensesService.getExpenses(filters);

      set({
        expenses: response.data,
        expensePagination: response.pagination,
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

  createExpense: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const newExpense = await expensesService.createExpense(data);

      // Recargar gastos después de crear
      await get().loadExpenses();

      set({
        isLoading: false,
        error: null,
      });

      return newExpense;
    } catch (error) {
      set({
        isLoading: false,
        error: error as ApiError,
      });
      throw error;
    }
  },

  updateExpense: async (id, data) => {
    set({ isLoading: true, error: null });

    try {
      const updatedExpense = await expensesService.updateExpense(id, data);

      // Actualizar en el estado local
      const expenses = get().expenses.map((expense) =>
        expense.id === id ? updatedExpense : expense
      );

      set({
        expenses,
        isLoading: false,
        error: null,
      });

      return updatedExpense;
    } catch (error) {
      set({
        isLoading: false,
        error: error as ApiError,
      });
      throw error;
    }
  },

  deleteExpense: async (id) => {
    set({ isLoading: true, error: null });

    try {
      await expensesService.deleteExpense(id);

      // Eliminar del estado local
      const expenses = get().expenses.filter((expense) => expense.id !== id);

      set({
        expenses,
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

  // ============ ACCIONES GENERALES ============

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  clearError: () => {
    set({ error: null });
  },

  reset: () => {
    set({
      incomes: [],
      incomePagination: null,
      expenses: [],
      expensePagination: null,
      isLoading: false,
      error: null,
      activeTab: 'expense',
    });
  },
}));

// Hooks selectivos
export const useIncomes = () => useTransactionsStore((state) => state.incomes);
export const useExpenses = () => useTransactionsStore((state) => state.expenses);
export const useTransactionsLoading = () =>
  useTransactionsStore((state) => state.isLoading);
export const useActiveTab = () => useTransactionsStore((state) => state.activeTab);