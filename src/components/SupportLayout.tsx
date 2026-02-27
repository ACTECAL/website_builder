import React, { useEffect, useState } from 'react';

interface SupportLayoutProps {
  title: string;
  intro?: string;
  heroImageUrl?: string;
  heroGallery?: string[];
  children: React.ReactNode;
}

const baseTextColor = '#1f2937';

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
    <main style={{ background: '#fff5eb', minHeight: '100vh', color: baseTextColor }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: isMobile ? '32px 20px 48px' : '44px 24px 60px' }}>
        <header
          style={{
            display: 'grid',
            gap: isMobile ? 28 : 40,
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(280px, 360px)',
            alignItems: 'center',
            marginBottom: isMobile ? 24 : 32
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: isMobile ? '2.1rem' : '2.8rem',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.02em'
            }}
          >
            {title}
          </h1>
          <div
            style={{
              width: '100%',
              height: isMobile ? 180 : 220,
              borderRadius: 18,
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 22px 40px rgba(30, 41, 59, 0.18)'
            }}
          />
        </header>
        {intro && (
          <p
            style={{
              margin: '0 0 20px',
              maxWidth: 720,
              color: '#4b5563',
              fontSize: '1.05rem',
              lineHeight: 1.7
            }}
          >
            {intro}
          </p>
        )}

        <div
          style={{
            display: 'grid',
            gap: 12,
            gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, minmax(0, 1fr))`,
            marginBottom: 24
          }}
        >
          {galleryImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              style={{
                width: '100%',
                paddingBottom: '70%',
                borderRadius: 16,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 14px 28px rgba(15, 23, 42, 0.18)'
              }}
            />
          ))}
        </div>

        <div style={{ color: '#374151', lineHeight: 1.8 }}>{children}</div>
      </div>
    </main>
  );
};
export default SupportLayout;
