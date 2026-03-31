import React, { useMemo, useState } from 'react';
import ScribbleDecorations from './Scribbles';

export type Category = {
  title: string;
  color: string;
  links: { label: string; href: string }[];
  iconUrl?: string;
};

type Props = {
  categories: Category[];
  collapsible?: boolean;
  toggleImageUrl?: string;
};

export const CategoryGrid: React.FC<Props> = ({ categories, collapsible = false, toggleImageUrl }) => {
  const initialOpen = useMemo(() => categories.map(() => !collapsible), [categories, collapsible]);
  const [open, setOpen] = useState<boolean[]>(initialOpen);

  const allOpen = open.every(Boolean);
  const toggleAll = () => setOpen(open.map(() => !allOpen));
  const toggleOne = (idx: number) => setOpen(prev => prev.map((v, i) => (i === idx ? !v : v)));

  return (
    <section style={{ padding: '40px 24px' }}>
      {collapsible && (
        <div style={{ maxWidth: 1160, margin: '0 auto 14px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={toggleAll} style={{
            background: 'transparent',
            border: '1px solid rgba(0,0,0,0.15)',
            padding: '8px 12px',
            borderRadius: 10,
            cursor: 'pointer'
          }}>
            {toggleImageUrl && (
              <img src={toggleImageUrl} alt="toggle" style={{ width: 20, height: 20, marginRight: 8, verticalAlign: 'middle' }} />
            )}
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </div>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 28,
        maxWidth: 1160,
        margin: '0 auto'
      }}>
        {categories.map((cat, idx) => (
          <div key={idx} style={{
            borderTop: `3px solid ${cat.color}`,
            paddingTop: 12
          }}>
            <h3 onClick={() => collapsible && toggleOne(idx)} style={{
              margin: '0 0 10px',
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
              color: cat.color,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: collapsible ? 'pointer' : 'default'
            }}>
              {cat.iconUrl && (
                <img src={cat.iconUrl} alt="" style={{ width: 18, height: 18 }} />
              )}
              <ScribbleDecorations.Underline color={cat.color}>{cat.title.toUpperCase()}</ScribbleDecorations.Underline>
              {collapsible && (
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{open[idx] ? '▾' : '▸'}</span>
              )}
            </h3>
            {(!collapsible || open[idx]) && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {cat.links.map((link, i) => (
                  <li key={i} style={{ marginBottom: 10 }}>
                    <a className="hover-bounce" href={link.href} style={{
                      color: '#334155',
                      textDecoration: 'none'
                    }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;


