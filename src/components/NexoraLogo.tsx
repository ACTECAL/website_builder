import React from 'react';
import '../styles/CreativeBits.css';

interface NexoraLogoProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  size?: number;
}

export const NexoraLogo: React.FC<NexoraLogoProps> = ({ 
  className = '', 
  style = {},
  color = '#0f172a',
  size = 32
}) => {
  return (
    <div 
      className={`nexora-logo-container ${className}`}
      style={{ '--nexora-color': color, ...style } as React.CSSProperties}
    >
      <div className="nexora-icon-wrapper" style={{ width: size, height: size }}>
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="nexora-icon-svg"
        >
          <defs>
            <linearGradient id="nexoraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="f1" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceAlpha" dx="0" dy="2" />
              <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>
          <path 
            d="M50 5 L85 25 L85 65 L50 85 L15 65 L15 25 L50 5Z" 
            fill="url(#nexoraGradient)" 
            opacity="0.15"
          />
          <path 
            d="M50 15 L78 30 L78 60 L50 75 L22 60 L22 30 L50 15Z" 
            stroke="url(#nexoraGradient)" 
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path 
            d="M50 35 L65 42 L65 58 L50 65 L35 58 L35 42 L50 35Z" 
            fill="url(#nexoraGradient)"
          />
          <circle cx="50" cy="50" r="5" fill="white" opacity="0.8" />
        </svg>
      </div>
      <div className="nexora-text">
        Nexora
      </div>
    </div>
  );
};

export const NexoraLogoDramatic = NexoraLogo;
export const NexoraLogoExact = NexoraLogo;

export default NexoraLogo;
