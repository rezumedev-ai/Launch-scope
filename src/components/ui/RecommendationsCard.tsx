import React from 'react';
import { Sparkles, TrendingUp, DollarSign, Target, Clock } from 'lucide-react';
import { Button } from './Button';

interface Recommendation {
  id: string;
  idea: string;
  viability_score: number;
  recommendation_score: number;
  reason: string;
  created_at: string;
  analysis_result: any;
}

interface RecommendationsCardProps {
  recommendations: Recommendation[];
  onViewReport: (id: string) => void;
  isLoading?: boolean;
}

export function RecommendationsCard({
  recommendations,
  onViewReport,
  isLoading = false
}: RecommendationsCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">Loading Recommendations...</h3>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 rounded-xl p-4 h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">Validation Recommendations</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-slate-300 mb-4">No recommendations available yet</p>
          <p className="text-slate-400 text-sm">
            Analyze more ideas to get AI-powered recommendations on which ones to validate
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Recommended to Validate</h3>
            <p className="text-slate-300 text-sm">AI-powered suggestions based on your analyses</p>
          </div>
        </div>
        {recommendations.length > 0 && (
          <div className="bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full">
            <span className="text-amber-200 text-sm font-semibold">
              {recommendations.length} {recommendations.length === 1 ? 'Idea' : 'Ideas'}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {recommendations.slice(0, 5).map((rec, index) => (
          <div
            key={rec.id}
            className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/30 rounded-2xl p-5 hover:from-amber-500/15 hover:to-orange-500/15 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <h4 className="text-white font-semibold text-base line-clamp-2 flex-1">
                    {rec.idea}
                  </h4>
                </div>
                <div className="flex items-center space-x-2 text-xs text-amber-200 mb-3 ml-11">
                  <Target className="w-3 h-3" />
                  <span>{rec.reason}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-amber-300">
                  {rec.viability_score}
                  <span className="text-sm text-slate-400">/10</span>
                </div>
                <div className="text-xs text-slate-400">Viability</div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs text-slate-300">
                {rec.analysis_result?.detailedViabilityBreakdown && (
                  <>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-blue-400" />
                      <span>Market: {rec.analysis_result.detailedViabilityBreakdown.marketDemand?.score}/10</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-3 h-3 text-green-400" />
                      <span>Revenue: {rec.analysis_result.detailedViabilityBreakdown.monetizationPotential?.score}/10</span>
                    </div>
                  </>
                )}
              </div>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewReport(rec.id);
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 text-xs"
              >
                View & Validate
              </Button>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length > 5 && (
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Showing top 5 recommendations of {recommendations.length} total
          </p>
        </div>
      )}
    </div>
  );
}
