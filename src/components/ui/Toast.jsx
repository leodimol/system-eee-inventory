import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X, AlertTriangle, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const icons = {
    success: <CheckCircle size={20} style={{ color: 'var(--accent-green)' }} />,
    error: <XCircle size={20} style={{ color: 'var(--accent-red)' }} />,
    warning: <AlertTriangle size={20} style={{ color: 'var(--accent-orange)' }} />,
    info: <Info size={20} style={{ color: 'var(--accent-blue)' }} />
  };

  const borderColors = {
    success: 'var(--accent-green)',
    error: 'var(--accent-red)',
    warning: 'var(--accent-orange)',
    info: 'var(--accent-blue)'
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${borderColors[type]}`,
        minWidth: '300px'
      }}
    >
      {icons[type]}
      <span className="text-sm font-medium flex-1" style={{ color: 'var(--text-primary)' }}>
        {message}
      </span>
      <button
        onClick={handleClose}
        className="p-1 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
        style={{ color: 'var(--text-tertiary)' }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
