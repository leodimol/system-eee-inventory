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
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        border: `2px solid ${borderColors[type]}`,
        minWidth: '400px',
        maxWidth: '500px'
      }}
    >
      {icons[type]}
      <span className="text-base font-semibold flex-1" style={{ color: 'var(--text-primary)' }}>
        {message}
      </span>
      <button
        onClick={handleClose}
        className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
        style={{ color: 'var(--text-tertiary)' }}
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default Toast;
