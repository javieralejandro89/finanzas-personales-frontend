import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCategorySchema, type CreateCategoryInput } from '@/schemas/categorySchemas';
import { translateCategoryType } from '@/utils/formatters';

interface CategoryFormProps {
  onSubmit: (data: CreateCategoryInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<CreateCategoryInput>;
  isEditing?: boolean;
}

const DEFAULT_COLORS = [
  '#EF4444', // Red
  '#F59E0B', // Orange
  '#10B981', // Green
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#14B8A6', // Teal
  '#F97316', // Orange alt
  '#6366F1', // Indigo
];

export default function CategoryForm({
  onSubmit,
  onCancel,
  isLoading = false,
  defaultValues,
  isEditing = false,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: defaultValues || {
      name: '',
      type: 'expense',
      color: '#6B7280',
    },
  });

  const selectedColor = watch('color');
  const selectedType = watch('type');

  const handleFormSubmit = async (data: CreateCategoryInput) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Nombre */}
      <div>
        <label htmlFor="name" className="label">
          Nombre de la Categoría
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={`input ${errors.name ? 'input-error' : ''}`}
          placeholder="Ej: Alimentación, Salario, etc."
          disabled={isLoading}
        />
        {errors.name && (
          <p className="error-message">{errors.name.message}</p>
        )}
      </div>

      {/* Tipo */}
      <div>
        <label htmlFor="type" className="label">
          Tipo de Categoría
        </label>
        <select
          id="type"
          {...register('type')}
          className={`select ${errors.type ? 'input-error' : ''}`}
          disabled={isLoading || isEditing}
        >
          <option value="expense">{translateCategoryType('expense')}</option>
          <option value="income">{translateCategoryType('income')}</option>
        </select>
        {errors.type && (
          <p className="error-message">{errors.type.message}</p>
        )}
        {isEditing && (
          <p className="text-xs text-gray-500 mt-1">
            El tipo de categoría no se puede cambiar
          </p>
        )}
      </div>

      {/* Color */}
      <div>
        <label className="label">Color</label>
        
        {/* Color Picker */}
        <div className="flex items-center gap-3 mb-3">
          <input
            type="color"
            {...register('color')}
            className="w-12 h-12 rounded border-2 border-gray-300 cursor-pointer"
            disabled={isLoading}
          />
          <div className="flex-1">
            <input
              type="text"
              {...register('color')}
              className={`input ${errors.color ? 'input-error' : ''}`}
              placeholder="#6B7280"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Colores predefinidos */}
        <div className="grid grid-cols-5 gap-2">
          {DEFAULT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setValue('color', color)}
              className={`w-full h-10 rounded border-2 transition-all ${
                selectedColor === color
                  ? 'border-gray-900 scale-110'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              style={{ backgroundColor: color }}
              disabled={isLoading}
              title={color}
            />
          ))}
        </div>

        {errors.color && (
          <p className="error-message mt-2">{errors.color.message}</p>
        )}
      </div>

      {/* Preview */}
      <div className="card bg-gray-50">
        <div className="card-body py-3">
          <p className="text-sm text-gray-600 mb-2">Vista Previa:</p>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: selectedColor }}
            />
            <span className="font-medium text-gray-900">
              {watch('name') || 'Nombre de la categoría'}
            </span>
            <span className="badge badge-gray ml-auto">
              {translateCategoryType(selectedType)}
            </span>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 btn btn-outline"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner mr-2"></span>
              {isEditing ? 'Actualizando...' : 'Creando...'}
            </>
          ) : (
            <>{isEditing ? 'Actualizar Categoría' : 'Crear Categoría'}</>
          )}
        </button>
      </div>
    </form>
  );
}