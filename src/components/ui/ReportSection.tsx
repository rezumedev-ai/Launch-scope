import React from 'react';

interface ReportSectionProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  gradient?: string;
  className?: string;
}

export function ReportSection({ title, subtitle, icon, children, gradient, className = '' }: ReportSectionProps) {
  return (
    <section className={`bg-gradient-to-br ${gradient || 'from-slate-800/60 to-slate-900/60'} backdrop-blur-sm rounded-3xl p-6 border border-white/10 ${className}`}>
      {(title || subtitle || icon) && (
        <div className="flex items-center mb-6">
          {icon && <div className="mr-4">{icon}</div>}
          <div>
            {title && <h2 className="text-2xl font-bold text-white">{title}</h2>}
            {subtitle && <p className="text-slate-300 text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </section>
  );
}

interface InfoCardProps {
  title: string;
  content?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  children?: React.ReactNode;
  className?: string;
}

export function InfoCard({ title, content, icon, variant = 'default', children, className = '' }: InfoCardProps) {
  const variantStyles = {
    default: 'bg-white/5 border-white/10',
    success: 'bg-emerald-500/10 border-emerald-400/30',
    warning: 'bg-amber-500/10 border-amber-400/30',
    danger: 'bg-red-500/10 border-red-400/30',
    info: 'bg-blue-500/10 border-blue-400/30'
  };

  return (
    <div className={`backdrop-blur-sm border rounded-2xl p-6 ${variantStyles[variant]} ${className}`}>
      <div className="flex items-start mb-3">
        {icon && <div className="mr-3 mt-1">{icon}</div>}
        <h3 className="text-white font-semibold text-lg flex-1">{title}</h3>
      </div>
      {content && <p className="text-slate-300 leading-relaxed">{content}</p>}
      {children}
    </div>
  );
}
