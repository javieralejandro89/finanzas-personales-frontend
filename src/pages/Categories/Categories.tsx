import { useEffect, useState } from 'react';
import { useCategoriesStore } from '@/store/categoriesStore';
import { Category, CreateCategoryDTO } from '@/types/api.types';
import Modal from '@/components/UI/Modal';
import CategoryForm from '@/components/Categories/CategoryForm';
import CategoryList from '@/components/Categories/CategoryList';
import { translateCategoryType } from '@/utils/formatters';

type TabType = 'all' | 'income' | 'expense';

export default function Categories() {
  const {
    categories,
    incomeCategories,
    expenseCategories,
    isLoading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoriesStore();

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleOpenModal = (category?: Category) => {
    setEditingCategory(category || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (data: CreateCategoryDTO) => {
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, {
          name: data.name,
          color: data.color,
        });
      } else {
        await createCategory(data);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar categoría:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (id: number, isActive: boolean) => {
    try {
      await updateCategory(id, { isActive });
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar la categoría "${name}"?\n\nSi tiene transacciones asociadas, solo se desactivará.`
    );

    if (confirmed) {
      try {
        await deleteCategory(id);
      } catch (error) {
        console.error('Error al eliminar categoría:', error);
      }
    }
  };

  const getDisplayCategories = () => {
    switch (activeTab) {
      case 'income':
        return incomeCategories;
      case 'expense':
        return expenseCategories;
      default:
        return categories;
    }
  };

  const tabs = [
    { id: 'all' as TabType, label: 'Todas', count: categories.length },
    { id: 'income' as TabType, label: 'Ingresos', count: incomeCategories.length },
    { id: 'expense' as TabType, label: 'Gastos', count: expenseCategories.length },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card max-w-md w-full">
          <div className="card-body text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-danger-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Error al cargar categorías
            </h3>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <button onClick={() => loadCategories()} className="btn btn-primary">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
              <p className="text-sm text-gray-600">
                Gestiona tus categorías de ingresos y gastos
              </p>
            </div>

            <button
              onClick={() => handleOpenModal()}
              className="btn btn-primary flex items-center gap-2"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nueva Categoría
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Tabs */}
          <div className="card">
            <div className="card-body py-0">
              <div className="flex items-center gap-1 border-b border-gray-200 -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="spinner w-12 h-12 border-4 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando categorías...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'all' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Ingresos */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="font-semibold text-gray-900">
                        {translateCategoryType('income')}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {incomeCategories.length}{' '}
                        {incomeCategories.length === 1 ? 'categoría' : 'categorías'}
                      </span>
                    </div>
                    <div className="card-body">
                      <CategoryList
                        categories={categories}
                        type="income"
                        onEdit={handleOpenModal}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDelete}
                      />
                    </div>
                  </div>

                  {/* Gastos */}
                  <div className="card">
                    <div className="card-header">
                      <h3 className="font-semibold text-gray-900">
                        {translateCategoryType('expense')}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {expenseCategories.length}{' '}
                        {expenseCategories.length === 1 ? 'categoría' : 'categorías'}
                      </span>
                    </div>
                    <div className="card-body">
                      <CategoryList
                        categories={categories}
                        type="expense"
                        onEdit={handleOpenModal}
                        onToggleStatus={handleToggleStatus}
                        onDelete={handleDelete}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <div className="card-header">
                    <h3 className="font-semibold text-gray-900">
                      Categorías de{' '}
                      {activeTab === 'income'
                        ? translateCategoryType('income')
                        : translateCategoryType('expense')}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {getDisplayCategories().length}{' '}
                      {getDisplayCategories().length === 1
                        ? 'categoría'
                        : 'categorías'}
                    </span>
                  </div>
                  <div className="card-body">
                    <CategoryList
                      categories={getDisplayCategories()}
                      type={activeTab as 'income' | 'expense'}
                      onEdit={handleOpenModal}
                      onToggleStatus={handleToggleStatus}
                      onDelete={handleDelete}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
        size="md"
      >
        <CategoryForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoading={isSubmitting}
          defaultValues={
            editingCategory
              ? {
                  name: editingCategory.name,
                  type: editingCategory.type,
                  color: editingCategory.color,
                }
              : undefined
          }
          isEditing={!!editingCategory}
        />
      </Modal>
    </div>
  );
}