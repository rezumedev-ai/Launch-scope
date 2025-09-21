import React from 'react';
import { useState, useEffect } from 'react';
import { Rocket, LogOut, BarChart3, Users, Lightbulb, TrendingUp, Clock, CheckCircle, Crown } from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import SearchComponent from './ui/animated-glowing-search-bar';
import { AnalysisReport } from './AnalysisReport';
import { StripeTestPanel } from './StripeTestPanel';
import { SubscriptionManager } from './SubscriptionManager';

interface AnalysisHistory {
  id: string;
  idea: string;
  analysis_result: any;
  viability_score: number;
  created_at: string;
}

interface DashboardStats {
  totalIdeas: number;
  marketInsights: number;
  opportunities: number;
  validatedIdeas: number;
}

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analyzedIdea, setAnalyzedIdea] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistory[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalIdeas: 0,
    marketInsights: 0,
    opportunities: 0,
    validatedIdeas: 0
  });
  const [showHistory, setShowHistory] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showStripeTest, setShowStripeTest] = useState(false);

  // Load analysis history and stats on component mount
  useEffect(() => {
    if (user) {
      loadAnalysisHistory();
    }
  }, [user]);

  const loadAnalysisHistory = async () => {
    try {
      if (!user) {
        console.log('No user found, skipping analysis history load');
        return;
      }

      const { data, error } = await supabase
        .from('analysis_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setAnalysisHistory(data || []);
      
      // Calculate stats
      const totalIdeas = data?.length || 0;
      const validatedIdeas = data?.filter(item => item.viability_score >= 7).length || 0;
      const opportunities = data?.reduce((acc, item) => {
        const opportunities = item.analysis_result?.opportunities?.length || 0;
        return acc + opportunities;
      }, 0) || 0;
      
      setStats({
        totalIdeas,
        marketInsights: totalIdeas, // Each analysis provides market insights
        opportunities,
        validatedIdeas
      });
    } catch (err) {
      console.error('Error loading analysis history:', err);
    }
  };

  const saveAnalysisToHistory = async (idea: string, analysis: any) => {
    try {
      const viabilityScore = parseInt(analysis.viabilityScore?.split(' ')[0]) || 0;
      
      const { error } = await supabase
        .from('analysis_history')
        .insert({
          user_id: user?.id,
          idea,
          analysis_result: analysis,
          viability_score: viabilityScore
        });

      if (error) throw error;
      
      // Reload history to update stats
      await loadAnalysisHistory();
    } catch (err) {
      console.error('Error saving analysis:', err);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSearchSubmit = async (idea: string) => {
    if (!idea.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);
    setShowReport(false);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('analyze-idea', {
        body: { idea: idea.trim() }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to analyze idea');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysisResult(data.analysis);
      setAnalyzedIdea(idea.trim());
      setSearchValue(''); // Clear the search after successful analysis
      
      // Save to history
      await saveAnalysisToHistory(idea.trim(), data.analysis);
      
      setShowReport(true); // Show the report page
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToDashboard = () => {
    setShowReport(false);
    setAnalysisResult(null);
    setAnalyzedIdea('');
    setError(null);
  };

  const handleViewHistoryReport = (historyItem: AnalysisHistory) => {
    setAnalysisResult(historyItem.analysis_result);
    setAnalyzedIdea(historyItem.idea);
    setShowReport(true);
    setShowHistory(false);
  };

  const handleBackToHistory = () => {
    setShowReport(false);
    setShowHistory(true);
  };

  const handleShowSubscription = () => {
    setShowSubscription(true);
    setShowHistory(false);
    setShowStripeTest(false);
  };

  const handleBackFromSubscription = () => {
    setShowSubscription(false);
  };

  // Show analysis report if we have results
  if (showReport && analysisResult) {
    return (
      <AnalysisReport 
        analysis={analysisResult}
        idea={analyzedIdea}
        onBack={showHistory ? handleBackToHistory : handleBackToDashboard}
      />
    );
  }

  // Show subscription management
  if (showSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 sm:px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-3">
              <div className="w-6 h-6 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center">
                <Rocket className="w-3 h-3 sm:w-6 sm:h-6 text-indigo-500" />
              </div>
              <span className="text-sm sm:text-2xl font-bold text-white">LaunchScope</span>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-4">
              <Button variant="secondary" onClick={handleBackFromSubscription} className="p-1 sm:px-3 sm:py-2 text-xs sm:text-sm">
                <span className="sm:hidden">Back</span>
                <span className="hidden sm:inline">Back to Dashboard</span>
              </Button>
              <Button variant="secondary" onClick={handleSignOut} className="p-1 sm:px-3 sm:py-2 text-xs sm:text-sm">
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Subscription Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <SubscriptionManager />
        </main>
      </div>
    );
  }

  // Show history view
  if (showHistory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-indigo-500" />
              </div>
              <span className="text-2xl font-bold text-white">LaunchScope</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="secondary" size="sm" onClick={() => setShowHistory(false)}>
                Back to Dashboard
              </Button>
              <Button variant="secondary" size="sm" onClick={handleShowSubscription}>
                Subscription
              </Button>
              <Button variant="secondary" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* History Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl font-bold mb-4">Analysis History</h1>
            <p className="text-blue-100 text-lg">Review your previous startup idea validations</p>
          </div>

          {analysisHistory.length === 0 ? (
            <div className="text-center text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
                <Lightbulb className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Analysis History Yet</h3>
                <p className="text-blue-100 mb-6">Start by analyzing your first startup idea</p>
                <Button onClick={() => setShowHistory(false)}>
                  Analyze Your First Idea
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {analysisHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                  onClick={() => handleViewHistoryReport(item)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                        {item.idea}
                      </h3>
                      <p className="text-blue-100 text-sm">
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${
                          item.viability_score >= 8 ? 'text-green-300' :
                          item.viability_score >= 6 ? 'text-yellow-300' :
                          item.viability_score >= 4 ? 'text-orange-300' : 'text-red-300'
                        }`}>
                          {item.viability_score}/10
                        </div>
                        <div className="text-blue-100 text-xs">Viability</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-blue-100 text-sm line-clamp-2">
                      {item.analysis_result?.summary}
                    </p>
                    <Button size="sm" className="ml-4">
                      View Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center">
              <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
            </div>
            <span className="text-sm sm:text-lg font-bold text-white">LaunchScope</span>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-3">
            <Button variant="secondary" onClick={handleSignOut} className="p-1 sm:px-3 sm:py-2 text-xs sm:text-sm">
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
            <Button variant="secondary" onClick={handleShowSubscription} className="p-1 sm:px-3 sm:py-2 text-xs sm:text-sm">
              <Crown className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Subscription</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section with Search Bar */}
        <div className="text-center text-white mb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Validate Your 
              <span className="text-pink-300"> Next Big Idea?</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Submit your startup concept and get instant insights into market demand, risks, and opportunities.
            </p>
            
            {/* Animated Search Bar */}
            <div className="mb-8">
              <SearchComponent 
                value={searchValue}
                onChange={setSearchValue}
                onSubmit={handleSearchSubmit}
                placeholder="Describe your startup idea..."
                disabled={isAnalyzing}
              />
            </div>
            
            {/* Loading State */}
            {isAnalyzing && (
              <div className="mb-8 text-center">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  <span className="text-white">Analyzing your idea with AI...</span>
                </div>
              </div>
            )}
            
            {/* Error State */}
            {error && (
              <div className="mb-8 max-w-2xl mx-auto">
                <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">!</span>
                    </div>
                    <h3 className="text-red-100 font-semibold">Analysis Failed</h3>
                  </div>
                  <p className="text-red-200">{error}</p>
                  <button 
                    onClick={() => setError(null)}
                    className="mt-3 text-red-300 hover:text-red-100 text-sm underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-10 py-4"
                onClick={() => handleSearchSubmit(searchValue)}
                disabled={isAnalyzing || !searchValue.trim()}
              >
                Analyze My Idea
              </Button>
              <Button variant="secondary" size="lg" className="text-lg px-10 py-4">
                View Examples
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.totalIdeas}</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Ideas Tested</h3>
            <p className="text-blue-100 text-sm">Total validations</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.marketInsights}</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Market Insights</h3>
            <p className="text-blue-100 text-sm">Deep analysis reports</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.opportunities}</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Opportunities</h3>
            <p className="text-blue-100 text-sm">Market gaps found</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">{stats.validatedIdeas}</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Validated Ideas</h3>
            <p className="text-blue-100 text-sm">Ready to build</p>
          </div>
        </div>

        {/* Recent Activity & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Recent Activity */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {analysisHistory.length === 0 ? (
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm">No ideas tested yet</p>
                    <p className="text-gray-400 text-xs">Start by submitting your first startup idea above</p>
                  </div>
                </div>
              ) : (
                <>
                  {analysisHistory.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleViewHistoryReport(item)}>
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 text-sm font-medium line-clamp-1">{item.idea}</p>
                        <p className="text-gray-500 text-xs">
                          {new Date(item.created_at).toLocaleDateString()} • Score: {item.viability_score}/10
                        </p>
                      </div>
                    </div>
                  ))}
                  {analysisHistory.length > 3 && (
                    <button 
                      onClick={() => setShowHistory(true)}
                      className="w-full text-center p-3 text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
                    >
                      View All {analysisHistory.length} Analyses →
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            
            <div className="space-y-4">
              <button 
                onClick={() => document.querySelector('input')?.focus()}
                className="w-full flex items-center p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl hover:from-indigo-100 hover:to-blue-100 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Test New Idea</h3>
                  <p className="text-gray-600 text-sm">Submit a startup concept for validation</p>
                </div>
              </button>

              <button 
                onClick={() => setShowHistory(true)}
                className="w-full flex items-center p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl hover:from-pink-100 hover:to-rose-100 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">View Analysis History</h3>
                  <p className="text-gray-600 text-sm">Review your previous startup validations</p>
                </div>
              </button>

              <button 
                onClick={handleShowSubscription}
                className="w-full flex items-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">Manage Subscription</h3>
                  <p className="text-gray-600 text-sm">Upgrade or manage your billing</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Showcase */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What You Can Do With LaunchScope</h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Powerful tools to validate, analyze, and refine your startup ideas before you build
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Idea Validation</h3>
              <p className="text-gray-600">
                Test your concepts against real market data and get structured feedback on viability.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Market Analysis</h3>
              <p className="text-gray-600">
                Deep dive into market size, competition, and identify untapped opportunities.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Insights</h3>
              <p className="text-gray-600">
                Connect with other makers and get honest feedback from your target audience.
              </p>
            </div>
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
            Use the search bar above to submit your first startup idea and get instant validation insights.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-2 text-sm font-bold">1</span>
              <span className="text-sm sm:text-base">Describe your idea</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-2 text-sm font-bold">2</span>
              <span className="text-sm sm:text-base">Get instant analysis</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-2 text-sm font-bold">3</span>
              <span className="text-sm sm:text-base">Build with confidence</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}