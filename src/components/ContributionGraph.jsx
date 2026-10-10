import React, { useState, useMemo } from 'react';
import { Calendar, Flame, Video, Zap, Trophy, Filter } from 'lucide-react';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export function ContributionGraph({ contributions, stats }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'video', 'shorts', 'milestone'
  const [hoveredCell, setHoveredCell] = useState(null);

  // Group contributions into 53 weeks of 7 days
  const { weeks, monthHeaders } = useMemo(() => {
    const list = contributions || [];
    const groupedWeeks = [];
    const headers = [];
    let currentWeek = [];
    let lastMonth = -1;

    list.forEach((day, index) => {
      const d = new Date(day.date);
      const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
      const month = d.getMonth();

      // Check if this week starts a new month
      if (month !== lastMonth && currentWeek.length === 0) {
        headers.push({
          month: MONTH_NAMES[month],
          weekIndex: groupedWeeks.length
        });
        lastMonth = month;
      }

      currentWeek.push(day);

      if (dayOfWeek === 6 || index === list.length - 1) {
        // Pad beginning if first week doesn't have 7 days
        if (groupedWeeks.length === 0 && currentWeek.length < 7) {
          const emptyDaysNeeded = 7 - currentWeek.length;
          const padded = Array(emptyDaysNeeded).fill(null).concat(currentWeek);
          groupedWeeks.push(padded);
        } else {
          groupedWeeks.push(currentWeek);
        }
        currentWeek = [];
      }
    });

    return { weeks: groupedWeeks, monthHeaders: headers };
  }, [contributions]);

  // Compute cell level (0 - 4) based on filter
  const getCellDetails = (cell) => {
    if (!cell) return { count: 0, level: 0, activities: [] };

    let count = cell.count;
    let activities = cell.activities || [];

    if (activeFilter !== 'all') {
      activities = activities.filter(a => a.type === activeFilter);
      count = activities.length;
    }

    let level = 0;
    if (count > 0) {
      if (count === 1) level = 1;
      else if (count === 2) level = 2;
      else if (count === 3) level = 3;
      else level = 4;
    }

    return { count, level, activities, date: cell.date };
  };

  const currentStreak = stats.currentStreak || 12;
  const longestStreak = stats.longestStreak || 34;
  const activeWeeks = stats.activeWeeks || 47;
  const totalActivities = stats.activitiesThisYear || 184;
  const videosThisYear = stats.videosThisYear || 68;

  return (
    <section className="section-card contribution-section">
      <div className="section-header">
        <div className="section-title-group">
          <Calendar size={18} className="text-yt-red" />
          <h2 className="section-title">Contributions</h2>
          <span className="section-badge">12 Months</span>
        </div>

        {/* Filter Tabs */}
        <div className="heatmap-filter-group">
          <button 
            className={`heatmap-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Activity
          </button>
          <button 
            className={`heatmap-filter-btn ${activeFilter === 'video' ? 'active' : ''}`}
            onClick={() => setActiveFilter('video')}
          >
            <Video size={12} />
            Videos
          </button>
          <button 
            className={`heatmap-filter-btn ${activeFilter === 'shorts' ? 'active' : ''}`}
            onClick={() => setActiveFilter('shorts')}
          >
            <Zap size={12} />
            Shorts
          </button>
          <button 
            className={`heatmap-filter-btn ${activeFilter === 'milestone' ? 'active' : ''}`}
            onClick={() => setActiveFilter('milestone')}
          >
            <Trophy size={12} />
            Milestones
          </button>
        </div>
      </div>

      {/* Heatmap Matrix */}
      <div className="heatmap-scroll-container">
        <div className="heatmap-matrix">
          {/* Month headers row */}
          <div className="heatmap-months-row">
            <div className="day-label-placeholder"></div>
            <div className="months-wrapper">
              {monthHeaders.map((hdr, idx) => (
                <span 
                  key={idx} 
                  className="month-label"
                  style={{ left: `${hdr.weekIndex * 15}px` }}
                >
                  {hdr.month}
                </span>
              ))}
            </div>
          </div>

          {/* Grid area with day-of-week labels on left and 7 rows of cells */}
          <div className="heatmap-grid-wrapper">
            <div className="day-labels-col">
              {DAY_LABELS.map((label, idx) => (
                <span key={idx} className="day-label">{label}</span>
              ))}
            </div>

            <div className="weeks-container">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="week-col">
                  {week.map((day, dIdx) => {
                    if (!day) {
                      return <div key={`empty-${dIdx}`} className="heat-cell empty-cell" />;
                    }
                    const { count, level, activities, date } = getCellDetails(day);
                    return (
                      <div
                        key={day.date}
                        className={`heat-cell heat-lvl-${level}`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredCell({
                            date,
                            count,
                            activities,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 10
                          });
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="heatmap-legend-row">
          <span className="legend-hint">Official YouTube uploads, shorts & milestones</span>
          <div className="legend-scale">
            <span className="legend-label">Less</span>
            <div className="heat-cell heat-lvl-0" />
            <div className="heat-cell heat-lvl-1" />
            <div className="heat-cell heat-lvl-2" />
            <div className="heat-cell heat-lvl-3" />
            <div className="heat-cell heat-lvl-4" />
            <span className="legend-label">More</span>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredCell && (
        <div 
          className="heatmap-tooltip"
          style={{ 
            left: `${hoveredCell.x}px`, 
            top: `${hoveredCell.y}px` 
          }}
        >
          <div className="tooltip-date">
            {new Date(hoveredCell.date).toLocaleDateString('en-US', { 
              weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' 
            })}
          </div>
          <div className="tooltip-count">
            {hoveredCell.count === 0 ? (
              'No recorded activity'
            ) : (
              <span><strong>{hoveredCell.count}</strong> activities on this day</span>
            )}
          </div>
          {hoveredCell.activities.length > 0 && (
            <ul className="tooltip-activities">
              {hoveredCell.activities.map((act, i) => (
                <li key={i} className="tooltip-act-item">
                  <span className={`act-dot act-${act.type}`}></span>
                  {act.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Activity Statistics Summary Row */}
      <div className="heatmap-stats-strip">
        <div className="activity-stat-item">
          <span className="stat-strip-val">{totalActivities}</span>
          <span className="stat-strip-lbl">Total activities in last year</span>
        </div>
        <div className="activity-stat-divider" />
        <div className="activity-stat-item">
          <span className="stat-strip-val text-yt-red flex-inline">
            <Flame size={16} className="inline-icon" />
            {currentStreak} days
          </span>
          <span className="stat-strip-lbl">Current publishing streak</span>
        </div>
        <div className="activity-stat-divider" />
        <div className="activity-stat-item">
          <span className="stat-strip-val">{longestStreak} days</span>
          <span className="stat-strip-lbl">Longest recorded streak</span>
        </div>
        <div className="activity-stat-divider" />
        <div className="activity-stat-item">
          <span className="stat-strip-val">{activeWeeks} / 52</span>
          <span className="stat-strip-lbl">Active publishing weeks</span>
        </div>
        <div className="activity-stat-divider" />
        <div className="activity-stat-item">
          <span className="stat-strip-val">{videosThisYear}</span>
          <span className="stat-strip-lbl">Videos published this year</span>
        </div>
      </div>
    </section>
  );
}
