import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen = ({ message = "Loading Inventory System..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="flex flex-col items-center space-y-8">
        {/* Logo */}
        <div className="relative">
          {/* Multi-layer glow effects */}
          <div className="absolute inset-0 rounded-2xl blur-3xl animate-pulse" style={{ 
            background: 'var(--accent-primary)', 
            opacity: '0.4'
          }}></div>
          <div className="absolute inset-2 rounded-2xl blur-2xl animate-pulse" style={{ 
            background: 'var(--accent-secondary)', 
            opacity: '0.3'
          }}></div>
          <div className="absolute inset-4 rounded-2xl blur-xl animate-pulse" style={{ 
            background: 'rgba(255, 255, 255, 0.2)', 
            opacity: '0.5'
          }}></div>
          
          {/* Logo container */}
          <div className="relative p-4 rounded-2xl" style={{ 
            background: 'white', 
            boxShadow: '0 0 30px rgba(255, 34, 34, 0.5), 0 0 60px rgba(255, 34, 34, 0.3), inset 0 0 20px rgba(255, 34, 34, 0.1)'
          }}>
            <img
              src="/loadingscreen.logo.png"
              alt="EEE Logo"
              className="w-32 h-32 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="absolute inset-4 items-center justify-center hidden">
              <Loader2 className="w-16 h-16 animate-spin" style={{ color: 'var(--accent-primary)' }} />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>EEE Asset Inventory</h1>
          <p className="text-base font-medium" style={{ color: 'var(--text-secondary)' }}>{message}</p>
        </div>

        {/* Spinner */}
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent-primary)' }} />
      </div>
    </div>
  );
};

export default LoadingScreen;
