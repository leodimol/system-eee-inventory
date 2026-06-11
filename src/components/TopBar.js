import React, { useState } from 'react';
import { Search, Bell, Settings, HelpCircle, ChevronDown } from 'lucide-react';

const TopBar = ({ currentPage, searchTerm, setSearchTerm }) => {
  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      inventory: 'Laptop Inventory',
      employees: 'Employee Management',
      maintenance: 'Maintenance Records',
      reports: 'Reports & Analytics',
      settings: 'Settings'
    };
    return titles[currentPage] || 'Dashboard';
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <h1 className="page-title">{getPageTitle()}</h1>
      </div>
      
      <div className="top-bar-right">
        <div className="search-box">
          <Search size={18} color="#666" />
          <input
            type="text"
            placeholder="Search laptops, employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button className="icon-button">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>
        
        <button className="icon-button">
          <Settings size={20} />
        </button>
        
        <button className="icon-button">
          <HelpCircle size={20} />
        </button>
        
        <div className="user-menu">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <div className="user-name">Admin User</div>
            <div className="user-role">IT Administrator</div>
          </div>
          <ChevronDown size={16} color="#888" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
