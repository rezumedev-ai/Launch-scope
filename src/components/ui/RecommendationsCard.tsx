import React from 'react';
import { Lightbulb } from 'lucide-react';

interface Recommendation {
  title: string;
  description: string;
  action?: string;
}

interface RecommendationsCardProps {
  recommendations: Recommendation[];
}

export function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-2xl p-6">
      <div className="flex items-center mb-4">
        <Lightbulb className="w-6 h-6 text-amber-300 mr-3" />
        <h3 className="text-white font-semibold text-lg">Recommendations</h3>
      </div>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-medium mb-2">{rec.title}</h4>
            <p className="text-slate-300 text-sm">{rec.description}</p>
            {rec.action && (
              <button className="mt-3 text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors">
                {rec.action} →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
