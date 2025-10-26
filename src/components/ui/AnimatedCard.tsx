import React from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  hover?: boolean;
  className?: string;
}

export function AnimatedCard({ children, delay = 0, hover = true, className = '' }: AnimatedCardProps) {
  return (
    <div
      className={`${hover ? 'hover:scale-105 transition-transform duration-300' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

interface ScoreCircleProps {
  score: number;
  maxScore: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  animated?: boolean;
}

export function ScoreCircle({ score, maxScore, size = 'md', label, animated = false }: ScoreCircleProps) {
  const percentage = (score / maxScore) * 100;
  const sizeClasses = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-32 h-32 text-3xl'
  };

  const getColor = () => {
    if (percentage >= 80) return 'text-emerald-400';
    if (percentage >= 60) return 'text-amber-400';
    return 'text-orange-400';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size]} rounded-full border-4 border-white/20 flex items-center justify-center ${getColor()} font-bold`}>
        {score}/{maxScore}
      </div>
      {label && <p className="mt-2 text-sm text-slate-300">{label}</p>}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down';
  className?: string;
}

export function MetricCard({ title, value, icon, trend, className = '' }: MetricCardProps) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 text-sm">{title}</span>
        {icon}
      </div>
      <div className="text-white text-2xl font-bold">{value}</div>
      {trend && (
        <div className={`text-sm mt-1 ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend === 'up' ? '↑' : '↓'}
        </div>
      )}
    </div>
  );
}
