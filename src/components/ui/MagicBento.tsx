import React from 'react';

interface MagicBentoProps {
  children: React.ReactNode;
  className?: string;
}

export function MagicBento({ children, className = '' }: MagicBentoProps) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
