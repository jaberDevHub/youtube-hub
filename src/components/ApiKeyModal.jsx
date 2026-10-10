import React, { useState } from 'react';
import { X, Key, Check, Info, ShieldAlert } from 'lucide-react';

export function ApiKeyModal({ onClose, onApiKeySaved }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('ythub_api_key') || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('ythub_api_key', apiKey.trim());
    } else {
      localStorage.removeItem('ythub_api_key');
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      if (onApiKeySaved) onApiKeySaved();
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    localStorage.removeItem('ythub_api_key');
    setApiKey('');
    if (onApiKeySaved) onApiKeySaved();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <Key size={18} className="text-yt-red" />
            <h3 className="modal-title">YouTube Data API Configuration</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="modal-body">
          <p className="modal-desc">
            YouTubeHub includes rich authentic datasets for showcase creators (@mrbeast, @mkbhd, @fireship). 
            To resolve any arbitrary channel in real-time directly from Google, you can provide your official <strong>YouTube Data API v3</strong> key.
          </p>

          <div className="api-key-input-wrap">
            <label className="input-field-label">Google YouTube Data API v3 Key:</label>
            <input 
              type="password"
              className="api-key-input"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <div className="api-key-status-box">
            <Info size={14} className="text-muted" />
            <span>Key is kept locally in your browser storage and never transmitted to third parties.</span>
          </div>

          <div className="modal-actions-row">
            {apiKey && (
              <button type="button" className="btn-secondary" onClick={handleClear}>
                Clear Key
              </button>
            )}
            <button type="submit" className="btn-primary">
              {saved ? (
                <>
                  <Check size={14} />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save API Key</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
