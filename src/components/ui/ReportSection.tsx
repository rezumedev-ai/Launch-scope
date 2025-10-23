import React from 'react';

interface ReportSectionProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  gradient?: string;
  children: React.ReactNode;
  delay?: number;
}

export function ReportSection({ title, subtitle, icon, gradient, children, delay = 0 }: ReportSectionProps) {
  return (
    <section className={`bg-gradient-to-br ${gradient || 'from-white/5 to-white/10'} backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl`}>
      {(title || icon) && (
        <div className="mb-6">
          {icon && <div className="mb-4">{icon}</div>}
          {title && (
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h3>
              {subtitle && <p className="text-slate-300 text-sm sm:text-base">{subtitle}</p>}
            </div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

interface InfoCardProps {
  title: string;
  content?: string;
  icon: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  children?: React.ReactNode;
}

export function InfoCard({ title, content, icon, variant = 'info', children }: InfoCardProps) {
  const variantStyles = {
    info: 'bg-blue-500/10 border-blue-400/30',
    success: 'bg-emerald-500/10 border-emerald-400/30',
    warning: 'bg-yellow-500/10 border-yellow-400/30',
    danger: 'bg-red-500/10 border-red-400/30',
  };

  return (
    <div className={`${variantStyles[variant]} backdrop-blur-sm border rounded-2xl p-6 mt-6`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 text-white">{icon}</div>
        <div className="flex-1">
          <h4 className="text-white font-semibold text-lg mb-2">{title}</h4>
          {content && <p className="text-slate-200 leading-relaxed">{content}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
