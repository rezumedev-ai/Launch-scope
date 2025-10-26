import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function LegalLayout({ title, lastUpdated, children, onBack }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center text-white hover:text-blue-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          <p className="text-slate-400 mb-8">Last updated: {lastUpdated}</p>
          <div className="prose prose-invert max-w-none">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
