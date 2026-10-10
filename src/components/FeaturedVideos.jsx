import React, { useState } from 'react';
import { Video, Play, ExternalLink, Eye, Clock, ThumbsUp, Plus } from 'lucide-react';
import { formatCompactNumber } from '../services/youtubeApi';

export function FeaturedVideos({ videos, onSelectVideo }) {
  const [visibleCount, setVisibleCount] = useState(6);

  const list = videos || [];
  const visibleVideos = list.slice(0, visibleCount);
  const hasMore = visibleCount < list.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const formatRelativeDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 1) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <section className="section-card featured-videos-section">
      <div className="section-header">
        <div className="section-title-group">
          <Video size={18} className="text-yt-red" />
          <h2 className="section-title">Published Videos & Uploads</h2>
          <span className="section-badge">{list.length} Videos</span>
        </div>

        <span className="section-hint">Inline video showcase</span>
      </div>

      <div className="videos-grid">
        {visibleVideos.map((vid) => (
          <div key={vid.id} className="video-card">
            <div className="video-thumbnail-wrapper" onClick={() => onSelectVideo(vid)}>
              <img 
                src={vid.thumbnail} 
                alt={vid.title} 
                className="video-thumbnail" 
                loading="lazy"
              />
              <div className="video-play-overlay">
                <div className="play-button-circle">
                  <Play size={18} fill="currentColor" />
                </div>
              </div>
              {vid.duration && (
                <span className="video-duration-badge">{vid.duration}</span>
              )}
            </div>

            <div className="video-info">
              <h3 
                className="video-title" 
                title={vid.title}
                onClick={() => onSelectVideo(vid)}
              >
                {vid.title}
              </h3>

              <div className="video-meta-row">
                <span className="video-meta-item">
                  <Eye size={13} />
                  {formatCompactNumber(vid.viewCount)} views
                </span>

                <span className="meta-dot">•</span>

                <span className="video-meta-item">
                  <Clock size={13} />
                  {formatRelativeDate(vid.publishedAt)}
                </span>
              </div>

              <div className="video-card-actions">
                <button 
                  className="btn-video-watch" 
                  onClick={() => onSelectVideo(vid)}
                >
                  <Play size={12} fill="currentColor" />
                  <span>Preview</span>
                </button>

                <a 
                  href={vid.url || `https://youtube.com/watch?v=${vid.id}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-video-yt-link"
                  title="Watch directly on YouTube"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="videos-load-more-row">
          <button className="btn-load-more" onClick={handleLoadMore}>
            <Plus size={15} />
            <span>Load More Videos ({list.length - visibleCount} remaining)</span>
          </button>
        </div>
      )}
    </section>
  );
}
