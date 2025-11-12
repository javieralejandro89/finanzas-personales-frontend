const Categories = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Categorías</h1>
          <p className="mt-1 text-sm text-gray-500">
            Organiza tus transacciones en categorías
          </p>
        </div>
        <button className="mt-3 sm:mt-0 btn btn-primary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Categoría
        </button>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay categorías
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Crea categorías personalizadas para clasificar tus ingresos y gastos de manera organizada.
          </p>
          <button className="btn btn-primary">
            Crear Primera Categoría
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;