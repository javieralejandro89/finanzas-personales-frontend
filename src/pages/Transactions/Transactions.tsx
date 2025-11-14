import { useEffect, useState } from 'react';
import { useTransactionsStore } from '@/store/transactionsStore';
import { useCategoriesStore } from '@/store/categoriesStore';
import Modal from '@/components/UI/Modal';
import IncomeForm from '@/components/Transactions/IncomeForm';
import ExpenseForm from '@/components/Transactions/ExpenseForm';
import TransactionList from '@/components/Transactions/TransactionList';
import type { IncomeFormInput } from '@/schemas/transactionSchemas';
import type { ExpenseFormInput } from '@/schemas/transactionSchemas';
import type { Income, Expense } from '@/types/api.types';
import { formatDateForInput } from '@/utils/formatters';

const Transactions = () => {
  const {
    incomes,
    expenses,
    activeTab,
    isLoading,
    loadIncomes,
    loadExpenses,
    createIncome,
    createExpense,
    updateIncome,
    updateExpense,
    deleteIncome,
    deleteExpense,
    setActiveTab,
  } = useTransactionsStore();

  const { loadActiveCategories } = useCategoriesStore();

  // Estados del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Income | Expense | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar datos al montar
  useEffect(() => {
    loadActiveCategories();
    loadIncomes();
    loadExpenses();
  }, [loadActiveCategories, loadIncomes, loadExpenses]);

  // Handlers de Modal
  const openCreateModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Income | Expense) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setIsSubmitting(false);
  };  

  // Submit de Ingreso
const handleIncomeSubmit = async (data: IncomeFormInput) => {
  setIsSubmitting(true);

  try {
    // Convertir null a undefined
    const cleanData = {
      ...data,
      description: data.description || undefined,
    };

    if (editingItem) {
      await updateIncome(editingItem.id, cleanData);
    } else {
      await createIncome(cleanData);
    }
    closeModal();
  } catch (error) {
    console.error('Error al guardar ingreso:', error);
  } finally {
    setIsSubmitting(false);
  }
};

// Submit de Gasto
const handleExpenseSubmit = async (data: ExpenseFormInput) => {
  setIsSubmitting(true);

  try {
    // Convertir null a undefined
    const cleanData = {
      ...data,
      notes: data.notes || undefined,
    };

    if (editingItem) {
      await updateExpense(editingItem.id, cleanData);
    } else {
      await createExpense(cleanData);
    }
    closeModal();
  } catch (error) {
    console.error('Error al guardar gasto:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  // Eliminar transacción
  const handleDelete = async (id: number, description: string) => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar "${description}"?\n\nEsta acción no se puede deshacer.`
    );

    if (!confirmed) return;

    try {
      if (activeTab === 'income') {
        await deleteIncome(id);
      } else {
        await deleteExpense(id);
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar la transacción. Intenta de nuevo.');
    }
  };

  // Preparar valores por defecto para edición
  const getDefaultValues = ():
  | Partial<IncomeFormInput>
  | Partial<ExpenseFormInput>
  | undefined => {
  if (!editingItem) return undefined;

  if (activeTab === 'income') {
    const income = editingItem as Income;
    return {
      concept: income.concept,
      amount: parseFloat(income.amount),
      date: formatDateForInput(income.date),
      description: income.description || '',
      categoryId: income.categoryId,
    };
  } else {
    const expense = editingItem as Expense;
    return {
      description: expense.description,
      amount: parseFloat(expense.amount),
      date: formatDateForInput(expense.date),
      notes: expense.notes || '',
      paymentMethod: expense.paymentMethod,
      categoryId: expense.categoryId,
    };
  }
};

  return (    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Transacciones
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestiona tus ingresos y gastos
            </p>
          </div>
          <button onClick={openCreateModal} className="btn btn-primary">
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nueva Transacción
          </button>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('expense')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'expense'
                    ? 'border-danger-600 text-danger-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
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
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <span>Gastos</span>
                  <span className="badge badge-gray">{expenses.length}</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('income')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'income'
                    ? 'border-success-600 text-success-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
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
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  <span>Ingresos</span>
                  <span className="badge badge-gray">{incomes.length}</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="card-body">
            <TransactionList
              incomes={incomes}
              expenses={expenses}
              type={activeTab}
              onEdit={openEditModal}
              onDelete={handleDelete}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Modal de Crear/Editar */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={
            editingItem
              ? `Editar ${activeTab === 'income' ? 'Ingreso' : 'Gasto'}`
              : `Nuevo ${activeTab === 'income' ? 'Ingreso' : 'Gasto'}`
          }
          size="lg"
        >
          {activeTab === 'income' ? (
            <IncomeForm
              onSubmit={handleIncomeSubmit}
              onCancel={closeModal}
              isLoading={isSubmitting}
              defaultValues={getDefaultValues() as Partial<IncomeFormInput>}
              isEditing={!!editingItem}
            />
          ) : (
            <ExpenseForm
              onSubmit={handleExpenseSubmit}
              onCancel={closeModal}
              isLoading={isSubmitting}
              defaultValues={getDefaultValues() as Partial<ExpenseFormInput>}
              isEditing={!!editingItem}
            />
          )}
        </Modal>
      </div>    
  );
};

export default Transactions;