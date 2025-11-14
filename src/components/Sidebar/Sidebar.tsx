import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Transacciones',
      path: '/transactions',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: 'Categorías',
      path: '/categories',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      name: 'Cuentas',
      path: '/accounts',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
  ];

  return (
  <>
    {/* Mobile Menu Button - Mejorado */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white shadow-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all hover:scale-105 active:scale-95"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>

    {/* Overlay para móvil - Mejorado */}
    {isOpen && (
      <div
        className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30 animate-fade-in"
        onClick={() => setIsOpen(false)}
      />
    )}

    {/* Sidebar - Mejorado */}
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-gradient-to-b from-white to-gray-50 shadow-2xl border-r border-gray-200
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Logo - Mejorado */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <span className="text-2xl">💰</span>
          </div>
          <h1 className="text-xl font-bold text-white">Finanzas</h1>
        </div>
      </div>

      {/* Navigation - Mejorado */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30 scale-105'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:scale-105 active:scale-95'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`flex-shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-600'
                }`}>
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      

      {/* Footer - Mejorado */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <p className="text-xs font-semibold text-gray-700">Sistema Activo</p>
          </div>
          <p className="text-xs text-gray-500">Versión 1.0.0</p>
          <p className="text-xs text-gray-400">© 2024 Finanzas App</p>
        </div>
      </div>
    </aside>
  </>
);
};

export default Sidebar;