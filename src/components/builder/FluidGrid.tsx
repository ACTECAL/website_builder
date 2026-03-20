import React from 'react';
import './FluidGrid.css';

interface FluidGridProps {
    children: React.ReactNode;
}

export const FluidGrid: React.FC<FluidGridProps> = ({ children }) => {
    return (
        <div className="fluid-grid-container">
            <div className="fluid-grid-nexus">
                {children}
            </div>
            {/* SVG Morphing Background Connections (Phase 13) */}
            <svg className="fluid-morph-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <filter id="fluid-blur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};
