import React, { useState } from 'react';
import { ArrowRight, Sparkles, Youtube, CheckCircle, ShieldCheck, Flame, Zap } from 'lucide-react';

export function LandingHero({ onGenerateProfile, isLoading }) {
  const [inputUrl, setInputUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onGenerateProfile(inputUrl.trim());
    }
  };

  const handleQuickPick = (handle) => {
    setInputUrl(handle);
    onGenerateProfile(handle);
  };

  return (
    <section className="landing-hero">
      <div className="hero-badge-container">
        <span className="hero-badge">
          <Sparkles size={13} className="hero-badge-icon" />
          The GitHub-Inspired Creator Profile Platform
        </span>
      </div>

      <h1 className="hero-title">
        One URL in. <br />
        <span className="hero-title-gradient">One complete creator homepage out.</span>
      </h1>

      <p className="hero-subtitle">
        Turn your YouTube channel into a gorgeous, information-rich developer-style profile. 
        Track a 12-month contribution heatmap, unlock tier achievements, showcase your stats, 
        and share your permanent public creator link.
      </p>

      <form className="hero-input-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <Youtube size={20} className="input-yt-icon" />
          <input 
            type="text" 
            className="hero-input"
            placeholder="Paste your YouTube channel URL or @handle (e.g. youtube.com/@mrbeast)..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            disabled={isLoading}
            autoFocus
          />
        </div>
        <button 
          type="submit" 
          className="hero-generate-btn"
          disabled={isLoading || !inputUrl.trim()}
        >
          {isLoading ? (
            <span className="btn-spinner">Resolving Channel...</span>
          ) : (
            <>
              <span>Generate My Profile</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <div className="hero-quickpicks">
        <span className="quickpick-label">Try instant verified creators:</span>
        <div className="quickpick-chips">
          <button type="button" className="quickpick-chip" onClick={() => handleQuickPick('@mrbeast')}>
            <span className="chip-avatar-dot"></span>
            @mrbeast
          </button>
          <button type="button" className="quickpick-chip" onClick={() => handleQuickPick('@ufc')}>
            <span className="chip-avatar-dot"></span>
            @ufc
          </button>
          <button type="button" className="quickpick-chip" onClick={() => handleQuickPick('@mkbhd')}>
            <span className="chip-avatar-dot"></span>
            @mkbhd
          </button>
          <button type="button" className="quickpick-chip" onClick={() => handleQuickPick('@fireship')}>
            <span className="chip-avatar-dot"></span>
            @fireship
          </button>
        </div>
      </div>

      <div className="hero-feature-pills">
        <div className="feature-pill">
          <CheckCircle size={14} className="pill-icon" />
          <span>Automatic YouTube Data Resolution</span>
        </div>
        <div className="feature-pill">
          <Flame size={14} className="pill-icon" />
          <span>12-Month Red Contribution Heatmap</span>
        </div>
        <div className="feature-pill">
          <ShieldCheck size={14} className="pill-icon" />
          <span>Verified Achievement Badges</span>
        </div>
        <div className="feature-pill">
          <Zap size={14} className="pill-icon" />
          <span>Zero Configuration Required</span>
        </div>
      </div>
    </section>
  );
}
