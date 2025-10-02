import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lightbulb, TrendingUp, Clock, AlertCircle, Target, Users, Zap, DollarSign, Share2, CheckCircle2, Loader } from 'lucide-react';
import { Button } from './ui/Button';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface ImprovementPlan {
  id: string;
  analysis_id: string;
  plan_data: {
    summary: string;
    keyAreasForImprovement: string[];
    actionableSteps: Array<{
      category: string;
      description: string;
      impact: 'High' | 'Medium' | 'Low';
      effort: 'Low' | 'Medium' | 'High';
    }>;
    potentialPivots: string[];
    estimatedScoreIncrease: string;
    warning?: string;
  };
  created_at: string;
  updated_at: string;
  // From joined analysis_history
  idea: string;
  viability_score: number;
}

interface ImprovementPlanListProps {
  onBack: () => void;
  onViewPlan: (plan: ImprovementPlan) => void;
}

export function ImprovementPlanList({ onBack, onViewPlan }: ImprovementPlanListProps) {
  const { user } = useAuth();
  const [plans, setPlans] = useState<ImprovementPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadImprovementPlans();
    }
  }, [user]);

  const loadImprovementPlans = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('improvement_plans')
        .select(`
          *,
          analysis_history!inner(
            idea,
            viability_score
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Flatten the joined data
      const formattedPlans = data?.map(plan => ({
        ...plan,
        idea: plan.analysis_history.idea,
        viability_score: plan.analysis_history.viability_score
      })) || [];

      setPlans(formattedPlans);
    } catch (err) {
      console.error('Error loading improvement plans:', err);
      setError(err instanceof Error ? err.message : 'Failed to load improvement plans');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Problem/Solution Fit':
        return <Target className="w-4 h-4" />;
      case 'Audience':
        return <Users className="w-4 h-4" />;
      case 'MVP Features':
        return <Zap className="w-4 h-4" />;
      case 'Monetization':
        return <DollarSign className="w-4 h-4" />;
      case 'Distribution':
        return <Share2 className="w-4 h-4" />;
      case 'Validation':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Low':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Low':
        return 'text-green-300 bg-green-300/10 border-green-300/20';
      case 'Medium':
        return 'text-yellow-300 bg-yellow-300/10 border-yellow-300/20';
      case 'High':
        return 'text-red-300 bg-red-300/10 border-red-300/20';
      default:
        return 'text-gray-300 bg-gray-300/10 border-gray-300/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
        <div className="text-center text-white">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading your improvement plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="flex items-center text-blue-100 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center text-white mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mr-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold">Improvement Plans</h1>
              <p className="text-blue-100 text-lg">Your roadmap to better startup ideas</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-6 h-6 text-red-400 mr-3" />
                <h3 className="text-red-100 font-semibold">Error Loading Plans</h3>
              </div>
              <p className="text-red-200">{error}</p>
              <Button 
                onClick={loadImprovementPlans}
                size="sm" 
                className="mt-4 bg-red-500 hover:bg-red-600"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {plans.length === 0 ? (
          <div className="text-center text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 max-w-2xl mx-auto">
              <TrendingUp className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">No Improvement Plans Yet</h3>
              <p className="text-blue-100 mb-6 text-lg">
                Generate improvement plans from your analysis reports to get actionable steps for making your ideas better.
              </p>
              <Button onClick={onBack} size="lg">
                Back to Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl mb-3 line-clamp-2">
                      {plan.idea}
                    </h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center text-blue-100">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {new Date(plan.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-green-300">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          +{plan.plan_data.estimatedScoreIncrease} potential
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center ml-6">
                    <div className={`text-2xl font-bold ${
                      plan.viability_score >= 8 ? 'text-green-300' :
                      plan.viability_score >= 6 ? 'text-yellow-300' :
                      plan.viability_score >= 4 ? 'text-orange-300' : 'text-red-300'
                    }`}>
                      {plan.viability_score}/10
                    </div>
                    <div className="text-blue-100 text-xs">Current Score</div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-6">
                  <p className="text-blue-100 text-lg leading-relaxed">
                    {plan.plan_data.summary}
                  </p>
                </div>

                {/* Key Areas Preview */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Key Areas for Improvement
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {plan.plan_data.keyAreasForImprovement.slice(0, 3).map((area, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white text-sm"
                      >
                        {area}
                      </span>
                    ))}
                    {plan.plan_data.keyAreasForImprovement.length > 3 && (
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-blue-200 text-sm">
                        +{plan.plan_data.keyAreasForImprovement.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Steps Preview */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Action Steps ({plan.plan_data.actionableSteps.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {plan.plan_data.actionableSteps.slice(0, 3).map((step, index) => (
                      <div
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-lg p-3"
                      >
                        <div className="flex items-center mb-2">
                          {getCategoryIcon(step.category)}
                          <span className="text-white text-sm font-medium ml-2">
                            {step.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getImpactColor(step.impact)}`}>
                            {step.impact} Impact
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getEffortColor(step.effort)}`}>
                            {step.effort} Effort
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warning if exists */}
                {plan.plan_data.warning && (
                  <div className="mb-6 bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="text-amber-100 font-medium mb-1">Important Note</h5>
                        <p className="text-amber-200 text-sm">{plan.plan_data.warning}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={() => onViewPlan(plan)}
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    View Full Plan
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