import React, { useState } from 'react';
import { X, Copy, Check, Share2, Twitter, Linkedin, ExternalLink } from 'lucide-react';

export function ShareModal({ creator, onClose }) {
  const [copied, setCopied] = useState(false);
  const profileUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const tweetText = encodeURIComponent(`Check out ${creator.title}'s YouTube creator profile and 12-month contribution heatmap on YouTubeHub! 🚀\n${profileUrl}`);
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <Share2 size={18} className="text-yt-red" />
            <h3 className="modal-title">Share Creator Profile</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-desc">
            Share <strong>{creator.title}</strong>'s permanent YouTubeHub profile with your network, social channels, or portfolio.
          </p>

          <div className="share-link-input-group">
            <input 
              type="text" 
              className="share-input" 
              value={profileUrl} 
              readOnly 
            />
            <button className="btn-copy-modal" onClick={handleCopy}>
              {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <div className="share-social-row">
            <a 
              href={twitterShareUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-share-btn share-twitter"
            >
              <Twitter size={15} />
              <span>Post to X</span>
            </a>
            <a 
              href={linkedinShareUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-share-btn share-linkedin"
            >
              <Linkedin size={15} />
              <span>Share to LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
