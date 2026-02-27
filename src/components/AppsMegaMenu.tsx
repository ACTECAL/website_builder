import React from 'react';
import { Link } from 'react-router-dom';
import { Package, PenTool, Cloud } from 'lucide-react';
import { appCategories } from '../data/appModules';
import '../styles/AppsMegaMenu.css';

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
            className="apps-mega-menu"
        >
            <div className="apps-mega-menu-content">
                <div className="apps-grid">
                    {appCategories.map((category) => {
                        const color = categoryColors[category.title] || '#6366f1';
                        return (
                            <div key={category.title} className="apps-category">
                                <h4 className="apps-category-title" style={{
                                    color: color,
                                    borderBottom: `1px solid ${color}33`
                                }}>
                                    {category.title}
                                </h4>
                                <ul className="apps-items-list">
                                    {category.modules.map(module => (
                                        <li key={module.slug}>
                                            <Link
                                                to={`/apps/${module.slug}`}
                                                className="apps-item-link"
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

            <div className="apps-mega-menu-footer">
                <div className="footer-links-container">
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
        className="footer-link"
    >
        <div className="footer-link-icon-wrapper">{icon}</div>
        {text}
    </Link>
);

