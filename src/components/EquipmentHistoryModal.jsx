import React, { useState, useEffect } from 'react';
import { X, History, User, Clock, Plus, Edit3, Trash2, RefreshCw, AlertCircle } from 'lucide-react';
import { getEquipmentHistory, formatAuditLog } from '../utils/auditLog';
import { supabase } from '../lib/supabase';

const EquipmentHistoryModal = ({ isOpen, onClose, equipmentId, equipmentData }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && equipmentId) {
      fetchHistory();
    }
  }, [isOpen, equipmentId]);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const logs = await getEquipmentHistory(equipmentId, 50);
      const formattedLogs = logs.map(formatAuditLog);
      setHistory(formattedLogs);
    } catch (err) {
      setError('Failed to load equipment history');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getActionIcon = (action, iconType) => {
    const iconProps = { size: 16, strokeWidth: 2 };
    
    switch (action) {
      case 'CREATE':
        return <Plus {...iconProps} className="text-green-400" />;
      case 'DELETE':
        return <Trash2 {...iconProps} className="text-red-400" />;
      case 'UPDATE':
        return <Edit3 {...iconProps} className="text-blue-400" />;
      case 'STATUS_CHANGE':
        return <RefreshCw {...iconProps} className="text-orange-400" />;
      default:
        return <AlertCircle {...iconProps} className="text-gray-400" />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'CREATE':
        return 'border-l-green-500 bg-green-500/5';
      case 'DELETE':
        return 'border-l-red-500 bg-red-500/5';
      case 'UPDATE':
        return 'border-l-blue-500 bg-blue-500/5';
      case 'STATUS_CHANGE':
        return 'border-l-orange-500 bg-orange-500/5';
      default:
        return 'border-l-gray-500 bg-gray-500/5';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-[20px] overflow-hidden"
        style={{ 
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-glass)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: 'var(--border-glass)' }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-[12px]"
              style={{ background: 'var(--bg-glass-light)' }}
            >
              <History size={20} style={{ color: 'var(--accent-primary)' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                Equipment History
              </h2>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {equipmentData?.model || 'Unknown'} • {equipmentData?.asset_tag || 'No Tag'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 modern-scroll">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw size={24} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle size={32} className="mx-auto mb-3" style={{ color: 'var(--accent-red)' }} />
              <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <History size={32} className="mx-auto mb-3" style={{ color: 'var(--text-tertiary)' }} />
              <p style={{ color: 'var(--text-secondary)' }}>No history available</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
                Changes to this equipment will be tracked here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((log, index) => (
                <div
                  key={log.id}
                  className={`relative pl-4 py-3 pr-4 rounded-[12px] border-l-4 ${getActionColor(log.action)}`}
                  style={{ background: 'var(--bg-glass-light)' }}
                >
                  {/* Timeline connector */}
                  {index < history.length - 1 && (
                    <div 
                      className="absolute left-[19px] top-[48px] w-px h-[calc(100%+16px)]"
                      style={{ background: 'var(--border-glass)' }}
                    />
                  )}
                  
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div 
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--bg-secondary)' }}
                    >
                      {getActionIcon(log.action, log.icon)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span 
                          className="text-sm font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {log.action}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10" style={{ color: 'var(--text-tertiary)' }}>
                          {log.formattedDate} at {log.formattedTime}
                        </span>
                      </div>
                      
                      <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                        {log.description}
                      </p>
                      
                      {/* Field Changes */}
                      {log.field_changes && Object.keys(log.field_changes).length > 0 && (
                        <div className="mt-2 space-y-1">
                          {Object.entries(log.field_changes).slice(0, 3).map(([field, change]) => (
                            <div 
                              key={field}
                              className="text-xs flex items-center gap-2 px-2 py-1.5 rounded-lg"
                              style={{ background: 'var(--bg-secondary)' }}
                            >
                              <span style={{ color: 'var(--text-tertiary)' }}>
                                {field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                              </span>
                              <span style={{ color: 'var(--accent-red)' }} className="line-through">
                                {typeof change.old === 'object' ? JSON.stringify(change.old) : (change.old || 'empty')}
                              </span>
                              <span style={{ color: 'var(--text-tertiary)' }}>→</span>
                              <span style={{ color: 'var(--accent-green)' }}>
                                {typeof change.new === 'object' ? JSON.stringify(change.new) : (change.new || 'empty')}
                              </span>
                            </div>
                          ))}
                          {Object.keys(log.field_changes).length > 3 && (
                            <p className="text-xs px-2" style={{ color: 'var(--text-tertiary)' }}>
                              +{Object.keys(log.field_changes).length - 3} more changes
                            </p>
                          )}
                        </div>
                      )}
                      
                      {/* Changed By */}
                      <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        <User size={12} />
                        <span>{log.changed_by || 'System'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-t"
          style={{ borderColor: 'var(--border-glass)' }}
        >
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <Clock size={14} />
            <span>{history.length} events tracked</span>
          </div>
          <button
            onClick={fetchHistory}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-[12px] text-sm font-medium transition-all hover:opacity-80 disabled:opacity-50"
            style={{ 
              background: 'var(--bg-glass-light)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)'
            }}
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentHistoryModal;
