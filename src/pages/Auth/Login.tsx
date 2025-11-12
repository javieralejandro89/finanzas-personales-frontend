import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error) {
      // Error ya manejado en el store
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Iniciar Sesión
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-danger-50 border border-danger-200 text-danger-700 rounded-lg text-sm">
          {error.message || 'An error occurred'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="label">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        ¿No tienes una cuenta?{' '}
        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;