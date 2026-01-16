import React, { useEffect, useState } from 'react';

interface SupportLayoutProps {
  title: string;
  intro?: string;
  heroImageUrl?: string;
  heroGallery?: string[];
  children: React.ReactNode;
}

const baseTextColor = '#212529'; // Odoo body color

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
    <main className="bg-white min-vh-100 text-dark">
      <div className="container py-5 mt-5">
        <header className="mb-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4 ls-tight">{title}</h1>
              {intro && (
                <p className="lead text-muted mb-4">
                  {intro}
                </p>
              )}
            </div>
            <div className="col-lg-6">
              <div
                className="rounded-3 shadow w-100 bg-light"
                style={{
                  height: '300px',
                  backgroundImage: `url(${heroImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          </div>
        </header>

        <div className="row g-3 mb-5">
          {galleryImages.map((image, index) => (
            <div key={index} className="col-6 col-md-3">
              <div
                className="rounded-3 shadow-sm"
                style={{
                  paddingBottom: '60%',
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          ))}
        </div>

        <div className="text-dark">
          {children}
        </div>
      </div>
    </main>
  );
};
export default SupportLayout;
