import { z } from 'zod';

/**
 * Schema de validación para crear categoría
 */
export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  
  type: z.enum(['income', 'expense'], {
    required_error: 'Debes seleccionar un tipo de categoría',
    invalid_type_error: 'Tipo de categoría inválido',
  }),
  
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Color hexadecimal inválido (ej: #FF5733)')
    .default('#6B7280'),
});

/**
 * Schema de validación para actualizar categoría
 */
export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim()
    .optional(),
  
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Color hexadecimal inválido (ej: #FF5733)')
    .optional(),
  
  isActive: z.boolean().optional(),
});

/**
 * Tipos inferidos de los schemas
 */
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;