import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useBreakdown } from '@/store/dashboardStore';
import { formatMoney } from '@/utils/money';
import { formatPercentage } from '@/utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryBreakdownChart() {
  const breakdown = useBreakdown();

  if (!breakdown) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="card-body">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const { topIncomeCategories, topExpenseCategories } = breakdown;

  // Opciones comunes para las gráficas
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${formatMoney(value.toString(), 'MXN', { showCurrency: false })}`;
          },
        },
      },
    },
  };

  // Data para ingresos
  const incomeData = {
    labels: topIncomeCategories.map((cat) => cat.categoryName),
    datasets: [
      {
        data: topIncomeCategories.map((cat) => parseFloat(cat.total)),
        backgroundColor: topIncomeCategories.map((cat) => cat.categoryColor),
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  // Data para gastos
  const expenseData = {
    labels: topExpenseCategories.map((cat) => cat.categoryName),
    datasets: [
      {
        data: topExpenseCategories.map((cat) => parseFloat(cat.total)),
        backgroundColor: topExpenseCategories.map((cat) => cat.categoryColor),
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  return (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Ingresos por Categoría */}
    <div className="card hover:shadow-lg transition-shadow group">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Top 5 Categorías de Ingresos
          </h3>
          <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-4 h-4 text-success-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {topIncomeCategories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="font-medium">No hay ingresos en este período</p>
          </div>
        ) : (
          <>
            <div className="h-64 mb-6">
              <Pie data={incomeData} options={chartOptions} />
            </div>

            {/* Lista de categorías mejorada */}
            <div className="space-y-2">
              {topIncomeCategories.map((cat, index) => (
                <div
                  key={cat.categoryId}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-xs font-bold text-gray-400 w-4">#{index + 1}</span>
                    <div
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: cat.categoryColor }}
                    />
                    <span className="text-sm text-gray-700 font-medium">{cat.categoryName}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {formatMoney(cat.total, 'MXN', { showCurrency: false })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatPercentage(cat.percentage)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>

    {/* Gastos por Categoría */}
    <div className="card hover:shadow-lg transition-shadow group">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Top 5 Categorías de Gastos
          </h3>
          <div className="w-8 h-8 bg-danger-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-4 h-4 text-danger-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {topExpenseCategories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <p className="font-medium">No hay gastos en este período</p>
          </div>
        ) : (
          <>
            <div className="h-64 mb-6">
              <Pie data={expenseData} options={chartOptions} />
            </div>

            {/* Lista de categorías mejorada */}
            <div className="space-y-2">
              {topExpenseCategories.map((cat, index) => (
                <div
                  key={cat.categoryId}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-xs font-bold text-gray-400 w-4">#{index + 1}</span>
                    <div
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: cat.categoryColor }}
                    />
                    <span className="text-sm text-gray-700 font-medium">{cat.categoryName}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {formatMoney(cat.total, 'MXN', { showCurrency: false })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatPercentage(cat.percentage)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
}