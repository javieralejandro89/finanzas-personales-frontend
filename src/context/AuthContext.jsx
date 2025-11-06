import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, tokenUtils } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = tokenUtils.getToken();
        if (token) {
          const response = await authAPI.getProfile();
          if (response.success) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          } else {
            logout();
          }
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        const { user, token } = response.data;
        
        tokenUtils.setToken(token);
        tokenUtils.setUser(user);
        
        setUser(user);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al iniciar sesión' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
  tokenUtils.removeToken();
  tokenUtils.removeUser();
  setUser(null);
  setIsAuthenticated(false);
  // Forzar redirección
  window.location.href = '/login';
};

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};