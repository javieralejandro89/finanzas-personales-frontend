const Transactions = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Transacciones</h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona tus ingresos y gastos
          </p>
        </div>
        <button className="mt-3 sm:mt-0 btn btn-primary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Transacción
        </button>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay transacciones
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Comienza registrando tus ingresos y gastos para tener un control detallado de tus finanzas.
          </p>
          <button className="btn btn-primary">
            Crear Primera Transacción
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;