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
      {/* Main Cards con efectos modernos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ingresos */}
        <div className="group relative overflow-hidden card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-success-500/10 to-success-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="card-body relative">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Ingresos
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-success-600">
                  {formatMoney(totalIncome, 'MXN', { showCurrency: false })}
                </p>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  {incomes} {incomes === 1 ? 'ingreso' : 'ingresos'}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-success-500 to-success-600"></div>
        </div>

        {/* Gastos */}
        <div className="group relative overflow-hidden card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-danger-500/10 to-danger-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="card-body relative">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Gastos
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-danger-600">
                  {formatMoney(totalExpenses, 'MXN', { showCurrency: false })}
                </p>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  {expenses} {expenses === 1 ? 'gasto' : 'gastos'}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-danger-500 to-danger-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 13l-5 5m0 0l-5-5m5 5V6"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-danger-500 to-danger-600"></div>
        </div>

        {/* Balance */}
        <div className="group relative overflow-hidden card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="card-body relative">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Balance</p>
                <p
                  className={`text-2xl sm:text-3xl font-bold ${
                    parseFloat(balance) >= 0 ? 'text-primary-600' : 'text-danger-600'
                  }`}
                >
                  {formatMoney(balance, 'MXN', { showCurrency: false })}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                    savingsRate >= 20 ? 'bg-success-100 text-success-700' : 
                    savingsRate >= 10 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    Ahorro: {formatPercentage(savingsRate)}
                  </div>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${
            parseFloat(balance) >= 0 ? 'from-primary-500 to-primary-600' : 'from-danger-500 to-danger-600'
          }`}></div>
        </div>
      </div>

      {/* Stats Row - Mejorado */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-shadow">
          <div className="card-body py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">Total Transacciones</p>
                <p className="text-xl font-bold text-gray-900">{transactions}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-success-50 to-white hover:shadow-md transition-shadow">
          <div className="card-body py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">Promedio Ingreso</p>
                <p className="text-xl font-bold text-success-600">
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
        </div>

        <div className="card bg-gradient-to-br from-danger-50 to-white hover:shadow-md transition-shadow">
          <div className="card-body py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-danger-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-danger-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-0.5">Promedio Gasto</p>
                <p className="text-xl font-bold text-danger-600">
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
      </div>
    </>
  );
}