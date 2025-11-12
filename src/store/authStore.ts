/**
 * Store de autenticación con Zustand
 * Maneja el estado global de autenticación
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginDTO, RegisterDTO, ApiError } from '@/types/api.types';
import * as authService from '@/services/auth.service';

interface AuthState {
  // Estado
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: ApiError | null;

  // Acciones
  login: (credentials: LoginDTO) => Promise<void>;
  register: (data: RegisterDTO) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  clearError: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login
      login: async (credentials: LoginDTO) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.login(credentials);

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error as ApiError,
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      // Registro
      register: async (data: RegisterDTO) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.register(data);

          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error as ApiError,
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      // Logout
      logout: async () => {
        set({ isLoading: true });

        try {
          await authService.logout();
        } catch (error) {
          console.error('Error en logout:', error);
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      // Actualizar usuario
      updateUser: (user: User) => {
        set({ user });
        authService.updateLocalUser(user);
      },

      // Limpiar error
      clearError: () => {
        set({ error: null });
      },

      // Verificar autenticación (al cargar la app)
      checkAuth: () => {
        const isAuth = authService.isAuthenticated();
        const user = authService.getCurrentUser();

        set({
          isAuthenticated: isAuth,
          user: isAuth ? user : null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Hook para obtener solo el usuario
export const useUser = () => useAuthStore((state) => state.user);

// Hook para obtener solo isAuthenticated
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);