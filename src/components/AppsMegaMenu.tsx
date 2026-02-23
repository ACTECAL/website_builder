import React from 'react';
import { Link } from 'react-router-dom';
import { Package, PenTool, Cloud } from 'lucide-react';
import { appCategories } from '../data/appModules';

export const AppsMegaMenu: React.FC<{
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
    if (!isOpen) return null;

    // Map category titles to their respective colors
    const categoryColors: Record<string, string> = {
        'Finance': '#017e84',
        'Sales': '#e85a4f',
        'Websites': '#4d6c8b',
        'Supply Chain': '#75628b',
        'Human Resources': '#65738f',
        'Marketing': '#eb6b45',
        'Services': '#e66244',
        'Productivity': '#8b566b',
    };

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#ffffff',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                padding: '32px 0 0',
                zIndex: 999,
                cursor: 'default'
            }}
        >
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    columnGap: '48px',
                    rowGap: '40px',
                    marginBottom: '32px'
                }}>
                    {appCategories.map((category) => {
                        const color = categoryColors[category.title] || '#6366f1';
                        return (
                            <div key={category.title} style={{ display: 'flex', flexDirection: 'column' }}>
                                <h4 style={{
                                    color: color,
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    margin: '0 0 12px 0',
                                    paddingBottom: '8px',
                                    borderBottom: `1px solid ${color}33`
                                }}>
                                    {category.title}
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {category.modules.map(module => (
                                        <li key={module.slug}>
                                            <Link
                                                to={`/apps/${module.slug}`}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#4B5563',
                                                    fontSize: '0.85rem',
                                                    transition: 'color 0.15s ease'
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
                                                onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                                            >
                                                {module.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{
                borderTop: '1px solid rgba(0,0,0,0.06)',
                backgroundColor: '#fdfdfd',
                padding: '16px 24px'
            }}>
                <div style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '48px'
                }}>
                    <FooterLink icon={<Package size={16} />} text="Third party apps" to="/third-party" />
                    <FooterLink icon={<PenTool size={16} />} text="Odoo Studio" to="/studio" />
                    <FooterLink icon={<Cloud size={16} />} text="Odoo Cloud Platform" to="/cloud" />
                </div>
            </div>
        </div>
    );
};

const FooterLink = ({ icon, text, to }: { icon: React.ReactNode; text: string; to: string }) => (
    <Link
        to={to}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#4B5563',
            fontSize: '0.85rem',
            fontWeight: 500,
            transition: 'color 0.15s ease'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.color = '#111827';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.color = '#4B5563';
        }}
    >
        <div style={{ color: '#4B5563' }}>{icon}</div>
        {text}
    </Link>
);

