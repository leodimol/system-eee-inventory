import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Laptop, 
  Users, 
  Wrench, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Tag
} from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, isCollapsed, setIsCollapsed }) => {
  const [imgError, setImgError] = React.useState(false);
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'inventory', label: 'Laptop Inventory', icon: Laptop, badge: '156' },
    { id: 'employees', label: 'Employees', icon: Users, badge: '48' },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, badge: '8' },
    { id: 'reports', label: 'Reports', icon: BarChart3, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null }
  ];

  return (
    <div className="sidebar" style={{ width: isCollapsed ? '80px' : '260px' }}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {!imgError ? (
            <img
              src="/logo.png.png"
              alt="Logo"
              onError={() => setImgError(true)}
              style={{ width: isCollapsed ? 28 : 40, height: isCollapsed ? 28 : 40, objectFit: 'contain', backgroundColor: 'white', padding: 4, borderRadius: 8 }}
            />
          ) : (
            <Laptop size={isCollapsed ? 20 : 24} />
          )}
        </div>
        {!isCollapsed && (
          <div>
            <div className="sidebar-title">LaptopManager</div>
            <div className="sidebar-subtitle">Asset Tracking</div>
          </div>
        )}
      </div>
      
      <nav className="sidebar-nav">
        {!isCollapsed && (
          <div className="nav-section">
            <div className="nav-section-title">Main Menu</div>
          </div>
        )}
        
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
            title={isCollapsed ? item.label : undefined}
          >
            {item.id === 'inventory' && !imgError ? (
              <img src="/logo.png.png" alt="logo" style={{ width: 20, height: 20, objectFit: 'contain', backgroundColor: 'white', padding: 2, borderRadius: 4 }} onError={() => setImgError(true)} />
            ) : (
              <item.icon size={20} />
            )}
            {!isCollapsed && (
              <>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div 
          className="nav-item"
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!isCollapsed && <span>Collapse</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
