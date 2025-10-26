import React from 'react';

interface RecentActivityCardProps {
  activities: any[];
  onViewAll?: () => void;
}

export function RecentActivityCard({ activities, onViewAll }: RecentActivityCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Recent Activity</h3>
        {onViewAll && (
          <button onClick={onViewAll} className="text-blue-300 hover:text-blue-200 text-sm transition-colors">
            View All
          </button>
        )}
      </div>
      {activities.length === 0 ? (
        <p className="text-slate-400 text-sm">No recent activity</p>
      ) : (
        <div className="space-y-3">
          {activities.slice(0, 5).map((activity, index) => (
            <div key={index} className="text-slate-300 text-sm">
              {activity.description || 'Activity'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
