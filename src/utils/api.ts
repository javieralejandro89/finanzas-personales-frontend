/**
 * Cliente API configurado con axios
 * Incluye interceptores para refresh token automático
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { ApiError, ApiResponse } from '../types/api.types';

// URL base del API (ajustar según entorno)
const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Instancia principal de axios
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Instancia separada para refresh token (sin interceptores para evitar loops)
 */
const refreshClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Obtener tokens del localStorage
 */
export const getTokens = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return { accessToken, refreshToken };
};

/**
 * Guardar tokens en localStorage
 */
export const setTokens = (accessToken: string, refreshToken?: string) => {
  localStorage.setItem('accessToken', accessToken);

  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
};

/**
 * Eliminar tokens del localStorage
 */
export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

/**
 * Flag para evitar múltiples llamadas de refresh simultáneas
 */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

/**
 * Procesar cola de requests fallidos después de refresh
 */
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Interceptor de request: agregar access token
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = getTokens();

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de response: manejar refresh token automático
 */
apiClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, retornarla directamente
    return response;
  },
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Si el error es 401 y no hemos intentado refrescar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Evitar intentar refresh en endpoints de auth (excepto refresh)
      const isAuthEndpoint =
        originalRequest.url?.includes('/auth/') && !originalRequest.url?.includes('/auth/refresh');

      if (isAuthEndpoint) {
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // Marcar que ya intentamos refrescar
      originalRequest._retry = true;

      if (isRefreshing) {
        // Si ya se está refrescando, agregar a la cola
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      const { refreshToken } = getTokens();

      if (!refreshToken) {
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // Intentar refrescar el token
        const response = await refreshClient.post<
          ApiResponse<{ accessToken: string }>
        >('/auth/refresh', {
          refreshToken,
        });

        const { accessToken: newAccessToken } = response.data.data!;

        // Guardar nuevo access token
        setTokens(newAccessToken);

        // Procesar cola de requests fallidos
        processQueue(null, newAccessToken);

        // Reintentar request original
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, cerrar sesión
        processQueue(refreshError, null);
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Manejo de errores común
 */
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse>;

    // Si el servidor respondió con un error
    if (axiosError.response) {
      return {
        message: axiosError.response.data.message || 'Error en el servidor',
        errors: axiosError.response.data.errors,
        statusCode: axiosError.response.status,
      };
    }

    // Si hubo un error de red
    if (axiosError.request) {
      return {
        message: 'Error de conexión. Verifica tu internet.',
        statusCode: 0,
      };
    }
  }

  // Error desconocido
  return {
    message: 'Error desconocido. Intenta de nuevo.',
    statusCode: 500,
  };
};

/**
 * Utilidad para hacer requests GET
 */
export const get = async <T>(url: string, params?: Record<string, unknown>) => {
  const response = await apiClient.get<ApiResponse<T>>(url, { params });
  return response.data;
};

/**
 * Utilidad para hacer requests POST
 */
export const post = async <T>(url: string, data?: unknown) => {
  const response = await apiClient.post<ApiResponse<T>>(url, data);
  return response.data;
};

/**
 * Utilidad para hacer requests PATCH
 */
export const patch = async <T>(url: string, data?: unknown) => {
  const response = await apiClient.patch<ApiResponse<T>>(url, data);
  return response.data;
};

/**
 * Utilidad para hacer requests PUT
 */
export const put = async <T>(url: string, data?: unknown) => {
  const response = await apiClient.put<ApiResponse<T>>(url, data);
  return response.data;
};

/**
 * Utilidad para hacer requests DELETE
 */
export const del = async <T>(url: string) => {
  const response = await apiClient.delete<ApiResponse<T>>(url);
  return response.data;
};

export default apiClient;