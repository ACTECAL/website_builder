import React from 'react';
import { Link } from 'react-router-dom';

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
                    {INDUSTRIES_DATA.map((category) => (
                        <div key={category.title} style={{ display: 'flex', flexDirection: 'column' }}>
                            <h4 style={{
                                color: category.color,
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                margin: '0 0 12px 0',
                                paddingBottom: '8px',
                                borderBottom: `1px solid ${category.color}33`
                            }}>
                                {category.title}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {category.items.map(item => (
                                    <li key={item}>
                                        <Link
                                            to={`/industries/${item.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#4B5563',
                                                fontSize: '0.85rem',
                                                transition: 'color 0.15s ease'
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
                                            onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
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

            <div style={{
                borderTop: '1px solid rgba(0,0,0,0.06)',
                backgroundColor: '#fdfdfd',
                padding: '16px 24px',
                textAlign: 'center'
            }}>
                <Link
                    to="/industries"
                    style={{
                        textDecoration: 'none',
                        color: '#4B5563',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                >
                    Browse all Industries
                </Link>
            </div>
        </div>
    );
};
