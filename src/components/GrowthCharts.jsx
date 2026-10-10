import React from 'react';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';
import { formatCompactNumber } from '../services/youtubeApi';

export function GrowthCharts({ historyGrowth }) {
  const data = historyGrowth || [];

  if (data.length === 0) return null;

  // Max values for scale
  const maxSubs = Math.max(...data.map(d => d.subscribers || 0));
  const minSubs = Math.min(...data.map(d => d.subscribers || 0));
  const subRange = maxSubs - minSubs || 1;

  const maxViews = Math.max(...data.map(d => d.views || 0));
  const maxUploads = Math.max(...data.map(d => d.uploads || 1));

  // Compute SVG line path points for subscribers
  const chartWidth = 500;
  const chartHeight = 140;
  const paddingX = 25;
  const paddingY = 20;
  const usableWidth = chartWidth - paddingX * 2;
  const usableHeight = chartHeight - paddingY * 2;

  const points = data.map((item, index) => {
    const x = paddingX + (index / (data.length - 1)) * usableWidth;
    const norm = (item.subscribers - minSubs) / subRange;
    const y = chartHeight - paddingY - norm * usableHeight;
    return { x, y, item };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <section className="section-card growth-charts-section">
      <div className="section-header">
        <div className="section-title-group">
          <TrendingUp size={18} className="text-yt-red" />
          <h2 className="section-title">Creator Growth & Velocity</h2>
          <span className="section-badge">Recent Trajectory</span>
        </div>
        <span className="section-hint">Verified metric snapshots</span>
      </div>

      <div className="growth-charts-grid">
        {/* Subscriber Trend Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <span className="chart-title">Subscriber Growth</span>
            <span className="chart-latest">
              +{formatCompactNumber(maxSubs - minSubs)} over {data.length} periods
            </span>
          </div>

          <div className="svg-chart-container">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="svg-chart" preserveAspectRatio="none">
              <defs>
                <linearGradient id="subsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff0000" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#ff0000" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="var(--border-muted)" strokeDasharray="3 3" />
              <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="var(--border-muted)" strokeDasharray="3 3" />
              <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="var(--border-muted)" strokeDasharray="3 3" />

              {/* Area Fill */}
              <path d={areaD} fill="url(#subsGradient)" />

              {/* Trend Line */}
              <path d={pathD} fill="none" stroke="#ff0000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Dots */}
              {points.map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="4" fill="#ff0000" stroke="var(--bg-card)" strokeWidth="2" />
                </g>
              ))}
            </svg>
          </div>

          <div className="chart-x-labels">
            {data.map((item, i) => (
              <span key={i} className="chart-month-lbl">{item.month}</span>
            ))}
          </div>
        </div>

        {/* Upload Frequency & Views Bar Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <span className="chart-title">Upload Pace & Views</span>
            <span className="chart-latest">Monthly Release Velocity</span>
          </div>

          <div className="bar-chart-container">
            {data.map((item, idx) => {
              const uploadPct = Math.round((item.uploads / maxUploads) * 100);
              return (
                <div key={idx} className="bar-column">
                  <div className="bar-track">
                    <div 
                      className="bar-fill" 
                      style={{ height: `${uploadPct}%` }}
                      title={`${item.uploads} videos, ${formatCompactNumber(item.views)} views`}
                    />
                  </div>
                  <span className="bar-value">{item.uploads}</span>
                  <span className="bar-label">{item.month.split(' ')[0]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
