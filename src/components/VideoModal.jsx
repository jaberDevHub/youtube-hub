import React from 'react';
import { X, ExternalLink, Play } from 'lucide-react';
import { formatCompactNumber } from '../services/youtubeApi';

export function VideoModal({ video, onClose }) {
  if (!video) return null;

  // Extract video ID if applicable
  let videoEmbedUrl = null;
  if (video.id && !video.id.startsWith('vid-') && !video.id.startsWith('gen-')) {
    videoEmbedUrl = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card video-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title video-modal-title">{video.title}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body video-modal-body">
          {videoEmbedUrl ? (
            <div className="video-iframe-wrap">
              <iframe
                src={videoEmbedUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="video-fallback-preview">
              <img src={video.thumbnail} alt={video.title} className="fallback-img" />
              <div className="fallback-overlay">
                <a 
                  href={video.url || 'https://youtube.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-open-youtube"
                >
                  <Play size={16} fill="currentColor" />
                  <span>Watch on YouTube</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          )}

          <div className="video-modal-details">
            <div className="detail-meta">
              <span>{formatCompactNumber(video.viewCount)} views</span>
              <span>•</span>
              <span>Duration: {video.duration || '12:00'}</span>
            </div>
            <a 
              href={video.url || `https://youtube.com/watch?v=${video.id}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="link-direct-yt"
            >
              Open directly on YouTube <ExternalLink size={12} className="inline-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
