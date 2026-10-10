import React from 'react';
import { Info, Calendar, Globe, MapPin, Tag, ShieldCheck, Share2, Youtube, ExternalLink } from 'lucide-react';

export function AboutSection({ creator }) {
  return (
    <section className="section-card about-section">
      <div className="section-header">
        <div className="section-title-group">
          <Info size={18} className="text-muted" />
          <h2 className="section-title">About {creator.title}</h2>
          <span className="section-badge">Channel Details</span>
        </div>
      </div>

      <div className="about-content-grid">
        <div className="about-main-desc">
          <h3 className="about-heading">Creator Overview</h3>
          <p className="about-text">
            {creator.description || 'No detailed description provided for this channel.'}
          </p>

          {creator.bio && (
            <div className="about-bio-box">
              <span className="bio-box-title">Creator Note</span>
              <p className="bio-box-text">{creator.bio}</p>
            </div>
          )}
        </div>

        <div className="about-metadata-sidebar">
          <h3 className="about-heading">Metadata & Verification</h3>

          <div className="meta-list">
            <div className="meta-entry">
              <Calendar size={14} className="meta-icon" />
              <div className="meta-text-wrap">
                <span className="meta-key">Joined YouTube</span>
                <span className="meta-val">{creator.joinedDate || '2021'}</span>
              </div>
            </div>

            <div className="meta-entry">
              <MapPin size={14} className="meta-icon" />
              <div className="meta-text-wrap">
                <span className="meta-key">Channel Region</span>
                <span className="meta-val">{creator.country || 'Global'}</span>
              </div>
            </div>

            <div className="meta-entry">
              <Tag size={14} className="meta-icon" />
              <div className="meta-text-wrap">
                <span className="meta-key">Primary Focus</span>
                <span className="meta-val">{creator.category || 'Content Creator'}</span>
              </div>
            </div>

            <div className="meta-entry">
              <ShieldCheck size={14} className="meta-icon text-green" />
              <div className="meta-text-wrap">
                <span className="meta-key">Status</span>
                <span className="meta-val">Verified Public Profile</span>
              </div>
            </div>

            <div className="meta-entry">
              <Youtube size={14} className="meta-icon text-yt-red" />
              <div className="meta-text-wrap">
                <span className="meta-key">Permanent URL</span>
                <a 
                  href={`https://${creator.customUrl || 'youtube.com/' + creator.handle}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="meta-val link-val"
                >
                  {creator.customUrl || 'youtube.com/' + creator.handle}
                  <ExternalLink size={11} className="inline-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
