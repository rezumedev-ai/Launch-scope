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
}

interface AnalysisReportProps {
  analysis: AnalysisData;
  idea: string;
  onBack: () => void;
}

export function AnalysisReport({ analysis, idea, onBack }: AnalysisReportProps) {
  const getViabilityColor = (score: string) => {
    const numScore = parseInt(score);
    if (numScore >= 8) return 'text-green-500';
    if (numScore >= 6) return 'text-yellow-500';
    if (numScore >= 4) return 'text-orange-500';
    return 'text-red-500';
  };

  const getViabilityBgColor = (score: string) => {
    const numScore = parseInt(score);
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
              {analysis.viabilityScore.split(' ')[0]}/10
            </p>
            <p className="text-slate-400 text-sm">{analysis.viabilityScore.split(' ').slice(1).join(' ')}</p>
          </div>
        </div>

        {/* Build Metrics Row */}
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