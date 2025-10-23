import React from 'react';
import { useState, useEffect } from 'react';
import { Rocket, LogOut, BarChart3, Users, Lightbulb, TrendingUp, Clock, CheckCircle, Crown, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { IdeaInputBox } from './ui/IdeaInputBox';
import { AnalysisReport } from './AnalysisReport';
import { StripeTestPanel } from './StripeTestPanel';
import { SubscriptionManager } from './SubscriptionManager';
import { MagicBento } from './ui/MagicBento';
import { RecentActivityCard } from './ui/RecentActivityCard';

interface RefinedIdeaData {
  idea: string;
  problemFit?: string;
  primaryAudience?: string;
  secondaryAudience?: string;
  leanMVP?: string[];
  distribution?: string[];
  monetization?: string[];
}

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
  const [currentAnalysisId, setCurrentAnalysisId] = useState<string | null>(null);
  const [loadingPhrase, setLoadingPhrase] = useState('Getting market insights...');
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [monthlyAnalysisCount, setMonthlyAnalysisCount] = useState(0);
  const [loadingSubscription, setLoadingSubscription] = useState(true);

  const analysisLoadingPhrases = [
    'Getting market insights...',
    'Studying competitors...',
    'Analyzing market demand...'
  ];

  useEffect(() => {
    if (isAnalyzing) {
      let phraseIndex = 0;
      setLoadingPhrase(analysisLoadingPhrases[0]);

      const interval = setInterval(() => {
        phraseIndex = (phraseIndex + 1) % analysisLoadingPhrases.length;
        setLoadingPhrase(analysisLoadingPhrases[phraseIndex]);
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  // Load analysis history and stats on component mount
  useEffect(() => {
    if (user) {
      loadAnalysisHistory();
      checkSubscriptionAndUsage();
    }
  }, [user]);

  const checkSubscriptionAndUsage = async () => {
    try {
      setLoadingSubscription(true);

      // Check subscription status
      const { data: subscriptionData } = await supabase
        .from('stripe_user_subscriptions')
        .select('subscription_status')
        .maybeSingle();

      const isActive = subscriptionData &&
        (subscriptionData.subscription_status === 'active' ||
         subscriptionData.subscription_status === 'trialing');
      setHasActiveSubscription(isActive || false);

      // Count this month's analyses (excluding refinements)
      if (!isActive) {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const { count } = await supabase
          .from('analysis_history')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user!.id)
          .is('parent_analysis_id', null)
          .gte('created_at', firstDayOfMonth.toISOString());

        setMonthlyAnalysisCount(count || 0);
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
    } finally {
      setLoadingSubscription(false);
    }
  };

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

  const saveAnalysisToHistory = async (idea: string, analysis: any, parentAnalysisId?: string) => {
    try {
      // Use weighted overall score if available, otherwise fall back to original viability score
      const viabilityScore = analysis.detailedViabilityBreakdown?.weightedOverallScore 
        ? Math.round(parseFloat(analysis.detailedViabilityBreakdown.weightedOverallScore))
        : parseInt(analysis.viabilityScore?.split(' ')[0]) || 0;
      
      const insertData: any = {
        user_id: user?.id,
        idea,
        analysis_result: analysis,
        viability_score: viabilityScore
      };
      
      if (parentAnalysisId) {
        insertData.parent_analysis_id = parentAnalysisId;
      }
      
      const { data: insertedData, error } = await supabase
        .from('analysis_history')
        .insert(insertData)
        .select('id')
        .single();

      if (error) throw error;
      
      // Update current analysis ID for refinement tracking
      if (insertedData) {
        setCurrentAnalysisId(insertedData.id);
      }
      
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
        // Check if it's a limit error
        if (data.limitReached) {
          setError(data.message);
          // Optionally show upgrade modal
          setShowSubscription(true);
          return;
        }
        throw new Error(data.error);
      }

      setAnalysisResult(data.analysis);
      setAnalyzedIdea(idea.trim());
      setSearchValue(''); // Clear the search after successful analysis

      // Save to history
      const savedAnalysis = await saveAnalysisToHistory(idea.trim(), data.analysis);

      // Refresh usage count
      await checkSubscriptionAndUsage();

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
    setCurrentAnalysisId(historyItem.id);
    setShowReport(true);
    setShowHistory(false);
  };

  const handleRefineIdea = async (refinedData: RefinedIdeaData, parentAnalysisId?: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('analyze-idea', {
        body: { 
          refinedData,
          parentAnalysisId 
        }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to analyze refined idea');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysisResult(data.analysis);
      setAnalyzedIdea(refinedData.idea);
      
      // Save to history
      await saveAnalysisToHistory(refinedData.idea, data.analysis, parentAnalysisId);
      
      // The report will automatically update since we're already showing it
    } catch (err) {
      console.error('Refinement error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during refinement');
    } finally {
      setIsAnalyzing(false);
    }
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
        onRefineIdea={handleRefineIdea}
        analysisId={currentAnalysisId || undefined}
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
            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-12 leading-relaxed">
              Submit your startup concept and get instant insights into market demand, risks, and opportunities.
            </p>

            {/* Beautiful Idea Input Box */}
            <div className="mb-8">
              <IdeaInputBox
                value={searchValue}
                onChange={setSearchValue}
                onSubmit={() => handleSearchSubmit(searchValue)}
                disabled={isAnalyzing || (!hasActiveSubscription && monthlyAnalysisCount >= 1)}
              />

              {/* Usage Indicator for Free Users */}
              {!loadingSubscription && !hasActiveSubscription && (
                <div className="mt-4 flex items-center justify-center">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    monthlyAnalysisCount >= 1
                      ? 'bg-red-500/20 border border-red-400/30 text-red-100'
                      : 'bg-blue-500/20 border border-blue-400/30 text-blue-100'
                  }`}>
                    {monthlyAnalysisCount >= 1 ? (
                      <>
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Free plan limit reached (1/1 this month)
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {monthlyAnalysisCount}/1 analysis used this month
                      </>
                    )}
                    <button
                      onClick={handleShowSubscription}
                      className="ml-3 underline hover:text-white transition-colors"
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Loading State */}
            {isAnalyzing && (
              <div className="mt-8 text-center animate-fade-in">
                <div className="inline-flex items-center bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/30 shadow-xl">
                  <div className="relative mr-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-t-2 border-white"></div>
                    <div className="absolute inset-0 animate-ping rounded-full h-6 w-6 border border-white opacity-30"></div>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">{loadingPhrase}</p>
                    <p className="text-blue-100 text-sm">This may take a few moments</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="mt-8 max-w-2xl mx-auto animate-fade-in">
                <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold">!</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-red-100 font-bold text-lg mb-1">Analysis Failed</h3>
                      <p className="text-red-200 leading-relaxed">{error}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setError(null)}
                    className="mt-2 ml-11 text-red-300 hover:text-red-100 text-sm font-medium underline transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
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

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          <MagicBento
            cards={[
              {
                gradient: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
                glowColor: 'rgba(99, 102, 241, 0.6)',
                customContent: (
                  <RecentActivityCard
                    analysisHistory={analysisHistory}
                    onViewReport={handleViewHistoryReport}
                    onViewAll={() => setShowHistory(true)}
                  />
                )
              }
            ]}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
            spotlightRadius={250}
            particleCount={8}
            className="lg:col-span-1"
          />

          <MagicBento
            cards={[
              {
                icon: <Lightbulb className="w-6 h-6 text-white" />,
                title: "Test New Idea",
                description: "Submit a startup concept for validation and get instant AI-powered insights.",
                gradient: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
                glowColor: 'rgba(99, 102, 241, 0.6)',
                onClick: () => document.querySelector('textarea')?.focus()
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-white" />,
                title: "View Analysis History",
                description: "Review your previous startup validations and track your progress.",
                gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
                glowColor: 'rgba(236, 72, 153, 0.6)',
                onClick: () => setShowHistory(true)
              },
              {
                icon: <Crown className="w-6 h-6 text-white" />,
                title: "Manage Subscription",
                description: "Upgrade or manage your billing and unlock unlimited validations.",
                gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                glowColor: 'rgba(245, 158, 11, 0.6)',
                onClick: handleShowSubscription
              }
            ]}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
            spotlightRadius={250}
            particleCount={8}
            className="lg:col-span-1"
          />
        </div>

        {/* Feature Showcase */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">What You Can Do With LaunchScope</h2>
            <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto">
              Comprehensive startup validation tools to test and refine your ideas
            </p>
          </div>

          <MagicBento
            cards={[
              {
                icon: <Lightbulb className="w-7 h-7 text-white" />,
                title: "Instant Validation",
                description: "Get AI-powered analysis of your startup idea in seconds with viability scoring.",
                gradient: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
                glowColor: 'rgba(99, 102, 241, 0.6)'
              },
              {
                icon: <BarChart3 className="w-7 h-7 text-white" />,
                title: "Market Research",
                description: "Discover market size, competition landscape, and growth opportunities.",
                gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
                glowColor: 'rgba(236, 72, 153, 0.6)'
              },
              {
                icon: <TrendingUp className="w-7 h-7 text-white" />,
                title: "Risk Assessment",
                description: "Identify potential challenges and risks before investing time and money.",
                gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                glowColor: 'rgba(245, 158, 11, 0.6)'
              },
              {
                icon: <CheckCircle className="w-7 h-7 text-white" />,
                title: "Idea Refinement",
                description: "Iterate and improve your concept with detailed suggestions and pivot options.",
                gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                glowColor: 'rgba(16, 185, 129, 0.6)'
              }
            ]}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            clickEffect={true}
            enableMagnetism={true}
            spotlightRadius={250}
            particleCount={8}
            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          />
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