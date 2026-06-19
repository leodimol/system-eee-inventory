import React, { useState, useMemo, useEffect } from 'react';
import {
  Package,
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
import AddAssetModal from './AddAssetModal';
import { supabase } from '../lib/supabase';

const Inventory = ({ searchTerm }) => {
  const [imgError, setImgError] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [subCategoryFilter, setSubCategoryFilter] = useState('all');
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  const categories = [
    { id: 'transport', name: 'Transport Equipment' },
    { id: 'logistics', name: 'Logistics Equipment' },
    { id: 'office', name: 'Office Equipment' },
    { id: 'other', name: 'Other Equipment' }
  ];

  const subCategories = useMemo(() => {
    if (categoryFilter === 'logistics') {
      return [
        { id: 'wooden_crates', name: 'Wooden Crates' },
        { id: 'plastic_crates', name: 'Plastic Crates' },
        { id: 'pallets', name: 'Pallets' },
        { id: 'storage_bins', name: 'Storage Bins' },
        { id: 'wire_cages', name: 'Wire Cages' }
      ];
    } else if (categoryFilter === 'office') {
      return [
        { id: 'desktop_computer', name: 'Desktop Computer' },
        { id: 'laptop', name: 'Laptop' },
        { id: 'monitor', name: 'Monitor' },
        { id: 'keyboard_mouse', name: 'Keyboard & Mouse' },
        { id: 'printer', name: 'Printer' },
        { id: 'photocopier', name: 'Photocopier' },
        { id: 'scanner', name: 'Scanner' },
        { id: 'shredder', name: 'Shredder' },
        { id: 'telephone', name: 'Telephone' },
        { id: 'router', name: 'Router' },
        { id: 'office_desk', name: 'Office Desk' },
        { id: 'office_chair', name: 'Office Chair' },
        { id: 'filing_cabinet', name: 'Filing Cabinet' },
        { id: 'bookshelf', name: 'Bookshelf' },
        { id: 'paper_cutter', name: 'Paper Cutter' },
        { id: 'stapler', name: 'Stapler' },
        { id: 'hole_puncher', name: 'Hole Puncher' },
        { id: 'document_tray', name: 'Document Tray' },
        { id: 'calculator', name: 'Calculator' },
        { id: 'whiteboard', name: 'Whiteboard' }
      ];
    }
    return [];
  }, [categoryFilter]);

  const filteredEquipment = useMemo(() => {
    return equipment.filter(item => {
      const matchesSearch = !searchTerm ||
                           (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (item.model && item.model.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (item.asset_tag && item.asset_tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (item.assigned_to && item.assigned_to.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.equipment_type === categoryFilter || item.category === categoryFilter;
      const matchesSubCategory = subCategoryFilter === 'all' ||
                                 (categoryFilter === 'logistics' && item.logistics_type === subCategoryFilter) ||
                                 (categoryFilter === 'office' && item.office_type === subCategoryFilter) ||
                                 (categoryFilter !== 'logistics' && categoryFilter !== 'office');
      return matchesSearch && matchesStatus && matchesCategory && matchesSubCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter, subCategoryFilter, equipment]);

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setEquipment(data || []);
    } catch (err) {
      console.error('Error loading equipment:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEquipment = filteredEquipment.slice(startIndex, startIndex + itemsPerPage);

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
      <AddAssetModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSaved={loadEquipment} />

      <div className="inventory-header">
        <div>
          <h1 className="inventory-title">Equipment Inventory</h1>
          <p className="inventory-subtitle">Manage and track all company equipment</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} />
          Add Equipment
        </button>
      </div>
      
      <div className="filters-section" style={{ marginBottom: '24px', padding: '20px', backgroundColor: 'rgba(26, 26, 46, 0.5)', borderRadius: '12px', border: '1px solid rgba(42, 42, 74, 0.5)' }}>
        <div className="inventory-filters" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>Category *</label>
            <select
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setSubCategoryFilter('all');
              }}
              style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #2a2a4a', backgroundColor: '#1a1a2e', color: '#ffffff', fontSize: '14px', cursor: 'pointer', minWidth: '200px', fontWeight: '600' }}
            >
              <option value="all">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {subCategories.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>Sub-Category</label>
              <select
                className="filter-select"
                value={subCategoryFilter}
                onChange={(e) => setSubCategoryFilter(e.target.value)}
                style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #2a2a4a', backgroundColor: '#1a1a2e', color: '#ffffff', fontSize: '14px', cursor: 'pointer', minWidth: '200px' }}
              >
                <option value="all">All Sub-Categories</option>
                {subCategories.map(subCategory => (
                  <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                ))}
              </select>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, maxWidth: '400px' }}>
            <label style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>Search</label>
            <div className="search-container" style={{ position: 'relative' }}>
              <Search size={16} className="search-icon" style={{ left: '12px', position: 'absolute', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
              <input
                type="text"
                placeholder={categoryFilter === 'all' ? "Select a category first..." : "Search by brand, model, asset tag..."}
                className="search-input"
                style={{ paddingLeft: '36px', width: '100%', padding: '10px 16px 10px 36px', borderRadius: '8px', border: '1px solid #2a2a4a', backgroundColor: categoryFilter === 'all' ? '#0f0f1a' : '#1a1a2e', color: '#ffffff', opacity: categoryFilter === 'all' ? 0.5 : 1 }}
                defaultValue={searchTerm}
                disabled={categoryFilter === 'all'}
                onChange={(e) => searchTerm = e.target.value}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>Status</label>
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #2a2a4a', backgroundColor: '#1a1a2e', color: '#ffffff', fontSize: '14px', cursor: 'pointer', minWidth: '150px' }}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="in_use">In Use</option>
              <option value="maintenance">Maintenance</option>
              <option value="retired">Retired</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>&nbsp;</label>
            <button className="btn btn-secondary" onClick={loadEquipment} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #2a2a4a', backgroundColor: '#1a1a2e', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>&nbsp;</label>
            <button className="btn btn-secondary" style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #2a2a4a', backgroundColor: '#1a1a2e', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={16} />
              More Filters
            </button>
          </div>
        </div>

        <div className="action-buttons" style={{ marginTop: '16px' }}>
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

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading equipment...</div>
      ) : (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Asset Tag</th>
                <th>Serial</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Condition</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEquipment.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="laptop-info">
                      <div className="laptop-icon">
                        {!imgError ? (
                          <img src="/logo.png.png" alt="logo" onError={(e) => setImgError(true)} style={{ width: 20, height: 20, objectFit: 'contain', borderRadius: 4, backgroundColor: 'white', padding: 2 }} />
                        ) : (
                          <Package size={20} />
                        )}
                      </div>
                      <div className="laptop-details">
                        <h4>{item.brand} {item.model}</h4>
                        <span>{item.equipment_type}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.equipment_type || '-'}</td>
                  <td>
                    {item.logistics_type || item.office_type || '-'}
                  </td>
                  <td>{item.asset_tag || '-'}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{item.serial || '-'}</td>
                  <td>{item.assigned_to || '-'}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadge(item.status)}`}>
                      {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : '-'}
                    </span>
                  </td>
                  <td>{item.condition || '-'}</td>
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
      )}

      <div className="table-footer">
        <div className="records-info">
          Showing {filteredEquipment.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredEquipment.length)} of {filteredEquipment.length} equipment
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
        <div>© 2024 EquipmentManager - Asset Tracking System</div>
      </div>
    </div>
  );
};

export default Inventory;
