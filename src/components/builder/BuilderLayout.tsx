import React from 'react';
import { BuilderCanvas } from './BuilderCanvas';
import { BuilderChatPanel } from './BuilderChatPanel';
import { useBuilder } from './BuilderContext';
import { Monitor, Smartphone, Tablet, ZoomIn, ZoomOut, Eye, EyeOff } from 'lucide-react';
import './BuilderLayout.css';

const DeviceToggle: React.FC<{ device: any, setDevice: any }> = ({ device, setDevice }) => (
    <div className="dev-toggle-container">
        <button
            onClick={() => setDevice('desktop')}
            className={`dev-toggle-btn ${device === 'desktop' ? 'active' : 'inactive'}`}
            aria-label="Desktop view"
        >
            <Monitor size={16} />
        </button>
        <button
            onClick={() => setDevice('tablet')}
            className={`dev-toggle-btn ${device === 'tablet' ? 'active' : 'inactive'}`}
            aria-label="Tablet view"
        >
            <Tablet size={16} />
        </button>
        <button
            onClick={() => setDevice('mobile')}
            className={`dev-toggle-btn ${device === 'mobile' ? 'active' : 'inactive'}`}
            aria-label="Mobile view"
        >
            <Smartphone size={16} />
        </button>
    </div>
);

export const BuilderLayout: React.FC = () => {
    const { device, setDevice, zoom, setZoom, isPreviewMode, setIsPreviewMode } = useBuilder();

    return (
        <div className={`builder-root ${isPreviewMode ? 'preview-active' : ''}`} style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#030712' }}>
            <header className="builder-header">
                <div className="brand-section">
                    <div className="brand-icon-wrapper">
                        <span className="brand-icon-text">N</span>
                    </div>
                    <div className="brand-title-text">Nexora Studio</div>
                </div>

                {!isPreviewMode && (
                    <div>
                        <DeviceToggle device={device} setDevice={setDevice} />
                    </div>
                )}

                <div className="builder-controls">
                    {!isPreviewMode && (
                        <div className="zoom-controls">
                            <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="zoom-btn" aria-label="Zoom out"><ZoomOut size={14} /></button>
                            <span className="zoom-value">{Math.round(zoom * 100)}%</span>
                            <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="zoom-btn" aria-label="Zoom in"><ZoomIn size={14} /></button>
                        </div>
                    )}

                    <button 
                        className={`preview-toggle-btn ${isPreviewMode ? 'active' : ''}`} 
                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                        title={isPreviewMode ? 'Exit Preview' : 'Enter Preview'}
                    >
                        {isPreviewMode ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </header>

            <div className="builder-main-content">
                {!isPreviewMode && <BuilderChatPanel />}
                <BuilderCanvas />
            </div>
        </div>
    );
};
