import React from 'react';
import { Clock, Lightbulb } from 'lucide-react';

interface AnalysisHistory {
  id: string;
  idea: string;
  analysis_result: any;
  viability_score: number;
  created_at: string;
}

interface RecentActivityCardProps {
  analysisHistory: AnalysisHistory[];
  onViewReport: (item: AnalysisHistory) => void;
  onViewAll: () => void;
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  analysisHistory,
  onViewReport,
  onViewAll
}) => {
  const recentItems = analysisHistory.slice(0, 5);

  return (
    <div className="bento-card__content" style={{ justifyContent: 'flex-start', gap: '0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 className="bento-card__title" style={{ margin: 0 }}>Recent Activity</h3>
        <Clock className="w-5 h-5 text-white opacity-60" />
      </div>

      {analysisHistory.length === 0 ? (
        <div className="bento-card__activity-item" style={{ cursor: 'default' }}>
          <p className="bento-card__activity-item-title">No ideas tested yet</p>
          <p className="bento-card__activity-item-meta">Start by submitting your first startup idea above</p>
        </div>
      ) : (
        <>
          <div>
            {recentItems.map((item) => (
              <div
                key={item.id}
                className="bento-card__activity-item"
                onClick={() => onViewReport(item)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    background: 'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="bento-card__activity-item-title">{item.idea}</p>
                    <p className="bento-card__activity-item-meta">
                      {new Date(item.created_at).toLocaleDateString()} • Score: {item.viability_score}/10
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {analysisHistory.length > 5 && (
            <div
              className="bento-card__view-more"
              onClick={onViewAll}
            >
              View All {analysisHistory.length} Analyses →
            </div>
          )}
        </>
      )}
    </div>
  );
};
