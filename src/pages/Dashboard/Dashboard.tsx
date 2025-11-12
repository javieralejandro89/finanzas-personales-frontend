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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full">
          <div className="card-body text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-danger-500"
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">
                Bienvenido, {user?.name} • {currentMonthLabel}
              </p>
            </div>

            <button
              onClick={() => loadDashboard()}
              disabled={isLoading}
              className="btn btn-outline btn-sm flex items-center gap-2"
            >
              <svg
                className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Date Filter */}
          <DateFilter />

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="spinner w-12 h-12 border-4 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando datos financieros...</p>
              </div>
            </div>
          )}

          {/* Dashboard Content */}
          {!isLoading && (
            <>
              {/* Financial Summary Cards */}
              <FinancialSummaryCard />

              {/* Charts Grid */}
              <div className="grid grid-cols-1 gap-6">
                {/* Category Breakdown */}
                <CategoryBreakdownChart />

                {/* Monthly Trends */}
                <MonthlyTrendsChart />

                {/* Recent Transactions */}
                <RecentTransactionsList />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}