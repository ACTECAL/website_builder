import React, { useState } from 'react';
import { Save, Bell, Shield, Monitor, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('General');

    const tabs = [
        { id: 'General', icon: Monitor, desc: 'Site details & customization' },
        { id: 'Security', icon: Shield, desc: 'Access control & safety' },
        { id: 'Notifications', icon: Bell, desc: 'Email defaults & alerts' },
    ];

    return (
        <div className="fade-in">
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 4px', color: 'var(--admin-text-primary)' }}>Settings</h1>
                <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.9rem' }}>Configure global application preferences.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }}>
                {/* Setting Tabs Navigation - SAP Style */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '16px',
                                background: activeTab === tab.id ? 'white' : 'transparent',
                                border: activeTab === tab.id ? '1px solid var(--admin-border)' : '1px solid transparent',
                                borderRadius: 'var(--admin-radius)',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                                boxShadow: activeTab === tab.id ? 'var(--admin-shadow-sm)' : 'none'
                            }}
                        >
                            <div style={{
                                padding: 8,
                                background: activeTab === tab.id ? 'var(--admin-accent-light)' : 'var(--admin-bg)',
                                borderRadius: 8,
                                color: activeTab === tab.id ? 'var(--admin-accent)' : 'var(--admin-text-secondary)'
                            }}>
                                <tab.icon size={18} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, color: activeTab === tab.id ? 'var(--admin-text-primary)' : 'var(--admin-text-secondary)', fontSize: '0.9rem' }}>{tab.id}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>{tab.desc}</div>
                            </div>
                            {activeTab === tab.id && <ChevronRight size={14} color="var(--admin-accent)" />}
                        </button>
                    ))}
                </div>

                {/* Content Panel */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="erp-card"
                    style={{ padding: 32, minHeight: 400 }}
                >
                    <div style={{ paddingBottom: 24, borderBottom: '1px solid var(--admin-border)', marginBottom: 24 }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{activeTab} Configuration</h2>
                        <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--admin-text-secondary)' }}>Update your {activeTab.toLowerCase()} settings below.</p>
                    </div>

                    <div style={{ display: 'grid', gap: 24, maxWidth: 600 }}>
                        <div style={{ display: 'grid', gap: 8 }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-text-primary)' }}>Application Name</label>
                            <input
                                className="admin-search-input"
                                defaultValue="Actyx ERP"
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gap: 8 }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-text-primary)' }}>Support Contact</label>
                            <input
                                className="admin-search-input"
                                defaultValue="support@actyx.com"
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div style={{ padding: '24px', background: 'var(--admin-bg)', borderRadius: 'var(--admin-radius)', border: '1px solid var(--admin-border)', marginTop: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Maintenance Mode</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', marginTop: 2 }}>Temporarily disable access for all non-admin users.</div>
                                </div>
                                <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24, cursor: 'pointer' }}>
                                    <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                                    <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#cbd5e1', transition: '.4s', borderRadius: 34 }}></span>
                                    <span style={{ position: 'absolute', content: '""', height: 18, width: 18, left: 3, bottom: 3, backgroundColor: 'white', transition: '.4s', borderRadius: '50%' }}></span>
                                </label>
                            </div>
                        </div>

                        <div style={{ paddingTop: 24, borderTop: '1px solid var(--admin-border)', display: 'flex', gap: 12 }}>
                            <button className="admin-btn-primary">
                                <Save size={18} />
                                Save Changes
                            </button>
                            <button style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--admin-border)', borderRadius: 8, fontWeight: 600, cursor: 'pointer', color: 'var(--admin-text-secondary)' }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
