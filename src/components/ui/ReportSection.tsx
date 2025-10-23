import React from 'react';

interface ReportSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function ReportSection({ title, children, icon, className = '' }: ReportSectionProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        {icon && (
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white">
            {icon}
          </div>
        )}
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface InfoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
}

export function InfoCard({ title, description, icon, color = 'indigo' }: InfoCardProps) {
  const colorClasses = {
    indigo: 'bg-indigo-50 border-indigo-200',
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    red: 'bg-red-50 border-red-200',
    pink: 'bg-pink-50 border-pink-200',
    purple: 'bg-purple-50 border-purple-200'
  };

  const iconColorClasses = {
    indigo: 'text-indigo-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    pink: 'text-pink-600',
    purple: 'text-purple-600'
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses] || colorClasses.indigo} border rounded-xl p-6 transition-all hover:shadow-md`}>
      <div className="flex items-start gap-4">
        {icon && (
          <div className={`flex-shrink-0 ${iconColorClasses[color as keyof typeof iconColorClasses] || iconColorClasses.indigo}`}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
