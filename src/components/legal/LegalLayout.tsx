import React from 'react';
import { ArrowLeft, Rocket } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  onBack: () => void;
  onNavigate?: (page: string) => void;
  children: React.ReactNode;
}

export function LegalLayout({ title, onBack, onNavigate, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500">
      <header className="px-6 py-6 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/20">
              <Rocket className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">LaunchScope</span>
          </div>
          <button
            onClick={onBack}
            className="flex items-center text-white hover:text-blue-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>
            <div className="prose prose-lg max-w-none">
              {children}
            </div>
          </div>
        </div>
      </main>

      <footer className="px-6 py-8 mt-12 bg-indigo-900/50 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-200 font-light">
            &copy; 2025 LaunchScope. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
