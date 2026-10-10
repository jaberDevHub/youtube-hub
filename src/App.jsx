import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { ProfileHeader } from './components/ProfileHeader';
import { CreatorStats } from './components/CreatorStats';
import { ContributionGraph } from './components/ContributionGraph';
import { LevelProgression } from './components/LevelProgression';
import { Achievements } from './components/Achievements';
import { FeaturedVideos } from './components/FeaturedVideos';
import { GrowthCharts } from './components/GrowthCharts';
import { Rankings } from './components/Rankings';
import { AboutSection } from './components/AboutSection';
import { ShareModal } from './components/ShareModal';
import { VideoModal } from './components/VideoModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { resolveCreatorProfile, parseYouTubeInput } from './services/youtubeApi';
import { AlertCircle, ArrowLeft, Sparkles, Youtube } from 'lucide-react';

export function App() {
  const [creator, setCreator] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // 'share' | 'apiKey'
  const [activeVideo, setActiveVideo] = useState(null);
  const [viewMode, setViewMode] = useState(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    return hash && hash !== 'landing' ? 'profile' : 'landing';
  });

  // Read URL hash on load (e.g., #/@mrbeast or #/landing)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (!hash || hash === 'landing') {
        setViewMode('landing');
      } else {
        const handle = parseYouTubeInput(hash);
        loadCreator(handle);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Theme effect
  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }, [isDark]);

  const loadCreator = async (inputHandleOrUrl) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const profile = await resolveCreatorProfile(inputHandleOrUrl);
      setCreator(profile);
      setViewMode('profile');
      window.location.hash = `#/${profile.handle}`;
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to resolve creator profile. Please verify the URL or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateProfile = (urlOrHandle) => {
    loadCreator(urlOrHandle);
  };

  return (
    <div className={`app-container ${viewMode === 'profile' ? 'profile-view-mode' : 'landing-view-mode'}`}>
      {/* Top Navbar - Only shown on Landing Page */}
      {viewMode === 'landing' && (
        <Navbar 
          onSelectCreator={loadCreator}
          currentHandle={creator?.handle}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onOpenApiKeyModal={() => setActiveModal('apiKey')}
        />
      )}

      {/* Main Content Area */}
      <main className={`main-content ${viewMode === 'profile' ? 'main-content-profile' : ''}`}>
        {/* Error Alert */}
        {errorMessage && (
          <div className="error-alert">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Landing Page Generator Section */}
        {viewMode === 'landing' && (
          <LandingHero 
            onGenerateProfile={handleGenerateProfile}
            isLoading={isLoading}
          />
        )}

        {/* Single Complete Creator Profile - 100% Screen Visible Card with Ambient Red Glow */}
        {creator && viewMode === 'profile' && (
          <div className="profile-viewport-wrapper">
            {/* Ambient Light Blur BG YouTube Red Theme */}
            <div className="ambient-red-glow-container" aria-hidden="true">
              <div className="ambient-orb ambient-orb-1"></div>
              <div className="ambient-orb ambient-orb-2"></div>
              <div className="ambient-orb ambient-orb-3"></div>
              <div className="ambient-grid-overlay"></div>
            </div>

            <div className="single-profile-page screenshot-card-container">
              {/* A. Profile Header */}
              <ProfileHeader 
                creator={creator} 
                onShare={() => setActiveModal('share')}
                onNewProfile={() => {
                  window.location.hash = '#/landing';
                  setViewMode('landing');
                }}
              />

              {/* B. Creator Statistics (Subscribers, Views, Videos) */}
              <CreatorStats stats={creator.stats} />

              {/* C. Contribution Graph (Signature Heatmap) */}
              <ContributionGraph 
                contributions={creator.contributions} 
                stats={creator.stats} 
              />

              {/* E. Collectible Achievements (GitHub Icons) */}
              <Achievements achievements={creator.achievements} />
            </div>
          </div>
        )}
      </main>

      {/* Footer - Only shown on Landing Page */}
      {viewMode === 'landing' && (
        <footer className="app-footer">
          <div className="footer-container">
            <div className="footer-left">
              <Youtube size={16} className="text-yt-red" />
              <span className="footer-brand">YouTubeHub</span>
              <span className="footer-copy">© 2026. GitHub-Inspired Creator Profile Platform.</span>
            </div>
            <div className="footer-links">
              <span className="footer-pill">Official YouTube Data API Integration</span>
              <span className="footer-pill">Single-Page Architecture</span>
              <span className="footer-pill">Permanent Sharing</span>
            </div>
          </div>
        </footer>
      )}

      {/* Modals */}
      {activeModal === 'share' && creator && (
        <ShareModal 
          creator={creator} 
          onClose={() => setActiveModal(null)} 
        />
      )}

      {activeModal === 'apiKey' && (
        <ApiKeyModal 
          onClose={() => setActiveModal(null)}
          onApiKeySaved={() => {
            if (creator) loadCreator(creator.handle);
          }}
        />
      )}

      {activeVideo && (
        <VideoModal 
          video={activeVideo} 
          onClose={() => setActiveVideo(null)} 
        />
      )}
    </div>
  );
}

export default App;
