import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/IndustriesMegaMenu.css';

interface IndustryCategory {
    title: string;
    color: string;
    items: string[];
}

const INDUSTRIES_DATA: IndustryCategory[] = [
    {
        title: 'RETAIL',
        color: '#017e84',
        items: ['Book Store', 'Clothing Store', 'Furniture Store', 'Grocery Store', 'Hardware Store', 'Toy Store']
    },
    {
        title: 'FOOD & HOSPITALITY',
        color: '#4d6c8b',
        items: ['Bar and Pub', 'Restaurant', 'Fast Food', 'Guest House', 'Beverage Distributor', 'Hotel']
    },
    {
        title: 'REAL ESTATE',
        color: '#e85a4f',
        items: ['Real Estate Agency', 'Architecture Firm', 'Construction', 'Property Management', 'Gardening', 'Property Owner Association']
    },
    {
        title: 'CONSULTING',
        color: '#75628b',
        items: ['Accounting Firm', 'Odoo Partner', 'Marketing Agency', 'Law firm', 'Talent Acquisition', 'Audit & Certification']
    },
    {
        title: 'MANUFACTURING',
        color: '#65738f',
        items: ['Textile', 'Metal', 'Furnitures', 'Food', 'Brewery', 'Corporate Gifts']
    },
    {
        title: 'HEALTH & FITNESS',
        color: '#eb6b45',
        items: ['Sports Club', 'Eyewear Store', 'Fitness Center', 'Wellness Practitioners', 'Pharmacy', 'Hair Salon']
    },
    {
        title: 'TRADES',
        color: '#e66244',
        items: ['Handyman', 'IT Hardware & Support', 'Solar Energy Systems', 'Shoe Maker', 'Cleaning Services', 'HVAC Services']
    },
    {
        title: 'OTHERS',
        color: '#8b566b',
        items: ['Nonprofit Organization', 'Environmental Agency', 'Billboard Rental', 'Photography', 'Bike Leasing', 'Software Reseller']
    }
];

export const IndustriesMegaMenu: React.FC<{
    isOpen: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}> = ({ isOpen, onMouseEnter, onMouseLeave }) => {
    if (!isOpen) return null;

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="industries-mega-menu"
        >
            <div className="industries-mega-menu-content">
                <div className="industries-grid">
                    {INDUSTRIES_DATA.map((category) => (
                        <div key={category.title} className="industry-category">
                            <h4 className="industry-category-title" style={{
                                color: category.color,
                                borderBottom: `1px solid ${category.color}33`
                            }}>
                                {category.title}
                            </h4>
                            <ul className="industry-items-list">
                                {category.items.map(item => (
                                    <li key={item}>
                                        <Link
                                            to={`/industries/${item.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                                            className="industry-item-link"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="industries-mega-menu-footer">
                <Link
                    to="/industries"
                    className="browse-all-industries-link"
                >
                    Browse all Industries
                </Link>
            </div>
        </div>
    );
};
