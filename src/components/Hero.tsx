import React, { useState, useEffect } from 'react';
import { ActyxLogo } from './ActyxLogo';

type HeroData = {
  heading: string;
  subheading: string;
  cta: { label: string; href: string };
  stats?: { label: string; value: string }[];
  badges?: string[];
};

type Props = {
  data: HeroData | null;
};

export const Hero: React.FC<Props> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!data) return null;

  return (
    <section className="d-flex align-items-center position-relative overflow-hidden text-white" style={{
      padding: '120px 0 80px',
      background: 'linear-gradient(135deg, #714B67 0%, #017E84 100%)', // Odoo-like gradient
      minHeight: '100vh',
    }}>

      {/* Background decoration */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }}></div>

      <div className="container position-relative z-1 text-center">

        {/* Animated badges */}
        {data.badges && (
          <div className={`mb - 4 transition - all duration - 1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} `}>
            {data.badges.map((badge, idx) => (
              <span key={idx} className="badge rounded-pill bg-white bg-opacity-25 border border-white border-opacity-25 px-3 py-2 me-2 mb-2 backdrop-blur-sm">
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Animated logo */}
        <div className={`mb - 4 transition - all duration - 1000 delay - 200 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} `} style={{ transitionDelay: '0.2s' }}>
          <div className="d-inline-block p-4 rounded-circle bg-white shadow-lg logo-wrapper">
            <ActyxLogo className="mb-4" />
          </div>
        </div>

        {/* Animated heading */}
        <h1 className={`display - 3 fw - bold mb - 4 transition - all duration - 1000 delay - 400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} `} style={{ transitionDelay: '0.4s', textShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
          {data.heading}
        </h1>

        {/* Animated subheading */}
        <p className={`lead mb - 5 mx - auto transition - all duration - 1000 delay - 600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} `} style={{ maxWidth: '800px', lineHeight: '1.6', transitionDelay: '0.6s', color: 'rgba(255,255,255,0.9)' }}>
          {data.subheading}
        </p>

        {/* Animated divider */}
        <div className={`mx - auto mb - 5 transition - all duration - 1000 delay - 800 ${isVisible ? 'w-24 opacity-100' : 'w-0 opacity-0'} `} style={{ height: '4px', background: '#FDBA26', borderRadius: '2px', width: '100px', transitionDelay: '0.8s' }}></div>

        {/* Animated CTA buttons */}
        <div className={`d - flex flex - wrap justify - content - center gap - 3 mb - 5 transition - all duration - 1000 delay - 1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} `} style={{ transitionDelay: '1s' }}>
          <a href={data.cta.href} className="btn btn-warning btn-lg rounded-pill px-5 shadow-lg fw-bold text-dark hover-scale">
            {data.cta.label}
          </a>
          <a href="#advisor" className="btn btn-outline-light btn-lg rounded-pill px-5 shadow-lg fw-bold hover-scale">
            Meet an advisor
          </a>
        </div>

        {/* Animated statistics */}
        {data.stats && (
          <div className={`row justify - content - center g - 4 mt - 4 border - top border - white border - opacity - 25 pt - 5 transition - all duration - 1000 delay - 1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} `} style={{ maxWidth: '900px', margin: '0 auto', transitionDelay: '1.2s' }}>
            {data.stats.map((stat, idx) => (
              <div key={idx} className="col-md-3 col-sm-6">
                <div className="text-center p-3 rounded-3 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-10 h-100">
                  <div className="display-6 fw-bold mb-1">{stat.value}</div>
                  <div className="small text-uppercase tracking-wider opacity-75">The only platform you will ever need. Actyx manages your entire business.</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
  .backdrop - blur - sm { backdrop - filter: blur(8px); }
        .hover - scale { transition: transform 0.2s; }
        .hover - scale:hover { transform: scale(1.05); }
        .transition - all { transition - property: all; transition - timing - function: cubic- bezier(0.4, 0, 0.2, 1); }
        .duration - 1000 { transition - duration: 1000ms; }
        .translate - y - 0 { transform: translateY(0); }
        .translate - y - 4 { transform: translateY(1rem); }
        .opacity - 100 { opacity: 1; }
        .opacity - 0 { opacity: 0; }
        .scale - 100 { transform: scale(1); }
        .scale - 95 { transform: scale(0.95); }
        .w - 24 { width: 6rem; }
        .w - 0 { width: 0; }
        .logo - wrapper { animation: float 6s ease -in -out infinite; }
@keyframes float {
  0 % { transform: translateY(0px); }
  50 % { transform: translateY(-10px); }
  100 % { transform: translateY(0px); }
}
`}</style>
    </section>
  );
};


