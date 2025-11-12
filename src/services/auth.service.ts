/**
 * Servicio de autenticación
 * Todos los endpoints de /api/auth
 */

import { get, post, patch, del, handleApiError, setTokens, clearTokens } from '../utils/api';
import type {
  RegisterDTO,
  LoginDTO,
  AuthResponse,
  RefreshTokenDTO,
  RefreshTokenResponse,
  User,
  UpdateProfileDTO,
  ChangePasswordDTO,
  Session,
} from '../types/api.types';

/**
 * Registrar nuevo usuario
 */
export const register = async (data: RegisterDTO): Promise<AuthResponse> => {
  try {
    const response = await post<AuthResponse>('/auth/register', data);

    // Guardar tokens
    if (response.data) {
      setTokens(response.data.tokens.accessToken, response.data.tokens.refreshToken);

      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Iniciar sesión
 */
export const login = async (data: LoginDTO): Promise<AuthResponse> => {
  try {
    const response = await post<AuthResponse>('/auth/login', data);

    // Guardar tokens
    if (response.data) {
      setTokens(response.data.tokens.accessToken, response.data.tokens.refreshToken);

      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Refrescar access token
 */
export const refreshToken = async (refreshToken: string): Promise<string> => {
  try {
    const response = await post<RefreshTokenResponse>('/auth/refresh', {
      refreshToken,
    } as RefreshTokenDTO);

    // Actualizar access token
    if (response.data) {
      setTokens(response.data.accessToken);
    }

    return response.data!.accessToken;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Cerrar sesión
 */
export const logout = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      await post('/auth/logout', { refreshToken });
    }
  } catch (error) {
    // Ignorar errores de logout, siempre limpiamos tokens
    console.error('Error en logout:', error);
  } finally {
    // Siempre limpiar tokens locales
    clearTokens();
  }
};

/**
 * Obtener perfil del usuario autenticado
 */
export const getProfile = async (): Promise<User> => {
  try {
    const response = await get<User>('/auth/profile');
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Actualizar perfil del usuario
 */
export const updateProfile = async (data: UpdateProfileDTO): Promise<User> => {
  try {
    const response = await patch<User>('/auth/profile', data);

    // Actualizar usuario en localStorage
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Cambiar contraseña
 */
export const changePassword = async (data: ChangePasswordDTO): Promise<void> => {
  try {
    await post('/auth/change-password', data);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Obtener todas las sesiones activas
 */
export const getSessions = async (): Promise<Session[]> => {
  try {
    const response = await get<Session[]>('/auth/sessions');
    return response.data!;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Eliminar una sesión específica
 */
export const deleteSession = async (sessionId: string): Promise<void> => {
  try {
    await del(`/auth/sessions/${sessionId}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Verificar si hay un usuario autenticado
 */
export const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');

  return !!(accessToken && user);
};

/**
 * Obtener usuario del localStorage
 */
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');

  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
};

/**
 * Actualizar usuario en localStorage
 */
export const updateLocalUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};