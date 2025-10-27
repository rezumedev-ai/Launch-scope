import React, { useEffect, useState } from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  hover?: boolean;
}

export function AnimatedCard({ children, delay = 0, className = '', hover = true }: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transform transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${hover ? 'hover:scale-[1.02] hover:shadow-2xl' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

interface ScoreCircleProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  animated?: boolean;
}

export function ScoreCircle({ score, maxScore = 10, size = 'md', label, animated = true }: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const percentage = (score / maxScore) * 100;

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }

    let currentScore = 0;
    const increment = score / 30;
    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(currentScore * 10) / 10);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [score, animated]);

  const getColor = () => {
    if (percentage >= 80) return 'from-emerald-500 to-green-400';
    if (percentage >= 60) return 'from-blue-500 to-cyan-400';
    if (percentage >= 40) return 'from-yellow-500 to-orange-400';
    return 'from-red-500 to-rose-400';
  };

  const getGlowColor = () => {
    if (percentage >= 80) return 'shadow-emerald-500/50';
    if (percentage >= 60) return 'shadow-blue-500/50';
    if (percentage >= 40) return 'shadow-yellow-500/50';
    return 'shadow-red-500/50';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Background circle */}
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-white/10"
          />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              strokeDasharray: `${2 * Math.PI * 40}`,
              strokeDashoffset: `${2 * Math.PI * 40 * (1 - displayScore / maxScore)}`
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`${getColor().split(' ')[0]}`} />
              <stop offset="100%" className={`${getColor().split(' ')[1]}`} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center text */}
        <div className={`absolute inset-0 flex items-center justify-center ${textSizes[size]} font-bold text-white`}>
          {animated ? displayScore.toFixed(1) : score}
        </div>

        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getColor()} opacity-20 blur-xl ${getGlowColor()}`} />
      </div>

      {label && (
        <p className="text-slate-300 text-sm mt-3 font-medium">{label}</p>
      )}
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  gradient?: string;
  delay?: number;
}

export function MetricCard({ icon, title, value, subtitle, gradient = 'from-indigo-500 to-purple-500', delay = 0 }: MetricCardProps) {
  return (
    <AnimatedCard delay={delay} className="group">
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden">
        {/* Background gradient effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

        {/* Content */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
            <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
              {value}
            </div>
          </div>
          <h3 className="text-white font-semibold mb-1">{title}</h3>
          {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
        </div>
      </div>
    </AnimatedCard>
  );
}
