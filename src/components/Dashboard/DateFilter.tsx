import { useDashboardStore } from '@/store/dashboardStore';
import { getCurrentMonthRange, formatDate, getDateRangePreset } from '@/utils/formatters';

export default function DateFilter() {
  const { dateFilter, setDateFilter, loadDashboard } = useDashboardStore();

  const handlePresetChange = async (preset: string) => {
    let range;
    
    if (preset === 'custom') {
      return;
    } else if (preset === 'current-month') {
      range = getCurrentMonthRange();
    } else {
      range = getDateRangePreset(preset as any);
    }
    
    setDateFilter(range);
    await loadDashboard(range);
  };

  const handleCustomDateChange = async (field: 'startDate' | 'endDate', value: string) => {
    const newFilter = { ...dateFilter, [field]: value };
    setDateFilter(newFilter);
    
    if (newFilter.startDate && newFilter.endDate) {
      await loadDashboard(newFilter);
    }
  };

  return (
  <div className="card overflow-hidden">
    <div className="card-body">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Presets */}
        <div className="flex-1">
          <label className="label text-xs font-semibold text-gray-700">Período</label>
          <select
            className="input text-sm hover:border-primary-400 transition-colors"
            onChange={(e) => handlePresetChange(e.target.value)}
            defaultValue="current-month"
          >
            <option value="current-month">📅 Mes Actual</option>
            <option value="week">📆 Esta Semana</option>
            <option value="month">🗓️ Este Mes</option>
            <option value="last30days">⏰ Últimos 30 días</option>
            <option value="year">📊 Este Año</option>
            <option value="custom">✏️ Personalizado</option>
          </select>
        </div>

        {/* Custom Date Range */}
        <div className="flex-1">
          <label className="label text-xs font-semibold text-gray-700">Fecha Inicio</label>
          <input
            type="date"
            className="input text-sm hover:border-primary-400 transition-colors"
            value={dateFilter.startDate || ''}
            onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="label text-xs font-semibold text-gray-700">Fecha Fin</label>
          <input
            type="date"
            className="input text-sm hover:border-primary-400 transition-colors"
            value={dateFilter.endDate || ''}
            onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
          />
        </div>
      </div>

      {/* Current Range Display - Mejorado */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1.5 text-gray-600">
            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-600">Mostrando datos del</span>
          </div>
          <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
            {dateFilter.startDate ? formatDate(dateFilter.startDate, 'short') : 'N/A'}
          </span>
          <span className="text-gray-500">al</span>
          <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
            {dateFilter.endDate ? formatDate(dateFilter.endDate, 'short') : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  </div>
);
}