import React, { useEffect, useState } from 'react';
import '../styles/SupportLayout.css';

interface SupportLayoutProps {
  title: string;
  intro?: string;
  heroImageUrl?: string;
  heroGallery?: string[];
  children: React.ReactNode;
}

export const SupportLayout: React.FC<SupportLayoutProps> = ({
  title,
  intro,
  heroImageUrl,
  heroGallery,
  children
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    const handleResize = () => update();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const heroImage = heroImageUrl ??
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80';

  const galleryImages = heroGallery ?? [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=320&q=80',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=320&q=80',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=320&q=80',
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=320&q=80'
  ];

  return (
    <main className="support-layout-main">
      <div className={`support-layout-container ${isMobile ? 'mobile' : 'desktop'}`}>
        <header className={`support-layout-header ${isMobile ? 'mobile' : 'desktop'}`}>
          <h1 className={`support-layout-title ${isMobile ? 'mobile' : 'desktop'}`}>
            {title}
          </h1>
          <div
            className={`support-layout-hero-img ${isMobile ? 'mobile' : 'desktop'}`}
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        </header>
        {intro && (
          <p className="support-layout-intro">
            {intro}
          </p>
        )}

        <div className={`support-layout-gallery ${isMobile ? 'mobile' : 'desktop'}`}>
          {galleryImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="support-layout-gallery-item"
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>

        <div className="support-layout-content">{children}</div>
      </div>
    </main>
  );
};
export default SupportLayout;
