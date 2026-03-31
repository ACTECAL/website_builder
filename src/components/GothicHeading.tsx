import React from 'react';
import '../styles/GothicHeading.css';

interface GothicHeadingProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const GothicHeading: React.FC<GothicHeadingProps> = ({
  text,
  className = '',
  style = {},
  level = 1
}) => {
  const getLevelClass = () => `gothic-h${level}`;

  const tags = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
  } as const;

  const Tag = tags[level];

  return (
    <Tag
      className={`gothic-heading ${getLevelClass()} ${className}`}
      style={style}
    >
      {text}
    </Tag>
  );
};

// Convenience components for different heading levels
export const GothicH1: React.FC<Omit<GothicHeadingProps, 'level'>> = (props) => (
  <GothicHeading {...props} level={1} />
);

export const GothicH2: React.FC<Omit<GothicHeadingProps, 'level'>> = (props) => (
  <GothicHeading {...props} level={2} />
);

export const GothicH3: React.FC<Omit<GothicHeadingProps, 'level'>> = (props) => (
  <GothicHeading {...props} level={3} />
);

export const GothicH4: React.FC<Omit<GothicHeadingProps, 'level'>> = (props) => (
  <GothicHeading {...props} level={4} />
);

export const GothicH5: React.FC<Omit<GothicHeadingProps, 'level'>> = (props) => (
  <GothicHeading {...props} level={5} />
);

export const GothicH6: React.FC<Omit<GothicHeadingProps, 'level'>> = (props) => (
  <GothicHeading {...props} level={6} />
);

// Styled variants to satisfy demo imports
export const GothicHeadingFade: React.FC<Omit<GothicHeadingProps, 'level'>> = ({
  text,
  className = '',
  style = {}
}) => (
  <GothicHeading
    text={text}
    className={className}
    style={{ ...style }}
    level={1}
  />
);

export const GothicHeadingSharp: React.FC<Omit<GothicHeadingProps, 'level'>> = ({
  text,
  className = '',
  style = {}
}) => (
  <GothicHeading
    text={text}
    className={className}
    style={{ ...style }}
    level={1}
  />
);
