import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Settings,
    Activity,
    Menu,
    Bell,
    Search,
    LogOut,
    ChevronRight,
    Grid,
    Sparkles
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ActyxLogo } from '../ActyxLogo';
import { AIAssistant } from '../AIAssistant';
import '../../styles/AdminTheme.css';

export const AdminLayout: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false); // Added collapsed state
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
        { icon: Activity, label: 'System Status', path: '/status' },
    ];

    const getPageTitle = () => {
        const currentPath = location.pathname;
        const item = navItems.find(i => i.path === currentPath);
        return item ? item.label : 'Overview';
    };

    return (
        <div className="admin-layout">
            {/* Enterprise Sidebar */}
            <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                {/* Brand Header */}
                {/* Brand Header - Odoo Style */}
                <div style={{ padding: '0', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '1.5rem' }}>
                        <ActyxLogo showBadge />
                    </div>
                </div>

                {/* Navigation */}
                <div style={{ padding: '16px 8px', flex: 1, overflowY: 'auto' }}>
                    <div style={{ padding: '16px 12px 4px', fontSize: '0.75rem', fontWeight: 600, color: '#6c757d', textTransform: 'uppercase' }}>
                        Apps
                    </div>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `admin-nav-item ${isActive || (item.path === '/admin' && location.pathname === '/admin') ? 'active' : ''}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                            {/* Active Indicator Dot (SAP Style) */}
                            {location.pathname === item.path && (
                                <motion.div
                                    layoutId="active-dot"
                                    style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'var(--admin-accent)' }}
                                />
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Footer User Profile */}
                {/* Footer User Profile */}
                <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px' }}>
                        <div style={{ width: 32, height: 32, background: 'var(--admin-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem' }}>
                            JS
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#FFFFFF' }}>John Smith</div>
                        </div>
                        <LogOut size={16} color="#adb5bd" style={{ cursor: 'pointer' }} />
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40, backdropFilter: 'blur(4px)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <main className="admin-main">
                {/* Sticky Glass Header */}
                <header className="admin-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <button
                            className="mobile-menu-trigger"
                            onClick={() => setIsMobileMenuOpen(true)}
                            style={{
                                display: 'none', // Managed via CSS usually, but consistent with previous
                                background: 'transparent',
                                border: 'none',
                                padding: 8
                            }}
                        >
                            <Menu size={24} color="var(--admin-text-primary)" />
                        </button>

                        {/* Breadcrumb / Title Area */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--admin-text-secondary)' }}>
                            <span style={{ fontWeight: 500 }}>Admin</span>
                            <ChevronRight size={16} />
                            <span style={{ fontWeight: 600, color: 'var(--admin-text-primary)' }}>{getPageTitle()}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        {/* Global Search - Odoo Style */}
                        <div style={{ position: 'relative' }} className="d-none d-md-block">
                            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-secondary)' }} />
                            <input
                                className="admin-search-input"
                                placeholder="Search or ask AI..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        // Could trigger AI search here
                                    }
                                }}
                            />
                            <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 4 }}>
                                <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: 4, background: 'var(--admin-border)', color: 'var(--admin-text-secondary)' }}>Ctrl+K</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            {/* Creative AI Trigger */}
                            {/* Standard button for AI */}
                            <button
                                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
                                style={{
                                    background: 'var(--admin-primary)',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    fontSize: '0.85rem'
                                }}>
                                <Sparkles size={14} />
                                <span>Ask AI</span>
                            </button>

                            <button style={{ position: 'relative', background: 'white', border: '1px solid var(--admin-border)', padding: 10, borderRadius: '10px', cursor: 'pointer', color: 'var(--admin-text-secondary)' }}>
                                <Bell size={18} />
                                <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: 'var(--admin-error)', borderRadius: '50%', border: '2px solid white' }} />
                            </button>
                        </div>
                    </div>
                </header>

                <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* AI Assistant (Self-managed) */}
            <AIAssistant />
        </div>
    );
};
