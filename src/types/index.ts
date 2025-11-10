// Tipos de usuario y autenticación
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Tipos de transacciones
export type TransactionType = 'income' | 'expense';
export type PaymentMethod = 'cash' | 'card' | 'transfer' | 'check' | 'other';

export interface Transaction {
  id: string;
  userId: string;
  categoryId: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  date: string;
  paymentMethod: PaymentMethod;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  category?: Category;
  account?: Account;
}

export interface CreateTransactionData {
  categoryId: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  paymentMethod: PaymentMethod;
  tags?: string[];
}

export interface UpdateTransactionData extends Partial<CreateTransactionData> {}

// Tipos de categorías
export interface Category {
  id: string;
  userId: string;
  name: string;
  type: TransactionType;
  color: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  name: string;
  type: TransactionType;
  color: string;
  icon?: string;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {}

// Tipos de cuentas
export interface Account {
  id: string;
  userId: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountData {
  name: string;
  type: string;
  balance: number;
  currency?: string;
}

export interface UpdateAccountData extends Partial<CreateAccountData> {}

// Tipos de Dashboard
export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsRate: number;
  currency: string;
  period: {
    startDate: string;
    endDate: string;
  };
}

export interface CategoryExpense {
  categoryId: string;
  categoryName: string;
  amount: number;
  percentage: number;
  color: string;
  transactionCount: number;
}

export interface TrendData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface ComparisonData {
  period1: {
    startDate: string;
    endDate: string;
    totalIncome: number;
    totalExpenses: number;
    balance: number;
  };
  period2: {
    startDate: string;
    endDate: string;
    totalIncome: number;
    totalExpenses: number;
    balance: number;
  };
  changes: {
    incomeChange: number;
    expensesChange: number;
    balanceChange: number;
    incomePercentage: number;
    expensesPercentage: number;
    balancePercentage: number;
  };
}

// Tipos de respuesta de API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Tipos de filtros
export interface TransactionFilters {
  type?: TransactionType;
  categoryId?: string;
  accountId?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  paymentMethod?: PaymentMethod;
  search?: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}