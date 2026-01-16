import React, { useState } from 'react';
import { useBuilder } from './BuilderContext';
import { Palette, Sparkles } from 'lucide-react';
import { GeminiService } from '../../services/gemini';
import './ThemeEditor.css';

export const ThemeEditor: React.FC = () => {
    const { siteTheme, updateTheme, apiKey } = useBuilder();
    const [loading, setLoading] = useState(false);

    const handleRemix = async () => {
        if (!apiKey) {
            alert('Please enter your Gemini API Key in the chat to use Magic Remix.');
            return;
        }
        setLoading(true);
        try {
            const service = new GeminiService(apiKey);
            const prompt = `Generate a random, beautiful website color theme and font pairing.
            Return JSON only:
            {
                "colors": { "primary": "hex", "secondary": "hex", "text": "hex", "background": "hex", "accent": "hex" },
                "font": "font-family string",
                "borderRadius": "px value"
            }`;
            const response = await service.generateContent(prompt);
            const json = JSON.parse(response.replace(/```json/g, '').replace(/```/g, '').trim());
            updateTheme(json);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="theme-editor">
            <div className="panel-header">
                <h3><Palette size={16} /> Global Theme</h3>
            </div>

            <div className="theme-content">

                {/* AI Remix Button */}
                <div className="remix-section">
                    <button className="remix-btn" onClick={handleRemix} disabled={loading}>
                        <Sparkles size={16} className={loading ? 'spin' : ''} />
                        {loading ? 'Generating...' : 'Magic Remix'}
                    </button>
                    <p className="remix-hint">Let AI generate a fresh look for you.</p>
                </div>

                <div className="control-section">
                    <label>Colors</label>
                    <div className="color-grid">
                        <div className="color-item">
                            <div className="color-label">Primary</div>
                            <input
                                type="color"
                                value={siteTheme.colors.primary}
                                onChange={(e) => updateTheme({ colors: { ...siteTheme.colors, primary: e.target.value } })}
                            />
                        </div>
                        <div className="color-item">
                            <div className="color-label">Secondary</div>
                            <input
                                type="color"
                                value={siteTheme.colors.secondary}
                                onChange={(e) => updateTheme({ colors: { ...siteTheme.colors, secondary: e.target.value } })}
                            />
                        </div>
                        <div className="color-item">
                            <div className="color-label">Accent</div>
                            <input
                                type="color"
                                value={siteTheme.colors.accent}
                                onChange={(e) => updateTheme({ colors: { ...siteTheme.colors, accent: e.target.value } })}
                            />
                        </div>
                        <div className="color-item">
                            <div className="color-label">Background</div>
                            <input
                                type="color"
                                value={siteTheme.colors.background}
                                onChange={(e) => updateTheme({ colors: { ...siteTheme.colors, background: e.target.value } })}
                            />
                        </div>
                        <div className="color-item">
                            <div className="color-label">Text</div>
                            <input
                                type="color"
                                value={siteTheme.colors.text}
                                onChange={(e) => updateTheme({ colors: { ...siteTheme.colors, text: e.target.value } })}
                            />
                        </div>
                    </div>
                </div>

                <div className="control-section">
                    <label>Typography</label>
                    <select
                        value={siteTheme.font}
                        onChange={(e) => updateTheme({ font: e.target.value })}
                        className="font-select"
                    >
                        <option value="Inter, sans-serif">Inter</option>
                        <option value="Roboto, sans-serif">Roboto</option>
                        <option value="'Playfair Display', serif">Playfair Display</option>
                        <option value="'Poppins', sans-serif">Poppins</option>
                        <option value="'Courier New', monospace">Mono</option>
                    </select>
                </div>

                <div className="control-section">
                    <label>Border Radius ({siteTheme.borderRadius})</label>
                    <input
                        type="range"
                        min="0"
                        max="32"
                        value={parseInt(siteTheme.borderRadius)}
                        onChange={(e) => updateTheme({ borderRadius: `${e.target.value}px` })}
                        className="radius-slider"
                    />
                </div>
            </div>
        </div>
    );
};
