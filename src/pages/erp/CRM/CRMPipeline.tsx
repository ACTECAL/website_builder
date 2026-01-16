import React, { useState } from 'react';
import { Plus, Kanban, List, BarChart2, Search, Filter, MoreHorizontal, GripVertical, Star, Clock, ArrowRight } from 'lucide-react';
import '../../styles/AdminTheme.css';

interface Deal {
    id: string;
    title: string;
    value: string;
    customer: string;
    priority: 'low' | 'medium' | 'high';
    tag: string;
    activity?: string;
}

interface Column {
    id: string;
    title: string;
    color: string; // Header indicator color
    items: Deal[];
}

export const CRMPipeline: React.FC = () => {
    // Mock Data with Odoo-like structure
    const [columns, setColumns] = useState<Column[]>([
        {
            id: 'new', title: 'New', color: '#714B67', items: [
                { id: '1', title: 'Acme Corp Upgrade', value: '$12,000', customer: 'Acme Corp', priority: 'high', tag: 'Software' },
                { id: '2', title: 'Globex Consultation', value: '$4,500', customer: 'Globex Inc', priority: 'medium', tag: 'Service', activity: 'Call tomorrow' }
            ]
        },
        {
            id: 'qualified', title: 'Qualified', color: '#017E84', items: [
                { id: '3', title: 'Stark Ind Demo', value: '$45,000', customer: 'Stark Industries', priority: 'high', tag: 'Hardware' }
            ]
        },
        {
            id: 'proposition', title: 'Proposition', color: '#F59E0B', items: [
                { id: '4', title: 'Wayne Ent Contract', value: '$80,000', customer: 'Wayne Enterprises', priority: 'high', tag: 'LTS Plan' }
            ]
        },
        {
            id: 'won', title: 'Won', color: '#10B981', items: [
                { id: '5', title: 'Cyberdyne Systems', value: '$22,000', customer: 'Cyberdyne', priority: 'low', tag: 'AI Core' }
            ]
        }
    ]);

    return (
        <div className="flex flex-col h-full animate-in fade-in" style={{ background: 'var(--admin-bg)', height: 'calc(100vh - 56px)' }}>

            {/* 1. Control Panel (Standard Odoo Admin Header) */}
            <div className="bg-white px-4 py-2 flex items-center justify-between sticky top-0 z-20 border-b" style={{ borderColor: 'var(--admin-border)' }}>
                <div className="flex items-center gap-2">
                    <button className="admin-btn admin-btn-primary shadow-sm text-sm">
                        New
                    </button>
                    <button className="text-sm font-medium px-3 py-1.5 rounded hover:bg-gray-100 transition-colors text-gray-700">
                        Generate Leads
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="admin-search-input"
                        />
                        <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* View Switchers */}
                    <div className="flex bg-gray-100 p-0.5 rounded border border-gray-200">
                        <button className="p-1.5 bg-white shadow-sm rounded-sm text-gray-800"><Kanban size={14} /></button>
                        <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-sm"><List size={14} /></button>
                        <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-sm"><BarChart2 size={14} /></button>
                    </div>
                </div>
            </div>

            {/* 2. Kanban Board Container */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
                <div className="flex h-full gap-4 min-w-max">
                    {columns.map(col => (
                        <div key={col.id} className="flex flex-col w-80 h-full rounded-lg bg-gray-100/50">

                            {/* Column Header (Odoo "Folded" Style) */}
                            <div className="flex items-center justify-between p-3 pb-2 group cursor-pointer sticky top-0">
                                <div className="flex items-center gap-2">
                                    <span style={{ fontWeight: 600, color: '#4B5563' }}>{col.title}</span>
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white text-gray-500 shadow-sm border border-gray-200">
                                        {col.items.length}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><Plus size={14} /></button>
                                    <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><MoreHorizontal size={14} /></button>
                                </div>
                            </div>

                            {/* Progress Bar Header Indicator */}
                            <div className="h-1 w-full bg-gray-200 mb-2">
                                <div className="h-full" style={{ width: '100%', background: col.color }}></div>
                            </div>

                            {/* Cards Container */}
                            <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2">
                                {col.items.map(item => (
                                    <div
                                        key={item.id}
                                        className="erp-card p-3 group hover:shadow-md cursor-grab active:cursor-grabbing bg-white relative transition-all duration-200"
                                        style={{ borderLeft: `3px solid ${item.priority === 'high' ? '#F59E0B' : 'transparent'}` }}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-semibold text-sm text-gray-800 leading-tight">{item.title}</h4>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab text-gray-400">
                                                <GripVertical size={14} />
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-500 mb-2">{item.customer}</div>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm" style={{ color: 'var(--admin-primary)' }}>{item.value}</span>
                                                {item.activity && (
                                                    <Clock size={12} className="text-red-500" />
                                                )}
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 border border-gray-200">
                                                    {item.tag}
                                                </span>
                                                <img
                                                    src={`https://i.pravatar.cc/150?u=${item.id}`}
                                                    alt="Owner"
                                                    className="w-5 h-5 rounded-full border border-white shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Hover Actions Overlay (Odoo Style) */}
                                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-yellow-400">
                                                <Star size={12} fill={item.priority === 'high' ? "#F59E0B" : "none"} />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Quick Add Ghost Card */}
                                <button className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded border border-dashed border-gray-300 transition-colors flex items-center justify-center gap-1">
                                    <Plus size={12} /> Quick Add
                                </button>
                            </div>

                            {/* Column Summary Footer */}
                            <div className="p-2 text-center border-t border-gray-200">
                                <span className="text-xs font-bold text-gray-600">
                                    Total: {col.items.reduce((acc, i) => acc + parseInt(i.value.replace(/[^0-9]/g, '')), 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 })}
                                </span>
                            </div>

                        </div>
                    ))}

                    {/* Add Column Button */}
                    <div className="w-80 h-10 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
                        <span className="text-sm font-medium flex items-center gap-2"><Plus size={16} /> Add Stage</span>
                    </div>

                </div>
            </div>
        </div>
    );
};
