import React, { useState } from 'react';
import { ArrowLeft, Target, Users, Zap, DollarSign, Share2, CheckCircle2, Lightbulb, TrendingUp, AlertCircle, Clock, Edit3, Loader, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { supabase } from '../lib/supabase';

interface RefinedIdeaData {
  idea: string;
  problemFit?: string;
  primaryAudience?: string;
  secondaryAudience?: string;
  leanMVP?: string[];
  distribution?: string[];
  monetization?: string[];
}

interface AnalysisReportProps {
  analysis: any;
  idea: string;
  onBack: () => void;
  onRefineIdea: (refinedData: RefinedIdeaData, parentAnalysisId?: string) => void;
  analysisId?: string;
}

export function AnalysisReport({ analysis, idea, onBack, onRefineIdea, analysisId }: AnalysisReportProps) {
  const [showRefinement, setShowRefinement] = useState(false);
  const [refinedIdea, setRefinedIdea] = useState(idea);
  const [refinedProblemFit, setRefinedProblemFit] = useState(analysis.problemFit || '');
  const [refinedPrimaryAudience, setRefinedPrimaryAudience] = useState(analysis.audience?.primary || '');
  const [refinedSecondaryAudience, setRefinedSecondaryAudience] = useState(analysis.audience?.secondary || '');
  const [refinedMVP, setRefinedMVP] = useState(analysis.leanMVP?.join(', ') || '');
  const [refinedDistribution, setRefinedDistribution] = useState(analysis.distribution?.join(', ') || '');
  const [refinedMonetization, setRefinedMonetization] = useState(analysis.monetization?.join(', ') || '');
  const [isRefining, setIsRefining] = useState(false);
  const [improvementPlan, setImprovementPlan] = useState<any>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);

  const handleRefinement = async () => {
    if (!refinedIdea.trim()) return;
    
    setIsRefining(true);
    
    const refinedData: RefinedIdeaData = {
      idea: refinedIdea.trim(),
      problemFit: refinedProblemFit.trim() || undefined,
      primaryAudience: refinedPrimaryAudience.trim() || undefined,
      secondaryAudience: refinedSecondaryAudience.trim() || undefined,
      leanMVP: refinedMVP.trim() ? refinedMVP.split(',').map(item => item.trim()) : undefined,
      distribution: refinedDistribution.trim() ? refinedDistribution.split(',').map(item => item.trim()) : undefined,
      monetization: refinedMonetization.trim() ? refinedMonetization.split(',').map(item => item.trim()) : undefined,
    };
    
    await onRefineIdea(refinedData, analysisId);
    setIsRefining(false);
    setShowRefinement(false);
  };

  const generateImprovementPlan = async () => {
    if (!analysisId) {
      setPlanError('Analysis ID is required to generate improvement plan');
      return;
    }

    setIsGeneratingPlan(true);
    setPlanError(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-improvement-plan', {
        body: {
          idea,
          analysis,
          analysisId
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate improvement plan');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setImprovementPlan(data.plan);
    } catch (err) {
      console.error('Error generating improvement plan:', err);
      setPlanError(err instanceof Error ? err.message : 'Failed to generate improvement plan');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-300';
    if (score >= 6) return 'text-yellow-300';
    if (score >= 4) return 'text-orange-300';
    return 'text-red-300';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 8) return 'from-green-500/20 to-emerald-500/20 border-green-400/30';
    if (score >= 6) return 'from-yellow-500/20 to-amber-500/20 border-yellow-400/30';
    if (score >= 4) return 'from-orange-500/20 to-red-500/20 border-orange-400/30';
    return 'from-red-500/20 to-pink-500/20 border-red-400/30';
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

  // Extract numeric score for display
  const numericScore = analysis.detailedViabilityBreakdown?.weightedOverallScore 
    ? parseFloat(analysis.detailedViabilityBreakdown.weightedOverallScore)
    : parseInt(analysis.viabilityScore?.split(' ')[0]) || 0;

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
            Back to Dashboard
          </button>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowRefinement(!showRefinement)}
              variant="secondary"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Refine Idea
            </Button>
          </div>
        </div>
      </header>

      {/* Refinement Panel */}
      {showRefinement && (
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/20 px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Refine Your Idea</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Refined Idea"
                  value={refinedIdea}
                  onChange={(e) => setRefinedIdea(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                <Input
                  label="Problem/Solution Fit"
                  value={refinedProblemFit}
                  onChange={(e) => setRefinedProblemFit(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                <Input
                  label="Primary Audience"
                  value={refinedPrimaryAudience}
                  onChange={(e) => setRefinedPrimaryAudience(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                <Input
                  label="Secondary Audience"
                  value={refinedSecondaryAudience}
                  onChange={(e) => setRefinedSecondaryAudience(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
              </div>
              <div className="space-y-4">
                <Input
                  label="MVP Features (comma-separated)"
                  value={refinedMVP}
                  onChange={(e) => setRefinedMVP(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                <Input
                  label="Distribution Channels (comma-separated)"
                  value={refinedDistribution}
                  onChange={(e) => setRefinedDistribution(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                <Input
                  label="Monetization Models (comma-separated)"
                  value={refinedMonetization}
                  onChange={(e) => setRefinedMonetization(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={handleRefinement}
                    disabled={isRefining || !refinedIdea.trim()}
                    className="flex-1"
                  >
                    {isRefining ? 'Analyzing...' : 'Analyze Refined Idea'}
                  </Button>
                  <Button
                    onClick={() => setShowRefinement(false)}
                    variant="secondary"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center text-white mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Startup Idea Analysis</h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
              <h2 className="text-xl font-semibold mb-3">Your Idea</h2>
              <p className="text-blue-100 text-lg leading-relaxed">{idea}</p>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className={`bg-gradient-to-r ${getScoreBackground(numericScore)} backdrop-blur-sm border rounded-2xl p-8 mb-8 text-center`}>
          <div className="flex items-center justify-center mb-4">
            <div className={`text-6xl font-bold ${getScoreColor(numericScore)} mr-4`}>
              {numericScore.toFixed(1)}
            </div>
            <div className="text-left">
              <div className="text-white text-2xl font-semibold">Viability Score</div>
              <div className="text-blue-100">Out of 10.0</div>
            </div>
          </div>
          <p className="text-white text-lg font-medium">{analysis.verdict}</p>
        </div>

        {/* Detailed Breakdown */}
        {analysis.detailedViabilityBreakdown && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">Detailed Viability Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(analysis.detailedViabilityBreakdown).map(([key, value]) => {
                if (key === 'weightedOverallScore' || key === 'overallJustification') return null;
                const scoreData = value as { score: number; justification: string };
                return (
                  <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-semibold capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <span className={`text-2xl font-bold ${getScoreColor(scoreData.score)}`}>
                        {scoreData.score}/10
                      </span>
                    </div>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      {scoreData.justification}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 mr-3" />
            Executive Summary
          </h3>
          <p className="text-blue-100 text-lg leading-relaxed">{analysis.summary}</p>
        </div>

        {/* Problem Fit */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Target className="w-6 h-6 mr-3" />
            Problem-Solution Fit
          </h3>
          <p className="text-blue-100 text-lg leading-relaxed">{analysis.problemFit}</p>
        </div>

        {/* Target Audience */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3" />
            Target Audience
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-3">Primary Audience</h4>
              <p className="text-blue-100 leading-relaxed">{analysis.audience?.primary}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-white font-semibold mb-3">Secondary Audience</h4>
              <p className="text-blue-100 leading-relaxed">{analysis.audience?.secondary}</p>
            </div>
          </div>
        </div>

        {/* Strengths & Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-400/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <CheckCircle2 className="w-6 h-6 mr-3 text-green-300" />
              Strengths
            </h3>
            <div className="space-y-4">
              {analysis.strengths?.map((strength: string, index: number) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-green-100 leading-relaxed">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm border border-red-400/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <AlertCircle className="w-6 h-6 mr-3 text-red-300" />
              Challenges
            </h3>
            <div className="space-y-4">
              {analysis.challenges?.map((challenge: string, index: number) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-red-100 leading-relaxed">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MVP Features */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-3" />
            Lean MVP Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.leanMVP?.map((feature: string, index: number) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-blue-100 leading-relaxed">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Build Cost & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <DollarSign className="w-6 h-6 mr-3" />
              Build Cost
            </h3>
            <div className="mb-4">
              <span className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${
                analysis.buildCost?.estimate === 'Low' ? 'bg-green-400/20 text-green-300' :
                analysis.buildCost?.estimate === 'Medium' ? 'bg-yellow-400/20 text-yellow-300' :
                'bg-red-400/20 text-red-300'
              }`}>
                {analysis.buildCost?.estimate} Cost
              </span>
            </div>
            <p className="text-blue-100 leading-relaxed">{analysis.buildCost?.notes}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Clock className="w-6 h-6 mr-3" />
              Time to MVP
            </h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-blue-300">{analysis.timeToMVP}</span>
            </div>
            <p className="text-blue-100">Estimated development time for a solo developer</p>
          </div>
        </div>

        {/* Distribution & Monetization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Share2 className="w-6 h-6 mr-3" />
              Distribution Channels
            </h3>
            <div className="space-y-3">
              {analysis.distribution?.map((channel: string, index: number) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-blue-100 leading-relaxed">{channel}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-3" />
              Monetization Models
            </h3>
            <div className="space-y-3">
              {analysis.monetization?.map((model: string, index: number) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-blue-100 leading-relaxed">{model}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Signals */}
        {analysis.marketSignals && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3" />
              Market Signals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(analysis.marketSignals).map(([key, value]) => (
                <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-blue-100 leading-relaxed">{value as string}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <CheckCircle2 className="w-6 h-6 mr-3" />
            Next Steps
          </h3>
          <div className="space-y-4">
            {analysis.nextSteps?.map((step: string, index: number) => (
              <div key={index} className="flex items-start">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-blue-100 text-lg leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Plan Section */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                <Sparkles className="w-6 h-6 mr-3" />
                Get Your Improvement Plan
              </h3>
              <p className="text-purple-100">
                Generate a personalized roadmap to boost your idea's viability score
              </p>
            </div>
            {!improvementPlan && (
              <Button
                onClick={generateImprovementPlan}
                disabled={isGeneratingPlan || !analysisId}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isGeneratingPlan ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Plan
                  </>
                )}
              </Button>
            )}
          </div>

          {planError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                <p className="text-red-200">{planError}</p>
              </div>
            </div>
          )}

          {improvementPlan && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-white font-semibold text-lg mb-4">Your Improvement Plan is Ready!</h4>
              <p className="text-purple-100 mb-4">{improvementPlan.summary}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-purple-200 text-sm">
                    {improvementPlan.actionableSteps?.length || 0} actionable steps
                  </span>
                  <span className="text-green-300 text-sm font-medium">
                    Potential: +{improvementPlan.estimatedScoreIncrease}
                  </span>
                </div>
                <Button
                  size="sm"
                  className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  View Full Plan
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onBack}
            size="lg"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-lg px-12 py-4"
          >
            Back to Dashboard
          </Button>
          <Button
            onClick={() => setShowRefinement(true)}
            variant="secondary"
            size="lg"
            className="text-lg px-12 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Edit3 className="w-5 h-5 mr-2" />
            Refine This Idea
          </Button>
        </div>
      </main>
    </div>
  );
}