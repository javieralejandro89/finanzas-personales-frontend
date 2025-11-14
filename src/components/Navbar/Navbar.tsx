import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
  <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20 backdrop-blur-sm bg-white/95">
    <div className="px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex items-center justify-between">
        {/* Search Bar - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex flex-1 max-w-lg">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Buscar transacciones..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-gray-400"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
          {/* Notifications Button */}
          <button className="relative p-2.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Badge de notificaciones mejorado */}
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-danger-500 border border-white"></span>
            </span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all group"
            >
              {/* Avatar mejorado */}
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success-500 border-2 border-white rounded-full"></div>
              </div>

              {/* User Info - Hidden on mobile */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              {/* Dropdown Arrow */}
              <svg 
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu - Mejorado */}
            {showUserMenu && (
              <>
                {/* Overlay */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />

                {/* Menu */}
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-20 animate-slide-up">
                  {/* User Info - Visible on mobile */}
                  <div className="sm:hidden px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-transparent">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/profile');
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all group"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                        <svg className="w-4 h-4 text-gray-600 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="font-medium">Mi Perfil</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/settings');
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-all group"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                        <svg className="w-4 h-4 text-gray-600 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="font-medium">Configuración</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-danger-600 hover:bg-danger-50 transition-all group"
                  >
                    <div className="w-8 h-8 bg-danger-50 rounded-lg flex items-center justify-center group-hover:bg-danger-100 transition-colors">
                      <svg className="w-4 h-4 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <span className="font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden mt-3">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            placeholder="Buscar..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>
  </nav>
);
};

export default Navbar;