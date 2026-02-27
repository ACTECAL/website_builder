import React from 'react';
import { BuilderCanvas } from './BuilderCanvas';
import { BuilderChatPanel } from './BuilderChatPanel';
import { useBuilder } from './BuilderContext';
import { Monitor, Smartphone, Tablet, ZoomIn, ZoomOut } from 'lucide-react';

const DeviceToggle: React.FC<{ device: any, setDevice: any }> = ({ device, setDevice }) => (
    <div style={{ display: 'flex', background: '#f3f4f6', padding: 4, borderRadius: 8, gap: 4 }}>
        <button
            onClick={() => setDevice('desktop')}
            style={{ padding: 8, borderRadius: 6, border: 'none', background: device === 'desktop' ? 'white' : 'transparent', color: device === 'desktop' ? 'black' : '#6b7280', boxShadow: device === 'desktop' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer' }}
            aria-label="Desktop view"
        >
            <Monitor size={16} />
        </button>
        <button
            onClick={() => setDevice('tablet')}
            style={{ padding: 8, borderRadius: 6, border: 'none', background: device === 'tablet' ? 'white' : 'transparent', color: device === 'tablet' ? 'black' : '#6b7280', boxShadow: device === 'tablet' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer' }}
            aria-label="Tablet view"
        >
            <Tablet size={16} />
        </button>
        <button
            onClick={() => setDevice('mobile')}
            style={{ padding: 8, borderRadius: 6, border: 'none', background: device === 'mobile' ? 'white' : 'transparent', color: device === 'mobile' ? 'black' : '#6b7280', boxShadow: device === 'mobile' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer' }}
            aria-label="Mobile view"
        >
            <Smartphone size={16} />
        </button>
    </div>
);

export const BuilderLayout: React.FC = () => {
    const { device, setDevice, zoom, setZoom } = useBuilder();

    return (
        <div className="builder-root" style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'white' }}>
            <header style={{ height: 60, borderBottom: '1px solid #1e2126', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', background: '#0f1115', color: 'white', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', boxShadow: '0 0 10px rgba(168, 85, 247, 0.3)' }}>
                        <span style={{ fontSize: 18 }}>AI</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 16, color: '#f3f4f6' }}>GenWeb Builder</div>
                </div>

                <div>
                    <DeviceToggle device={device} setDevice={setDevice} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: '#1e2126', borderRadius: 8, padding: '4px 8px', border: '1px solid #2d3139' }}>
                        <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, color: '#9ca3af' }} aria-label="Zoom out"><ZoomOut size={14} /></button>
                        <span style={{ fontSize: 12, width: 40, textAlign: 'center', color: '#e5e7eb' }}>{Math.round(zoom * 100)}%</span>
                        <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, color: '#9ca3af' }} aria-label="Zoom in"><ZoomIn size={14} /></button>
                    </div>

                </div>
            </header>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <BuilderChatPanel />
                <BuilderCanvas />
            </div>
        </div>
    );
};
