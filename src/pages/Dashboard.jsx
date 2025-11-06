import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { incomesAPI, expensesAPI, formatCurrency } from '../services/api';
import { TrendingUp, TrendingDown, DollarSign, Calendar, LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    incomes: { total_incomes: 0, incomes_by_category: [], incomes_by_month: [] },
    expenses: { total_expenses: 0, expenses_by_category: [], expenses_by_month: [] }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        const [incomeResponse, expenseResponse] = await Promise.all([
          incomesAPI.getStats(),
          expensesAPI.getStats()
        ]);

        if (incomeResponse.success && expenseResponse.success) {
          setStats({
            incomes: incomeResponse.data,
            expenses: expenseResponse.data
          });
        } else {
          setError('Error al cargar las estadísticas');
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Error de conexión al cargar datos');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const totalIncome = stats.incomes.total_incomes || 0;
  const totalExpenses = stats.expenses.total_expenses || 0;
  const balance = totalIncome - totalExpenses;

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-medium">Error</h3>
            <p className="text-red-600 mt-2">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary mt-4"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-blue-600 rounded-full p-2">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Finanzas Personales
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-1" />
                <span>{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Bienvenido, {user?.name}
          </h2>
          <p className="text-gray-600 mt-1">
            Aquí tienes un resumen de tus finanzas
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Ingresos */}
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Ingresos</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {formatCurrency(totalIncome, user?.currency)}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                Promedio mensual: {formatCurrency(stats.incomes.avg_monthly_income || 0, user?.currency)}
              </p>
            </div>
          </div>

          {/* Total Gastos */}
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Gastos</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {formatCurrency(totalExpenses, user?.currency)}
                </p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                Promedio mensual: {formatCurrency(stats.expenses.avg_monthly_expense || 0, user?.currency)}
              </p>
            </div>
          </div>

          {/* Balance */}
          <div className="metric-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Balance</p>
                <p className={`text-2xl font-bold mt-1 ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {formatCurrency(balance, user?.currency)}
                </p>
              </div>
              <div className={`rounded-full p-3 ${balance >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
                <DollarSign className={`h-6 w-6 ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                {balance >= 0 ? 'Superávit' : 'Déficit'} actual
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Ingresos por Categoría */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Ingresos por Categoría
              </h3>
              <div className="space-y-3">
                {stats.incomes.incomes_by_category?.slice(0, 5).map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: category.color || '#6B7280' }}
                      ></div>
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(category.total, user?.currency)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {category.count} transacciones
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gastos por Categoría */}
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Gastos por Categoría
              </h3>
              <div className="space-y-3">
                {stats.expenses.expenses_by_category?.slice(0, 5).map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: category.color || '#6B7280' }}
                      ></div>
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(category.total, user?.currency)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {category.count} transacciones
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Actividad por Mes
              </h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ingresos por mes */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Ingresos Mensuales</h4>
                <div className="space-y-2">
                  {stats.incomes.incomes_by_month?.slice(0, 3).map((month, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{month.month}</span>
                      <span className="text-sm font-medium text-green-600">
                        {formatCurrency(month.total, user?.currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gastos por mes */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Gastos Mensuales</h4>
                <div className="space-y-2">
                  {stats.expenses.expenses_by_month?.slice(0, 3).map((month, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{month.month}</span>
                      <span className="text-sm font-medium text-red-600">
                        {formatCurrency(month.total, user?.currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;