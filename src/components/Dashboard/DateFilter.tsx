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
    <div className="card">
      <div className="card-body">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Presets */}
          <div className="flex-1">
            <label className="label">Período</label>
            <select
              className="select"
              onChange={(e) => handlePresetChange(e.target.value)}
              defaultValue="current-month"
            >
              <option value="current-month">Mes Actual</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mes</option>
              <option value="last30days">Últimos 30 días</option>
              <option value="year">Este Año</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>

          {/* Custom Date Range */}
          <div className="flex-1">
            <label className="label">Fecha Inicio</label>
            <input
              type="date"
              className="input"
              value={dateFilter.startDate || ''}
              onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
            />
          </div>

          <div className="flex-1">
            <label className="label">Fecha Fin</label>
            <input
              type="date"
              className="input"
              value={dateFilter.endDate || ''}
              onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
            />
          </div>
        </div>

        {/* Current Range Display */}
        <div className="mt-3 text-sm text-gray-600">
          Mostrando datos del{' '}
          <span className="font-medium">
            {dateFilter.startDate ? formatDate(dateFilter.startDate, 'short') : 'N/A'}
          </span>
          {' al '}
          <span className="font-medium">
            {dateFilter.endDate ? formatDate(dateFilter.endDate, 'short') : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}