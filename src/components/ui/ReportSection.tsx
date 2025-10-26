import React from 'react';

interface ReportSectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  gradient?: string;
  className?: string;
  delay?: number;
}

export function ReportSection({
  children,
  title,
  subtitle,
  icon,
  gradient = 'from-indigo-500/10 via-purple-500/10 to-pink-500/10',
  className = '',
  delay = 0
}: ReportSectionProps) {
  return (
    <section
      className={`relative animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-3xl`} />

      {/* Content */}
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Floating decorations */}
        <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-xl" />

        <div className="relative">
          {/* Header */}
          {(title || icon) && (
            <div className="flex items-center mb-6">
              {icon && (
                <div className="mr-4 transform hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
              )}
              <div className="flex-1">
                {title && (
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-slate-300 text-sm sm:text-base">{subtitle}</p>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          {children}
        </div>
      </div>
    </section>
  );
}

interface InfoCardProps {
  title: string;
  content?: string | string[];
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  children?: React.ReactNode;
}

export function InfoCard({ title, content, icon, variant = 'default', children }: InfoCardProps) {
  const variantStyles = {
    default: 'bg-slate-800/50 border-slate-700/50',
    success: 'bg-emerald-900/30 border-emerald-500/30',
    warning: 'bg-amber-900/30 border-amber-500/30',
    danger: 'bg-red-900/30 border-red-500/30',
    info: 'bg-blue-900/30 border-blue-500/30'
  };

  const iconColors = {
    default: 'text-indigo-400',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    danger: 'text-red-400',
    info: 'text-blue-400'
  };

  return (
    <div className={`${variantStyles[variant]} rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-start space-x-3 mb-3">
        {icon && (
          <div className={`flex-shrink-0 ${iconColors[variant]}`}>
            {icon}
          </div>
        )}
        <h4 className="text-lg sm:text-xl font-semibold text-white flex-1">{title}</h4>
      </div>
      {children ? (
        <div>{children}</div>
      ) : content ? (
        Array.isArray(content) ? (
          <ul className="space-y-2">
            {content.map((item, idx) => (
              <li key={idx} className="text-slate-300 text-sm sm:text-base leading-relaxed flex items-start">
                <span className="text-indigo-400 mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{content}</p>
        )
      ) : null}
    </div>
  );
}
