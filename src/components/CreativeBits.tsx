import React from 'react';
import '../styles/CreativeBits.css';

type StickerButtonProps = {
  children: React.ReactNode;
  href?: string;
  color?: string;
};

export const StickerButton: React.FC<StickerButtonProps> = ({ children, href = '#', color = '#ffcc47' }) => {
  const content = (
    <span
      className="sticker-button-inner hover-bounce"
      style={{ '--sticker-color': color } as React.CSSProperties}
    >{children}</span>
  );
  return href ? <a href={href} className="sticker-button-link">{content}</a> : content;
};

type DoodleBackgroundProps = {
  children: React.ReactNode;
};

export const DoodleBackground: React.FC<DoodleBackgroundProps> = ({ children }) => {
  return (
    <div className="doodle-bg-root">
      <svg aria-hidden viewBox="0 0 800 200" preserveAspectRatio="none" className="doodle-bg-svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#6b7280" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div className="doodle-bg-content">{children}</div>
    </div>
  );
};

type HandBulletsProps = {
  items: string[];
};

export const HandBullets: React.FC<HandBulletsProps> = ({ items }) => {
  return (
    <ul className="hand-bullets">
      {items.map((item, idx) => (
        <li key={idx} className="hand-bullets-item">
          <span className="hand-bullets-star">✦</span>
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
