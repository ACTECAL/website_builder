import React, { useMemo, useState } from 'react';
import ScribbleDecorations from './Scribbles';
import '../styles/CategoryGrid.css';

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
    <section className="category-grid-section">
      {collapsible && (
        <div className="category-toggle-all">
          <button onClick={toggleAll} className="category-toggle-btn">
            {toggleImageUrl && (
              <img src={toggleImageUrl} alt="toggle" className="category-toggle-icon" />
            )}
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </div>
      )}
      <div className="category-grid-container">
        {categories.map((cat, idx) => (
          <div key={idx} className="category-column" style={{ '--cat-color': cat.color } as React.CSSProperties}>
            <h3 
              onClick={() => collapsible && toggleOne(idx)} 
              className={`category-title ${collapsible ? 'collapsible' : ''}`}
            >
              {cat.iconUrl && (
                <img src={cat.iconUrl} alt="" className="category-icon" />
              )}
              <ScribbleDecorations.Underline color={cat.color}>{cat.title.toUpperCase()}</ScribbleDecorations.Underline>
              {collapsible && (
                <span className="category-toggle-indicator">{open[idx] ? '▾' : '▸'}</span>
              )}
            </h3>
            {(!collapsible || open[idx]) && (
              <ul className="category-links-list">
                {cat.links.map((link, i) => (
                  <li key={i} className="category-link-item">
                    <a className="hover-bounce category-link" href={link.href}>
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


