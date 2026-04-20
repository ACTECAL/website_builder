import React, { useEffect } from 'react';
import '../styles/AnimatedBackground.css';

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  variant?: 'gradient' | 'particles' | 'geometric' | 'waves' | 'neural';
  intensity?: 'low' | 'medium' | 'high';
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  variant = 'gradient',
  intensity = 'medium'
}) => {

  // Disable all background animations (particles, gradient shifting, etc.)
  useEffect(() => {
    // no-op: animations removed per request
  }, [variant, intensity]);

  // Animations are intentionally disabled to focus on the static elite background styles.
  const getVariantClass = () => {
    switch (variant) {
      case 'gradient': return 'bg-variant-gradient';
      case 'geometric': return 'bg-variant-geometric';
      case 'waves': return 'bg-variant-waves';
      case 'neural': return 'bg-variant-neural';
      default: return '';
    }
  };

  return (
    <div className={`animated-bg-root ${getVariantClass()}`}>
      {/* Particles animation removed */}

      {variant === 'geometric' && (
        <div className="bg-overlay-geometric" />
      )}

      {variant === 'waves' && (
        <div className="bg-overlay-waves" />
      )}

      <div className="animated-bg-content">
        {children}
      </div>
      {/* Removed gradientShift keyframes as animations are disabled */}
    </div>
  );
};
