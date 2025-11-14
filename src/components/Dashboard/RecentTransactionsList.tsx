import { useRecentTransactions } from '@/store/dashboardStore';
import { formatMoney } from '@/utils/money';
import { formatDate, translatePaymentMethod } from '@/utils/formatters';
import { useNavigate } from 'react-router-dom';

export default function RecentTransactionsList() {
  const transactions = useRecentTransactions();
  const navigate = useNavigate();

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
  <div className="card hover:shadow-lg transition-shadow">
    <div className="card-body">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Transacciones Recientes
          </h3>
        </div>
        <span className="badge badge-gray text-xs">{transactions.length} últimas</span>
      </div>

      <div className="space-y-2">
        {transactions.map((transaction) => (
          <div
            key={`${transaction.type}-${transaction.id}`}
            className="group relative overflow-hidden flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-gray-200"
          >
            <div className="flex items-center gap-3 flex-1">
              {/* Icon con animación */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform ${
                  transaction.type === 'income'
                    ? 'bg-gradient-to-br from-success-400 to-success-600'
                    : 'bg-gradient-to-br from-danger-400 to-danger-600'
                }`}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                <p className="font-semibold text-gray-900 truncate mb-1">
                  {transaction.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="flex items-center gap-1 text-gray-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {formatDate(transaction.date, 'short')}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium shadow-sm"
                    style={{
                      backgroundColor: `${transaction.category.color}15`,
                      color: transaction.category.color,
                      border: `1px solid ${transaction.category.color}30`,
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: transaction.category.color }}
                    />
                    {transaction.category.name}
                  </span>
                  {transaction.paymentMethod && (
                    <span className="badge badge-gray text-xs">
                      {translatePaymentMethod(transaction.paymentMethod)}
                    </span>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="text-right flex-shrink-0 ml-4">
                <p
                  className={`text-lg font-bold ${
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

            {/* Barra lateral de color */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              transaction.type === 'income' ? 'bg-success-500' : 'bg-danger-500'
            }`}></div>
          </div>
        ))}
      </div>

      {/* Ver todas - Mejorado */}
<div className="mt-6 pt-6 border-t border-gray-200">
  <button 
    onClick={() => navigate('/transactions')}
    className="w-full btn btn-outline group hover:bg-primary-50 hover:border-primary-500 hover:text-primary-700"
  >
    <span>Ver Todas las Transacciones</span>
    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
    </div>
  </div>
);
}