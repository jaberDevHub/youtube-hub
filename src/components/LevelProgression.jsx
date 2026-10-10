import React from 'react';
import { Award, ChevronRight, TrendingUp } from 'lucide-react';
import { CREATOR_LEVELS, getCreatorLevel, formatCompactNumber, formatFullNumber } from '../services/youtubeApi';

export function LevelProgression({ subscribers }) {
  const current = getCreatorLevel(subscribers);

  return (
    <section className="section-card level-progression-section">
      <div className="section-header">
        <div className="section-title-group">
          <Award size={18} className="text-badge" style={{ color: current.color }} />
          <h2 className="section-title">Creator Level Progression</h2>
          <span className="section-badge" style={{ borderColor: current.color, color: current.color }}>
            {current.level}
          </span>
        </div>

        <div className="level-stats-quick">
          <span className="current-subs-count">
            <strong>{formatFullNumber(subscribers)}</strong> subscribers
          </span>
        </div>
      </div>

      <div className="level-progression-body">
        {/* Progress Bar Container */}
        <div className="progress-bar-container">
          <div className="progress-track">
            <div 
              className="progress-fill"
              style={{ 
                width: `${current.progress}%`,
                backgroundColor: current.color 
              }}
            />
          </div>

          <div className="progress-labels">
            <div className="progress-label-left">
              <span className="label-caption">Current Milestone</span>
              <span className="label-tier-name" style={{ color: current.color }}>
                {current.level}
              </span>
            </div>

            <div className="progress-label-center">
              <span className="progress-percentage">{current.progress}% Progress</span>
              {current.subsNeeded > 0 ? (
                <span className="progress-needed">
                  <TrendingUp size={12} className="inline-icon" />
                  {formatCompactNumber(current.subsNeeded)} more to {current.nextLevelName}
                </span>
              ) : (
                <span className="progress-needed">Max Creator Tier Reached!</span>
              )}
            </div>

            <div className="progress-label-right">
              <span className="label-caption">Next Milestone</span>
              <span className="label-tier-name">
                {current.nextMilestone ? `${formatCompactNumber(current.nextMilestone)} (${current.nextLevelName})` : 'Legendary'}
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Steps Bar */}
        <div className="milestone-steps-grid">
          {CREATOR_LEVELS.map((lvl) => {
            const isCompleted = subscribers >= (lvl.maxSubs === Infinity ? lvl.minSubs : lvl.maxSubs);
            const isCurrent = subscribers >= lvl.minSubs && (lvl.maxSubs === Infinity || subscribers < lvl.maxSubs);
            
            return (
              <div 
                key={lvl.id} 
                className={`milestone-step-card ${isCurrent ? 'current-step' : ''} ${isCompleted ? 'completed-step' : ''}`}
                style={isCurrent ? { borderColor: lvl.color } : {}}
              >
                <div className="step-header">
                  <span className="step-name">{lvl.name}</span>
                  {isCurrent && <span className="step-badge" style={{ backgroundColor: lvl.color }}>Active</span>}
                </div>
                <div className="step-threshold">
                  {formatCompactNumber(lvl.minSubs)} {lvl.maxSubs !== Infinity ? `– ${formatCompactNumber(lvl.maxSubs)}` : '+'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
