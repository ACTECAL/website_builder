import React from 'react';
import { GothicH1 } from './GothicHeading';
import '../styles/PageHero.css';

type Props = {
  title: string;
  emphasize?: 'marker' | 'scribble' | 'none';
  subtitle?: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  textColor?: string;
};

export const PageHero: React.FC<Props> = ({ title, subtitle, imageUrl, icon, emphasize = 'marker', textColor = '#111111' }) => {
  const hasMedia = !!(imageUrl || icon);

  const renderTitle = () => {
    if (emphasize === 'marker') {
      const [first, ...rest] = title.split(' ');
      return (
        <div className="page-hero-title-wrapper">
          <GothicH1
            text={first}
            style={{ display: 'inline-block', marginRight: '0.5em', color: textColor }}
          />
          <GothicH1
            text={rest.join(' ')}
            style={{ display: 'inline-block', color: textColor }}
          />
        </div>
      );
    }
    return (
      <GothicH1
        text={title}
        style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', margin: 0, color: textColor }}
      />
    );
  };

  return (
    <section className="page-hero-section">
      <div className={`page-hero-container ${hasMedia ? 'with-media' : 'no-media'}`}>
        <div>
          {renderTitle()}
          {subtitle && (
            <p className="page-hero-subtitle" style={{ color: textColor }}>{subtitle}</p>
          )}
        </div>
        {hasMedia && (
          <div className="page-hero-media-wrapper">
            {icon || <img src={imageUrl} alt="" className="page-hero-img" />}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHero;


