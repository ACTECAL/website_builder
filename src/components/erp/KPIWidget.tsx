import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPIWidgetProps {
    title: string;
    value: string | number;
    trend?: number; // e.g., 5.4 or -2.1
    trendLabel?: string; // e.g., "vs last month"
    icon?: React.ReactNode;
}

export const KPIWidget: React.FC<KPIWidgetProps> = ({ title, value, trend, trendLabel, icon }) => {
    const isPositive = trend && trend >= 0;

    return (
        <div className="kpi-card" style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: 'var(--admin-radius)', padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--admin-text-secondary)', fontWeight: 500, margin: 0 }}>{title}</h3>
                {icon && <div style={{ color: 'var(--admin-primary)', background: 'rgba(113, 75, 103, 0.1)', padding: 8, borderRadius: 8 }}>{icon}</div>}
            </div>

            <div style={{ marginTop: 'auto' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--admin-text-primary)', marginBottom: 4 }}>
                    {value}
                </div>

                {trend !== undefined && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            color: isPositive ? 'var(--admin-success)' : 'var(--admin-error)',
                            fontWeight: 600
                        }}>
                            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            {Math.abs(trend)}%
                        </span>
                        <span style={{ color: 'var(--admin-text-secondary)' }}>{trendLabel}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
