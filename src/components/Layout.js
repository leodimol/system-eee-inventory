import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Dashboard from './Dashboard';
import Inventory from './Inventory';
import Employees from './Employees';
import Maintenance from './Maintenance';
import Reports from './Reports';
import Settings from './Settings';

const Layout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory searchTerm={searchTerm} />;
      case 'employees':
        return <Employees searchTerm={searchTerm} />;
      case 'maintenance':
        return <Maintenance searchTerm={searchTerm} />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className="main-content">
        <TopBar 
          currentPage={currentPage}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default Layout;
