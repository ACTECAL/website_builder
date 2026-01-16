import React from 'react';
import '../styles/odoo-theme.css';

type Props = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  align?: 'left' | 'center';
  gradient?: boolean;
  // Legacy props compatibility
  emphasize?: 'marker' | 'scribble' | 'none';
  textColor?: string;
};

export const PageHero: React.FC<Props> = ({
  title,
  subtitle,
  imageUrl,
  icon,
  align = 'left',
  gradient = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emphasize, // Ignored
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  textColor, // Ignored - enforcing standard theme
}) => {
  return (
    <section className={`relative py-20 px-4 overflow-hidden ${gradient ? 'bg-gradient-to-b from-gray-50 to-white' : 'bg-white'}`}>
      <div className={`max-w-[1200px] mx-auto grid gap-12 items-center ${imageUrl || icon ? 'md:grid-cols-2' : ''} ${align === 'center' && !imageUrl && !icon ? 'text-center' : ''}`}>

        {/* Text Content */}
        <div className={align === 'center' && !imageUrl && !icon ? 'mx-auto max-w-3xl' : ''}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#212529] tracking-tight mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-gray-500 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Visual Content */}
        {(imageUrl || icon) && (
          <div className="flex items-center justify-center relative">
            {/* Decorator blob if needed */}
            <div className="absolute inset-0 bg-[#714B67]/5 rounded-full blur-3xl transform scale-75"></div>

            {icon && (
              <div className="relative z-10 text-9xl text-[#714B67] opacity-90 drop-shadow-2xl">
                {icon}
              </div>
            )}

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Hero Visual"
                className="relative z-10 w-full rounded-2xl shadow-xl shadow-gray-200 border border-gray-100 object-cover aspect-video hover:shadow-2xl transition-shadow duration-500 transform hover:scale-[1.01]"
              />
            )}
          </div>
        )}

      </div>

      {/* Subtle Background Elements for Odoo flair */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#714B67]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
    </section>
  );
};

export default PageHero;
