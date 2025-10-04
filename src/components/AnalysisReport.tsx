import React from 'react';
import { ArrowLeft, AlertTriangle, Target, Users, DollarSign, Clock, CheckCircle, Star, Lightbulb, Zap, TrendingUp, Code, Rocket, Search, TrendingDown, BarChart3, Shield, Calendar, Eye, Activity, Globe, Layers, CreditCard as Edit3, RefreshCw, X, Save, Sparkles, ArrowUp, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { ImprovementPlan } from '../types/improvement';

interface AnalysisData {
  summary: string;
  problemFit: string;
  audience: {
    primary: string;
    secondary: string;
  };
  strengths: string[];
  challenges: string[];
  leanMVP: string[];
  buildCost: {
    estimate: string;
    notes: string;
  };
  timeToMVP: string;
  marketSignals?: {
    searchVolume: string;
    fundingActivity: string;
    competitionDensity: string;
    adoptionStage: string;
  };
  distribution: string[];
  monetization: string[];
  validationSteps?: string[];
  nextSteps: string[];
  verdict: string;
  viabilityScore: string;
  detailedViabilityBreakdown?: {
    marketDemand: {
      score: number;
      justification: string;
    };
    technicalFeasibility: {
      score: number;
      justification: string;
    };
    differentiation: {
      score: number;
      justification: string;
    };
    monetizationPotential: {
      score: number;
      justification: string;
    };
    timing: {
      score: number;
      justification: string;
    };
    weightedOverallScore: string;
    overallJustification: string;
  };
}

interface AnalysisReportProps {
  analysis: AnalysisData;
  idea: string;
  onBack: () => void;
  onRefineIdea?: (refinedData: RefinedIdeaData, parentAnalysisId?: string) => void;
  analysisId?: string;
}

interface RefinedIdeaData {
  idea: string;
  problemFit?: string;
  primaryAudience?: string;
  secondaryAudience?: string;
  leanMVP?: string[];
  distribution?: string[];
  monetization?: string[];
}

export function AnalysisReport({ analysis, idea, onBack, onRefineIdea, analysisId }: AnalysisReportProps) {
  const [isRefining, setIsRefining] = useState(false);
  const [refinedIdea, setRefinedIdea] = useState(idea);
  const [refinedProblemFit, setRefinedProblemFit] = useState(analysis.problemFit);
  const [refinedPrimaryAudience, setRefinedPrimaryAudience] = useState(analysis.audience.primary);
  const [refinedSecondaryAudience, setRefinedSecondaryAudience] = useState(analysis.audience.secondary || '');
  const [refinedLeanMVP, setRefinedLeanMVP] = useState(analysis.leanMVP.join('\n'));
  const [refinedDistribution, setRefinedDistribution] = useState(analysis.distribution.join('\n'));
  const [refinedMonetization, setRefinedMonetization] = useState(analysis.monetization.join('\n'));
  const [isSubmittingRefinement, setIsSubmittingRefinement] = useState(false);
  const [showImprovementPlan, setShowImprovementPlan] = useState(false);
  const [improvementPlanData, setImprovementPlanData] = useState<ImprovementPlan | null>(null);
  const [isGeneratingImprovementPlan, setIsGeneratingImprovementPlan] = useState(false);
  const [improvementPlanError, setImprovementPlanError] = useState<string | null>(null);

  // Helper function to get the numeric viability score
  const getViabilityScoreValue = (analysis: AnalysisData): number => {
    // Prioritize weighted overall score from detailed breakdown
    if (analysis.detailedViabilityBreakdown?.weightedOverallScore) {
      return parseFloat(analysis.detailedViabilityBreakdown.weightedOverallScore);
    }
    // Fallback to parsing the original viabilityScore
    return parseInt(analysis.viabilityScore.split(' ')[0]) || 5;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-400';
    if (score >= 6) return 'text-yellow-400';
    if (score >= 4) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBgGradient = (score: number) => {
    if (score >= 8) return 'from-emerald-500/20 to-green-500/20 border-emerald-400/30';
    if (score >= 6) return 'from-yellow-500/20 to-amber-500/20 border-yellow-400/30';
    if (score >= 4) return 'from-orange-500/20 to-red-500/20 border-orange-400/30';
    return 'from-red-500/20 to-pink-500/20 border-red-400/30';
  };

  const getVerdictStyle = (verdict: string) => {
    const lowerVerdict = verdict.toLowerCase();
    if (lowerVerdict.includes('strong') || lowerVerdict.includes('viable') || lowerVerdict.includes('promising')) {
      return 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100';
    }
    if (lowerVerdict.includes('weak') || lowerVerdict.includes('non-viable') || lowerVerdict.includes('poor')) {
      return 'border-red-400/40 bg-red-500/10 text-red-100';
    }
    return 'border-yellow-400/40 bg-yellow-500/10 text-yellow-100';
  };

  const handleStartRefinement = () => {
    setIsRefining(true);
  };

  const handleCancelRefinement = () => {
    setIsRefining(false);
    // Reset all fields to original values
    setRefinedIdea(idea);
    setRefinedProblemFit(analysis.problemFit);
    setRefinedPrimaryAudience(analysis.audience.primary);
    setRefinedSecondaryAudience(analysis.audience.secondary || '');
    setRefinedLeanMVP(analysis.leanMVP.join('\n'));
    setRefinedDistribution(analysis.distribution.join('\n'));
    setRefinedMonetization(analysis.monetization.join('\n'));
  };

  const handleSubmitRefinement = async () => {
    if (!onRefineIdea) return;
    
    setIsSubmittingRefinement(true);
    
    const refinedData: RefinedIdeaData = {
      idea: refinedIdea,
      problemFit: refinedProblemFit,
      primaryAudience: refinedPrimaryAudience,
      secondaryAudience: refinedSecondaryAudience,
      leanMVP: refinedLeanMVP.split('\n').filter(item => item.trim()),
      distribution: refinedDistribution.split('\n').filter(item => item.trim()),
      monetization: refinedMonetization.split('\n').filter(item => item.trim()),
    };
    
    try {
      await onRefineIdea(refinedData, analysisId);
      setIsRefining(false);
    } catch (error) {
      console.error('Error submitting refinement:', error);
    } finally {
      setIsSubmittingRefinement(false);
    }
  };

  const handleGenerateImprovementPlan = async () => {
    setIsGeneratingImprovementPlan(true);
    setImprovementPlanError(null);
    try {
      const { data, error: functionError } = await supabase.functions.invoke('generate-improvement-plan', {
        body: { idea: idea, analysis: analysis }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to generate improvement plan');
      }
      if (data.error) {
        throw new Error(data.error);
      }

      setImprovementPlanData(data.plan);
      setShowImprovementPlan(true);
    } catch (err) {
      console.error('Error generating improvement plan:', err);
      setImprovementPlanError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsGeneratingImprovementPlan(false);
    }
  };

  const handleBackToAnalysis = () => {
    setShowImprovementPlan(false);
    setImprovementPlanError(null);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-emerald-400 bg-emerald-500/20 border-emerald-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
      case 'Low': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-400/30';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Low': return 'text-green-400 bg-green-500/20 border-green-400/30';
      case 'Medium': return 'text-orange-400 bg-orange-500/20 border-orange-400/30';
      case 'High': return 'text-red-400 bg-red-500/20 border-red-400/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-400/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Problem/Solution Fit': return Target;
      case 'Audience': return Users;
      case 'MVP Features': return Code;
      case 'Monetization': return DollarSign;
      case 'Distribution': return Globe;
      case 'Validation': return CheckCircle;
      case 'Pivot Consideration': return RefreshCw;
      default: return Lightbulb;
    }
  };

  const getBuildCostStyle = (estimate: string) => {
    switch (estimate.toLowerCase()) {
      case 'low': return 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-200 border-yellow-400/30';
      case 'high': return 'bg-red-500/20 text-red-200 border-red-400/30';
      default: return 'bg-slate-500/20 text-slate-200 border-slate-400/30';
    }
  };

  const overallScore = getViabilityScoreValue(analysis);

  // Show improvement plan if requested
  if (showImprovementPlan && improvementPlanData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        {/* Header */}
        <header className="relative bg-black/30 backdrop-blur-xl border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <Button 
                variant="secondary" 
                onClick={handleBackToAnalysis}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Analysis
              </Button>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">Improvement Plan</h1>
                </div>
                <p className="text-slate-300 text-sm">AI-powered recommendations to boost your idea's viability</p>
              </div>
              
              <div className="w-32"></div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Summary Section */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 rounded-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-start space-x-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <ArrowUp className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">Improvement Overview</h2>
                  <p className="text-xl text-slate-200 leading-relaxed">{improvementPlanData.summary}</p>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Potential Score Increase</h3>
                    <p className="text-slate-300">{improvementPlanData.estimatedScoreIncrease}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-400">+{improvementPlanData.estimatedScoreIncrease.split(' ')[0]}</div>
                    <div className="text-slate-400 text-sm">points potential</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Areas for Improvement */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Key Areas for Improvement</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {improvementPlanData.keyAreasForImprovement.map((area, index) => (
                <div key={index} className="bg-amber-500/5 rounded-xl p-4 border border-amber-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-slate-200 font-medium">{area}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Actionable Steps */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Actionable Steps</h3>
            </div>
            <div className="space-y-6">
              {improvementPlanData.actionableSteps.map((step, index) => {
                const CategoryIcon = getCategoryIcon(step.category);
                return (
                  <div key={index} className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <CategoryIcon className="w-5 h-5 text-indigo-400" />
                          <span className="text-indigo-300 font-medium text-sm">{step.category}</span>
                        </div>
                        <p className="text-slate-200 text-lg leading-relaxed mb-4">{step.description}</p>
                        <div className="flex items-center space-x-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getImpactColor(step.impact)}`}>
                            Impact: {step.impact}
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getEffortColor(step.effort)}`}>
                            Effort: {step.effort}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Potential Pivots */}
          {improvementPlanData.potentialPivots.length > 0 && (
            <section className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-400/30 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center mr-4">
                  <RefreshCw className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Potential Pivots</h3>
              </div>
              <div className="space-y-4">
                {improvementPlanData.potentialPivots.map((pivot, index) => (
                  <div key={index} className="bg-orange-500/5 rounded-xl p-6 border border-orange-500/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                        <ChevronRight className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-slate-200 leading-relaxed">{pivot}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Warning Section */}
          {improvementPlanData.warning && (
            <section className="bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-red-100 font-semibold mb-2">Important Considerations</h4>
                  <p className="text-red-200 leading-relaxed">{improvementPlanData.warning}</p>
                </div>
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-slate-800/50 to-indigo-800/30 border border-indigo-500/20 rounded-3xl p-8 text-white shadow-2xl text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Ready to Implement?</h3>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Start with the highest impact, lowest effort steps first. Focus on validation before building.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleBackToAnalysis}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg px-12 py-4 shadow-2xl hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Analysis
              </Button>
              <Button 
                size="lg" 
                onClick={onBack}
                variant="secondary"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-12 py-4"
              >
                <Lightbulb className="w-5 h-5 mr-2" />
                Analyze New Idea
              </Button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Premium Header */}
      <header className="relative bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="secondary" 
              onClick={onBack}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              disabled={isRefining}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            
            {/* Refinement Controls */}
            <div className="flex items-center space-x-3">
              {!isRefining ? (
                <>
                  {/* Show Improvement Plan button for low scores */}
                  {overallScore < 7 && (
                    <Button
                      onClick={handleGenerateImprovementPlan}
                      disabled={isGeneratingImprovementPlan}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                    >
                      {isGeneratingImprovementPlan ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Get Improvement Plan
                        </>
                      )}
                    </Button>
                  )}
                  {onRefineIdea && (
                    <Button
                      onClick={handleStartRefinement}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Refine Idea
                    </Button>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleSubmitRefinement}
                    disabled={isSubmittingRefinement}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  >
                    {isSubmittingRefinement ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Re-analyzing...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Re-analyze
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleCancelRefinement}
                    variant="secondary"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    disabled={isSubmittingRefinement}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">LaunchScope Analysis</h1>
              </div>
              <p className="text-slate-300 text-sm">Professional startup validation report</p>
            </div>
            
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Section - Idea & Executive Summary */}
        <section className="relative">
          {/* Refinement Mode Indicator */}
          {isRefining && (
            <div className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-4">
              <div className="flex items-center justify-center space-x-3 text-white">
                <Edit3 className="w-5 h-5 text-purple-300" />
                <span className="font-medium">Refinement Mode Active</span>
                <span className="text-purple-200 text-sm">Make changes below and click "Re-analyze" to see updated results</span>
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Floating decoration */}
            <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-xl"></div>
            
            <div className="relative">
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">Your Startup Idea</h2>
                  {isRefining ? (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-300">Startup Idea</label>
                      <textarea
                        value={refinedIdea}
                        onChange={(e) => setRefinedIdea(e.target.value)}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        rows={3}
                        placeholder="Describe your refined startup idea..."
                      />
                    </div>
                  ) : (
                    <p className="text-xl text-slate-200 leading-relaxed font-medium">{idea}</p>
                  )}
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-indigo-400" />
                  {isRefining ? 'Problem-Solution Fit' : 'Executive Summary'}
                </h3>
                {isRefining ? (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">Problem-Solution Fit</label>
                    <textarea
                      value={refinedProblemFit}
                      onChange={(e) => setRefinedProblemFit(e.target.value)}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      rows={3}
                      placeholder="Describe the problem your idea solves..."
                    />
                  </div>
                ) : (
                  <p className="text-slate-300 text-lg leading-relaxed">{analysis.summary}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Improvement Plan Error */}
        {improvementPlanError && (
          <section className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-red-100 font-semibold mb-2">Failed to Generate Improvement Plan</h4>
                <p className="text-red-200 mb-4">{improvementPlanError}</p>
                <Button 
                  onClick={() => setImprovementPlanError(null)}
                  size="sm"
                  className="bg-red-500/20 border border-red-400/30 text-red-200 hover:bg-red-500/30"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Key Metrics Dashboard */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Verdict */}
          <div className="lg:col-span-2">
            <div className={`bg-black/20 backdrop-blur-sm border rounded-2xl p-6 shadow-xl ${getVerdictStyle(analysis.verdict)}`}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Final Verdict</h3>
              </div>
              <p className="text-xl font-medium leading-relaxed">{analysis.verdict}</p>
            </div>
          </div>

          {/* Viability Score */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center shadow-xl">
            <div className={`w-20 h-20 bg-gradient-to-r ${getScoreBgGradient(overallScore)} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-2xl border`}>
              <Star className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Overall Viability</h3>
            <p className={`text-5xl font-bold ${getScoreColor(overallScore)} mb-2`}>
              {analysis.detailedViabilityBreakdown?.weightedOverallScore || Math.round(overallScore)}/10
            </p>
            <p className="text-slate-400 text-sm leading-tight">
              {analysis.detailedViabilityBreakdown?.overallJustification?.substring(0, 60) + '...' || 
               analysis.viabilityScore.split(' ').slice(1).join(' ')}
            </p>
          </div>
        </section>

        {/* Market Intelligence Dashboard */}
        {analysis.marketSignals && (
          <section className="bg-gradient-to-br from-slate-800/60 to-indigo-900/40 backdrop-blur-sm border border-indigo-400/30 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-2xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Market Intelligence</h3>
              <p className="text-slate-300">Real-time market signals and competitive landscape</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <Search className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">Search</div>
                    <div className="text-blue-300 text-sm">Volume</div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{analysis.marketSignals.searchVolume}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">Funding</div>
                    <div className="text-green-300 text-sm">Activity</div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{analysis.marketSignals.fundingActivity}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-8 h-8 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">Competition</div>
                    <div className="text-orange-300 text-sm">Density</div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{analysis.marketSignals.competitionDensity}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">Adoption</div>
                    <div className="text-purple-300 text-sm">Stage</div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{analysis.marketSignals.adoptionStage}</p>
              </div>
            </div>
          </section>
        )}

        {/* Detailed Viability Breakdown */}
        {analysis.detailedViabilityBreakdown && (
          <section className="bg-gradient-to-br from-slate-800/60 to-purple-900/40 backdrop-blur-sm border border-purple-400/30 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-3">Viability Analysis</h3>
              <p className="text-slate-300 text-lg">Comprehensive scoring across 5 critical dimensions</p>
            </div>

            {/* Score Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Market Demand */}
              <div className="group hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-500/15 to-indigo-600/15 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30 hover:border-blue-300/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${getScoreColor(analysis.detailedViabilityBreakdown.marketDemand.score)}`}>
                        {analysis.detailedViabilityBreakdown.marketDemand.score}
                      </div>
                      <div className="text-slate-400 text-sm font-medium">/ 10</div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Market Demand</h4>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-blue-300 font-medium bg-blue-500/10 px-3 py-1 rounded-full">Weight: 25%</div>
                    <div className={`w-3 h-3 rounded-full ${
                      analysis.detailedViabilityBreakdown.marketDemand.score >= 8 ? 'bg-emerald-400' :
                      analysis.detailedViabilityBreakdown.marketDemand.score >= 6 ? 'bg-yellow-400' :
                      analysis.detailedViabilityBreakdown.marketDemand.score >= 4 ? 'bg-orange-400' : 'bg-red-400'
                    }`}></div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{analysis.detailedViabilityBreakdown.marketDemand.justification}</p>
                </div>
              </div>

              {/* Technical Feasibility */}
              <div className="group hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-green-500/15 to-emerald-600/15 backdrop-blur-sm rounded-2xl p-6 border border-green-400/30 hover:border-green-300/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Code className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${getScoreColor(analysis.detailedViabilityBreakdown.technicalFeasibility.score)}`}>
                        {analysis.detailedViabilityBreakdown.technicalFeasibility.score}
                      </div>
                      <div className="text-slate-400 text-sm font-medium">/ 10</div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Technical Feasibility</h4>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-green-300 font-medium bg-green-500/10 px-3 py-1 rounded-full">Weight: 20%</div>
                    <div className={`w-3 h-3 rounded-full ${
                      analysis.detailedViabilityBreakdown.technicalFeasibility.score >= 8 ? 'bg-emerald-400' :
                      analysis.detailedViabilityBreakdown.technicalFeasibility.score >= 6 ? 'bg-yellow-400' :
                      analysis.detailedViabilityBreakdown.technicalFeasibility.score >= 4 ? 'bg-orange-400' : 'bg-red-400'
                    }`}></div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{analysis.detailedViabilityBreakdown.technicalFeasibility.justification}</p>
                </div>
              </div>

              {/* Differentiation */}
              <div className="group hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-500/15 to-pink-600/15 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 hover:border-purple-300/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${getScoreColor(analysis.detailedViabilityBreakdown.differentiation.score)}`}>
                        {analysis.detailedViabilityBreakdown.differentiation.score}
                      </div>
                      <div className="text-slate-400 text-sm font-medium">/ 10</div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Differentiation</h4>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-purple-300 font-medium bg-purple-500/10 px-3 py-1 rounded-full">Weight: 20%</div>
                    <div className={`w-3 h-3 rounded-full ${
                      analysis.detailedViabilityBreakdown.differentiation.score >= 8 ? 'bg-emerald-400' :
                      analysis.detailedViabilityBreakdown.differentiation.score >= 6 ? 'bg-yellow-400' :
                      analysis.detailedViabilityBreakdown.differentiation.score >= 4 ? 'bg-orange-400' : 'bg-red-400'
                    }`}></div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{analysis.detailedViabilityBreakdown.differentiation.justification}</p>
                </div>
              </div>

              {/* Monetization Potential */}
              <div className="group hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-amber-500/15 to-orange-600/15 backdrop-blur-sm rounded-2xl p-6 border border-amber-400/30 hover:border-amber-300/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${getScoreColor(analysis.detailedViabilityBreakdown.monetizationPotential.score)}`}>
                        {analysis.detailedViabilityBreakdown.monetizationPotential.score}
                      </div>
                      <div className="text-slate-400 text-sm font-medium">/ 10</div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Monetization</h4>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-amber-300 font-medium bg-amber-500/10 px-3 py-1 rounded-full">Weight: 25%</div>
                    <div className={`w-3 h-3 rounded-full ${
                      analysis.detailedViabilityBreakdown.monetizationPotential.score >= 8 ? 'bg-emerald-400' :
                      analysis.detailedViabilityBreakdown.monetizationPotential.score >= 6 ? 'bg-yellow-400' :
                      analysis.detailedViabilityBreakdown.monetizationPotential.score >= 4 ? 'bg-orange-400' : 'bg-red-400'
                    }`}></div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{analysis.detailedViabilityBreakdown.monetizationPotential.justification}</p>
                </div>
              </div>

              {/* Timing */}
              <div className="group hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-teal-500/15 to-cyan-600/15 backdrop-blur-sm rounded-2xl p-6 border border-teal-400/30 hover:border-teal-300/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${getScoreColor(analysis.detailedViabilityBreakdown.timing.score)}`}>
                        {analysis.detailedViabilityBreakdown.timing.score}
                      </div>
                      <div className="text-slate-400 text-sm font-medium">/ 10</div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Timing</h4>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-teal-300 font-medium bg-teal-500/10 px-3 py-1 rounded-full">Weight: 10%</div>
                    <div className={`w-3 h-3 rounded-full ${
                      analysis.detailedViabilityBreakdown.timing.score >= 8 ? 'bg-emerald-400' :
                      analysis.detailedViabilityBreakdown.timing.score >= 6 ? 'bg-yellow-400' :
                      analysis.detailedViabilityBreakdown.timing.score >= 4 ? 'bg-orange-400' : 'bg-red-400'
                    }`}></div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{analysis.detailedViabilityBreakdown.timing.justification}</p>
                </div>
              </div>

              {/* Scoring Methodology */}
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-500/40 shadow-lg">
                <div className="w-14 h-14 bg-gradient-to-r from-slate-400 to-slate-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Scoring Guide</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-emerald-400 rounded-full mr-3 shadow-sm"></div>
                    <span className="text-slate-300 font-medium">8-10: Excellent</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3 shadow-sm"></div>
                    <span className="text-slate-300 font-medium">6-7: Good</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-400 rounded-full mr-3 shadow-sm"></div>
                    <span className="text-slate-300 font-medium">4-5: Fair</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-400 rounded-full mr-3 shadow-sm"></div>
                    <span className="text-slate-300 font-medium">1-3: Poor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Methodology Footer */}
            <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-600/30 text-center">
              <h5 className="text-lg font-semibold text-white mb-3">Weighted Scoring Formula</h5>
              <p className="text-slate-400 text-sm leading-relaxed">
                <strong>Market Demand (25%)</strong> + <strong>Monetization (25%)</strong> + Technical Feasibility (20%) + Differentiation (20%) + Timing (10%) = <strong>Overall Score</strong>
              </p>
            </div>
          </section>
        )}

        {/* Build Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Build Cost</h3>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getBuildCostStyle(analysis.buildCost.estimate)}`}>
              {analysis.buildCost.estimate}
            </span>
            <p className="text-slate-400 text-xs mt-3 leading-tight">{analysis.buildCost.notes}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Time to MVP</h3>
            <p className="text-2xl font-bold text-white">{analysis.timeToMVP}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Problem Fit</h3>
            <p className="text-sm text-slate-300 leading-tight">{analysis.problemFit}</p>
          </div>
        </section>

        {/* Strengths & Challenges */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Strengths */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Key Strengths</h3>
            </div>
            {analysis.strengths.length > 0 ? (
              <div className="space-y-4">
                {(analysis.strengths || []).map((strength, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/20">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-slate-200 leading-relaxed">{strength}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic text-center py-8">No significant strengths identified</p>
            )}
          </div>

          {/* Challenges */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center mr-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Key Challenges</h3>
            </div>
            <div className="space-y-4">
              {(analysis.challenges || []).map((challenge, index) => (
                <div key={index} className="flex items-start space-x-4 bg-red-500/5 rounded-xl p-4 border border-red-500/20">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <span className="text-slate-200 leading-relaxed">{challenge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Target Audience</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-500/5 rounded-xl p-6 border border-indigo-500/20">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                Primary Audience
              </h4>
              {isRefining ? (
                <textarea
                  value={refinedPrimaryAudience}
                  onChange={(e) => setRefinedPrimaryAudience(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Describe your primary target audience..."
                />
              ) : (
                <p className="text-slate-300 leading-relaxed">{analysis.audience.primary}</p>
              )}
            </div>
            {analysis.audience.secondary && (
              <div className="bg-purple-500/5 rounded-xl p-6 border border-purple-500/20">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  Secondary Audience
                </h4>
                {isRefining ? (
                  <textarea
                    value={refinedSecondaryAudience}
                    onChange={(e) => setRefinedSecondaryAudience(e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Describe your secondary target audience (optional)..."
                  />
                ) : (
                  <p className="text-slate-300 leading-relaxed">{analysis.audience.secondary}</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* MVP Features */}
        <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Lean MVP Features</h3>
          </div>
          {(analysis.leanMVP || []).length > 0 ? (
            isRefining ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Lean MVP Features (one per line)</label>
                <textarea
                  value={refinedLeanMVP}
                  onChange={(e) => setRefinedLeanMVP(e.target.value)}
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={6}
                  placeholder="List your core MVP features, one per line..."
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(analysis.leanMVP || []).map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-blue-500/5 rounded-xl p-4 border border-blue-500/20">
                    <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-slate-200 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            )
          ) : (
            <p className="text-slate-400 italic text-center py-8">No viable MVP features identified</p>
          )}
        </section>

        {/* Distribution & Monetization */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Distribution */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Distribution Channels</h3>
            </div>
            {(analysis.distribution || []).length > 0 ? (
              isRefining ? (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Distribution Channels (one per line)</label>
                  <textarea
                    value={refinedDistribution}
                    onChange={(e) => setRefinedDistribution(e.target.value)}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="List your distribution channels, one per line..."
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {(analysis.distribution || []).map((channel, index) => (
                    <div key={index} className="bg-purple-500/5 rounded-xl p-4 border border-purple-500/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-slate-200 leading-relaxed">{channel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <p className="text-slate-400 italic text-center py-8">No viable distribution channels identified</p>
            )}
          </div>

          {/* Monetization */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Revenue Models</h3>
            </div>
            {isRefining ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Revenue Models (one per line)</label>
                <textarea
                  value={refinedMonetization}
                  onChange={(e) => setRefinedMonetization(e.target.value)}
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="List your revenue models, one per line..."
                />
              </div>
            ) : (
              <div className="space-y-4">
                {(analysis.monetization || []).map((model, index) => (
                  <div key={index} className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-slate-200 leading-relaxed">{model}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Validation Steps */}
        {(analysis.validationSteps || []).length > 0 && (
          <section className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-400/30 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Validation Roadmap</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {(analysis.validationSteps || []).map((step, index) => (
                <div key={index} className="flex items-start space-x-4 bg-amber-500/5 rounded-xl p-4 border border-amber-500/20">
                  <div className="w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <span className="text-slate-200 leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next Steps - Call to Action */}
        <section className="bg-gradient-to-r from-slate-800/50 to-indigo-800/30 border border-indigo-500/20 rounded-3xl p-8 text-white shadow-2xl">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
              <Rocket className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold">Recommended Action Plan</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {(analysis.nextSteps || []).map((step, index) => (
              <div key={index} className="flex items-start space-x-4 bg-white/5 rounded-xl p-4 border border-white/20">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <span className="text-slate-200 leading-relaxed">{step}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={onBack}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg px-12 py-4 shadow-2xl hover:shadow-indigo-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Analyze New Idea
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}