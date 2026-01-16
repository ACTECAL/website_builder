import React, { useEffect, useState, useRef } from 'react';

type Stat = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: string;
  color?: string;
  gradient?: string;
};

type Props = {
  stats: Stat[];
  title?: string;
  subtitle?: string;
  background?: string;
};

export const StatsSection: React.FC<Props> = ({
  stats,
  title = "our impact in numbers",
  subtitle = "see how we're helping teams around the world succeed",
  background = "linear-gradient(135deg, #714B67 0%, #017E84 100%)"
}) => {
  const [animatedStats, setAnimatedStats] = useState<Stat[]>(stats.map(s => ({ ...s, value: 0 })));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats(stats.map(stat => ({
        ...stat,
        value: Math.floor(stat.value * progress)
      })));

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(stats);
      }
    }, stepDuration);
  };

  return (
    <section
      ref={sectionRef}
      className="py-5 text-white position-relative overflow-hidden"
      style={{
        background,
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Background decoration */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }}></div>

      <div className="container position-relative z-1">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3">{title}</h2>
          <p className="lead text-white-50 mx-auto" style={{ maxWidth: 600 }}>
            {subtitle}
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {animatedStats.map((stat, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <div className="text-center p-4 rounded-4 h-100 position-relative group hover-lift" style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4" style={{
                  background: stat.gradient || 'transparent',
                  opacity: 0.1,
                  zIndex: -1
                }}></div>

                {stat.icon && (
                  <div className="mb-3 display-4 text-white">
                    {stat.icon}
                  </div>
                )}

                <div className="display-5 fw-bold mb-2 text-white">
                  {stat.prefix || ''}{stat.value.toLocaleString()}{stat.suffix || ''}
                </div>

                <div className="text-uppercase small fw-bold tracking-wider opacity-75">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info section */}
        <div className="mt-5 p-5 rounded-4 text-center bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-10 mx-auto" style={{ maxWidth: 900 }}>
          <h3 className="h3 mb-3 fw-bold">Transforming Industries</h3>
          <p className="mb-4 mx-auto text-white-50" style={{ maxWidth: 600 }}>
            Join thousands of companies that have transformed their business with our platform.
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-3 opacity-75">
            {['Fortune 500', 'Startups', 'Enterprise', 'SMBs', 'Remote Teams', 'Global'].map((type, idx) => (
              <span key={idx} className="badge rounded-pill bg-white bg-opacity-25 border border-white border-opacity-25 px-3 py-2">
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .hover-lift { transition: transform 0.3s ease, background 0.3s ease; }
        .hover-lift:hover { transform: translateY(-5px); background: rgba(255,255,255,0.15) !important; }
      `}</style>
    </section>
  );
};
