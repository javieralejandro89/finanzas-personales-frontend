import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormInput } from '@/schemas/authSchemas';
import PasswordStrengthIndicator from '@/components/Auth/PasswordStrengthIndicator';
import Toast from '@/components/UI/Toast';
import * as authService from '@/services/auth.service';
import type { ApiError } from '@/types/api.types';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  // Toast state
  const [toast, setToast] = useState({
    isOpen: false,
    message: '',
    type: 'success' as 'success' | 'error',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const password = watch('password', '');

  const onSubmit = async (data: RegisterFormInput) => {
    setIsLoading(true);
    setApiError(null);
    setFieldErrors({});

    try {
      await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        currency: 'MXN',
      });

      // Mostrar toast de éxito
      setToast({
        isOpen: true,
        message: '¡Cuenta creada exitosamente! Redirigiendo al login...',
        type: 'success',
      });

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Cuenta creada exitosamente. Por favor inicia sesión.' },
        });
      }, 2000);
    } catch (error) {
      const apiErr = error as ApiError;
      
      // Manejar errores del backend
      if (apiErr.errors) {
        // Errores de validación específicos por campo
        const backendErrors: Record<string, string> = {};
        Object.entries(apiErr.errors).forEach(([field, messages]) => {
          backendErrors[field] = messages[0]; // Tomar el primer error
        });
        setFieldErrors(backendErrors);
      } else {
        // Error general
        setApiError(apiErr.message || 'Error al crear la cuenta');
        setToast({
          isOpen: true,
          message: apiErr.message || 'Error al crear la cuenta',
          type: 'error',
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Crear Cuenta
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Únete y comienza a gestionar tus finanzas
        </p>

        {/* Error general del API */}
        {apiError && (
          <div className="mb-4 p-3 bg-danger-50 border border-danger-200 rounded-lg">
            <p className="text-sm text-danger-700">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="label">
              Nombre Completo <span className="text-danger-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className={`input ${errors.name || fieldErrors.name ? 'input-error' : ''}`}
              placeholder="Juan Pérez"
              disabled={isLoading}
            />
            {(errors.name || fieldErrors.name) && (
              <p className="error-message">
                {errors.name?.message || fieldErrors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="label">
              Correo Electrónico <span className="text-danger-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`input ${errors.email || fieldErrors.email ? 'input-error' : ''}`}
              placeholder="tu@email.com"
              disabled={isLoading}
            />
            {(errors.email || fieldErrors.email) && (
              <p className="error-message">
                {errors.email?.message || fieldErrors.email}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="label">
              Contraseña <span className="text-danger-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
                className={`input pr-10 ${errors.password || fieldErrors.password ? 'input-error' : ''}`}
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {(errors.password || fieldErrors.password) && (
              <p className="error-message">
                {errors.password?.message || fieldErrors.password}
              </p>
            )}

            {/* Indicador de fortaleza */}
            <PasswordStrengthIndicator password={password} show={!!password} />
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="label">
              Confirmar Contraseña <span className="text-danger-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                {...register('confirmPassword')}
                className={`input pr-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn btn-primary"
          >
            {isLoading ? (
              <>
                <span className="spinner mr-2"></span>
                Creando cuenta...
              </>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        {/* Link a Login */}
        <div className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Inicia sesión aquí
          </Link>
        </div>
      </div>

      {/* Toast de notificación */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />
    </>
  );
};

export default Register;