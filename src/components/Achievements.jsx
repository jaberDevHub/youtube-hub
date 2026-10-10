import React, { useState } from 'react';
import { Lock } from 'lucide-react';

// Custom Play Button & Creator Badge SVG emblems
function BadgeEmblem({ id, unlocked }) {
  // 1. 100K Silver Play Button
  if (id === 'sub_100k') {
    return (
      <svg viewBox="0 0 64 64" className="badge-svg">
        <defs>
          <linearGradient id="silverPlate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#94a3b8" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2.5" />
        <polygon points="32,15 47,23 47,41 32,49 17,41 17,23" fill="url(#silverPlate)" stroke="#f8fafc" strokeWidth="1" />
        {/* Silver Play Triangle */}
        <path d="M28 26l11 6-11 6z" fill="#1e293b" />
      </svg>
    );
  }

  // 2. 1M Gold Play Button
  if (id === 'sub_1m') {
    return (
      <svg viewBox="0 0 64 64" className="badge-svg">
        <defs>
          <linearGradient id="goldPlate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="80%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#2e1065" stroke="#facc15" strokeWidth="2.5" />
        <polygon points="32,15 47,23 47,41 32,49 17,41 17,23" fill="url(#goldPlate)" stroke="#fef9c3" strokeWidth="1" />
        {/* Gold Play Triangle */}
        <path d="M28 26l11 6-11 6z" fill="#422006" />
        <circle cx="32" cy="32" r="1.5" fill="#fef08a" />
      </svg>
    );
  }

  // 3. 10M Diamond Play Button
  if (id === 'sub_10m') {
    return (
      <svg viewBox="0 0 64 64" className="badge-svg">
        <defs>
          <linearGradient id="diamondPlate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="35%" stopColor="#38bdf8" />
            <stop offset="70%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#082f49" stroke="#38bdf8" strokeWidth="2.5" />
        {/* Faceted Diamond Crystal Shield */}
        <polygon points="32,14 48,22 48,42 32,50 16,42 16,22" fill="url(#diamondPlate)" />
        <polygon points="32,14 48,22 32,32 16,22" fill="#7dd3fc" opacity="0.6" />
        {/* Crystal Play Triangle */}
        <path d="M28 26l11 6-11 6z" fill="#f0f9ff" />
      </svg>
    );
  }

  // 4. 50M Custom Ruby Play Button
  if (id === 'sub_50m') {
    return (
      <svg viewBox="0 0 64 64" className="badge-svg">
        <defs>
          <linearGradient id="rubyPlate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="40%" stopColor="#dc2626" />
            <stop offset="80%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#450a0a" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#1c0505" stroke="#ef4444" strokeWidth="2.5" />
        <polygon points="32,14 48,22 48,42 32,50 16,42 16,22" fill="url(#rubyPlate)" />
        <polygon points="32,14 48,22 32,32 16,22" fill="#f87171" opacity="0.5" />
        {/* Glowing Ruby Play Triangle */}
        <path d="M28 26l11 6-11 6z" fill="#ffffff" />
      </svg>
    );
  }

  // 5. 100M Red Diamond Play Button
  if (id === 'sub_100m') {
    return (
      <svg viewBox="0 0 64 64" className="badge-svg">
        <defs>
          <linearGradient id="redDiamondGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="50%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#09050d" stroke="#f43f5e" strokeWidth="2.5" />
        {/* Obsidian Outer Shield */}
        <polygon points="32,13 49,21 49,43 32,51 15,43 15,21" fill="#18181b" stroke="#e11d48" strokeWidth="1.5" />
        {/* Red Diamond Core */}
        <polygon points="32,18 44,24 44,40 32,46 20,40 20,24" fill="url(#redDiamondGrad)" />
        <path d="M28 26l11 6-11 6z" fill="#ffffff" />
      </svg>
    );
  }

  // 6. 200M Cosmic Obsidian Play Button
  if (id === 'sub_200m') {
    return (
      <svg viewBox="0 0 64 64" className="badge-svg">
        <defs>
          <linearGradient id="cosmicGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#7e22ce" />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#05020a" stroke="#a855f7" strokeWidth="2.5" />
        <polygon points="32,13 49,21 49,43 32,51 15,43 15,21" fill="url(#cosmicGrad)" stroke="#e9d5ff" strokeWidth="1" />
        {/* Stars */}
        <circle cx="24" cy="22" r="1" fill="#ffffff" />
        <circle cx="40" cy="24" r="1.2" fill="#ffffff" />
        <circle cx="38" cy="42" r="1" fill="#ffffff" />
        {/* Cosmic Play Core */}
        <path d="M28 26l11 6-11 6z" fill="#f5d0fe" />
      </svg>
    );
  }

  // 7. 300M Mythic Apex Play Button
  if (id === 'sub_300m') {
    return (
      <svg viewBox="0 0 64 64" className="badge-svg">
        <defs>
          <linearGradient id="mythicGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#1c0a00" stroke="#f59e0b" strokeWidth="2.5" />
        {/* Celestial Crown Starburst Rays */}
        <path d="M32 8l3 10 10-3-4 10 10 3-10 4 4 10-10-3-3 10-3-10-10 3 4-10-10-4 10-3-4-10 10 3z" fill="#fbbf24" opacity="0.3" />
        {/* Golden Apex Shield */}
        <polygon points="32,14 48,22 48,42 32,50 16,42 16,22" fill="url(#mythicGrad)" stroke="#fef08a" strokeWidth="1.5" />
        {/* Prismatic Core */}
        <path d="M28 26l11 6-11 6z" fill="#18181b" />
        <circle cx="32" cy="32" r="1.5" fill="#ffffff" />
      </svg>
    );
  }

  // 8. Consistency Streak (Flame Master)
  if (id === 'streak_30' || id === 'streak') {
    return (
      <svg viewBox="0 0 64 64" className="badge-svg">
        <defs>
          <linearGradient id="streakGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#b91c1c" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#1c1917" stroke="#ea580c" strokeWidth="2.5" />
        <path d="M32 12c2 8 8 11 8 18 0 7-5 12-8 12s-8-5-8-12c0-5 3-10 8-18z" fill="url(#streakGrad)" />
        <path d="M32 24c1.5 4 4.5 5.5 4.5 9 0 3.5-2.5 6-4.5 6s-4.5-2.5-4.5-6c0-2.5 1.5-5 4.5-9z" fill="#fef08a" />
      </svg>
    );
  }

  // 9. First Upload (Liftoff Rocket)
  if (id === 'first_upload') {
    return (
      <svg viewBox="0 0 64 64" className="badge-svg">
        <defs>
          <linearGradient id="rocketGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />
        <circle cx="18" cy="20" r="1.5" fill="#f8fafc" opacity="0.8" />
        <circle cx="46" cy="18" r="1.5" fill="#f8fafc" opacity="0.8" />
        <path d="M32 14c4 4 7 11 7 18l-7 4-7-4c0-7 3-14 7-18z" fill="url(#rocketGrad)" />
        <circle cx="32" cy="24" r="3" fill="#ffffff" />
        <path d="M25 28l-5 6 5 2z" fill="#4338ca" />
        <path d="M39 28l5 6-5 2z" fill="#4338ca" />
        <path d="M30 36l2 8 2-8z" fill="#f59e0b" />
      </svg>
    );
  }

  // 10. 100 Videos (Centurion Slate)
  if (id === 'videos_100') {
    return (
      <svg viewBox="0 0 64 64" className="badge-svg">
        <circle cx="32" cy="32" r="30" fill="#1e1b4b" stroke="#e11d48" strokeWidth="2.5" />
        <path d="M16 32c0-8 6-14 12-16-4 6-4 12 0 16-6-2-10-4-12 0z" fill="#fbbf24" opacity="0.6" />
        <path d="M48 32c0-8-6-14-12-16 4 6 4 12 0 16 6-2 10-4 12 0z" fill="#fbbf24" opacity="0.6" />
        <rect x="22" y="24" width="20" height="16" rx="2" fill="#be123c" />
        <path d="M28 28l9 4-9 4z" fill="#ffffff" />
      </svg>
    );
  }

  // 11. 1B Views (Cosmic Eye)
  if (id === 'views_1b' || id === 'views_1m') {
    return (
      <svg viewBox="0 0 64 64" className="badge-svg">
        <defs>
          <linearGradient id="viewGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="#3b0764" stroke="#ec4899" strokeWidth="2.5" />
        <path d="M18 32s6-10 14-10 14 10 14 10-6 10-14 10-14-10-14-10z" fill="url(#viewGrad)" />
        <circle cx="32" cy="32" r="6" fill="#18181b" />
        <circle cx="34" cy="30" r="2.5" fill="#ffffff" />
      </svg>
    );
  }

  // Fallback Trophy
  return (
    <svg viewBox="0 0 64 64" className="badge-svg">
      <circle cx="32" cy="32" r="30" fill="#18181b" stroke="#eab308" strokeWidth="2.5" />
      <path d="M24 20h16v10c0 4-3 8-8 8s-8-4-8-8V20z" fill="#eab308" />
      <path d="M28 28l9 4-9 4z" fill="#ffffff" />
    </svg>
  );
}

// Multiplier / Milestone pills (100K, 1M, 10M, 50M, 100M, 200M, 300M, x3, 1B)
function getBadgeMultiplier(badge) {
  if (badge.milestone) return badge.milestone;
  if (badge.id === 'sub_100k') return '100K';
  if (badge.id === 'sub_1m') return '1M';
  if (badge.id === 'sub_10m') return '10M';
  if (badge.id === 'sub_50m') return '50M';
  if (badge.id === 'sub_100m') return '100M';
  if (badge.id === 'sub_200m') return '200M';
  if (badge.id === 'sub_300m') return '300M';
  if (badge.id === 'streak_30') return 'x3';
  if (badge.id === 'views_1b') return '1B';
  return null;
}

export function Achievements({ achievements }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const list = achievements || [];

  return (
    <section className="section-card github-achievements-section">
      <div className="section-header">
        <div className="section-title-group">
          <h2 className="section-title">Achievements</h2>
          <span className="section-badge-counter">
            {list.filter(b => b.unlocked).length} / {list.length} Unlocked
          </span>
        </div>
      </div>

      {/* GitHub-style row of Play Button & creator medallions */}
      <div className="github-badges-row">
        {list.map((badge) => {
          const multiplier = getBadgeMultiplier(badge);

          return (
            <div
              key={badge.id}
              className={`github-badge-item ${badge.unlocked ? 'badge-unlocked' : 'badge-locked'}`}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setActiveTooltip({
                  badge,
                  x: rect.left + rect.width / 2,
                  y: rect.top - 8
                });
              }}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="github-badge-medallion">
                <BadgeEmblem id={badge.id} unlocked={badge.unlocked} />
                
                {multiplier && (
                  <span className={`badge-multiplier-pill ${badge.unlocked ? 'pill-active' : 'pill-locked'}`}>
                    {multiplier}
                  </span>
                )}

                {!badge.unlocked && (
                  <div className="badge-locked-overlay">
                    <Lock size={13} className="badge-lock-icon" />
                  </div>
                )}
              </div>

              <span className="github-badge-name">{badge.title}</span>
            </div>
          );
        })}
      </div>

      {/* Floating Tooltip on Hover */}
      {activeTooltip && (
        <div 
          className="github-badge-tooltip"
          style={{ 
            left: `${activeTooltip.x}px`, 
            top: `${activeTooltip.y}px` 
          }}
        >
          <div className="tooltip-badge-title">
            <span>{activeTooltip.badge.title}</span>
            {activeTooltip.badge.unlocked ? (
              <span className="tooltip-status-unlocked">Unlocked</span>
            ) : (
              <span className="tooltip-status-locked">Locked</span>
            )}
          </div>

          <p className="tooltip-badge-desc">
            {activeTooltip.badge.description}
          </p>

          {activeTooltip.badge.date && activeTooltip.badge.unlocked && (
            <div className="tooltip-badge-date">
              Unlocked on {new Date(activeTooltip.badge.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          )}

          {!activeTooltip.badge.unlocked && activeTooltip.badge.progress !== undefined && (
            <div className="tooltip-badge-progress">
              <div className="tooltip-bar">
                <div className="tooltip-bar-fill" style={{ width: `${activeTooltip.badge.progress}%` }} />
              </div>
              <span>{activeTooltip.badge.progress}% progress</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
