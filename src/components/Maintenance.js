import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  Plus, 
  Search, 
  Calendar,
  Clock,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { maintenanceRecords, laptops } from '../data/mockData';

const Maintenance = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('all');
  const itemsPerPage = 5;

  const getLaptopInfo = (laptopId) => {
    const laptop = laptops.find(l => l.id === laptopId);
    return laptop ? `${laptop.brand} ${laptop.model}` : 'Unknown';
  };

  const filteredRecords = useMemo(() => {
    return maintenanceRecords.filter(record => {
      const matchesSearch = record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           getLaptopInfo(record.laptopId).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || record.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, typeFilter]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  const totalMaintenanceCost = maintenanceRecords.reduce((sum, r) => sum + r.cost, 0);

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div>
          <h1 className="inventory-title">Maintenance Records</h1>
          <p className="inventory-subtitle">Track and manage laptop maintenance and repairs</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add Record
        </button>
      </div>
      
      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: '30px' }}>
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
              <Wrench size={24} />
            </div>
          </div>
          <div className="stat-value">{maintenanceRecords.length}</div>
          <div className="stat-label">Total Records</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
              <CheckCircle size={24} />
            </div>
          </div>
          <div className="stat-value">{maintenanceRecords.length}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
              <DollarSign size={24} />
            </div>
          </div>
          <div className="stat-value">${totalMaintenanceCost}</div>
          <div className="stat-label">Total Cost</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(198, 40, 40, 0.12)', color: '#c62828' }}>
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="stat-value">2</div>
          <div className="stat-label">Pending</div>
        </div>
      </div>
      
      <div className="filters-section" style={{ marginBottom: '24px' }}>
        <div className="filter-controls">
          <div className="search-container" style={{ flex: 1, maxWidth: '400px' }}>
            <Search size={16} className="search-icon" style={{ left: '12px' }} />
            <input 
              type="text"
              placeholder="Search maintenance records..."
              className="search-input"
              style={{ paddingLeft: '36px' }}
              defaultValue={searchTerm}
            />
          </div>
          
          <select 
            className="filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Screen Repair">Screen Repair</option>
            <option value="Battery Replacement">Battery Replacement</option>
            <option value="Software Update">Software Update</option>
            <option value="Keyboard Cleaning">Keyboard Cleaning</option>
          </select>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="maintenance-timeline">
        {paginatedRecords.map((record, index) => (
          <div key={record.id} className="timeline-item" style={{ paddingBottom: index === paginatedRecords.length - 1 ? '0' : '24px' }}>
            <div className="timeline-date">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Calendar size={12} />
                {record.date}
              </div>
            </div>
            <div className="timeline-content">
              <div className="timeline-title">{record.type}</div>
              <div className="timeline-description">
                <strong>Laptop:</strong> {getLaptopInfo(record.laptopId)} | 
                <strong> Technician:</strong> {record.technician} | 
                <strong> Cost:</strong> ${record.cost}
              </div>
              <div style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
                {record.notes}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="table-footer" style={{ marginTop: '24px' }}>
        <div className="records-info">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
        </div>
        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="footer">
        <div>© 2024 LaptopManager - Asset Tracking System</div>
      </div>
    </div>
  );
};

export default Maintenance;
