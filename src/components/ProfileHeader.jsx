import React, { useState } from 'react';
import { 
  Camera, Check, Globe, Twitter, Github, Disc as Discord, ShieldCheck, Download, Loader2, Sparkles 
} from 'lucide-react';
import { toPng, toBlob } from 'html-to-image';

function formatCompactNumber(number) {
  if (!number) return '0';
  const num = Number(number);
  if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toLocaleString();
}

export function ProfileHeader({ creator, onNewProfile }) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleShareImage = async () => {
    const cardElem = document.querySelector('.screenshot-card-container') || document.querySelector('.single-profile-page');
    if (!cardElem) return;

    setIsExporting(true);
    try {
      const exportFilter = (node) => {
        if (node.classList) {
          if (
            node.classList.contains('header-actions') ||
            node.classList.contains('btn-share-image') ||
            node.classList.contains('btn-generate-new') ||
            node.classList.contains('github-badge-tooltip')
          ) {
            return false;
          }
        }
        return true;
      };

      // 1. Capture high-res PNG image without buttons
      const dataUrl = await toPng(cardElem, {
        pixelRatio: 2,
        backgroundColor: '#090d13',
        filter: exportFilter
      });

      // 2. Download the clean card image file
      const link = document.createElement('a');
      link.download = `${creator.handle.replace('@', '')}-youtubehub-card.png`;
      link.href = dataUrl;
      link.click();

      // 3. Also copy clean image to clipboard if supported
      try {
        const blob = await toBlob(cardElem, { 
          pixelRatio: 2, 
          backgroundColor: '#090d13',
          filter: exportFilter
        });
        if (blob && navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        }
      } catch (clipErr) {
        // Clipboard optional
      }

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to capture profile card image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="profile-header-container">
      {/* Main Header Content - Clean Bannerless Profile */}
      <div className="profile-header-content">
        <div className="header-top-row">
          {/* Avatar */}
          <div className="avatar-wrapper">
            <img 
              src={creator.avatar} 
              alt={creator.title} 
              className="profile-avatar"
            />
            {creator.verified && (
              <div className="avatar-verified-badge" title="Verified YouTube Creator">
                <ShieldCheck size={16} />
              </div>
            )}
          </div>

          {/* Action Button - Share Image & Generate Profile */}
          <div className="header-actions">
            {onNewProfile && (
              <button 
                className="btn-action btn-generate-new"
                onClick={onNewProfile}
                title="Generate another YouTube creator profile"
              >
                <Sparkles size={14} className="text-yt-red" />
                <span>Generate Profile</span>
              </button>
            )}

            <button 
              className={`btn-action btn-share-image ${exportSuccess ? 'export-success' : ''}`}
              onClick={handleShareImage}
              disabled={isExporting}
              title="Save & Share High-Resolution Profile Image"
            >
              {isExporting ? (
                <>
                  <Loader2 size={15} className="spin-icon" />
                  <span>Generating Image...</span>
                </>
              ) : exportSuccess ? (
                <>
                  <Check size={15} className="text-green" />
                  <span>Image Saved & Copied!</span>
                </>
              ) : (
                <>
                  <Camera size={15} />
                  <span>Share Image</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Identity & Badges */}
        <div className="profile-identity">
          <div className="title-row">
            <h1 className="creator-name">{creator.title}</h1>
            <span className="creator-handle">{creator.handle}</span>

            {creator.category && (
              <span className="creator-category-badge">
                {creator.category}
              </span>
            )}
          </div>

          {/* GitHub README Shield Badges */}
          <div className="github-shields-bar">
            <span className="shield-badge shield-yt">
              <span className="shield-label">YouTube</span>
              <span className="shield-value">{formatCompactNumber(creator.stats?.subscribers)}</span>
            </span>
            <span className="shield-badge shield-views">
              <span className="shield-label">Views</span>
              <span className="shield-value">{formatCompactNumber(creator.stats?.views)}</span>
            </span>
            <span className="shield-badge shield-streak">
              <span className="shield-label">Streak</span>
              <span className="shield-value">{creator.stats?.currentStreak || 14}d 🔥</span>
            </span>
            <span className="shield-badge shield-status">
              <span className="shield-label">Tier</span>
              <span className="shield-value">{creator.stats?.subscribers >= 100000000 ? 'Mythic Apex' : creator.stats?.subscribers >= 10000000 ? 'Diamond' : 'Partner'}</span>
            </span>
          </div>

          {/* Channel Description & Bio */}
          <div className="bio-section">
            <p className="creator-bio">
              {creator.bio || creator.description}
            </p>
          </div>

          {/* Social Links & Channel Metadata */}
          <div className="creator-social-bar">
            {creator.socialLinks?.github && (
              <a href={creator.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-pill">
                <Github size={13} />
                <span>GitHub</span>
              </a>
            )}
            {creator.socialLinks?.twitter && (
              <a href={creator.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-pill">
                <Twitter size={13} />
                <span>Twitter / X</span>
              </a>
            )}
            {creator.socialLinks?.website && (
              <a href={creator.socialLinks.website} target="_blank" rel="noopener noreferrer" className="social-pill">
                <Globe size={13} />
                <span>Website</span>
              </a>
            )}
            {creator.socialLinks?.discord && (
              <a href={creator.socialLinks.discord} target="_blank" rel="noopener noreferrer" className="social-pill">
                <Discord size={13} />
                <span>Discord</span>
              </a>
            )}
            <div className="profile-meta-item">
              <span className="meta-label">Joined:</span>
              <span className="meta-value">{creator.joinedDate || '2021'}</span>
            </div>
            {creator.country && (
              <div className="profile-meta-item">
                <span className="meta-label">Region:</span>
                <span className="meta-value">{creator.country}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
