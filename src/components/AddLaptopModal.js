import React, { useState } from 'react';
import { X } from 'lucide-react';
import { brands, departments, locations, conditions, statuses } from '../data/mockData';

const AddLaptopModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    serialNumber: '',
    assetTag: '',
    processor: '',
    ram: '',
    storage: '',
    purchaseDate: '',
    warrantyExpiry: '',
    status: 'available',
    condition: 'New',
    department: '',
    assignedTo: '',
    location: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting laptop data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Add New Laptop</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <h4 style={{ marginBottom: '16px', color: '#888', fontSize: '14px' }}>Basic Information</h4>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Brand *</label>
                <select 
                  name="brand" 
                  className="form-input"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Model *</label>
                <input 
                  type="text"
                  name="model"
                  className="form-input"
                  placeholder="e.g., Latitude 5440"
                  value={formData.model}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Serial Number *</label>
                <input 
                  type="text"
                  name="serialNumber"
                  className="form-input"
                  placeholder="e.g., DL123456789"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Asset Tag *</label>
                <input 
                  type="text"
                  name="assetTag"
                  className="form-input"
                  placeholder="e.g., AST-2024-001"
                  value={formData.assetTag}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <h4 style={{ marginBottom: '16px', marginTop: '24px', color: '#888', fontSize: '14px' }}>Hardware Specifications</h4>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Processor</label>
                <input 
                  type="text"
                  name="processor"
                  className="form-input"
                  placeholder="e.g., Intel Core i7-1365U"
                  value={formData.processor}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">RAM</label>
                <select name="ram" className="form-input" value={formData.ram} onChange={handleChange}>
                  <option value="">Select RAM</option>
                  <option value="8GB">8GB</option>
                  <option value="16GB">16GB</option>
                  <option value="32GB">32GB</option>
                  <option value="64GB">64GB</option>
                  <option value="128GB">128GB</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Storage</label>
                <select name="storage" className="form-input" value={formData.storage} onChange={handleChange}>
                  <option value="">Select Storage</option>
                  <option value="256GB SSD">256GB SSD</option>
                  <option value="512GB SSD">512GB SSD</option>
                  <option value="1TB SSD">1TB SSD</option>
                  <option value="2TB SSD">2TB SSD</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Condition</label>
                <select name="condition" className="form-input" value={formData.condition} onChange={handleChange}>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <h4 style={{ marginBottom: '16px', marginTop: '24px', color: '#888', fontSize: '14px' }}>Assignment & Location</h4>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Department</label>
                <select name="department" className="form-input" value={formData.department} onChange={handleChange}>
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Location</label>
                <select name="location" className="form-input" value={formData.location} onChange={handleChange}>
                  <option value="">Select Location</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Assigned To</label>
                <input 
                  type="text"
                  name="assignedTo"
                  className="form-input"
                  placeholder="Employee name"
                  value={formData.assignedTo}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Status</label>
                <select name="status" className="form-input" value={formData.status} onChange={handleChange}>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <h4 style={{ marginBottom: '16px', marginTop: '24px', color: '#888', fontSize: '14px' }}>Warranty & Purchase</h4>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Purchase Date</label>
                <input 
                  type="date"
                  name="purchaseDate"
                  className="form-input"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Warranty Expiry</label>
                <input 
                  type="date"
                  name="warrantyExpiry"
                  className="form-input"
                  value={formData.warrantyExpiry}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea 
                name="notes"
                className="form-input"
                rows="3"
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={handleChange}
                style={{ resize: 'vertical' }}
              />
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Laptop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLaptopModal;
