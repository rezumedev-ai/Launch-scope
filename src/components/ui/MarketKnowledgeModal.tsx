import React from 'react';
import { X, TrendingUp, Award, Star, Target, Zap, Trophy } from 'lucide-react';
import { Button } from './Button';

interface MarketKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketKnowledge: {
    total_score: number;
    current_level: number;
    domains_explored: any[];
  } | null;
  stats: {
    totalIdeas: number;
    opportunityScore: number;
    validatedIdeas: number;
    activeProjects: number;
  };
}

export function MarketKnowledgeModal({ isOpen, onClose, marketKnowledge, stats }: MarketKnowledgeModalProps) {
  if (!isOpen) return null;

  const levelNames = [
    'Novice Explorer',
    'Curious Analyst',
    'Market Observer',
    'Strategic Thinker',
    'Opportunity Finder',
    'Market Expert',
    'Validation Master',
    'Strategic Visionary',
    'Market Authority',
    'Innovation Leader'
  ];

  const level = marketKnowledge?.current_level || 1;
  const score = marketKnowledge?.total_score || 0;
  const displayScore = Math.min(Math.round((score / 100)), 100);

  const levelName = levelNames[level - 1] || 'Market Explorer';

  // Calculate next level progress
  const levelThresholds = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];
  const currentThreshold = levelThresholds[level - 1] || 0;
  const nextThreshold = levelThresholds[level] || levelThresholds[levelThresholds.length - 1];
  const progressToNext = level >= 10 ? 100 : Math.round(((score - currentThreshold) / (nextThreshold - currentThreshold)) * 100);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-black/30 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Market Knowledge Dashboard</h2>
              <p className="text-slate-300 text-sm">Your expertise journey</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Level & Score Section */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-400/30 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Level Display */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl mb-4">
                  <span className="text-4xl font-bold text-white">{level}</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{levelName}</h3>
                <p className="text-amber-200 text-lg">Market Expertise Level {level}</p>
              </div>

              {/* Score Display */}
              <div className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent mb-2">
                  {displayScore}
                </div>
                <p className="text-slate-300 text-sm">Overall Knowledge Score</p>
                {level < 10 && (
                  <div className="mt-4">
                    <div className="w-64 h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                        style={{ width: `${progressToNext}%` }}
                      ></div>
                    </div>
                    <p className="text-slate-400 text-xs mt-2">{progressToNext}% to Level {level + 1}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Opportunity Score Breakdown */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Opportunity Quality Score</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
                <div className="text-4xl font-bold text-amber-400 mb-1">{stats.opportunityScore}</div>
                <p className="text-slate-300 text-sm">Average Opportunity Quality</p>
                <p className="text-slate-400 text-xs mt-2">
                  Based on market signals, viability scores, and opportunity factors across all your analyses
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">High viability ideas</span>
                  <span className="text-white font-semibold">{stats.validatedIdeas}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">Active projects</span>
                  <span className="text-white font-semibold">{stats.activeProjects}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">Total analyses</span>
                  <span className="text-white font-semibold">{stats.totalIdeas}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Score Calculation Breakdown */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">How Your Score is Calculated</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-500/5 rounded-xl p-4 border border-indigo-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 font-medium">Each Analysis</span>
                  <span className="text-indigo-400 font-bold">+10 pts</span>
                </div>
                <p className="text-slate-400 text-xs">Base points for completing an analysis</p>
              </div>
              <div className="bg-green-500/5 rounded-xl p-4 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 font-medium">Validated Idea</span>
                  <span className="text-green-400 font-bold">+25 pts</span>
                </div>
                <p className="text-slate-400 text-xs">Bonus for marking an idea as validated</p>
              </div>
              <div className="bg-amber-500/5 rounded-xl p-4 border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 font-medium">Improvement Plan</span>
                  <span className="text-amber-400 font-bold">+15 pts</span>
                </div>
                <p className="text-slate-400 text-xs">Points for generating improvement plans</p>
              </div>
              <div className="bg-purple-500/5 rounded-xl p-4 border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 font-medium">Viability Bonus</span>
                  <span className="text-purple-400 font-bold">Up to +100</span>
                </div>
                <p className="text-slate-400 text-xs">Average viability score × 10</p>
              </div>
            </div>
          </div>

          {/* Next Level Goals */}
          {level < 10 && (
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Path to Level {level + 1}</h3>
              </div>
              <p className="text-slate-300 mb-4">
                Keep analyzing ideas and validating winners to reach the next level. You need <strong className="text-white">{nextThreshold - score} more points</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{Math.ceil((nextThreshold - score) / 10)}</div>
                  <div className="text-slate-400 text-xs">Analyses needed</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{Math.ceil((nextThreshold - score) / 25)}</div>
                  <div className="text-slate-400 text-xs">Validated ideas needed</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{Math.ceil((nextThreshold - score) / 15)}</div>
                  <div className="text-slate-400 text-xs">Improvement plans needed</div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
