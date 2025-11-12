import { Category } from '@/types/api.types';
import { translateCategoryType } from '@/utils/formatters';

interface CategoryListProps {
  categories: Category[];
  type: 'income' | 'expense';
  onEdit: (category: Category) => void;
  onToggleStatus: (id: number, isActive: boolean) => void;
  onDelete: (id: number, name: string) => void;
  isLoading?: boolean;
}

export default function CategoryList({
  categories,
  type,
  onEdit,
  onToggleStatus,
  onDelete,
  isLoading = false,
}: CategoryListProps) {
  const filteredCategories = categories.filter((cat) => cat.type === type);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredCategories.length === 0) {
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
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
        <p className="text-gray-600 mb-2">
          No hay categorías de {translateCategoryType(type).toLowerCase()}
        </p>
        <p className="text-sm text-gray-500">
          Crea tu primera categoría para comenzar
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredCategories.map((category) => (
        <div
          key={category.id}
          className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
            category.isActive
              ? 'bg-white border-gray-200 hover:border-gray-300'
              : 'bg-gray-50 border-gray-200 opacity-60'
          }`}
        >
          {/* Left: Color + Name + Badge */}
          <div className="flex items-center gap-3 flex-1">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900 truncate">
                  {category.name}
                </p>
                {!category.isActive && (
                  <span className="badge badge-gray text-xs">Inactiva</span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 ml-4">
            {/* Toggle Status */}
            <button
              onClick={() => onToggleStatus(category.id, !category.isActive)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                category.isActive
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-success-100 text-success-700 hover:bg-success-200'
              }`}
              title={category.isActive ? 'Desactivar' : 'Activar'}
            >
              {category.isActive ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>

            {/* Edit */}
            <button
              onClick={() => onEdit(category)}
              className="px-3 py-1.5 text-sm font-medium bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
              title="Editar"
            >
              <svg
                className="w-4 h-4"
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

            {/* Delete */}
            <button
              onClick={() => onDelete(category.id, category.name)}
              className="px-3 py-1.5 text-sm font-medium bg-danger-100 text-danger-700 rounded-lg hover:bg-danger-200 transition-colors"
              title="Eliminar"
            >
              <svg
                className="w-4 h-4"
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
      ))}
    </div>
  );
}