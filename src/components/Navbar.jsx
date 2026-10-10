import React, { useState } from 'react';
import { Youtube, Search, Sun, Moon, Key, ExternalLink, GitFork } from 'lucide-react';

export function Navbar({ onSelectCreator, currentHandle, isDark, onToggleTheme, onOpenApiKeyModal }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSelectCreator(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-brand" onClick={() => { window.location.hash = '#/landing'; }}>
            <div className="brand-icon">
              <Youtube size={22} className="yt-icon" />
            </div>
            <div className="brand-text">
              <span className="brand-name">YouTubeHub</span>
              <span className="brand-tag">v1.0</span>
            </div>
          </div>

          <nav className="navbar-quick-links">
            <button 
              className={`quick-pill ${currentHandle === '@mrbeast' ? 'active' : ''}`}
              onClick={() => onSelectCreator('@mrbeast')}
            >
              @mrbeast
            </button>
            <button 
              className={`quick-pill ${currentHandle === '@ufc' ? 'active' : ''}`}
              onClick={() => onSelectCreator('@ufc')}
            >
              @ufc
            </button>
            <button 
              className={`quick-pill ${currentHandle === '@mkbhd' ? 'active' : ''}`}
              onClick={() => onSelectCreator('@mkbhd')}
            >
              @mkbhd
            </button>
            <button 
              className={`quick-pill ${currentHandle === '@fireship' ? 'active' : ''}`}
              onClick={() => onSelectCreator('@fireship')}
            >
              @fireship
            </button>
          </nav>
        </div>

        <div className="navbar-right">
          <form className="navbar-search" onSubmit={handleSearchSubmit}>
            <Search size={14} className="search-icon" />
            <input 
              type="text" 
              placeholder="Jump to @handle or channel URL..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <kbd className="search-kbd">/</kbd>
          </form>

          <button 
            className="nav-icon-btn" 
            title="Configure YouTube Data API Key"
            onClick={onOpenApiKeyModal}
          >
            <Key size={16} />
          </button>

          <button 
            className="nav-icon-btn" 
            title="Toggle Light/Dark Theme"
            onClick={onToggleTheme}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-github-link"
            title="Inspired by GitHub Profiles"
          >
            <GitFork size={15} />
            <span>GitHub Style</span>
          </a>
        </div>
      </div>
    </header>
  );
}
