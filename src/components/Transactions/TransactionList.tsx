import { Income, Expense } from '@/types/api.types';
import { formatMoney } from '@/utils/money';
import { formatDate, translatePaymentMethod } from '@/utils/formatters';

interface TransactionListProps {
  incomes?: Income[];
  expenses?: Expense[];
  type: 'income' | 'expense';
  onEdit: (transaction: Income | Expense) => void;
  onDelete: (id: number, description: string) => void;
  isLoading?: boolean;
}

export default function TransactionList({
  incomes = [],
  expenses = [],
  type,
  onEdit,
  onDelete,
  isLoading = false,
}: TransactionListProps) {
  const transactions = type === 'income' ? incomes : expenses;

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-600 mb-2">
          No hay {type === 'income' ? 'ingresos' : 'gastos'} registrados
        </p>
        <p className="text-sm text-gray-500">
          Comienza registrando tu primer{' '}
          {type === 'income' ? 'ingreso' : 'gasto'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => {
        const isIncome = type === 'income';
        const item = transaction as Income | Expense;
        const description = isIncome
          ? (item as Income).concept
          : (item as Expense).description;
        const notes = isIncome
          ? (item as Income).description
          : (item as Expense).notes;

        return (
          <div
            key={item.id}
            className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-gray-300 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left: Info */}
              <div className="flex-1 min-w-0">
                {/* Descripción/Concepto y Categoría */}
                <div className="flex items-center gap-2 mb-1">
                  {item.category && (
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.category.color }}
                    />
                  )}
                  <h3 className="font-semibold text-gray-900 truncate">
                    {description}
                  </h3>
                </div>

                {/* Fecha y Categoría */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span>{formatDate(item.date, 'short')}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-700 font-medium">
                    {item.category?.name || 'Sin categoría'}
                  </span>
                  {!isIncome && (item as Expense).paymentMethod && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="badge badge-gray text-xs">
                        {translatePaymentMethod(
                          (item as Expense).paymentMethod
                        )}
                      </span>
                    </>
                  )}
                </div>

                {/* Notas/Descripción adicional */}
                {notes && (
                  <p className="text-sm text-gray-600 line-clamp-2">{notes}</p>
                )}
              </div>

              {/* Right: Monto y Acciones */}
              <div className="flex items-center gap-3">
                {/* Monto */}
                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      isIncome ? 'text-success-600' : 'text-danger-600'
                    }`}
                  >
                    {isIncome ? '+' : '-'} {formatMoney(item.amount)}
                  </p>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-1">
                  {/* Editar */}
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>

                  {/* Eliminar */}
                  <button
                    onClick={() => onDelete(item.id, description)}
                    className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}