import React, { useState, useEffect } from 'react';
import { Rocket, Eye, ExternalLink, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';
import { supabase } from '../lib/supabase';
import { LoadingSpinner } from './LoadingSpinner';
import { AnalysisReport } from './AnalysisReport';

interface SharedReportViewProps {
  shareToken: string;
}

export function SharedReportView({ shareToken }: SharedReportViewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [idea, setIdea] = useState<string>('');
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    const fetchSharedReport = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: functionError } = await supabase.functions.invoke('get-shared-report', {
          body: { shareToken }
        });

        if (functionError) {
          throw new Error(functionError.message || 'Failed to load shared report');
        }

        if (data.error) {
          throw new Error(data.error);
        }

        setAnalysisData(data.analysis);
        setIdea(data.idea);
        setViewCount(data.viewCount);
      } catch (err) {
        console.error('Error loading shared report:', err);
        setError(err instanceof Error ? err.message : 'Failed to load shared report');
      } finally {
        setLoading(false);
      }
    };

    if (shareToken) {
      fetchSharedReport();
    }
  }, [shareToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-white mt-4 text-lg">Loading shared report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">LaunchScope</span>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-3xl p-12 text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Report Not Found</h1>
            <p className="text-red-200 text-lg mb-8">{error}</p>
            <a href="/" className="inline-block">
              <Button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600">
                Go to LaunchScope
              </Button>
            </a>
          </div>
        </main>
      </div>
    );
  }

  if (!analysisData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Rocket className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold text-white">LaunchScope</span>
            </div>

            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-xs sm:text-sm">
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">Try LaunchScope Free</span>
                <span className="sm:hidden">Try Free</span>
              </Button>
            </a>
          </div>

          <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl px-3 sm:px-4 py-2 sm:py-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-blue-200">
                  <span className="hidden sm:inline">You're viewing a shared startup analysis report</span>
                  <span className="sm:hidden">Shared Report</span>
                </span>
              </div>
              <span className="text-blue-300 font-medium">{viewCount} views</span>
            </div>
          </div>
        </div>
      </header>

      <div className="pb-16">
        <AnalysisReport
          analysis={analysisData}
          idea={idea}
          onBack={() => window.location.href = '/'}
          analysisId={undefined}
        />
      </div>

      <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Want to validate your startup idea?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-6 px-4">
              Get instant AI-powered analysis with market insights, viability scores, and actionable recommendations.
            </p>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                Start Free Analysis
              </Button>
            </a>
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-slate-400 text-xs sm:text-sm">
              Powered by <span className="font-semibold text-white">LaunchScope</span> - AI-Powered Startup Validation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
