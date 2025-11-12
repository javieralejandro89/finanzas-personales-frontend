/**
 * Tipos de API - Frontend
 * Estos tipos coinciden exactamente con las respuestas del backend
 */

// ============================================
// TIPOS BASE DE RESPUESTA
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// ENTIDADES DEL DOMINIO
// ============================================

export interface User {
  id: number;
  name: string;
  email: string;
  currency: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
  color: string;
  isActive: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Income {
  id: number;
  concept: string;
  amount: string; // String porque viene de Decimal del backend
  date: string;
  description?: string | null;
  userId: number;
  categoryId: number;
  category?: {
    id: number;
    name: string;
    color: string;
    type: 'income';
  };
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: number;
  description: string;
  amount: string; // String porque viene de Decimal del backend
  date: string;
  notes?: string | null;
  paymentMethod: PaymentMethod;
  userId: number;
  categoryId: number;
  category?: {
    id: number;
    name: string;
    color: string;
    type: 'expense';
  };
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  userAgent?: string | null;
  ipAddress?: string | null;
  createdAt: string;
  expiresAt: string;
}

// ============================================
// ENUMS
// ============================================

export type PaymentMethod = 'cash' | 'card' | 'transfer' | 'check' | 'other';

export type CategoryType = 'income' | 'expense';

// ============================================
// DTOs DE AUTENTICACIÓN
// ============================================

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  currency?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshTokenDTO {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface UpdateProfileDTO {
  name?: string;
  currency?: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
  refreshToken?: string;
}

// ============================================
// DTOs DE CATEGORÍAS
// ============================================

export interface CreateCategoryDTO {
  name: string;
  type: CategoryType;
  color?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  color?: string;
  isActive?: boolean;
}

// ============================================
// DTOs DE INGRESOS
// ============================================

export interface CreateIncomeDTO {
  concept: string;
  amount: number | string;
  date: string;
  description?: string;
  categoryId: number;
}

export interface UpdateIncomeDTO {
  concept?: string;
  amount?: number | string;
  date?: string;
  description?: string;
  categoryId?: number;
}

export interface IncomeSummary {
  total: string;
  count: number;
  average: string;
  highest: Income | null;
  lowest: Income | null;
  period: {
    startDate: string | null;
    endDate: string | null;
  };
}

// ============================================
// DTOs DE GASTOS
// ============================================

export interface CreateExpenseDTO {
  description: string;
  amount: number | string;
  date: string;
  notes?: string;
  paymentMethod?: PaymentMethod;
  categoryId: number;
}

export interface UpdateExpenseDTO {
  description?: string;
  amount?: number | string;
  date?: string;
  notes?: string;
  paymentMethod?: PaymentMethod;
  categoryId?: number;
}

export interface ExpenseSummary {
  total: string;
  count: number;
  average: string;
  highest: Expense | null;
  lowest: Expense | null;
  byPaymentMethod: {
    paymentMethod: PaymentMethod;
    total: string;
    count: number;
  }[];
  period: {
    startDate: string | null;
    endDate: string | null;
  };
}

// ============================================
// TIPOS DEL DASHBOARD
// ============================================

export interface FinancialSummary {
  period: {
    startDate: string;
    endDate: string;
  };
  summary: {
    totalIncome: string;
    totalExpenses: string;
    balance: string;
    savingsRate: number;
  };
  counts: {
    incomes: number;
    expenses: number;
    transactions: number;
  };
}

export interface CategorySummary {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
  total: string;
  count: number;
  percentage: number;
}

export interface CategoryBreakdown {
  period: {
    startDate: string;
    endDate: string;
  };
  topIncomeCategories: CategorySummary[];
  topExpenseCategories: CategorySummary[];
}

export interface MonthlyTrend {
  period: string;
  month: string;
  year: number;
  income: string;
  expenses: string;
  balance: string;
  savingsRate: number;
}

export interface MonthlyTrends {
  monthsCount: number;
  trends: MonthlyTrend[];
}

export interface PeriodComparison {
  period1: {
    startDate: string;
    endDate: string;
    income: string;
    expenses: string;
    balance: string;
    transactions: number;
  };
  period2: {
    startDate: string;
    endDate: string;
    income: string;
    expenses: string;
    balance: string;
    transactions: number;
  };
  changes: {
    income: number;
    expenses: number;
    balance: number;
  };
}

export interface Transaction {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: string;
  date: string;
  category: {
    id: number;
    name: string;
    color: string;
    type: CategoryType;
  };
  paymentMethod?: PaymentMethod;
  createdAt: string;
}

// ============================================
// ESTADÍSTICAS DE CATEGORÍAS
// ============================================

export interface CategoryStats {
  incomes?: CategorySummary[];
  expenses?: CategorySummary[];
}

// ============================================
// FILTROS PARA QUERIES
// ============================================

export interface DateRangeFilter {
  startDate?: string;
  endDate?: string;
}

export interface PaginationFilter {
  page?: number;
  limit?: number;
}

export interface IncomeFilters extends DateRangeFilter, PaginationFilter {
  categoryId?: number;
}

export interface ExpenseFilters extends DateRangeFilter, PaginationFilter {
  categoryId?: number;
  paymentMethod?: PaymentMethod;
}

export interface CategoryFilters {
  type?: CategoryType;
  isActive?: boolean;
}

// ============================================
// ERRORES
// ============================================

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

// ============================================
// TIPOS DE UTILIDAD
// ============================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;