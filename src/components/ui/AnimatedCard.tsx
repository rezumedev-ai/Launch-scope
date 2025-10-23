import React, { useEffect, useState } from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  hover?: boolean;
  className?: string;
}

export function AnimatedCard({ children, delay = 0, hover = true, className = '' }: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${hover ? 'hover:scale-[1.02]' : ''} ${className}`}
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
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);
  const percentage = (score / maxScore) * 100;

  useEffect(() => {
    if (animated) {
      const duration = 1500;
      const steps = 60;
      const increment = score / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(timer);
        } else {
          setDisplayScore(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [score, animated]);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  const textSizeClasses = {
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  const getColor = () => {
    if (percentage >= 80) return 'text-emerald-400';
    if (percentage >= 60) return 'text-yellow-400';
    if (percentage >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-white/10"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${percentage * 2.83} 283`}
            className={`${getColor()} transition-all duration-1000`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${textSizeClasses[size]} font-bold ${getColor()}`}>
            {displayScore.toFixed(1)}
          </span>
        </div>
      </div>
      {label && <p className="text-slate-300 mt-2 text-sm font-medium">{label}</p>}
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  gradient: string;
  delay?: number;
}

export function MetricCard({ icon, title, value, subtitle, gradient, delay = 0 }: MetricCardProps) {
  return (
    <AnimatedCard delay={delay}>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
        <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
          {icon}
        </div>
        <h4 className="text-slate-400 text-sm font-medium mb-1">{title}</h4>
        <p className="text-white text-xl font-bold mb-2">{value}</p>
        <p className="text-slate-300 text-sm">{subtitle}</p>
      </div>
    </AnimatedCard>
  );
}
