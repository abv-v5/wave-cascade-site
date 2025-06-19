
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          {/* Animated logo/spinner */}
          <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-8"></div>
          
          {/* Pulsing dots */}
          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Loading Excellence</h2>
        <p className="text-white/80">Preparing your customer service experience...</p>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full mx-auto mt-6 overflow-hidden">
          <div className="h-full bg-white rounded-full animate-pulse" style={{
            animation: 'loadingProgress 3s ease-in-out forwards'
          }}></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes loadingProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
