import React, { useState } from 'react';
import { Trophy, Globe, MapPin, Tag, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { LEADERBOARD_PREVIEW } from '../data/mockCreators';
import { formatCompactNumber } from '../services/youtubeApi';

export function Rankings({ creator, onSelectCreator }) {
  const [showMethodology, setShowMethodology] = useState(false);
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);

  const stats = creator.stats || {};
  const globalRank = stats.rankingGlobal || 482;
  const regionRank = stats.rankingRegion || 124;
  const categoryRank = stats.rankingCategory || 32;

  const currentHandle = creator.handle;
  const leaderboardItems = showFullLeaderboard 
    ? LEADERBOARD_PREVIEW 
    : LEADERBOARD_PREVIEW.slice(0, 4);

  return (
    <section className="section-card rankings-section">
      <div className="section-header">
        <div className="section-title-group">
          <Trophy size={18} className="text-yellow" />
          <h2 className="section-title">Community Rankings & Standings</h2>
          <span className="section-badge">Live Index</span>
        </div>

        <button 
          className="btn-text-info"
          onClick={() => setShowMethodology(!showMethodology)}
        >
          <HelpCircle size={14} />
          <span>Methodology</span>
        </button>
      </div>

      {showMethodology && (
        <div className="methodology-banner">
          <p>
            <strong>YouTubeHub Ranking Methodology:</strong> Rankings are calculated by combining verified public subscriber count (40%), 12-month upload consistency & contribution streak (35%), and average engagement velocity (25%). No artificial boosts or bought scores.
          </p>
        </div>
      )}

      {/* 3 Compact Ranking Cards */}
      <div className="ranking-cards-row">
        <div className="rank-badge-card">
          <div className="rank-badge-header">
            <Globe size={16} className="rank-icon-globe" />
            <span className="rank-badge-title">Global Standing</span>
          </div>
          <div className="rank-badge-number">#{globalRank.toLocaleString()}</div>
          <span className="rank-badge-sub">Top 0.5% worldwide creators</span>
        </div>

        <div className="rank-badge-card">
          <div className="rank-badge-header">
            <MapPin size={16} className="rank-icon-region" />
            <span className="rank-badge-title">Regional ({creator.country || 'Global'})</span>
          </div>
          <div className="rank-badge-number">#{regionRank.toLocaleString()}</div>
          <span className="rank-badge-sub">Verified geographic standing</span>
        </div>

        <div className="rank-badge-card">
          <div className="rank-badge-header">
            <Tag size={16} className="rank-icon-tag" />
            <span className="rank-badge-title">Category ({creator.category || 'Tech'})</span>
          </div>
          <div className="rank-badge-number">#{categoryRank.toLocaleString()}</div>
          <span className="rank-badge-sub">Category leader benchmark</span>
        </div>
      </div>

      {/* Inline Leaderboard Preview */}
      <div className="leaderboard-table-container">
        <div className="leaderboard-header-row">
          <span className="th-rank">Rank</span>
          <span className="th-creator">Creator</span>
          <span className="th-category">Niche</span>
          <span className="th-tier">Tier</span>
          <span className="th-subs">Subscribers</span>
        </div>

        <div className="leaderboard-list">
          {leaderboardItems.map((item) => {
            const isSelf = item.handle.toLowerCase() === currentHandle.toLowerCase();

            return (
              <div 
                key={item.handle} 
                className={`leaderboard-row ${isSelf ? 'active-creator-row' : ''}`}
                onClick={() => onSelectCreator(item.handle)}
              >
                <div className="td-rank">
                  <span className={`rank-pill ${item.rank <= 3 ? 'rank-top3' : ''}`}>
                    #{item.rank}
                  </span>
                </div>

                <div className="td-creator">
                  <span className="creator-title-text">{item.title}</span>
                  <span className="creator-handle-text">{item.handle}</span>
                  {isSelf && <span className="self-tag">Current Profile</span>}
                </div>

                <div className="td-category">
                  <span className="category-pill">{item.category}</span>
                </div>

                <div className="td-tier">
                  <span className="tier-pill">{item.level}</span>
                </div>

                <div className="td-subs">
                  <span className="subs-number">{formatCompactNumber(item.subscribers)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="leaderboard-expand-bar">
          <button 
            className="btn-toggle-expansion"
            onClick={() => setShowFullLeaderboard(!showFullLeaderboard)}
          >
            <span>{showFullLeaderboard ? 'Collapse Leaderboard' : 'Expand Community Standings'}</span>
            {showFullLeaderboard ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>
    </section>
  );
}
