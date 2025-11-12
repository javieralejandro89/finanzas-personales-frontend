import { useSummary } from '@/store/dashboardStore';
import { formatMoney } from '@/utils/money';
import { formatPercentage } from '@/utils/formatters';

export default function FinancialSummaryCard() {
  const summary = useSummary();

  if (!summary) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="card-body">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const { totalIncome, totalExpenses, balance, savingsRate } = summary.summary;
  const { incomes, expenses, transactions } = summary.counts;

  return (
    <>
      {/* Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ingresos */}
        <div className="card hover:shadow-md transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Ingresos
                </p>
                <p className="text-2xl font-bold text-success-600">
                  {formatMoney(totalIncome, 'MXN', { showCurrency: false })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {incomes} {incomes === 1 ? 'ingreso' : 'ingresos'}
                </p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-success-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Gastos */}
        <div className="card hover:shadow-md transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Gastos
                </p>
                <p className="text-2xl font-bold text-danger-600">
                  {formatMoney(totalExpenses, 'MXN', { showCurrency: false })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {expenses} {expenses === 1 ? 'gasto' : 'gastos'}
                </p>
              </div>
              <div className="w-12 h-12 bg-danger-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-danger-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 13l-5 5m0 0l-5-5m5 5V6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="card hover:shadow-md transition-shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Balance</p>
                <p
                  className={`text-2xl font-bold ${
                    parseFloat(balance) >= 0 ? 'text-success-600' : 'text-danger-600'
                  }`}
                >
                  {formatMoney(balance, 'MXN', { showCurrency: false })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Tasa de ahorro: {formatPercentage(savingsRate)}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gray-50">
          <div className="card-body py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Total Transacciones</p>
              <p className="text-lg font-semibold text-gray-900">{transactions}</p>
            </div>
          </div>
        </div>

        <div className="card bg-gray-50">
          <div className="card-body py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Promedio Ingreso</p>
              <p className="text-lg font-semibold text-gray-900">
                {incomes > 0
                  ? formatMoney(
                      (parseFloat(totalIncome) / incomes).toString(),
                      'MXN',
                      { showCurrency: false }
                    )
                  : '$0.00'}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-gray-50">
          <div className="card-body py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Promedio Gasto</p>
              <p className="text-lg font-semibold text-gray-900">
                {expenses > 0
                  ? formatMoney(
                      (parseFloat(totalExpenses) / expenses).toString(),
                      'MXN',
                      { showCurrency: false }
                    )
                  : '$0.00'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}