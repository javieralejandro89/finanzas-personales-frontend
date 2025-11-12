import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTrends } from '@/store/dashboardStore';
import { formatMoneyCompact } from '@/utils/money';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function MonthlyTrendsChart() {
  const trends = useTrends();

  if (!trends) {
    return (
      <div className="card animate-pulse">
        <div className="card-body">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-80 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const { trends: monthlyTrends } = trends;

  if (monthlyTrends.length === 0) {
    return (
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tendencias Mensuales
          </h3>
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p>No hay datos para mostrar tendencias</p>
          </div>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: monthlyTrends.map((trend) => `${trend.month} ${trend.year}`),
    datasets: [
      {
        label: 'Ingresos',
        data: monthlyTrends.map((trend) => parseFloat(trend.income)),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Gastos',
        data: monthlyTrends.map((trend) => parseFloat(trend.expenses)),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Balance',
        data: monthlyTrends.map((trend) => parseFloat(trend.balance)),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatMoneyCompact(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return formatMoneyCompact(value);
          },
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Tendencias Mensuales
          </h3>
          <span className="text-sm text-gray-500">
            Últimos {monthlyTrends.length} meses
          </span>
        </div>

        <div className="h-80">
          <Line data={chartData} options={options} />
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          {monthlyTrends.length > 0 && (
            <>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Ingreso Promedio</p>
                <p className="text-lg font-semibold text-success-600">
                  {formatMoneyCompact(
                    monthlyTrends.reduce(
                      (sum, trend) => sum + parseFloat(trend.income),
                      0
                    ) / monthlyTrends.length
                  )}
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Gasto Promedio</p>
                <p className="text-lg font-semibold text-danger-600">
                  {formatMoneyCompact(
                    monthlyTrends.reduce(
                      (sum, trend) => sum + parseFloat(trend.expenses),
                      0
                    ) / monthlyTrends.length
                  )}
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Balance Promedio</p>
                <p className="text-lg font-semibold text-primary-600">
                  {formatMoneyCompact(
                    monthlyTrends.reduce(
                      (sum, trend) => sum + parseFloat(trend.balance),
                      0
                    ) / monthlyTrends.length
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}