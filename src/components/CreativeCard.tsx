import React, { useState, useRef } from 'react';

interface CreativeCardProps {
  children: React.ReactNode;
  variant?: 'glass' | 'neon' | 'gradient' | 'minimal' | 'cyber';
  hoverEffect?: 'lift' | 'glow' | 'rotate' | 'scale' | 'slide';
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const CreativeCard: React.FC<CreativeCardProps> = ({
  children,
  variant = 'glass',
  hoverEffect = 'lift',
  size = 'medium',
  interactive = true,
  className = '',
  style = {},
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: '16px',
      padding: size === 'small' ? '16px' : size === 'large' ? '32px' : '24px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: interactive ? 'pointer' : 'default',
      position: 'relative' as const,
      overflow: 'hidden' as const
    };

    switch (variant) {
      case 'glass':
        return {
          ...baseStyles,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        };

      case 'neon':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: '2px solid transparent',
          backgroundClip: 'padding-box',
          boxShadow: isHovered
            ? '0 0 20px rgba(102, 126, 234, 0.5), 0 0 40px rgba(102, 126, 234, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.1)'
        };

      case 'gradient':
        return {
          ...baseStyles,
          background: "linear-gradient(237deg, rgb(102,126,234) 0%, rgb(118,75,162) 35%, rgb(240,147,251) 65%, rgb(255,125,66) 100%)",
          backgroundSize: '200% 200%',
          animation: isHovered ? 'gradientShift 2s ease infinite' : 'none',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
        };

      case 'minimal':
        return {
          ...baseStyles,
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        };

      case 'cyber':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)',
          border: '1px solid #00ffff',
          boxShadow: isHovered
            ? '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)'
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
          color: '#00ffff'
        };

      default:
        return baseStyles;
    }
  };

  const getHoverStyles = () => {
    if (!isHovered || !interactive) return {};

    switch (hoverEffect) {
      case 'lift':
        return {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
        };

      case 'glow':
        return {
          boxShadow: '0 0 30px rgba(102, 126, 234, 0.4)',
          transform: 'scale(1.02)'
        };

      case 'rotate':
        return {
          transform: 'rotateY(5deg) rotateX(5deg)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
        };

      case 'scale':
        return {
          transform: 'scale(1.05)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
        };

      case 'slide':
        return {
          transform: 'translateX(10px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
        };

      default:
        return {};
    }
  };

  const getInteractiveStyles = () => {
    if (!interactive || !isHovered) return {};

    const { x, y } = mousePosition;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return {};

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
    };
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...getVariantStyles(),
        ...getHoverStyles(),
        ...getInteractiveStyles(),
        ...style
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {variant === 'cyber' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
          animation: 'cyberScan 2s linear infinite'
        }} />
      )}

      {children}

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes cyberScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

interface CardGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const CardGrid: React.FC<CardGridProps> = ({
  children,
  columns = 3,
  gap = 24,
  className = '',
  style = {}
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        width: '100%',
        ...style
      }}
    >
      {children}
    </div>
  );
};
