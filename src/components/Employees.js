import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import { employees, departments } from '../data/mockData';

const Employees = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const itemsPerPage = 6;

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = departmentFilter === 'all' || emp.department === departmentFilter;
      return matchesSearch && matchesDept;
    });
  }, [searchTerm, departmentFilter]);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div>
          <h1 className="inventory-title">Employee Management</h1>
          <p className="inventory-subtitle">Track laptop assignments to employees</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add Employee
        </button>
      </div>
      
      <div className="filters-section" style={{ marginBottom: '24px' }}>
        <div className="filter-controls">
          <div className="search-container" style={{ flex: 1, maxWidth: '400px' }}>
            <Search size={16} className="search-icon" style={{ left: '12px' }} />
            <input 
              type="text"
              placeholder="Search employees..."
              className="search-input"
              style={{ paddingLeft: '36px' }}
              defaultValue={searchTerm}
            />
          </div>
          
          <select 
            className="filter-select"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Assigned Laptops</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <div className="laptop-info">
                    <div className="user-avatar" style={{ width: '40px', height: '40px', fontSize: '14px' }}>
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="laptop-details">
                      <h4>{emp.name}</h4>
                    </div>
                  </div>
                </td>
                <td>{emp.id}</td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building size={14} color="#888" />
                    {emp.department}
                  </span>
                </td>
                <td style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} color="#888" />
                  {emp.email}
                </td>
                <td style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} color="#888" />
                  {emp.phone}
                </td>
                <td>
                  <span className="status-badge status-available">
                    1 Laptop
                  </span>
                </td>
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
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} employees
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

export default Employees;
