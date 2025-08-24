import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
        <p className="text-blue-100">Loading LaunchScope...</p>
      </div>
    </div>
  );
}