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
  <div className="card hover:shadow-lg transition-shadow">
    <div className="card-body">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Tendencias Mensuales
          </h3>
        </div>
        <span className="badge badge-info text-xs">
          Últimos {monthlyTrends.length} meses
        </span>
      </div>

      <div className="h-80 mb-6">
        <Line data={chartData} options={options} />
      </div>

      {/* Stats Summary - Mejorado */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        {monthlyTrends.length > 0 && (
          <>
            <div className="text-center p-4 rounded-lg bg-success-50 hover:bg-success-100 transition-colors">
  <div className="flex items-center justify-center gap-2 mb-1">
    <svg className="w-4 h-4 text-success-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
    <p className="text-xs font-semibold text-success-700 uppercase tracking-wide">Ingreso Promedio</p>
  </div>
  <p className="text-xl font-bold text-success-600">
    {formatMoneyCompact(
      monthlyTrends.reduce(
        (sum, trend) => sum + parseFloat(trend.income),
        0
      ) / monthlyTrends.length
    )}
  </p>
</div>

            <div className="text-center p-4 rounded-lg bg-danger-50 hover:bg-danger-100 transition-colors">
              <div className="flex items-center justify-center gap-2 mb-1">
                <svg className="w-4 h-4 text-danger-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-xs font-semibold text-danger-700 uppercase tracking-wide">Gasto Promedio</p>
              </div>
              <p className="text-xl font-bold text-danger-600">
                {formatMoneyCompact(
                  monthlyTrends.reduce(
                    (sum, trend) => sum + parseFloat(trend.expenses),
                    0
                  ) / monthlyTrends.length
                )}
              </p>
            </div>

            <div className="text-center p-4 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors">
              <div className="flex items-center justify-center gap-2 mb-1">
                <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
                <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide">Balance Promedio</p>
              </div>
              <p className="text-xl font-bold text-primary-600">
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