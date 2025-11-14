/**
 * Schemas de validación Zod para Autenticación
 */

import { z } from 'zod';

/**
 * Schema para registro de usuario
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(100, 'El nombre no puede exceder 100 caracteres')
      .trim(),

    email: z
      .string()
      .email('Correo electrónico inválido')
      .max(255, 'El correo no puede exceder 255 caracteres')
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(100, 'La contraseña no puede exceder 100 caracteres')
      .regex(/[a-z]/, 'Debe contener al menos una minúscula')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número')
      .regex(
        /[^a-zA-Z0-9]/,
        'Debe contener al menos un carácter especial (!@#$%^&*)'
      ),

    confirmPassword: z.string(),

    currency: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type RegisterFormInput = z.infer<typeof registerSchema>;

/**
 * Schema para login de usuario
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email('Correo electrónico inválido')
    .trim()
    .toLowerCase(),

  password: z.string().min(1, 'La contraseña es requerida'),
});

export type LoginFormInput = z.infer<typeof loginSchema>;

/**
 * Función para validar fortaleza de contraseña
 * Retorna un objeto con el nivel de fortaleza y requisitos cumplidos
 */
export const validatePasswordStrength = (password: string) => {
  const requirements = {
    minLength: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^a-zA-Z0-9]/.test(password),
  };

  const metRequirements = Object.values(requirements).filter(Boolean).length;

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (metRequirements >= 5) strength = 'strong';
  else if (metRequirements >= 3) strength = 'medium';

  return {
    requirements,
    strength,
    metRequirements,
    totalRequirements: 5,
  };
};