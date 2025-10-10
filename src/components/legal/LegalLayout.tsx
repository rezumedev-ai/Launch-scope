import React from 'react';
import { ArrowLeft, Rocket, FileText, Shield, Cookie, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { LEGAL_INFO } from '../../types/legal';

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
  onBack: () => void;
  lastUpdated?: string;
  onNavigate?: (page: string) => void;
}

export function LegalLayout({ title, children, onBack, lastUpdated, onNavigate }: LegalLayoutProps) {
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.href = `/${page}`;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500">
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Rocket className="w-6 h-6 text-indigo-500" />
            </div>
            <span className="text-2xl font-bold text-white">LaunchScope</span>
          </div>

          <Button variant="secondary" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-gray-600">
              Last Updated: {lastUpdated || LEGAL_INFO.lastUpdated}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            {children}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-700 mb-2">
              If you have any questions about this policy, please contact us at:
            </p>
            <p className="text-indigo-600 font-semibold">{LEGAL_INFO.contactEmail}</p>
            <p className="text-gray-600 mt-2">
              {LEGAL_INFO.companyName}<br />
              {LEGAL_INFO.companyLocation}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4">Other Legal Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => handleNavigation('privacy')}
              className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 text-white"
            >
              <Shield className="w-5 h-5 mr-3 text-blue-200" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => handleNavigation('terms')}
              className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 text-white"
            >
              <FileText className="w-5 h-5 mr-3 text-blue-200" />
              <span>Terms of Service</span>
            </button>
            <button
              onClick={() => handleNavigation('cookies')}
              className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 text-white"
            >
              <Cookie className="w-5 h-5 mr-3 text-blue-200" />
              <span>Cookie Policy</span>
            </button>
            <button
              onClick={() => handleNavigation('refund')}
              className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 text-white"
            >
              <RefreshCw className="w-5 h-5 mr-3 text-blue-200" />
              <span>Refund Policy</span>
            </button>
            <button
              onClick={() => handleNavigation('acceptable-use')}
              className="flex items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 text-white"
            >
              <AlertTriangle className="w-5 h-5 mr-3 text-blue-200" />
              <span>Acceptable Use Policy</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-indigo-900/50 backdrop-blur-sm border-t border-white/10 px-6 py-8 mt-12">
        <div className="max-w-4xl mx-auto text-center text-white">
          <p className="text-blue-200 font-light">
            &copy; 2025 {LEGAL_INFO.companyName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
