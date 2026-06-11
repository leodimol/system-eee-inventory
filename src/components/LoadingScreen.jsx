import React from 'react';
import { Loader2, Package, Database, Wifi } from 'lucide-react';

const LoadingScreen = ({ message = "Loading Inventory System..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center gradient-mesh">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo and Icons Container */}
        <div className="relative">
          {/* Central Loader */}
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-purple-500/20"></div>
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-10 h-10 text-blue-500 animate-pulse" />
            </div>
          </div>

          {/* Orbiting Icons */}
          <Database className="absolute -top-8 -left-8 w-6 h-6 text-purple-400 animate-spin-slow" />
          <Wifi className="absolute -top-8 -right-8 w-6 h-6 text-teal-400 animate-spin-slow" style={{ animationDelay: '0.5s' }} />
          <Loader2 className="absolute -bottom-8 -left-8 w-6 h-6 text-blue-400 animate-spin" />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-gradient">Laptop Inventory System</h1>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {message}
          </p>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="h-full rounded-full shimmer" style={{ width: '60%' }}></div>
        </div>

        {/* Status Messages */}
        <div className="text-center space-y-1">
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Initializing database connection...</p>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Loading inventory data...</p>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Powered by React + Supabase
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
