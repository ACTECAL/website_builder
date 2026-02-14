import React from 'react';

interface ActyxLogoProps {
    showBadge?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export const ActyxLogoComponent: React.FC<ActyxLogoProps> = ({ showBadge, className = '', style }) => {
    return (
        <div
            className={`d-flex align-items-center gap-2 ${className}`}
            style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                ...style
            }}
        >
            <div
                className="d-flex align-items-center justify-content-center rounded-3 shadow-sm"
                style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #714B67 0%, #017E84 100%)',
                    color: 'white',
                    fontSize: '1.2rem'
                }}
            >
                A
            </div>
            <div className="d-flex flex-column" style={{ lineHeight: 1 }}>
                <span style={{ color: '#4A4A4A', letterSpacing: '-0.5px' }}>Actyx</span>
            </div>
        </div>
    );
};
