import React, { useState } from 'react';
import { 
  Laptop, 
  CheckCircle, 
  Wrench, 
  Trash2, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  Download,
  Package,
  User
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { dashboardStats, laptops } from '../data/mockData';

const Dashboard = () => {
  const [imgError, setImgError] = useState(false);
  const recentLaptops = laptops.slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'maintenance': return '#f59e0b';
      case 'retired': return '#ef4444';
      case 'available': return '#c62828';
      default: return '#888';
    }
  };

  return (
    <div className="dashboard-content">
      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-header">
            <div className="stat-icon">
              {!imgError ? (
                <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: 'white' }}>
                    <img src="/logo.png.png" alt="logo" onError={(e) => setImgError(true)} style={{ width: 24, height: 24, objectFit: 'contain', borderRadius: 6, backgroundColor: 'white' }} />
                </div>
              ) : (
                <Laptop size={24} />
              )}
            </div>
            <div className="stat-trend up">
              <TrendingUp size={12} />
              +8%
            </div>
          </div>
          <div className="stat-value">{dashboardStats.totalLaptops}</div>
          <div className="stat-label">Total Laptops</div>
        </div>
        
        <div className="stat-card active">
          <div className="stat-header">
            <div className="stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="stat-trend up">
              <TrendingUp size={12} />
              +5%
            </div>
          </div>
          <div className="stat-value">{dashboardStats.activeLaptops}</div>
          <div className="stat-label">Active in Use</div>
        </div>
        
        <div className="stat-card maintenance">
          <div className="stat-header">
            <div className="stat-icon">
              <Wrench size={24} />
            </div>
            <div className="stat-trend down">
              <TrendingDown size={12} />
              -2%
            </div>
          </div>
          <div className="stat-value">{dashboardStats.inMaintenance}</div>
          <div className="stat-label">In Maintenance</div>
        </div>
        
        <div className="stat-card retired">
          <div className="stat-header">
            <div className="stat-icon">
              <Trash2 size={24} />
            </div>
            <div className="stat-trend down">
              <TrendingDown size={12} />
              -1%
            </div>
          </div>
          <div className="stat-value">{dashboardStats.retiredLaptops}</div>
          <div className="stat-label">Retired/Disposed</div>
        </div>
        
        <div className="stat-card available">
          <div className="stat-header">
            <div className="stat-icon">
              <Package size={24} />
            </div>
            <div className="stat-trend up">
              <TrendingUp size={12} />
              +3%
            </div>
          </div>
          <div className="stat-value">{dashboardStats.availableAssets}</div>
          <div className="stat-label">Available</div>
        </div>
        
        <div className="stat-card inuse">
          <div className="stat-header">
            <div className="stat-icon">
              <User size={24} />
            </div>
            <div className="stat-trend up">
              <TrendingUp size={12} />
              +2%
            </div>
          </div>
          <div className="stat-value">{dashboardStats.inUseAssets}</div>
          <div className="stat-label">In Use</div>
        </div>
      </div>
      
      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Inventory Trend</h3>
            <div className="chart-actions">
              <button className="chart-btn active">3 Months</button>
              <button className="chart-btn">6 Months</button>
              <button className="chart-btn">1 Year</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardStats.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="month" stroke="#888" />
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
                  color: '#c62828',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#c62828" 
                strokeWidth={2}
                dot={{ fill: '#c62828' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Brand Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardStats.distributionByBrand}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {dashboardStats.distributionByBrand.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
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
              <Legend 
                contentStyle={{ color: '#ffffff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Department Distribution */}
      <div className="chart-card" style={{ marginBottom: '30px' }}>
        <div className="chart-header">
          <h3 className="chart-title">Laptops by Department</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardStats.distributionByDepartment}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
            <XAxis dataKey="department" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #2a2a4a' }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="count" fill="#c62828" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Recent Laptops Table */}
      <div className="data-table-container">
        <div className="table-header">
          <h3 className="table-title">Recent Laptops</h3>
          <div className="table-actions">
            <button className="btn btn-secondary">
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="btn btn-secondary">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Laptop</th>
              <th>Asset Tag</th>
              <th>Assigned To</th>
              <th>Department</th>
              <th>Status</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {recentLaptops.map((laptop) => (
              <tr key={laptop.id}>
                <td>
                  <div className="laptop-info">
                    <div className="laptop-icon">
                      {!imgError ? (
                        <img src="/logo.png.png" alt="logo" onError={(e) => setImgError(true)} style={{ width: 20, height: 20, objectFit: 'contain', borderRadius: 4, backgroundColor: 'white', padding: 2 }} />
                      ) : (
                        <Laptop size={20} />
                      )}
                    </div>
                    <div className="laptop-details">
                      <h4>{laptop.brand} {laptop.model}</h4>
                      <span>{laptop.processor}</span>
                    </div>
                  </div>
                </td>
                <td>{laptop.assetTag}</td>
                <td>{laptop.assignedTo || 'Unassigned'}</td>
                <td>{laptop.department || '-'}</td>
                <td>
                  <span className={`status-badge status-${laptop.status}`}>
                    {laptop.status.charAt(0).toUpperCase() + laptop.status.slice(1)}
                  </span>
                </td>
                <td>{laptop.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="footer">
        <div>© 2024 LaptopManager - Asset Tracking System</div>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#support">Support</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
