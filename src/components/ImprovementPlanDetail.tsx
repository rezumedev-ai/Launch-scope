import React from 'react';
import { ArrowLeft, Target, Users, Zap, DollarSign, Share2, CheckCircle2, Lightbulb, TrendingUp, AlertCircle, Clock, RotateCcw } from 'lucide-react';
import { Button } from './ui/Button';

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
  idea: string;
  viability_score: number;
}

interface ImprovementPlanDetailProps {
  plan: ImprovementPlan;
  onBack: () => void;
}

export function ImprovementPlanDetail({ plan, onBack }: ImprovementPlanDetailProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Problem/Solution Fit':
        return <Target className="w-5 h-5" />;
      case 'Audience':
        return <Users className="w-5 h-5" />;
      case 'MVP Features':
        return <Zap className="w-5 h-5" />;
      case 'Monetization':
        return <DollarSign className="w-5 h-5" />;
      case 'Distribution':
        return <Share2 className="w-5 h-5" />;
      case 'Validation':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'Pivot Consideration':
        return <RotateCcw className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Problem/Solution Fit':
        return 'from-red-400 to-pink-400';
      case 'Audience':
        return 'from-blue-400 to-indigo-400';
      case 'MVP Features':
        return 'from-yellow-400 to-orange-400';
      case 'Monetization':
        return 'from-green-400 to-emerald-400';
      case 'Distribution':
        return 'from-purple-400 to-violet-400';
      case 'Validation':
        return 'from-teal-400 to-cyan-400';
      case 'Pivot Consideration':
        return 'from-orange-400 to-red-400';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Low':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Low':
        return 'text-green-300 bg-green-300/10 border-green-300/30';
      case 'Medium':
        return 'text-yellow-300 bg-yellow-300/10 border-yellow-300/30';
      case 'High':
        return 'text-red-300 bg-red-300/10 border-red-300/30';
      default:
        return 'text-gray-300 bg-gray-300/10 border-gray-300/30';
    }
  };

  // Group action steps by category
  const stepsByCategory = plan.plan_data.actionableSteps.reduce((acc, step) => {
    if (!acc[step.category]) {
      acc[step.category] = [];
    }
    acc[step.category].push(step);
    return acc;
  }, {} as Record<string, typeof plan.plan_data.actionableSteps>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center text-blue-100 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Plans
          </button>
          <div className="flex items-center text-blue-100">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">
              Created {new Date(plan.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center text-white mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mr-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold mb-2">Improvement Plan</h1>
                <div className="flex items-center space-x-4">
                  <span className="text-blue-100">Current Score: {plan.viability_score}/10</span>
                  <span className="text-green-300 font-medium">
                    Potential: +{plan.plan_data.estimatedScoreIncrease}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
              <h2 className="text-xl font-semibold mb-3">Your Startup Idea</h2>
              <p className="text-blue-100 text-lg leading-relaxed">{plan.idea}</p>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 mr-3" />
            Executive Summary
          </h3>
          <p className="text-blue-100 text-lg leading-relaxed">{plan.plan_data.summary}</p>
        </div>

        {/* Warning Section */}
        {plan.plan_data.warning && (
          <div className="bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6 mb-8">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-amber-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-amber-100 font-semibold text-lg mb-2">Important Considerations</h4>
                <p className="text-amber-200 leading-relaxed">{plan.plan_data.warning}</p>
              </div>
            </div>
          </div>
        )}

        {/* Key Areas for Improvement */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3" />
            Key Areas for Improvement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plan.plan_data.keyAreasForImprovement.map((area, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mr-3"></div>
                  <span className="text-white font-medium">{area}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Steps by Category */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <CheckCircle2 className="w-6 h-6 mr-3" />
            Actionable Steps ({plan.plan_data.actionableSteps.length})
          </h3>
          
          <div className="space-y-8">
            {Object.entries(stepsByCategory).map(([category, steps]) => (
              <div key={category} className="border-l-4 border-white/20 pl-6">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(category)} rounded-xl flex items-center justify-center mr-4`}>
                    {getCategoryIcon(category)}
                  </div>
                  <h4 className="text-xl font-semibold text-white">{category}</h4>
                </div>
                
                <div className="space-y-4">
                  {steps.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                    >
                      <p className="text-blue-100 text-lg leading-relaxed mb-4">{step.description}</p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getImpactColor(step.impact)}`}>
                          {step.impact} Impact
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEffortColor(step.effort)}`}>
                          {step.effort} Effort
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Potential Pivots */}
        {plan.plan_data.potentialPivots.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <RotateCcw className="w-6 h-6 mr-3" />
              Potential Pivots
            </h3>
            <div className="space-y-4">
              {plan.plan_data.potentialPivots.map((pivot, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-blue-100 text-lg leading-relaxed">{pivot}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Score Improvement Estimate */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-400/20 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-green-300 mr-3" />
            <h3 className="text-2xl font-bold text-white">Estimated Score Increase</h3>
          </div>
          <p className="text-green-200 text-xl font-semibold mb-2">
            +{plan.plan_data.estimatedScoreIncrease}
          </p>
          <p className="text-green-100">
            With proper execution of these recommendations
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-12">
          <Button
            onClick={onBack}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-12 py-4"
          >
            Back to All Plans
          </Button>
        </div>
      </main>
    </div>
  );
}