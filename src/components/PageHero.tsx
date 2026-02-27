import React from 'react';
import { GothicH1 } from './GothicHeading';

type Props = {
  title: string;
  emphasize?: 'marker' | 'scribble' | 'none';
  subtitle?: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  textColor?: string;
};

export const PageHero: React.FC<Props> = ({ title, subtitle, imageUrl, icon, emphasize = 'marker', textColor = '#111111' }) => {
  const renderTitle = () => {
    if (emphasize === 'marker') {
      const [first, ...rest] = title.split(' ');
      return (
        <div style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', margin: 0 }}>
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
    if (emphasize === 'scribble') {
      return (
        <GothicH1
          text={title}
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', margin: 0, color: textColor }}
        />
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
    <section style={{ padding: '20px 24px' }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: (imageUrl || icon) ? '1.2fr 1fr' : '1fr',
        gap: 24,
        alignItems: 'start'
      }}>
        <div>
          {renderTitle()}
          {subtitle && (
            <p style={{ color: textColor, marginTop: 4, lineHeight: 1.7 }}>{subtitle}</p>
          )}
        </div>
        {(imageUrl || icon) && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {icon || <img src={imageUrl} alt="" style={{ width: '100%', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }} />}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHero;


