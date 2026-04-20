import React, { useState, useRef } from 'react';
import '../styles/CreativeCard.css';

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
      '--rotate-x': `${rotateX}deg`,
      '--rotate-y': `${rotateY}deg`
    } as React.CSSProperties;
  };

  return (
    <div
      ref={cardRef}
      className={`creative-card variant-${variant} size-${size} hover-${hoverEffect} ${isHovered ? 'hovered' : ''} ${interactive ? 'interactive' : ''} ${className}`}
      style={{
        ...getInteractiveStyles(),
        ...style
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {variant === 'cyber' && (
        <div className="cyber-scanner" />
      )}

      {children}

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
      className={`card-grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        ...style
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
