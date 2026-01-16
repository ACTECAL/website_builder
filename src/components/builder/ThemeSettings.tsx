import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Sun,
  Moon,
  Monitor,
  Palette,
  Sparkles,
  Eye,
  Zap,
  Layers,
  RotateCcw,
  Check,
  X,
  Settings,
  Sliders
} from 'lucide-react';

export const ThemeSettings: React.FC = () => {
  const { theme, setTheme, resetTheme, systemPrefersDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('appearance');

  const accentColors = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Green', value: '#10b981' },
    { name: 'Yellow', value: '#f59e0b' },
    { name: 'Red', value: '#ef4444' }
  ];

  const fontSizes = [
    { name: 'Small', value: 'small' as const, label: 'Aa' },
    { name: 'Medium', value: 'medium' as const, label: 'Aa' },
    { name: 'Large', value: 'large' as const, label: 'Aa' }
  ];

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'accessibility', name: 'Accessibility', icon: Eye },
    { id: 'advanced', name: 'Advanced', icon: Sliders }
  ];

  const handleAccentColorChange = (color: string) => {
    setTheme({ accentColor: color });
  };

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setTheme({ fontSize: size });
  };

  const handleModeChange = (mode: 'light' | 'dark' | 'auto') => {
    setTheme({ mode });
  };

  const toggleSetting = (setting: keyof typeof theme) => {
    setTheme({ [setting]: !theme[setting] });
  };

  return (
    <div className="theme-settings-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-settings-btn"
        title="Theme Settings"
      >
        <Settings size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="theme-settings-panel"
          >
            <div className="theme-settings-header">
              <h3 className="settings-title">
                <Sliders size={20} />
                Theme Settings
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="close-btn"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="settings-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <tab.icon size={16} />
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="settings-content">
              {activeTab === 'appearance' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="settings-section"
                >
                  <div className="setting-group">
                    <h4 className="group-title">Color Mode</h4>
                    <div className="mode-selector">
                      <button
                        onClick={() => handleModeChange('light')}
                        className={`mode-btn ${theme.mode === 'light' ? 'active' : ''}`}
                      >
                        <Sun size={16} />
                        Light
                      </button>
                      <button
                        onClick={() => handleModeChange('dark')}
                        className={`mode-btn ${theme.mode === 'dark' ? 'active' : ''}`}
                      >
                        <Moon size={16} />
                        Dark
                      </button>
                      <button
                        onClick={() => handleModeChange('auto')}
                        className={`mode-btn ${theme.mode === 'auto' ? 'active' : ''}`}
                      >
                        <Monitor size={16} />
                        Auto
                        {systemPrefersDark && <span className="system-indicator">System: Dark</span>}
                      </button>
                    </div>
                  </div>

                  <div className="setting-group">
                    <h4 className="group-title">Accent Color</h4>
                    <div className="color-selector">
                      {accentColors.map(color => (
                        <button
                          key={color.value}
                          onClick={() => handleAccentColorChange(color.value)}
                          className={`color-btn ${theme.accentColor === color.value ? 'active' : ''}`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        >
                          {theme.accentColor === color.value && <Check size={12} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="setting-group">
                    <h4 className="group-title">Font Size</h4>
                    <div className="font-size-selector">
                      {fontSizes.map(size => (
                        <button
                          key={size.value}
                          onClick={() => handleFontSizeChange(size.value)}
                          className={`font-size-btn ${theme.fontSize === size.value ? 'active' : ''}`}
                        >
                          <span 
                            className="font-preview"
                            style={{ 
                              fontSize: size.value === 'small' ? '0.75rem' : 
                                         size.value === 'large' ? '1.25rem' : '1rem' 
                            }}
                          >
                            {size.label}
                          </span>
                          <span className="font-name">{size.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'accessibility' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="settings-section"
                >
                  <div className="setting-group">
                    <h4 className="group-title">Motion & Animation</h4>
                    <div className="toggle-settings">
                      <label className="toggle-item">
                        <input
                          type="checkbox"
                          checked={theme.animations}
                          onChange={() => toggleSetting('animations')}
                        />
                        <div className="toggle-content">
                          <Zap size={16} />
                          <div>
                            <span className="toggle-label">Animations</span>
                            <span className="toggle-description">Enable smooth transitions and micro-interactions</span>
                          </div>
                        </div>
                      </label>
                      
                      <label className="toggle-item">
                        <input
                          type="checkbox"
                          checked={theme.reducedMotion}
                          onChange={() => toggleSetting('reducedMotion')}
                        />
                        <div className="toggle-content">
                          <Eye size={16} />
                          <div>
                            <span className="toggle-label">Reduced Motion</span>
                            <span className="toggle-description">Minimize animations for accessibility</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="setting-group">
                    <h4 className="group-title">Visual Enhancement</h4>
                    <div className="toggle-settings">
                      <label className="toggle-item">
                        <input
                          type="checkbox"
                          checked={theme.highContrast}
                          onChange={() => toggleSetting('highContrast')}
                        />
                        <div className="toggle-content">
                          <Eye size={16} />
                          <div>
                            <span className="toggle-label">High Contrast</span>
                            <span className="toggle-description">Increase contrast for better visibility</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'advanced' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="settings-section"
                >
                  <div className="setting-group">
                    <h4 className="group-title">Visual Effects</h4>
                    <div className="toggle-settings">
                      <label className="toggle-item">
                        <input
                          type="checkbox"
                          checked={theme.glassmorphism}
                          onChange={() => toggleSetting('glassmorphism')}
                        />
                        <div className="toggle-content">
                          <Layers size={16} />
                          <div>
                            <span className="toggle-label">Glassmorphism</span>
                            <span className="toggle-description">Frosted glass effects and transparency</span>
                          </div>
                        </div>
                      </label>
                      
                      <label className="toggle-item">
                        <input
                          type="checkbox"
                          checked={theme.shadows}
                          onChange={() => toggleSetting('shadows')}
                        />
                        <div className="toggle-content">
                          <Sparkles size={16} />
                          <div>
                            <span className="toggle-label">Shadows</span>
                            <span className="toggle-description">Depth and elevation effects</span>
                          </div>
                        </div>
                      </label>
                      
                      <label className="toggle-item">
                        <input
                          type="checkbox"
                          checked={theme.gradients}
                          onChange={() => toggleSetting('gradients')}
                        />
                        <div className="toggle-content">
                          <Palette size={16} />
                          <div>
                            <span className="toggle-label">Gradients</span>
                            <span className="toggle-description">Color gradient backgrounds and effects</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="setting-group">
                    <h4 className="group-title">Reset</h4>
                    <button
                      onClick={resetTheme}
                      className="reset-btn"
                    >
                      <RotateCcw size={16} />
                      Reset to Default
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="settings-footer">
              <div className="current-theme-info">
                <span className="info-label">Current:</span>
                <span className="info-value">
                  {theme.mode === 'auto' ? `Auto (${systemPrefersDark ? 'Dark' : 'Light'})` : 
                   theme.mode.charAt(0).toUpperCase() + theme.mode.slice(1)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSettings;
