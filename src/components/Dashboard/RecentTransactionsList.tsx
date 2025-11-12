import { useRecentTransactions } from '@/store/dashboardStore';
import { formatMoney } from '@/utils/money';
import { formatDate, translatePaymentMethod } from '@/utils/formatters';

export default function RecentTransactionsList() {
  const transactions = useRecentTransactions();

  if (!transactions) {
    return (
      <div className="card animate-pulse">
        <div className="card-body">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Transacciones Recientes
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p>No hay transacciones recientes</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Transacciones Recientes
          </h3>
          <span className="text-sm text-gray-500">{transactions.length} últimas</span>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={`${transaction.type}-${transaction.id}`}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    transaction.type === 'income'
                      ? 'bg-success-100'
                      : 'bg-danger-100'
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${
                      transaction.type === 'income'
                        ? 'text-success-600'
                        : 'text-danger-600'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        transaction.type === 'income'
                          ? 'M7 11l5-5m0 0l5 5m-5-5v12'
                          : 'M17 13l-5 5m0 0l-5-5m5 5V6'
                      }
                    />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {transaction.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                    <span>{formatDate(transaction.date, 'short')}</span>
                    <span>•</span>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: `${transaction.category.color}20`,
                        color: transaction.category.color,
                      }}
                    >
                      {transaction.category.name}
                    </span>
                    {transaction.paymentMethod && (
                      <>
                        <span>•</span>
                        <span className="text-xs">
                          {translatePaymentMethod(transaction.paymentMethod)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right flex-shrink-0">
                  <p
                    className={`text-lg font-semibold ${
                      transaction.type === 'income'
                        ? 'text-success-600'
                        : 'text-danger-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatMoney(transaction.amount, 'MXN', { showCurrency: false })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ver todas */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full btn btn-outline text-sm">
            Ver Todas las Transacciones
          </button>
        </div>
      </div>
    </div>
  );
}