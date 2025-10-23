import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { LegalPage } from '../../types/legal';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  onBack: () => void;
  onNavigate: (page: LegalPage) => void;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, onBack, onNavigate, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-slate-300 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
            <p className="text-slate-300">Last Updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            {children}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">More Legal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onNavigate('terms')}
                className="text-left text-slate-300 hover:text-white transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => onNavigate('privacy')}
                className="text-left text-slate-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate('cookies')}
                className="text-left text-slate-300 hover:text-white transition-colors"
              >
                Cookie Policy
              </button>
              <button
                onClick={() => onNavigate('refund')}
                className="text-left text-slate-300 hover:text-white transition-colors"
              >
                Refund Policy
              </button>
              <button
                onClick={() => onNavigate('acceptable-use')}
                className="text-left text-slate-300 hover:text-white transition-colors"
              >
                Acceptable Use Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
