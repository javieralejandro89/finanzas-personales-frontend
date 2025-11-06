import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = 'http://localhost:5000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Funciones de autenticación
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name, email, password, currency = 'USD') => {
    const response = await api.post('/auth/register', { 
      name, email, password, currency 
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};

// Funciones para ingresos
export const incomesAPI = {
  getStats: async (startDate = null, endDate = null) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await api.get(`/incomes/stats?${params}`);
    return response.data;
  }
};

// Funciones para gastos
export const expensesAPI = {
  getStats: async (startDate = null, endDate = null) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await api.get(`/expenses/stats?${params}`);
    return response.data;
  }
};

// Utilidades
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Funciones de utilidad para tokens
export const tokenUtils = {
  setToken: (token) => localStorage.setItem('auth_token', token),
  getToken: () => localStorage.getItem('auth_token'),
  removeToken: () => localStorage.removeItem('auth_token'),
  setUser: (user) => localStorage.setItem('user_data', JSON.stringify(user)),
  getUser: () => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  },
  removeUser: () => localStorage.removeItem('user_data'),
  isAuthenticated: () => !!localStorage.getItem('auth_token')
};

// Funciones completas para categorías
export const categoriesAPI = {
  getAll: async (type = null) => {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    const response = await api.get(`/categories?${params}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/categories', data);
    return response.data;
  }
};

// Funciones completas para ingresos
Object.assign(incomesAPI, {
  getAll: async (params = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value);
      }
    });
    const response = await api.get(`/incomes?${searchParams}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/incomes', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/incomes/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/incomes/${id}`);
    return response.data;
  }
});

// Funciones completas para gastos
Object.assign(expensesAPI, {
  getAll: async (params = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value);
      }
    });
    const response = await api.get(`/expenses?${searchParams}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/expenses', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/expenses/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  }
});

export default api;