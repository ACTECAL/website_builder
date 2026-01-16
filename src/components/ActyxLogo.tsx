import React from 'react';

interface ActyxLogoProps {
  className?: string;
  style?: React.CSSProperties;
  showBadge?: boolean;
}

export const ActyxLogo: React.FC<ActyxLogoProps> = ({
  className = '',
  style = {},
  showBadge = false
}) => {
  return (
    <div
      className={`actyx-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontWeight: 800,
        margin: 0,
        padding: 0,
        color: '#714B67', // Odoo-like primary
        letterSpacing: '-0.03em',
        lineHeight: 1,
        position: 'relative',
        ...style
      }}
    >
      <span style={{ fontSize: 'inherit' }}>actyx</span>
      {showBadge && (
        <sup
          style={{
            fontSize: '0.4em',
            fontWeight: 600,
            color: '#017E84', // Teal accent
            opacity: 0.8,
            marginLeft: '4px',
            letterSpacing: '0.05em',
            transform: 'translateY(-0.2em)'
          }}
        >
          ERP
        </sup>
      )}
    </div>
  );
};

// Kept for compatibility but renders Actyx
export const ActyxLogoDramatic: React.FC<ActyxLogoProps> = ({
  className = '',
  style = {}
}) => {
  return (
    <div
      className={`actyx-logo-dramatic ${className}`}
      style={{
        display: 'inline-block',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 700,
        margin: 0,
        padding: 0,
        background: 'linear-gradient(135deg, #714B67 0%, #017E84 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        position: 'relative',
        ...style
      }}
    >
      Actyx
    </div>
  );
};
