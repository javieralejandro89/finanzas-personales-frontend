import { useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useUser } from '@/store/authStore';
import DateFilter from '@/components/Dashboard/DateFilter';
import FinancialSummaryCard from '@/components/Dashboard/FinancialSummaryCard';
import CategoryBreakdownChart from '@/components/Dashboard/CategoryBreakdownChart';
import MonthlyTrendsChart from '@/components/Dashboard/MonthlyTrendsChart';
import RecentTransactionsList from '@/components/Dashboard/RecentTransactionsList';
import { getCurrentMonthYear } from '@/utils/formatters';

export default function Dashboard() {
  const user = useUser();
  const { loadDashboard, isLoading, error } = useDashboardStore();

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const { label: currentMonthLabel } = getCurrentMonthYear();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card max-w-md w-full shadow-lg animate-slide-up">
          <div className="card-body text-center">
            <div className="w-16 h-16 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-danger-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Error al cargar datos
            </h3>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <button
              onClick={() => loadDashboard()}
              className="btn btn-primary"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con gradiente */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-6 sm:p-8 shadow-lg">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Dashboard
              </h1>
              <p className="text-primary-100 text-sm sm:text-base">
                Bienvenido, {user?.name} • {currentMonthLabel}
              </p>
            </div>

            <button
              onClick={() => loadDashboard()}
              disabled={isLoading}
              className="btn bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            >
              <svg
                className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {isLoading ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </div>
        
        {/* Decoración */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Date Filter */}
      <div className="animate-fade-in">
        <DateFilter />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="relative">
              <div className="spinner w-16 h-16 border-4 mx-auto mb-4 border-primary-200 border-t-primary-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-primary-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-gray-600 font-medium">Cargando datos financieros...</p>
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      {!isLoading && (
        <div className="space-y-6 animate-fade-in">
          {/* Financial Summary Cards */}
          <FinancialSummaryCard />

          {/* Charts Grid - Responsive */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <div className="xl:col-span-2">
              <CategoryBreakdownChart />
            </div>

            {/* Monthly Trends */}
            <div className="xl:col-span-2">
              <MonthlyTrendsChart />
            </div>

            {/* Recent Transactions */}
            <div className="xl:col-span-2">
              <RecentTransactionsList />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}