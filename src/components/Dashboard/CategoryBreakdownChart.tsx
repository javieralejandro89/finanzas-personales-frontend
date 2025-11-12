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
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top 5 Categorías de Ingresos
          </h3>

          {topIncomeCategories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg
                className="w-16 h-16 mx-auto mb-3 text-gray-400"
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
              <p>No hay ingresos en este período</p>
            </div>
          ) : (
            <>
              <div className="h-64 mb-4">
                <Pie data={incomeData} options={chartOptions} />
              </div>

              {/* Lista de categorías */}
              <div className="space-y-2">
                {topIncomeCategories.map((cat) => (
                  <div
                    key={cat.categoryId}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.categoryColor }}
                      />
                      <span className="text-gray-700">{cat.categoryName}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">
                        {formatMoney(cat.total, 'MXN', { showCurrency: false })}
                      </span>
                      <span className="text-gray-500 ml-2">
                        ({formatPercentage(cat.percentage)})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Gastos por Categoría */}
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top 5 Categorías de Gastos
          </h3>

          {topExpenseCategories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg
                className="w-16 h-16 mx-auto mb-3 text-gray-400"
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
              <p>No hay gastos en este período</p>
            </div>
          ) : (
            <>
              <div className="h-64 mb-4">
                <Pie data={expenseData} options={chartOptions} />
              </div>

              {/* Lista de categorías */}
              <div className="space-y-2">
                {topExpenseCategories.map((cat) => (
                  <div
                    key={cat.categoryId}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.categoryColor }}
                      />
                      <span className="text-gray-700">{cat.categoryName}</span>
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