import React, { useMemo, useState } from 'react';

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
    <section className="py-5">
      <div className="container" style={{ maxWidth: 1160 }}>
        {collapsible && (
          <div className="d-flex justify-content-end mb-3">
            <button onClick={toggleAll} className="btn btn-outline-secondary btn-sm rounded-pill px-3">
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
                cursor: collapsible ? 'pointer' : 'default',
                fontWeight: 700
              }}>
                {cat.iconUrl && (
                  <img src={cat.iconUrl} alt="" style={{ width: 18, height: 18 }} />
                )}
                <span style={{ borderBottom: `2px solid ${cat.color}` }}>{cat.title.toUpperCase()}</span>
                {collapsible && (
                  <span className="text-muted small ms-auto">{open[idx] ? '▾' : '▸'}</span>
                )}
              </h3>
              {(!collapsible || open[idx]) && (
                <ul className="list-unstyled mb-0">
                  {cat.links.map((link, i) => (
                    <li key={i} className="mb-2">
                      <a href={link.href} className="text-decoration-none text-secondary hover-text-dark transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .hover-text-dark:hover { color: #1a1a1a !important; }
        .transition-colors { transition: color 0.15s ease-in-out; }
      `}</style>
    </section>
  );
};

export default CategoryGrid;


