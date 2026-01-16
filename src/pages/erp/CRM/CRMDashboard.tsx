import React from 'react';
import { KPIWidget } from '../../../components/erp/KPIWidget';
import { Users, DollarSign, Briefcase, TrendingUp, MoreHorizontal } from 'lucide-react';

export const CRMDashboard: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: 'var(--admin-text-primary)' }}>Sales Overview</h1>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="erp-btn erp-btn-secondary" style={{ color: 'var(--admin-text-secondary)', borderColor: 'var(--admin-border)' }}>Last 30 Days</button>
                    <button className="erp-btn erp-btn-primary" style={{ background: 'var(--admin-primary)', borderColor: 'var(--admin-primary)' }}>Generate Report</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                <KPIWidget
                    title="Total Revenue"
                    value="$128,430"
                    trend={12.5}
                    trendLabel="vs last month"
                    icon={<DollarSign size={20} />}
                />
                <KPIWidget
                    title="Active Leads"
                    value="432"
                    trend={5.2}
                    trendLabel="vs last month"
                    icon={<Users size={20} />}
                />
                <KPIWidget
                    title="Won Deals"
                    value="45"
                    trend={-2.4}
                    trendLabel="vs last month"
                    icon={<Briefcase size={20} />}
                />
                <KPIWidget
                    title="Win Rate"
                    value="24.8%"
                    trend={1.2}
                    trendLabel="vs avg"
                    icon={<TrendingUp size={20} />}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
                <div className="erp-card" style={{ padding: 24, minHeight: 400, background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: 'var(--admin-radius)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--admin-text-primary)' }}>Revenue Forecast</h3>
                        <button className="erp-btn-ghost" style={{ padding: 4 }}><MoreHorizontal size={16} /></button>
                    </div>
                    {/* Placeholder for Chart */}
                    <div style={{ width: '100%', height: 300, background: 'var(--admin-bg)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-text-secondary)', border: '1px dashed var(--admin-border)' }}>
                        Interactive Chart Placeholder
                    </div>
                </div>

                <div className="erp-card" style={{ padding: 24, background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: 'var(--admin-radius)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--admin-text-primary)' }}>Recent Activity</h3>
                        <button className="erp-btn-ghost" style={{ padding: 4 }}><MoreHorizontal size={16} /></button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {[1, 2, 3, 4, 5].map((i, idx) => (
                            <div key={i} style={{
                                display: 'flex',
                                gap: 16,
                                padding: '16px 0',
                                borderBottom: idx === 4 ? 'none' : '1px solid var(--admin-border)'
                            }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: '50%',
                                    background: 'rgba(113, 75, 103, 0.1)', color: 'var(--admin-primary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                }}>
                                    <Briefcase size={14} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--admin-text-primary)' }}>New deal created: Acme Corp</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', marginTop: 2 }}>2 hours ago by <span style={{ color: 'var(--admin-text-primary)', fontWeight: 500 }}>John Doe</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
