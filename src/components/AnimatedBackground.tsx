import React, { useEffect } from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: 'gradient' | 'particles' | 'geometric' | 'waves';
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

  const getBackgroundStyle = () => {
    switch (variant) {
      case 'gradient':
        return {
          background: 'linear-gradient(237deg, rgb(102,126,234) 0%, rgb(118,75,162) 35%, rgb(240,147,251) 65%, rgb(255,125,66) 100%)'
        };
      case 'geometric':
        return {
          background: 'linear-gradient(45deg, #1e3c72 0%, #2a5298 100%)',
          position: 'relative' as const,
          overflow: 'hidden' as const
        };
      case 'waves':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative' as const,
          overflow: 'hidden' as const
        };
      default:
        return {};
    }
  };

  return (
    <div style={{ position: 'relative', ...getBackgroundStyle() }}>
      {/* Particles animation removed */}

      {variant === 'geometric' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3,
          zIndex: 0
        }} />
      )}

      {variant === 'waves' && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"%3E%3Cpath d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="%23ffffff" fill-opacity="0.1"/%3E%3C/svg%3E")',
          backgroundSize: 'cover',
          zIndex: 0
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
      {/* Removed gradientShift keyframes as animations are disabled */}
    </div>
  );
};
