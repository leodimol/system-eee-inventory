import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Globe,
  Save,
  RefreshCw
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    companyName: 'My Company',
    timezone: 'Asia/Manila',
    dateFormat: 'YYYY-MM-DD',
    lowStockAlert: '10',
    autoBackup: true,
    emailNotifications: true,
    maintenanceReminders: true,
    warrantyAlerts: true,
    twoFactorAuth: false,
    sessionTimeout: '30'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'users', label: 'Users & Roles', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'system', label: 'System', icon: Globe }
  ];

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div>
          <h1 className="inventory-title">Settings</h1>
          <p className="inventory-subtitle">Manage system preferences and configurations</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Sidebar Tabs */}
        <div style={{ width: '220px', flexShrink: 0 }}>
          <div style={{ backgroundColor: '#1a1a2e', borderRadius: '12px', padding: '8px' }}>
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{ marginBottom: '4px' }}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div style={{ flex: 1 }}>
          {activeTab === 'general' && (
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">General Settings</h3>
              </div>
              
              <div style={{ padding: '24px' }}>
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input 
                    type="text"
                    name="companyName"
                    className="form-input"
                    value={settings.companyName}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Timezone</label>
                    <select name="timezone" className="form-input" value={settings.timezone} onChange={handleChange}>
                      <option value="Asia/Manila">Asia/Manila (UTC+8)</option>
                      <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York (UTC-5)</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Date Format</label>
                    <select name="dateFormat" className="form-input" value={settings.dateFormat} onChange={handleChange}>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Low Stock Alert Threshold</label>
                  <input 
                    type="number"
                    name="lowStockAlert"
                    className="form-input"
                    value={settings.lowStockAlert}
                    onChange={handleChange}
                    style={{ width: '150px' }}
                  />
                </div>
                
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input 
                    type="checkbox"
                    name="autoBackup"
                    checked={settings.autoBackup}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label style={{ cursor: 'pointer' }}>Enable automatic daily backups</label>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Notification Preferences</h3>
              </div>
              
              <div style={{ padding: '24px' }}>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#252540', borderRadius: '8px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>Email Notifications</div>
                    <div style={{ fontSize: '13px', color: '#888' }}>Receive email alerts for important events</div>
                  </div>
                  <input 
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                </div>
                
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#252540', borderRadius: '8px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>Maintenance Reminders</div>
                    <div style={{ fontSize: '13px', color: '#888' }}>Get notified about scheduled maintenance</div>
                  </div>
                  <input 
                    type="checkbox"
                    name="maintenanceReminders"
                    checked={settings.maintenanceReminders}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                </div>
                
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#252540', borderRadius: '8px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>Warranty Alerts</div>
                    <div style={{ fontSize: '13px', color: '#888' }}>Get notified before warranties expire</div>
                  </div>
                  <input 
                    type="checkbox"
                    name="warrantyAlerts"
                    checked={settings.warrantyAlerts}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Security Settings</h3>
              </div>
              
              <div style={{ padding: '24px' }}>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#252540', borderRadius: '8px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>Two-Factor Authentication</div>
                    <div style={{ fontSize: '13px', color: '#888' }}>Add an extra layer of security to your account</div>
                  </div>
                  <input 
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Session Timeout (minutes)</label>
                  <select name="sessionTimeout" className="form-input" value={settings.sessionTimeout} onChange={handleChange} style={{ width: '200px' }}>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Users & Roles</h3>
                <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
                  Add User
                </button>
              </div>
              
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="laptop-info">
                        <div className="user-avatar" style={{ width: '40px', height: '40px', fontSize: '14px' }}>AD</div>
                        <div className="laptop-details">
                          <h4>Admin User</h4>
                          <span>admin@company.com</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="status-badge status-active">Administrator</span></td>
                    <td><span className="status-badge status-active">Active</span></td>
                    <td>Just now</td>
                    <td>
                      <button className="action-btn"><SettingsIcon size={16} /></button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="laptop-info">
                        <div className="user-avatar" style={{ width: '40px', height: '40px', fontSize: '14px', backgroundColor: '#10b981' }}>IT</div>
                        <div className="laptop-details">
                          <h4>IT Manager</h4>
                          <span>it@company.com</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="status-badge status-available">Manager</span></td>
                    <td><span className="status-badge status-active">Active</span></td>
                    <td>2 hours ago</td>
                    <td>
                      <button className="action-btn"><SettingsIcon size={16} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'integrations' && (
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">Integrations</h3>
              </div>
              
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  <div style={{ padding: '20px', backgroundColor: '#252540', borderRadius: '12px' }}>
                    <h4 style={{ marginBottom: '8px' }}>Superbase</h4>
                    <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>Database synchronization</p>
                    <span className="status-badge status-active">Connected</span>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: '#252540', borderRadius: '12px' }}>
                    <h4 style={{ marginBottom: '8px' }}>Slack</h4>
                    <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>Team notifications</p>
                    <span className="status-badge status-maintenance">Not Connected</span>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: '#252540', borderRadius: '12px' }}>
                    <h4 style={{ marginBottom: '8px' }}>Microsoft Intune</h4>
                    <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>Device management</p>
                    <span className="status-badge status-maintenance">Not Connected</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'system' && (
            <div className="chart-card">
              <div className="chart-header">
                <h3 className="chart-title">System Information</h3>
              </div>
              
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '16px', backgroundColor: '#252540', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Version</div>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>1.0.0</div>
                  </div>
                  <div style={{ padding: '16px', backgroundColor: '#252540', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Total Laptops</div>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>156</div>
                  </div>
                  <div style={{ padding: '16px', backgroundColor: '#252540', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Last Backup</div>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>2 hours ago</div>
                  </div>
                  <div style={{ padding: '16px', backgroundColor: '#252540', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Uptime</div>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>99.9%</div>
                  </div>
                </div>
                
                <button className="btn btn-secondary">
                  <RefreshCw size={16} />
                  Check for Updates
                </button>
              </div>
            </div>
          )}
          
          {/* Save Button */}
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
      
      <div className="footer">
        <div>© 2024 LaptopManager - Asset Tracking System</div>
      </div>
    </div>
  );
};

export default Settings;
