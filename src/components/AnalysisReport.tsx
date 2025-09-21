import React from 'react';
import { ArrowLeft, AlertTriangle, Target, Users, DollarSign, Clock, CheckCircle, Star, Lightbulb, Zap, TrendingDown, Code, Rocket } from 'lucide-react';
import { Button } from './ui/Button';

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
  distribution: string[];
  monetization: string[];
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
}

export function AnalysisReport({ analysis, idea, onBack }: AnalysisReportProps) {
  // Helper function to get the numeric viability score
  const getViabilityScoreValue = (analysis: AnalysisData): number => {
    // Prioritize weighted overall score from detailed breakdown
    if (analysis.detailedViabilityBreakdown?.weightedOverallScore) {
      return parseFloat(analysis.detailedViabilityBreakdown.weightedOverallScore);
    }
    // Fallback to parsing the original viabilityScore
    return parseInt(analysis.viabilityScore.split(' ')[0]) || 5;
  };

  const getViabilityColor = (score: string) => {
    const numScore = typeof score === 'string' ? parseInt(score) : getViabilityScoreValue(analysis);
    if (numScore >= 8) return 'text-green-500';
    if (numScore >= 6) return 'text-yellow-500';
    if (numScore >= 4) return 'text-orange-500';
    return 'text-red-500';
  };

  const getViabilityBgColor = (score: string) => {
    const numScore = typeof score === 'string' ? parseInt(score) : getViabilityScoreValue(analysis);
    if (numScore >= 8) return 'from-green-400 to-emerald-400';
    if (numScore >= 6) return 'from-yellow-400 to-amber-400';
    if (numScore >= 4) return 'from-orange-400 to-red-400';
    return 'from-red-400 to-pink-400';
  };

  const getBuildCostColor = (estimate: string) => {
    switch (estimate.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerdictColor = (verdict: string) => {
    const lowerVerdict = verdict.toLowerCase();
    if (lowerVerdict.includes('strong') || lowerVerdict.includes('viable') || lowerVerdict.includes('promising')) {
      return 'border-green-400/30 bg-green-500/10 text-green-100';
    }
    if (lowerVerdict.includes('weak') || lowerVerdict.includes('non-viable') || lowerVerdict.includes('poor')) {
      return 'border-red-400/30 bg-red-500/10 text-red-100';
    }
    return 'border-yellow-400/30 bg-yellow-500/10 text-yellow-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <Button 
            variant="secondary" 
            onClick={onBack}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 p-1 sm:px-3 sm:py-2 text-xs sm:text-sm"
          >
            <ArrowLeft className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">LaunchScope Analysis</h1>
            <p className="text-slate-300 text-sm">Brutally honest startup validation</p>
          </div>
          
          <div className="hidden sm:block w-32"></div> {/* Spacer for centering on desktop */}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Idea Summary Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">Your Startup Idea</h2>
              <p className="text-slate-300 text-lg leading-relaxed">{idea}</p>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-3">LaunchScope Summary</h3>
            <p className="text-slate-300 leading-relaxed">{analysis.summary}</p>
          </div>
        </div>

        {/* Verdict & Key Metrics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Verdict */}
          <div className="lg:col-span-2">
            <div className={`bg-black/20 backdrop-blur-sm border rounded-2xl p-6 ${getVerdictColor(analysis.verdict)}`}>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Final Verdict</h3>
              </div>
              <p className="text-lg font-medium leading-relaxed">{analysis.verdict}</p>
            </div>
          </div>

          {/* Viability Score */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className={`w-16 h-16 bg-gradient-to-r ${getViabilityBgColor(analysis.viabilityScore)} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Viability Score</h3>
            <p className={`text-4xl font-bold ${getViabilityColor(analysis.viabilityScore)} mb-2`}>
              {analysis.detailedViabilityBreakdown?.weightedOverallScore || analysis.viabilityScore.split(' ')[0]}/10
            </p>
            <p className="text-slate-400 text-sm">
              {analysis.detailedViabilityBreakdown?.overallJustification?.substring(0, 50) + '...' || 
               analysis.viabilityScore.split(' ').slice(1).join(' ')}
            </p>
          </div>
        </div>

        {/* Detailed Viability Breakdown */}
        {analysis.detailedViabilityBreakdown && (
          <div className="bg-gradient-to-br from-slate-800/60 to-indigo-900/40 backdrop-blur-sm border border-indigo-400/30 rounded-3xl p-8 mb-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-3">Detailed Viability Analysis</h3>
              <p className="text-slate-300 text-lg">Comprehensive breakdown across 5 key dimensions</p>
            </div>

            {/* Overall Score Hero Section */}
            <div className="relative mb-16">
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-3xl p-12 border border-slate-600/40 shadow-2xl relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-xl"></div>
                
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-white mb-8 relative z-10">Overall Viability Score</h4>
                  
                  {/* Large Score Display */}
                  <div className="relative inline-block mb-8">
                    <div className="relative">
                      {/* Outer glow ring */}
                      <div className={`w-48 h-48 rounded-full border-4 ${
                        getViabilityScoreValue(analysis) >= 8 
                          ? 'border-green-400/30 shadow-green-400/20' 
                          : getViabilityScoreValue(analysis) >= 6 
                          ? 'border-yellow-400/30 shadow-yellow-400/20' 
                          : getViabilityScoreValue(analysis) >= 4 
                          ? 'border-orange-400/30 shadow-orange-400/20' 
                          : 'border-red-400/30 shadow-red-400/20'
                      } shadow-2xl relative`}>
                        
                        {/* Inner score circle */}
                        <div className={`absolute inset-4 rounded-full flex items-center justify-center ${
                          parseFloat(analysis.detailedViabilityBreakdown.weightedOverallScore) >= 8 
                            ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-400/40' 
                            : parseFloat(analysis.detailedViabilityBreakdown.weightedOverallScore) >= 6 
                            ? 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-2 border-yellow-400/40' 
                            : parseFloat(analysis.detailedViabilityBreakdown.weightedOverallScore) >= 4 
                            ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-400/40' 
                            : 'bg-gradient-to-br from-red-500/20 to-pink-500/20 border-2 border-red-400/40'
                        }`}>
                          <div className="text-center">
                            <div className={`text-6xl font-bold mb-2 ${
                              parseFloat(analysis.detailedViabilityBreakdown.weightedOverallScore) >= 8 ? 'text-green-300' :
                              parseFloat(analysis.detailedViabilityBreakdown.weightedOverallScore) >= 6 ? 'text-yellow-300' :
                            getViabilityScoreValue(analysis) >= 8 ? 'text-green-300' :
                            getViabilityScoreValue(analysis) >= 6 ? 'text-yellow-300' :
                            getViabilityScoreValue(analysis) >= 4 ? 'text-orange-300' : 'text-red-300'
                            </div>
                            {analysis.detailedViabilityBreakdown?.weightedOverallScore || getViabilityScoreValue(analysis).toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Score interpretation */}
                  <div className="max-w-3xl mx-auto relative z-10">
                    <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold mb-4 ${
                      getViabilityScoreValue(analysis) >= 8 
                        ? 'bg-green-500/20 text-green-200 border border-green-400/30' 
                        : getViabilityScoreValue(analysis) >= 6 
                        ? 'bg-yellow-500/20 text-yellow-200 border border-yellow-400/30' 
                        : getViabilityScoreValue(analysis) >= 4 
                        ? 'bg-orange-500/20 text-orange-200 border border-orange-400/30' 
                        : 'bg-red-500/20 text-red-200 border border-red-400/30'
                    }`}>
                      {getViabilityScoreValue(analysis) >= 8 ? '🚀 Excellent Viability' :
                       getViabilityScoreValue(analysis) >= 6 ? '✅ Good Viability' :
                       getViabilityScoreValue(analysis) >= 4 ? '⚠️ Fair Viability' : '❌ Poor Viability'}
                    </div>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {analysis.detailedViabilityBreakdown?.overallJustification || 
                       'Comprehensive analysis completed with detailed scoring across all key viability factors.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Category Scores */}
            <div className="mb-12">
              <h4 className="text-2xl font-bold text-white text-center mb-8">Category Breakdown</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Market Demand */}
                <div className="group hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-500/15 to-indigo-600/15 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30 hover:border-blue-300/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className={`text-4xl font-bold ${
                          analysis.detailedViabilityBreakdown.marketDemand.score >= 8 ? 'text-green-300' :
                          analysis.detailedViabilityBreakdown.marketDemand.score >= 6 ? 'text-yellow-300' :
                          analysis.detailedViabilityBreakdown.marketDemand.score >= 4 ? 'text-orange-300' : 'text-red-300'
                        }`}>
                          {analysis.detailedViabilityBreakdown.marketDemand.score}
                        </div>
                        <div className="text-slate-400 text-sm font-medium">/ 10</div>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Market Demand</h4>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-blue-300 font-medium bg-blue-500/10 px-3 py-1 rounded-full">Weight: 25%</div>
                      <div className={`w-3 h-3 rounded-full ${
                        analysis.detailedViabilityBreakdown.marketDemand.score >= 8 ? 'bg-green-400' :
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
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className={`text-4xl font-bold ${
                          analysis.detailedViabilityBreakdown.technicalFeasibility.score >= 8 ? 'text-green-300' :
                          analysis.detailedViabilityBreakdown.technicalFeasibility.score >= 6 ? 'text-yellow-300' :
                          analysis.detailedViabilityBreakdown.technicalFeasibility.score >= 4 ? 'text-orange-300' : 'text-red-300'
                        }`}>
                          {analysis.detailedViabilityBreakdown.technicalFeasibility.score}
                        </div>
                        <div className="text-slate-400 text-sm font-medium">/ 10</div>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Technical Feasibility</h4>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-green-300 font-medium bg-green-500/10 px-3 py-1 rounded-full">Weight: 20%</div>
                      <div className={`w-3 h-3 rounded-full ${
                        analysis.detailedViabilityBreakdown.technicalFeasibility.score >= 8 ? 'bg-green-400' :
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
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className={`text-4xl font-bold ${
                          analysis.detailedViabilityBreakdown.differentiation.score >= 8 ? 'text-green-300' :
                          analysis.detailedViabilityBreakdown.differentiation.score >= 6 ? 'text-yellow-300' :
                          analysis.detailedViabilityBreakdown.differentiation.score >= 4 ? 'text-orange-300' : 'text-red-300'
                        }`}>
                          {analysis.detailedViabilityBreakdown.differentiation.score}
                        </div>
                        <div className="text-slate-400 text-sm font-medium">/ 10</div>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Differentiation</h4>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-purple-300 font-medium bg-purple-500/10 px-3 py-1 rounded-full">Weight: 20%</div>
                      <div className={`w-3 h-3 rounded-full ${
                        analysis.detailedViabilityBreakdown.differentiation.score >= 8 ? 'bg-green-400' :
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
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className={`text-4xl font-bold ${
                          analysis.detailedViabilityBreakdown.monetizationPotential.score >= 8 ? 'text-green-300' :
                          analysis.detailedViabilityBreakdown.monetizationPotential.score >= 6 ? 'text-yellow-300' :
                          analysis.detailedViabilityBreakdown.monetizationPotential.score >= 4 ? 'text-orange-300' : 'text-red-300'
                        }`}>
                          {analysis.detailedViabilityBreakdown.monetizationPotential.score}
                        </div>
                        <div className="text-slate-400 text-sm font-medium">/ 10</div>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Monetization</h4>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-amber-300 font-medium bg-amber-500/10 px-3 py-1 rounded-full">Weight: 25%</div>
                      <div className={`w-3 h-3 rounded-full ${
                        analysis.detailedViabilityBreakdown.monetizationPotential.score >= 8 ? 'bg-green-400' :
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
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className={`text-4xl font-bold ${
                          analysis.detailedViabilityBreakdown.timing.score >= 8 ? 'text-green-300' :
                          analysis.detailedViabilityBreakdown.timing.score >= 6 ? 'text-yellow-300' :
                          analysis.detailedViabilityBreakdown.timing.score >= 4 ? 'text-orange-300' : 'text-red-300'
                        }`}>
                          {analysis.detailedViabilityBreakdown.timing.score}
                        </div>
                        <div className="text-slate-400 text-sm font-medium">/ 10</div>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Timing</h4>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-teal-300 font-medium bg-teal-500/10 px-3 py-1 rounded-full">Weight: 10%</div>
                      <div className={`w-3 h-3 rounded-full ${
                        analysis.detailedViabilityBreakdown.timing.score >= 8 ? 'bg-green-400' :
                        analysis.detailedViabilityBreakdown.timing.score >= 6 ? 'bg-yellow-400' :
                        analysis.detailedViabilityBreakdown.timing.score >= 4 ? 'bg-orange-400' : 'bg-red-400'
                      }`}></div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{analysis.detailedViabilityBreakdown.timing.justification}</p>
                  </div>
                </div>

                {/* Scoring Legend */}
                <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-500/40 shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-r from-slate-400 to-slate-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">Scoring Guide</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-400 rounded-full mr-3 shadow-sm"></div>
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
            </div>

            {/* Weighting Information */}
            <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-600/30 text-center">
              <h5 className="text-lg font-semibold text-white mb-3">Scoring Methodology</h5>
              <p className="text-slate-400 text-sm leading-relaxed">
                <strong>Weighted Formula:</strong> Market Demand (25%) + Monetization (25%) + Technical Feasibility (20%) + Differentiation (20%) + Timing (10%) = Overall Score
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Build Cost</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getBuildCostColor(analysis.buildCost.estimate)}`}>
              {analysis.buildCost.estimate}
            </span>
            <p className="text-slate-400 text-xs mt-2">{analysis.buildCost.notes}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Time to MVP</h3>
            <p className="text-xl font-semibold text-white">{analysis.timeToMVP}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Problem Fit</h3>
            <p className="text-sm text-slate-300 leading-tight">{analysis.problemFit}</p>
          </div>
        </div>

        {/* Strengths & Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Strengths */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Strengths</h3>
            </div>
            {analysis.strengths.length > 0 ? (
              <ul className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-300">{strength}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 italic">No significant strengths identified</p>
            )}
          </div>

          {/* Challenges */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Challenges & Risks</h3>
            </div>
            <ul className="space-y-3">
              {analysis.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Target Audience */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-3">
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Target Audience</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Primary Audience</h4>
              <p className="text-slate-300">{analysis.audience.primary}</p>
            </div>
            {analysis.audience.secondary && (
              <div>
                <h4 className="font-semibold text-white mb-2">Secondary Audience</h4>
                <p className="text-slate-300">{analysis.audience.secondary}</p>
              </div>
            )}
          </div>
        </div>

        {/* Lean MVP Features */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
              <Code className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Lean MVP Features</h3>
          </div>
          {analysis.leanMVP.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.leanMVP.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 bg-slate-800/30 rounded-lg p-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic">No viable MVP features identified</p>
          )}
        </div>

        {/* Distribution & Monetization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Distribution */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                <TrendingDown className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Distribution Channels</h3>
            </div>
            {analysis.distribution.length > 0 ? (
              <div className="space-y-3">
                {analysis.distribution.map((channel, index) => (
                  <div key={index} className="bg-slate-800/30 rounded-lg p-3">
                    <span className="text-slate-300">{channel}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic">No viable distribution channels identified</p>
            )}
          </div>

          {/* Monetization */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Revenue Models</h3>
            </div>
            <div className="space-y-3">
              {analysis.monetization.map((model, index) => (
                <div key={index} className="bg-slate-800/30 rounded-lg p-3">
                  <span className="text-slate-300">{model}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-slate-800/50 to-indigo-800/30 border border-indigo-500/20 rounded-2xl p-8 text-white">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">Recommended Next Steps</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {analysis.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <span className="text-slate-200">{step}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              onClick={onBack}
              className="bg-white text-slate-900 hover:bg-slate-100"
            >
              Analyze Another Idea
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}