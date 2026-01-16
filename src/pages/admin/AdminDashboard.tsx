import React from 'react';
import { DollarSign, Users, TrendingUp, Activity, MoreHorizontal, ArrowRight } from 'lucide-react';
import '../../styles/odoo-theme.css';
import '../../styles/core-components.css';
import '../../styles/AdminTheme.css';

// Odoo-style Graph Widget
const DashboardCard: React.FC<{ title: string, value: string, subtext: string, trend: string, color: string }> = ({ title, value, subtext, trend, color }) => (
    <div className="odoo-card relative overflow-hidden group hover:shadow-lg transition-shadow duration-200">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
                <div className="text-2xl font-bold mt-1" style={{ color: 'var(--admin-text-primary)' }}>{value}</div>
            </div>
            <div className={`p-2 rounded-full bg-opacity-10`} style={{ backgroundColor: `${color}20`, color: color }}>
                <TrendingUp size={20} />
            </div>
        </div>

        <div className="flex items-center text-sm">
            <span className="text-green-600 font-medium mr-2">{trend}</span>
            <span className="text-gray-400">{subtext}</span>
        </div>

        {/* Pseudo-Graph Background */}
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full" fill={color}>
                <path d="M0,20 L0,10 Q10,5 20,12 T40,15 T60,5 T80,12 T100,8 L100,20 Z" />
            </svg>
        </div>
    </div>
);

// Odoo-style App Link
const QuickAction: React.FC<{ Icon: any, label: string, color: string }> = ({ Icon, label, color }) => (
    <button className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors group">
        <div className="p-3 rounded-lg mb-2 transition-transform group-hover:scale-110" style={{ backgroundColor: `${color}15`, color: color }}>
            <Icon size={24} />
        </div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
);

export const AdminDashboard: React.FC = () => {
    return (
        <div className="space-y-6 animate-in">
            {/* 1. Dashboard Title Section with Date */}
            <div className="flex justify-between items-end border-b border-gray-200 pb-4">
                <div>
                    <h1 className="text-2xl font-light" style={{ color: 'var(--admin-primary)' }}>Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1">Overview of your company performance</p>
                </div>
                <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-gray-700">Today</div>
                    <div className="text-xs text-gray-500">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
            </div>

            {/* 2. Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 delay-100 animate-in">
                <DashboardCard
                    title="Total Revenue"
                    value="$124,500"
                    trend="+12.5%"
                    subtext="vs last month"
                    color="var(--admin-accent)" // Teal
                />
                <DashboardCard
                    title="Active Leads"
                    value="42"
                    trend="+5 new"
                    subtext="today"
                    color="var(--admin-warning)" // Warning
                />
                <DashboardCard
                    title="Pending Invoices"
                    value="8"
                    trend="$12.4k"
                    subtext="overdue"
                    color="var(--admin-error)" // Error
                />
                <DashboardCard
                    title="Active Users"
                    value="1,240"
                    trend="+2%"
                    subtext="growth"
                    color="var(--admin-primary)" // Purple
                />
            </div>

            {/* 3. Main Content: Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 delay-200 animate-in">

                {/* Left: Activity Feed (Odoo Chatter Style) */}
                <div className="lg:col-span-2 odoo-card">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium text-gray-800">Recent Activity</h2>
                        <button className="text-sm hover:underline flex items-center" style={{ color: 'var(--admin-accent)' }}>
                            View all <ArrowRight size={14} className="ml-1" />
                        </button>
                    </div>

                    <div className="space-y-0">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-600 font-bold text-xs border-2 border-white shadow-sm">
                                    U{i}
                                </div>
                                <div>
                                    <div className="text-sm text-gray-800">
                                        <span className="font-bold" style={{ color: 'var(--admin-primary)' }}>Demo User</span> created a new quote for <span className="font-medium">Azure Interior</span>.
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">2 hours ago • Sales</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Quick Actions */}
                <div className="space-y-6">
                    <div className="odoo-card bg-gradient-to-br from-[var(--admin-primary)] to-[#5D3E55] text-white border-none" style={{ background: 'var(--admin-gradient-primary)' }}>
                        <h2 className="text-lg font-medium mb-2">Upgrade to Pro</h2>
                        <p className="text-white/80 text-sm mb-4">Get access to AI automation tools.</p>
                        <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded text-sm font-medium transition-colors">
                            Upgrade Now
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 delay-300 animate-in">
                        <QuickAction Icon={DollarSign} label="Invoicing" color="var(--admin-accent)" />
                        <QuickAction Icon={Users} label="CRM" color="var(--admin-primary)" />
                        <QuickAction Icon={Activity} label="Reporting" color="var(--admin-warning)" />
                        <QuickAction Icon={MoreHorizontal} label="More" color="var(--admin-text-secondary)" />
                    </div>
                </div>
            </div>
        </div>
    );
};
