const Accounts = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cuentas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Administra tus cuentas bancarias y efectivo
          </p>
        </div>
        <button className="mt-3 sm:mt-0 btn btn-primary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Cuenta
        </button>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay cuentas registradas
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Añade tus cuentas bancarias, tarjetas de crédito o efectivo para tener un control completo de tus finanzas.
          </p>
          <button className="btn btn-primary">
            Crear Primera Cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accounts;