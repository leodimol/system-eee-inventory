import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label
} from 'recharts';
import {
  Activity,
  Wrench,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Package
} from 'lucide-react';

const COLORS = {
  primary: '#6366f1',
  secondary: '#10b981',
  warning: '#f97316',
  danger: '#ef4444',
  info: '#06b6d4',
  purple: '#a855f7',
  pink: '#ec4899'
};

const CHART_COLORS = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.warning,
  COLORS.danger,
  COLORS.info,
  COLORS.purple,
  COLORS.pink
];

// Custom legend renderer that displays values next to labels
const renderCustomLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap justify-center gap-4 text-sm mt-4">
      {payload && payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-glass)] bg-[var(--bg-glass-light)]">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-[var(--text-primary)]">
            {entry.value}: <span className="font-semibold">{entry.payload?.value || 0}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

// Custom animated tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="tooltip-value" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom label renderer for donut chart segments
const renderCustomLabel = (entry) => {
  return entry.value;
};

// Custom center label component for donut charts
const renderCenterLabel = (cx, cy, total) => {
  return (
    <g>
      <text 
        x={cx} 
        y={cy} 
        textAnchor="middle" 
        dominantBaseline="middle"
        style={{ fontSize: '28px', fontWeight: 'bold', fill: 'var(--text-primary)' }}
      >
        {total}
      </text>
    </g>
  );
};

const AnalyticsDashboard = ({ equipment, filters, compact }) => {
  // Filter equipment based on filters prop
  const filteredEquipment = useMemo(() => {
    if (!filters) return equipment;
    
    return equipment.filter(item => {
      // Status filter
      if (filters.status && item.status !== filters.status) return false;
      
      // Condition filter
      if (filters.condition && item.condition !== filters.condition) return false;
      
      // Hub filter
      if (filters.hub && filters.hub !== 'all' && item.hub_id !== filters.hub) return false;
      
      // Date range filter
      if (filters.dateRange && filters.dateRange !== 'all') {
        const itemDate = new Date(item.purchase_date || item.created_at);
        const now = new Date();
        const days = (now - itemDate) / (24 * 60 * 60 * 1000);
        
        switch (filters.dateRange) {
          case '30days':
            if (days > 30) return false;
            break;
          case '90days':
            if (days > 90) return false;
            break;
          case '1year':
            if (days > 365) return false;
            break;
          default:
            break;
        }
      }
      
      return true;
    });
  }, [equipment, filters]);
  const [activeTab, setActiveTab] = useState('utilization');

  // Utilization Analysis
  const utilizationData = useMemo(() => {
    const statusCounts = filteredEquipment.reduce((acc, item) => {
      const status = item.status?.toLowerCase() || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return [
      { name: 'Active', value: statusCounts.active || 0, color: COLORS.primary },
      { name: 'Available', value: statusCounts.available || 0, color: COLORS.secondary },
      { name: 'In Use', value: statusCounts.in_use || 0, color: COLORS.info },
      { name: 'Maintenance', value: statusCounts.maintenance || 0, color: COLORS.warning },
      { name: 'Damaged', value: statusCounts.damaged || 0, color: COLORS.danger },
      { name: 'Retired', value: statusCounts.retired || 0, color: COLORS.purple },
      { name: 'Unknown', value: statusCounts.unknown || 0, color: '#6b7280' }
    ].filter(item => item.value > 0);
  }, [filteredEquipment]);

  // Asset Type Breakdown
  const assetTypeData = useMemo(() => {
    const typeCounts = filteredEquipment.reduce((acc, item) => {
      const type = item.equipment_type?.toLowerCase() || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(typeCounts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: CHART_COLORS[Object.keys(typeCounts).indexOf(name) % CHART_COLORS.length]
    })).sort((a, b) => b.value - a.value);
  }, [filteredEquipment]);

  // Warranty Status
  const warrantyStatus = useMemo(() => {
    const now = new Date();
    let underWarranty = 0;
    let expired = 0;
    let noWarranty = 0;

    filteredEquipment.forEach(item => {
      if (!item.warranty_date) {
        noWarranty++;
      } else {
        const warrantyDate = new Date(item.warranty_date);
        if (warrantyDate > now) {
          underWarranty++;
        } else {
          expired++;
        }
      }
    });

    return { underWarranty, expired, noWarranty };
  }, [filteredEquipment]);

  // Recently Added (last 5 this month)
  const recentlyAdded = useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    return equipment
      .filter(item => {
        if (!item.purchase_date && !item.created_at) return false;
        const date = new Date(item.purchase_date || item.created_at);
        return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
      })
      .sort((a, b) => new Date(b.purchase_date || b.created_at) - new Date(a.purchase_date || a.created_at))
      .slice(0, 5);
  }, [filteredEquipment]);

  // Maintenance Forecasting
  const maintenanceForecast = useMemo(() => {
    const now = new Date();
    let immediate = 0;
    let upcoming = 0;
    let future = 0;

    filteredEquipment.forEach(item => {
      if (!item.purchase_date) return;
      const age = (now - new Date(item.purchase_date)) / (365 * 24 * 60 * 60 * 1000);
      
      if (age >= 5) immediate++;
      else if (age >= 3) upcoming++;
      else if (age >= 1) future++;
    });

    return { immediate, upcoming, future };
  }, [equipment]);

  // Asset Age Distribution
  const ageDistribution = useMemo(() => {
    const distribution = {
      '0-1 years': 0,
      '1-2 years': 0,
      '2-3 years': 0,
      '3-5 years': 0,
      '5+ years': 0
    };

    filteredEquipment.forEach(item => {
      if (!item.purchase_date) return;
      const age = (new Date() - new Date(item.purchase_date)) / (365 * 24 * 60 * 60 * 1000);
      
      if (age < 1) distribution['0-1 years']++;
      else if (age < 2) distribution['1-2 years']++;
      else if (age < 3) distribution['2-3 years']++;
      else if (age < 5) distribution['3-5 years']++;
      else distribution['5+ years']++;
    });

    return Object.entries(distribution).map(([name, value]) => ({ name, value }));
  }, [filteredEquipment]);

  const renderUtilization = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card-modern p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-wider">Total Assets</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{filteredEquipment.length}</p>
            </div>
          </div>
        </div>
        <div className="glass-card-modern p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Package size={22} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-wider">Available</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {filteredEquipment.filter(item => item.status?.toLowerCase() === 'available').length}
              </p>
            </div>
          </div>
        </div>
        <div className="glass-card-modern p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-wider">In Use</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {filteredEquipment.filter(item => ['in_use', 'loaned', 'active'].includes(item.status?.toLowerCase())).length}
              </p>
            </div>
          </div>
        </div>
        <div className="glass-card-modern p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-500/20 text-red-400">
              <AlertTriangle size={22} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-wider">Needs Attention</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {filteredEquipment.filter(item => ['maintenance', 'damaged'].includes(item.status?.toLowerCase())).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card-modern p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Asset Utilization Distribution</h3>
          <div className="relative h-80 flex flex-col">
            <div className="h-56 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={utilizationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {utilizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="h-20 mt-3 flex items-center justify-center">
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                {utilizationData.map((entry, index) => (
                  <div key={`legend-util-${index}`} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-glass)] bg-[var(--bg-glass-light)]">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                    <span className="text-[var(--text-primary)]">{entry.name}: <span className="font-semibold">{entry.value}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card-modern p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Asset Type Breakdown</h3>
          <div className="relative h-80 flex flex-col">
            <div className="h-56 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {assetTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="h-20 mt-3 flex items-center justify-center">
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                {assetTypeData.map((entry, index) => (
                  <div key={`legend-asset-${index}`} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-glass)] bg-[var(--bg-glass-light)]">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                    <span className="text-[var(--text-primary)]">{entry.name}: <span className="font-semibold">{entry.value}</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warranty Status & Recently Added */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card-modern p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Warranty Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={22} className="text-emerald-400" />
                <span className="text-sm text-[var(--text-primary)] font-medium">Under Warranty</span>
              </div>
              <span className="text-xl font-bold text-emerald-400">{warrantyStatus.underWarranty}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-3">
                <AlertTriangle size={22} className="text-orange-400" />
                <span className="text-sm text-[var(--text-primary)] font-medium">Expired</span>
              </div>
              <span className="text-xl font-bold text-orange-400">{warrantyStatus.expired}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-500/10 border border-gray-500/20">
              <div className="flex items-center gap-3">
                <Package size={22} className="text-gray-400" />
                <span className="text-sm text-[var(--text-primary)] font-medium">No Warranty Info</span>
              </div>
              <span className="text-xl font-bold text-gray-400">{warrantyStatus.noWarranty}</span>
            </div>
          </div>
        </div>

        <div className="glass-card-modern p-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Recently Added (This Month)</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto modern-scroll">
            {recentlyAdded.length === 0 ? (
              <p className="text-sm text-[var(--text-tertiary)]">No assets added this month</p>
            ) : (
              recentlyAdded.map((item, index) => (
                <div key={index} className="p-4 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-glass)] hover:border-[var(--border-color)] transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {item.brand || ''} {item.model || 'Unknown'}
                      </p>
                      <p className="text-xs text-[var(--text-tertiary)] mt-1">
                        Tag: {item.asset_tag || 'N/A'} | Serial: {item.serial || 'N/A'}
                      </p>
                    </div>
                    <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap ml-3">
                      {new Date(item.purchase_date || item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[var(--text-tertiary)]">
                      Type: {item.equipment_type || 'Unknown'}
                    </span>
                    <span className="text-[var(--text-tertiary)]">•</span>
                    <span className="text-[var(--text-tertiary)]">
                      Hub: {item.hub || 'N/A'}
                    </span>
                    <span className="text-[var(--text-tertiary)]">•</span>
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                      item.status === 'available' ? 'bg-emerald-500/20 text-emerald-400' :
                      item.status === 'active' ? 'bg-indigo-500/20 text-indigo-400' :
                      item.status === 'maintenance' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {item.status || 'Unknown'}
                    </span>
                    {item.assigned_to && (
                      <>
                        <span className="text-[var(--text-tertiary)]">•</span>
                        <span className="text-[var(--text-secondary)]">
                          Assigned: {item.assigned_to}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMaintenanceForecast = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card-modern p-5 border-l-4 border-red-500">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-500/20 text-red-400">
              <AlertTriangle size={22} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-wider">Needs Immediate Attention</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{maintenanceForecast.immediate}</p>
            </div>
          </div>
        </div>
        <div className="glass-card-modern p-5 border-l-4 border-orange-500">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-wider">Service Due (3-5 years)</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{maintenanceForecast.upcoming}</p>
            </div>
          </div>
        </div>
        <div className="glass-card-modern p-5 border-l-4 border-indigo-500">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-wider">Future Planning (1-3 years)</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{maintenanceForecast.future}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card-modern p-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Asset Age Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--text-tertiary)"
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              />
              <YAxis 
                stroke="var(--text-tertiary)"
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // Compact mode - just show the donut chart
  if (compact) {
    return (
      <div className="h-full w-full flex flex-col">
        <div className="h-56 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={utilizationData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
                label={false}
              >
                {utilizationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-20 mt-2 flex items-center justify-center">
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {utilizationData.map((entry, index) => (
              <div key={`legend-compact-${index}`} className="flex items-center gap-2 px-2 py-1 rounded-md border border-[var(--border-glass)] bg-[var(--bg-glass-light)]">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="text-[var(--text-primary)]">{entry.name}: <span className="font-semibold">{entry.value}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard mode - no title/tabs, just show utilization charts
  if (!filters) {
    return renderUtilization();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Analytics Dashboard</h2>
        <div className="flex items-center gap-2 p-1 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-glass)]">
          <button
            onClick={() => setActiveTab('utilization')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'utilization'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Utilization
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'maintenance'
                ? 'bg-[var(--accent-primary)] text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Maintenance
          </button>
        </div>
      </div>

      {activeTab === 'utilization' && renderUtilization()}
      {activeTab === 'maintenance' && renderMaintenanceForecast()}
    </div>
  );
};

export default AnalyticsDashboard;
