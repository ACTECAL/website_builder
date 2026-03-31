import React from 'react';

type StickerButtonProps = {
  children: React.ReactNode;
  href?: string;
  color?: string;
};

export const StickerButton: React.FC<StickerButtonProps> = ({ children, href = '#', color = '#ffcc47' }) => {
  const content = (
    <span style={{
      display: 'inline-block',
      padding: '12px 18px',
      borderRadius: 14,
      background: color,
      fontWeight: 800,
      color: '#1f2937',
      boxShadow: '4px 6px 0 rgba(31,41,55,0.4)',
      transform: 'rotate(-2deg)',
      transition: 'transform 150ms ease, box-shadow 150ms ease'
    }}
      className="hover-bounce"
    >{children}</span>
  );
  return href ? <a href={href} style={{ textDecoration: 'none' }}>{content}</a> : content;
};

type DoodleBackgroundProps = {
  children: React.ReactNode;
};

export const DoodleBackground: React.FC<DoodleBackgroundProps> = ({ children }) => {
  return (
    <div style={{ position: 'relative' }}>
      <svg aria-hidden viewBox="0 0 800 200" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', height: '100%', opacity: 0.08 }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#6b7280" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
};

type HandBulletsProps = {
  items: string[];
};

export const HandBullets: React.FC<HandBulletsProps> = ({ items }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item, idx) => (
        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, color: '#334155' }}>
          <span style={{ fontSize: '1.2rem' }}>✦</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

const CreativeBits = {
  StickerButton,
  DoodleBackground,
  HandBullets
};

export default CreativeBits;


