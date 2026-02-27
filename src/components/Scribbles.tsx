import React from 'react';

type ScribbleUnderlineProps = {
  children: React.ReactNode;
  color?: string;
};

export const ScribbleUnderline: React.FC<ScribbleUnderlineProps> = ({ children, color = '#46b3ff' }) => {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 240 30"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -6,
          width: '100%',
          height: 14,
          pointerEvents: 'none'
        }}
      >
        <path
          d="M2 12 C 40 28, 80 -2, 120 12 S 200 28, 238 10"
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          style={{ filter: 'url(#scribble-blur)' }}
        />
        <defs>
          <filter id="scribble-blur">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>
      </svg>
    </span>
  );
};

type HighlightMarkerProps = {
  children: React.ReactNode;
  color?: string;
  paddingX?: number;
};

export const HighlightMarker: React.FC<HighlightMarkerProps> = ({ children, color = '#ffcc47', paddingX = 6 }) => {
  return (
    <span style={{
      position: 'relative',
      display: 'inline-block',
      padding: `2px ${paddingX}px`,
      fontWeight: 800
    }}>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          transform: 'skewX(-10deg) rotate(-1deg)',
          background: color,
          borderRadius: 6,
          opacity: 0.85,
          zIndex: 0
        }}
      />
    </span>
  );
};

type ArrowNoteProps = {
  text: string;
  color?: string;
  style?: React.CSSProperties;
};

export const ArrowNote: React.FC<ArrowNoteProps> = ({ text, color = '#7b5aa6', style }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, ...style }}>
      <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(10deg)' }}>
        <path d="M2 35 C 20 20, 40 20, 58 10" stroke={color} strokeWidth={4} strokeLinecap="round" fill="none" />
        <path d="M44 8 L58 10 L50 22" stroke={color} strokeWidth={4} fill="none" strokeLinecap="round" />
      </svg>
      <div style={{ color, fontStyle: 'italic', fontWeight: 700, whiteSpace: 'nowrap' }}>{text}</div>
    </div>
  );
};

const Scribbles = {
  Underline: ScribbleUnderline,
  Highlight: HighlightMarker,
  Note: ArrowNote
};

export default Scribbles;


