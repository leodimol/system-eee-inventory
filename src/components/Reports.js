import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar,
  PieChart,
  BarChart3,
  TrendingUp,
  Clock,
  AlertTriangle,
  DollarSign,
  RefreshCw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { dashboardStats, laptops } from '../data/mockData';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('month');

  const reports = [
    {
      id: 'overview',
      title: 'Inventory Overview',
      description: 'Complete summary of all laptop assets',
      icon: 'pieChart',
      color: 'blue',
      lastGenerated: '2 hours ago'
    },
    {
      id: 'usage',
      title: 'Usage Report',
      description: 'Laptop utilization and assignment rates',
      icon: 'barChart',
      color: 'green',
      lastGenerated: '1 day ago'
    },
    {
      id: 'maintenance',
      title: 'Maintenance History',
      description: 'Repair and maintenance cost analysis',
      icon: 'clock',
      color: 'orange',
      lastGenerated: '3 days ago'
    },
    {
      id: 'warranty',
      title: 'Warranty Status',
      description: 'Upcoming warranty expirations',
      icon: 'alert',
      color: 'red',
      lastGenerated: '1 week ago'
    },
    {
      id: 'financial',
      title: 'Financial Summary',
      description: 'Asset value and depreciation report',
      icon: 'dollar',
      color: 'blue',
      lastGenerated: '1 month ago'
    },
    {
      id: 'department',
      title: 'Department Distribution',
      description: 'Laptop allocation by department',
      icon: 'trending',
      color: 'green',
      lastGenerated: '1 week ago'
    }
  ];

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'pieChart': return <PieChart size={24} />;
      case 'barChart': return <BarChart3 size={24} />;
      case 'clock': return <Clock size={24} />;
      case 'alert': return <AlertTriangle size={24} />;
      case 'dollar': return <DollarSign size={24} />;
      case 'trending': return <TrendingUp size={24} />;
      default: return <FileText size={24} />;
    }
  };

  const warrantyExpiring = laptops.filter(l => {
    const warrantyDate = new Date(l.warrantyExpiry);
    const now = new Date();
    const diffDays = Math.ceil((warrantyDate - now) / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && diffDays > 0;
  });

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div>
          <h1 className="inventory-title">Reports & Analytics</h1>
          <p className="inventory-subtitle">Generate and download detailed reports</p>
        </div>
      </div>
      
      {/* Report Cards */}
      <div className="reports-grid">
        {reports.map(report => (
          <div 
            key={report.id} 
            className="report-card"
            onClick={() => setSelectedReport(report.id)}
            style={{ 
              borderColor: selectedReport === report.id ? '#c62828' : '#2a2a4a',
              backgroundColor: selectedReport === report.id ? 'rgba(198, 40, 40, 0.08)' : '#1a1a2e'
            }}
          >
            <div className={`report-icon ${report.color}`}>
              {getIcon(report.icon)}
            </div>
            <h3 className="report-title">{report.title}</h3>
            <p className="report-description">{report.description}</p>
            <div className="report-meta">
              <span>Last generated: {report.lastGenerated}</span>
              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                <Download size={14} />
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Selected Report Details */}
      {selectedReport === 'warranty' && (
        <div className="chart-card" style={{ marginBottom: '30px' }}>
          <div className="chart-header">
            <h3 className="chart-title">Warranty Expiring Soon</h3>
            <div className="chart-actions">
              <select 
                className="filter-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="30">Next 30 Days</option>
                <option value="60">Next 60 Days</option>
                <option value="90">Next 90 Days</option>
              </select>
              <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>
          
          {warrantyExpiring.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Laptop</th>
                  <th>Asset Tag</th>
                  <th>Warranty Expiry</th>
                  <th>Days Remaining</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {warrantyExpiring.map(laptop => {
                  const warrantyDate = new Date(laptop.warrantyExpiry);
                  const now = new Date();
                  const diffDays = Math.ceil((warrantyDate - now) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <tr key={laptop.id}>
                      <td>
                        <div className="laptop-info">
                          <div className="laptop-icon">
                            <FileText size={20} />
                          </div>
                          <div className="laptop-details">
                            <h4>{laptop.brand} {laptop.model}</h4>
                            <span>{laptop.serialNumber}</span>
                          </div>
                        </div>
                      </td>
                      <td>{laptop.assetTag}</td>
                      <td>{laptop.warrantyExpiry}</td>
                      <td>
                        <span className={`status-badge ${diffDays <= 30 ? 'status-retired' : 'status-maintenance'}`}>
                          {diffDays} days
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          Extend Warranty
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
              No laptops with warranty expiring in the next 90 days
            </div>
          )}
        </div>
      )}
      
      {selectedReport === 'department' && (
        <div className="chart-card" style={{ marginBottom: '30px' }}>
          <div className="chart-header">
            <h3 className="chart-title">Department Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dashboardStats.distributionByDepartment}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="department" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 46, 0.95)', 
                  border: '1px solid rgba(198, 40, 40, 0.18)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  boxShadow: '0 8px 32px rgba(198, 40, 40, 0.12)',
                  backdropFilter: 'blur(12px)',
                  padding: '12px 16px'
                }}
                itemStyle={{ 
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                labelStyle={{ 
                  color: '#a5b4fc',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              />
              <Bar dataKey="count" fill="#c62828" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {selectedReport === 'financial' && (
        <div className="stats-grid" style={{ marginBottom: '30px' }}>
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(198, 40, 40, 0.12)', color: '#c62828' }}>
                <DollarSign size={24} />
              </div>
            </div>
            <div className="stat-value">${dashboardStats.totalValue.toLocaleString()}</div>
            <div className="stat-label">Total Asset Value</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                <TrendingUp size={24} />
              </div>
            </div>
            <div className="stat-value">$1,575</div>
            <div className="stat-label">Average per Laptop</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
                <Clock size={24} />
              </div>
            </div>
            <div className="stat-value">24 months</div>
            <div className="stat-label">Avg. Age</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                <AlertTriangle size={24} />
              </div>
            </div>
            <div className="stat-value">$12,450</div>
            <div className="stat-label">Maintenance Cost YTD</div>
          </div>
        </div>
      )}
      
      {/* Export Options */}
      <div className="chart-card">
        <div className="chart-header">
          <h3 className="chart-title">Export Reports</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '20px' }}>
          <button className="btn btn-secondary" style={{ justifyContent: 'center', padding: '16px' }}>
            <FileText size={20} />
            Export as PDF
          </button>
          <button className="btn btn-secondary" style={{ justifyContent: 'center', padding: '16px' }}>
            <BarChart3 size={20} />
            Export as Excel
          </button>
          <button className="btn btn-secondary" style={{ justifyContent: 'center', padding: '16px' }}>
            <FileText size={20} />
            Export as CSV
          </button>
        </div>
      </div>
      
      <div className="footer">
        <div>© 2024 LaptopManager - Asset Tracking System</div>
      </div>
    </div>
  );
};

export default Reports;
