import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { incomeSchema, type IncomeFormInput } from '@/schemas/transactionSchemas';
import { formatDateForInput } from '@/utils/formatters';
import { useIncomeCategories } from '@/store/categoriesStore';
import { useEffect } from 'react';

interface IncomeFormProps {
  onSubmit: (data: IncomeFormInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<IncomeFormInput>;
  isEditing?: boolean;
}

export default function IncomeForm({
  onSubmit,
  onCancel,
  isLoading = false,
  defaultValues,
  isEditing = false,
}: IncomeFormProps) {
  const incomeCategories = useIncomeCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IncomeFormInput>({
    resolver: zodResolver(incomeSchema),
    defaultValues: defaultValues || {
      concept: '',
      amount: 0,
      date: formatDateForInput(new Date()),
      description: '',
      categoryId: 0,
    },
  });

  // Si no hay categorías activas, mostrar advertencia
  useEffect(() => {
    if (incomeCategories.length > 0 && !defaultValues?.categoryId) {
      setValue('categoryId', incomeCategories[0].id);
    }
  }, [incomeCategories, defaultValues, setValue]);

  const handleFormSubmit = async (data: IncomeFormInput) => {
    await onSubmit(data);
  };

  if (incomeCategories.length === 0) {
    return (
      <div className="text-center py-8">
        <svg
          className="w-16 h-16 mx-auto mb-3 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No hay categorías de ingresos
        </h3>
        <p className="text-gray-600 mb-4">
          Primero debes crear al menos una categoría de ingresos.
        </p>
        <button onClick={onCancel} className="btn btn-primary">
          Volver
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {/* Concepto */}
      <div>
        <label htmlFor="concept" className="label">
          Concepto <span className="text-danger-600">*</span>
        </label>
        <input
          type="text"
          id="concept"
          {...register('concept')}
          className={`input ${errors.concept ? 'input-error' : ''}`}
          placeholder="Ej: Salario, Freelance, Venta..."
          disabled={isLoading}
        />
        {errors.concept && (
          <p className="error-message">{errors.concept.message}</p>
        )}
      </div>

      {/* Monto y Fecha */}
      <div className="grid grid-cols-2 gap-4">
        {/* Monto */}
        <div>
          <label htmlFor="amount" className="label">
            Monto <span className="text-danger-600">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              $
            </span>
            <input
              type="number"
              id="amount"
              step="0.01"
              min="0"
              {...register('amount', { valueAsNumber: true })}
              className={`input pl-8 ${errors.amount ? 'input-error' : ''}`}
              placeholder="0.00"
              disabled={isLoading}
            />
          </div>
          {errors.amount && (
            <p className="error-message">{errors.amount.message}</p>
          )}
        </div>

        {/* Fecha */}
        <div>
          <label htmlFor="date" className="label">
            Fecha <span className="text-danger-600">*</span>
          </label>
          <input
            type="date"
            id="date"
            {...register('date')}
            className={`input ${errors.date ? 'input-error' : ''}`}
            disabled={isLoading}
          />
          {errors.date && <p className="error-message">{errors.date.message}</p>}
        </div>
      </div>

      {/* Categoría */}
      <div>
        <label htmlFor="categoryId" className="label">
          Categoría <span className="text-danger-600">*</span>
        </label>
        <select
          id="categoryId"
          {...register('categoryId', { valueAsNumber: true })}
          className={`input ${errors.categoryId ? 'input-error' : ''}`}
          disabled={isLoading}
        >
          <option value={0}>Selecciona una categoría</option>
          {incomeCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="error-message">{errors.categoryId.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className="label">
          Descripción (opcional)
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={3}
          className={`input ${errors.description ? 'input-error' : ''}`}
          placeholder="Agrega detalles adicionales sobre este ingreso..."
          disabled={isLoading}
        />
        {errors.description && (
          <p className="error-message">{errors.description.message}</p>
        )}
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
          className="flex-1 btn btn-success"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner mr-2"></span>
              {isEditing ? 'Actualizando...' : 'Guardando...'}
            </>
          ) : (
            <>{isEditing ? 'Actualizar Ingreso' : 'Registrar Ingreso'}</>
          )}
        </button>
      </div>
    </form>
  );
}