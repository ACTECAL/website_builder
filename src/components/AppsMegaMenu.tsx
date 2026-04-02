import React from 'react';
import { Link } from 'react-router-dom';
import { Package, PenTool, Cloud, DollarSign, TrendingUp, Globe, Users, Megaphone, Briefcase, Zap, Boxes } from 'lucide-react';
import { appCategories } from '../data/appModules';
import '../styles/AppsMegaMenu.css';

export const AppsMegaMenu: React.FC<{
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
    if (!isOpen) return null;

    // Categories are styled purely via CSS mapped by title.

    const categoryIcons: Record<string, React.ReactNode> = {
        'Finance': <DollarSign size={16} strokeWidth={2.5} />,
        'Sales': <TrendingUp size={16} strokeWidth={2.5} />,
        'Websites': <Globe size={16} strokeWidth={2.5} />,
        'Supply Chain': <Boxes size={16} strokeWidth={2.5} />,
        'Human Resources': <Users size={16} strokeWidth={2.5} />,
        'Marketing': <Megaphone size={16} strokeWidth={2.5} />,
        'Services': <Briefcase size={16} strokeWidth={2.5} />,
        'Productivity': <Zap size={16} strokeWidth={2.5} />,
    };

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="apps-mega-menu"
        >
            <div className="apps-mega-menu-content">
                <div className="apps-grid">
                    {appCategories.map((category, idx) => {
                        const styleClass = `category-theme-${category.title.toLowerCase().replace(' ', '-')}`;
                        return (
                            <div key={category.title} className={`apps-category delay-${idx}`}>
                                <h4 className={`apps-category-title ${styleClass}`}>
                                    <span className={`category-title-icon ${styleClass}-icon`}>
                                        {categoryIcons[category.title]}
                                    </span>
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

