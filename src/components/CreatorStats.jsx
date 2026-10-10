import React from 'react';
import { Users, Eye, Video, Trophy, Award } from 'lucide-react';
import { formatCompactNumber, formatFullNumber, getCreatorLevel } from '../services/youtubeApi';

export function CreatorStats({ stats }) {
  const levelInfo = getCreatorLevel(stats.subscribers);

  const cards = [
    {
      id: 'subs',
      label: 'Subscribers',
      compact: formatCompactNumber(stats.subscribers),
      full: `${formatFullNumber(stats.subscribers)} verified creators & fans`,
      icon: Users,
      badge: 'Audience'
    },
    {
      id: 'views',
      label: 'Total Views',
      compact: formatCompactNumber(stats.views),
      full: `${formatFullNumber(stats.views)} lifetime impressions`,
      icon: Eye,
      badge: 'Reach'
    },
    {
      id: 'videos',
      label: 'Published Videos',
      compact: stats.videoCount ? stats.videoCount.toLocaleString() : 'N/A',
      full: `${stats.videoCount || 0} public releases`,
      icon: Video,
      badge: 'Catalog'
    }
  ];

  return (
    <div className="creator-stats-grid">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.id} className="stat-card">
            <div className="stat-card-header">
              <span className="stat-label">{card.label}</span>
              <span className="stat-badge">{card.badge}</span>
            </div>

            <div className="stat-card-body">
              <Icon 
                size={20} 
                className="stat-icon" 
                style={card.highlightColor ? { color: card.highlightColor } : {}}
              />
              <span 
                className="stat-value"
                style={card.highlightColor ? { color: card.highlightColor } : {}}
              >
                {card.compact}
              </span>
            </div>

            <div className="stat-card-footer" title={card.full}>
              <span className="stat-subtext">{card.full}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
