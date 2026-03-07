import React from 'react';
import '../styles/Scribbles.css';

type ScribbleUnderlineProps = {
  children: React.ReactNode;
  color?: string;
};

export const ScribbleUnderline: React.FC<ScribbleUnderlineProps> = ({ children, color = '#46b3ff' }) => {
  return (
    <span className="scribble-underline-wrapper">
      <span>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 240 30"
        preserveAspectRatio="none"
        className="scribble-svg"
      >
        <path
          d="M2 12 C 40 28, 80 -2, 120 12 S 200 28, 238 10"
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          className="scribble-path"
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
    <span
      className="highlight-marker-wrapper"
      style={{ padding: `2px ${paddingX}px` }}
    >
      <span className="highlight-text">{children}</span>
      <span
        aria-hidden
        className="highlight-bg"
        style={{ background: color }}
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
    <div className="arrow-note-wrapper" style={style}>
      <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-svg">
        <path d="M2 35 C 20 20, 40 20, 58 10" stroke={color} strokeWidth={4} strokeLinecap="round" fill="none" />
        <path d="M44 8 L58 10 L50 22" stroke={color} strokeWidth={4} fill="none" strokeLinecap="round" />
      </svg>
      <div className="arrow-text" style={{ color }}>{text}</div>
    </div>
  );
};


const Scribbles = {
  Underline: ScribbleUnderline,
  Highlight: HighlightMarker,
  Note: ArrowNote
};

export default Scribbles;


