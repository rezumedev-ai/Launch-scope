import React from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedCard({ children, className = '' }: AnimatedCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
}

interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function ScoreCircle({ score, size = 'md', label }: ScoreCircleProps) {
  const sizeClasses = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-32 h-32 text-3xl'
  };

  const getColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 60) return 'from-blue-400 to-indigo-500';
    if (score >= 40) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClasses[size]} rounded-full bg-gradient-to-br ${getColor(score)} flex items-center justify-center shadow-lg`}>
        <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
          <span className="font-bold text-gray-800">{score}</span>
        </div>
      </div>
      {label && (
        <p className="mt-3 text-sm font-medium text-gray-600">{label}</p>
      )}
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
}

export function MetricCard({ icon, label, value, color = 'indigo' }: MetricCardProps) {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    pink: 'bg-pink-50 text-pink-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all">
      <div className={`w-12 h-12 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.indigo} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
