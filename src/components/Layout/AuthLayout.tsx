import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg mb-4">
            <span className="text-3xl sm:text-4xl">💰</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">
            Finanzas
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Gestiona tus finanzas personales de forma simple
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs sm:text-sm text-gray-600">
          <p>© 2024 Finanzas App. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;