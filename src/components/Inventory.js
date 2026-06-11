import React, { useState, useMemo } from 'react';
import { 
  Laptop, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';
import AddLaptopModal from './AddLaptopModal';
import { laptops, statuses, brands, departments, conditions } from '../data/mockData';

const Inventory = ({ searchTerm }) => {
  const [imgError, setImgError] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const itemsPerPage = 8;

  const filteredLaptops = useMemo(() => {
    return laptops.filter(laptop => {
      const matchesSearch = laptop.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           laptop.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           laptop.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (laptop.assignedTo && laptop.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || laptop.status === statusFilter;
      const matchesBrand = brandFilter === 'all' || laptop.brand === brandFilter;
      return matchesSearch && matchesStatus && matchesBrand;
    });
  }, [searchTerm, statusFilter, brandFilter]);

  const totalPages = Math.ceil(filteredLaptops.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLaptops = filteredLaptops.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'status-active',
      maintenance: 'status-maintenance',
      retired: 'status-retired',
      available: 'status-available'
    };
    return statusClasses[status] || 'status-active';
  };

  return (
    <div className="inventory-page">
      <AddLaptopModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
      
      <div className="inventory-header">
        <div>
          <h1 className="inventory-title">Laptop Inventory</h1>
          <p className="inventory-subtitle">Manage and track all company laptops</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} />
          Add Laptop
        </button>
      </div>
      
      <div className="filters-section" style={{ marginBottom: '24px' }}>
        <div className="filter-controls">
          <div className="search-container" style={{ flex: 1, maxWidth: '400px' }}>
            <Search size={16} className="search-icon" style={{ left: '12px' }} />
            <input 
              type="text"
              placeholder="Search by brand, model, asset tag..."
              className="search-input"
              style={{ paddingLeft: '36px' }}
              defaultValue={searchTerm}
              onChange={(e) => searchTerm = e.target.value}
            />
          </div>
          
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
            ))}
          </select>
          
          <select 
            className="filter-select"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="all">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          
          <button className="btn btn-secondary">
            <Filter size={16} />
            More Filters
          </button>
        </div>
        
        <div className="action-buttons" style={{ marginTop: '16px' }}>
          <button className="btn btn-secondary">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="btn btn-secondary">
            <Download size={16} />
            Export
          </button>
          <button className="btn btn-secondary">
            <Upload size={16} />
            Import
          </button>
        </div>
      </div>
      
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Laptop</th>
              <th>Asset Tag</th>
              <th>Serial Number</th>
              <th>Assigned To</th>
              <th>Department</th>
              <th>Status</th>
              <th>Condition</th>
              <th style={{ width: '100px' }}>Warranty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLaptops.map((laptop) => (
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
                      <span>{laptop.processor} | {laptop.ram} | {laptop.storage}</span>
                    </div>
                  </div>
                </td>
                <td>{laptop.assetTag}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{laptop.serialNumber}</td>
                <td>{laptop.assignedTo || '-'}</td>
                <td>{laptop.department || '-'}</td>
                <td>
                  <span className={`status-badge ${getStatusBadge(laptop.status)}`}>
                    {laptop.status.charAt(0).toUpperCase() + laptop.status.slice(1)}
                  </span>
                </td>
                <td>{laptop.condition}</td>
                <td style={{ fontSize: '12px' }}>{laptop.warrantyExpiry}</td>
                <td>
                  <div className="action-btns">
                    <button className="action-btn" title="View">
                      <Eye size={16} />
                    </button>
                    <button className="action-btn" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="action-btn" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-footer">
        <div className="records-info">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredLaptops.length)} of {filteredLaptops.length} laptops
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

export default Inventory;
