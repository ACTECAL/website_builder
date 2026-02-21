import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, PenTool, Cloud } from 'lucide-react';

interface AppCategory {
    title: string;
    color: string;
    items: string[];
}

const APPS_DATA: AppCategory[] = [
    {
        title: 'FINANCE',
        color: '#017e84',
        items: ['Accounting', 'Invoicing', 'Expenses', 'Spreadsheet (BI)', 'Documents', 'Sign']
    },
    {
        title: 'SALES',
        color: '#e85a4f',
        items: ['CRM', 'Sales', 'POS Shop', 'POS Restaurant', 'Subscriptions', 'Rental']
    },
    {
        title: 'WEBSITES',
        color: '#4d6c8b',
        items: ['Website Builder', 'eCommerce', 'Blog', 'Forum', 'Live Chat', 'eLearning']
    },
    {
        title: 'SUPPLY CHAIN',
        color: '#75628b',
        items: ['Inventory', 'Manufacturing', 'PLM', 'Purchase', 'Maintenance', 'Quality']
    },
    {
        title: 'HUMAN RESOURCES',
        color: '#65738f',
        items: ['Employees', 'Recruitment', 'Time Off', 'Appraisals', 'Referrals', 'Fleet']
    },
    {
        title: 'MARKETING',
        color: '#eb6b45',
        items: ['Social Marketing', 'Email Marketing', 'SMS Marketing', 'Events', 'Marketing Automation', 'Surveys']
    },
    {
        title: 'SERVICES',
        color: '#e66244',
        items: ['Project', 'Timesheets', 'Field Service', 'Helpdesk', 'Planning', 'Appointments']
    },
    {
        title: 'PRODUCTIVITY',
        color: '#8b566b',
        items: ['Discuss', 'Approvals', 'IoT', 'VoIP', 'Knowledge', 'WhatsApp']
    }
];

export const AppsMegaMenu: React.FC<{
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
                    {APPS_DATA.map((category) => (
                        <div key={category.title} style={{ display: 'flex', flexDirection: 'column' }}>
                            <h4 style={{
                                color: category.color,
                                fontSize: '0.875rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                margin: '0 0 12px 0',
                                paddingBottom: '8px',
                                borderBottom: `1px solid ${category.color}33` // 20% opacity matching color
                            }}>
                                {category.title}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {category.items.map(item => (
                                    <li key={item}>
                                        <Link
                                            to={`/apps/${item.toLowerCase().replace(/\s+/g, '-')}`}
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
