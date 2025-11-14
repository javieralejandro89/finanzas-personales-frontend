/**
 * Schemas de validación Zod para Transacciones
 */

import { z } from 'zod';

/**
 * Schema para crear/editar ingresos
 */
export const incomeSchema = z.object({
  concept: z
    .string()
    .min(3, 'El concepto debe tener al menos 3 caracteres')
    .max(255, 'El concepto no puede exceder 255 caracteres')
    .trim(),

  amount: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const num = typeof val === 'string' ? parseFloat(val) : val;
      if (isNaN(num)) return 0;
      return num;
    })
    .refine((val) => val > 0, {
      message: 'El monto debe ser mayor a 0',
    })
    .refine((val) => val <= 999999999.99, {
      message: 'El monto es demasiado grande',
    }),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)')
    .refine((date) => {
      const dateObj = new Date(date);
      return !isNaN(dateObj.getTime());
    }, 'Fecha inválida'),

  description: z
    .string()
    .max(1000, 'La descripción no puede exceder 1000 caracteres')
    .trim()
    .optional()
    .nullable(),

  categoryId: z
    .number()
    .int('Debe seleccionar una categoría')
    .positive('Debe seleccionar una categoría'),
});

export type IncomeFormInput = z.infer<typeof incomeSchema>;

/**
 * Schema para crear/editar gastos
 */
export const expenseSchema = z.object({
  description: z
    .string()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(255, 'La descripción no puede exceder 255 caracteres')
    .trim(),

  amount: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const num = typeof val === 'string' ? parseFloat(val) : val;
      if (isNaN(num)) return 0;
      return num;
    })
    .refine((val) => val > 0, {
      message: 'El monto debe ser mayor a 0',
    })
    .refine((val) => val <= 999999999.99, {
      message: 'El monto es demasiado grande',
    }),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)')
    .refine((date) => {
      const dateObj = new Date(date);
      return !isNaN(dateObj.getTime());
    }, 'Fecha inválida'),

  notes: z
    .string()
    .max(1000, 'Las notas no pueden exceder 1000 caracteres')
    .trim()
    .optional()
    .nullable(),

  paymentMethod: z.enum(['cash', 'card', 'transfer', 'check', 'other'], {
    errorMap: () => ({ message: 'Selecciona un método de pago válido' }),
  }),

  categoryId: z
    .number()
    .int('Debe seleccionar una categoría')
    .positive('Debe seleccionar una categoría'),
});

export type ExpenseFormInput = z.infer<typeof expenseSchema>;