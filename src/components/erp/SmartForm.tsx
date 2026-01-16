import React, { useState } from 'react';
import '../../styles/odoo-theme.css';
import '../../styles/core-components.css';
import '../../styles/AdminTheme.css'; // Ensure access to admin tokens if needed
import { Save, X, MoreHorizontal, ArrowRight, CornerUpLeft } from 'lucide-react';

interface SmartFormProps {
    title: string;
    subtitle?: string;
    statusTimeline?: string[]; // Array of status steps e.g. ['Draft', 'Sent', 'Done']
    currentStatus?: string;
    tabs?: { id: string; label: string; content: React.ReactNode }[];
    actions?: React.ReactNode;
    onSave?: () => void;
    onDiscard?: () => void;
    ribbonText?: string; // e.g. "Paid"
    ribbonColor?: 'success' | 'danger' | 'warning';
}

export const SmartForm: React.FC<SmartFormProps> = ({
    title,
    subtitle,
    statusTimeline = [],
    currentStatus,
    tabs = [],
    actions,
    onSave,
    onDiscard,
    ribbonText,
    ribbonColor = 'success'
}) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id);

    return (
        <div className="flex flex-col h-full bg-[#F0F2F5] animate-in fade-in">
            {/* 1. Control Panel / Status Header */}
            <div className="bg-white border-b border-[#D8DADD] px-4 py-2.5 flex flex-wrap items-center justify-between sticky top-0 z-30 shadow-sm">

                {/* Left: Primary Actions */}
                <div className="flex items-center gap-2">
                    {onSave && (
                        <button className="admin-btn admin-btn-primary flex items-center gap-2" onClick={onSave}>
                            <Save size={16} /> Save
                        </button>
                    )}
                    {onDiscard && (
                        <button className="admin-btn bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-2" onClick={onDiscard}>
                            <X size={16} /> Discard
                        </button>
                    )}
                    {actions}
                </div>

                {/* Right: Status Pipeline (Arrow Steps) */}
                {statusTimeline.length > 0 && (
                    <div className="flex bg-white border border-gray-300 rounded ml-auto overflow-hidden">
                        {statusTimeline.map((step, idx) => {
                            const isActive = step === currentStatus;
                            const isCompleted = statusTimeline.indexOf(currentStatus || '') > idx;

                            return (
                                <div key={step} className="relative group">
                                    <button
                                        className={`px-4 py-1.5 text-sm font-medium relative z-10 flex items-center 
                                            ${isActive ? 'bg-[#714B67] text-white' : ''}
                                            ${isCompleted ? 'text-[#017E84] hover:bg-gray-50' : 'text-gray-500 hover:bg-gray-50'}
                                        `}
                                        style={{ marginLeft: idx > 0 ? '-10px' : '0', paddingLeft: idx > 0 ? '20px' : '16px' }}
                                    >
                                        {step}
                                    </button>

                                    {/* Arrow Shape Border */}
                                    {idx < statusTimeline.length - 1 && (
                                        <div
                                            className="absolute top-0 right-0 h-full w-[15px] bg-white border-r border-t border-gray-300 transform rotate-45 origin-top-right z-20 pointer-events-none"
                                            style={{ top: '3px', right: '-8px' }}
                                        ></div>
                                    )}
                                </div>
                            );
                        })}
                        {/* Simple CSS-only fallback for arrows if preferred, but sticking to button styles for now */}
                        {statusTimeline.map((step, idx) => (
                            <div
                                key={`real-${step}`}
                                className={`
                                    px-3 py-1.5 text-sm font-medium border-l border-gray-200 cursor-pointer transition-colors
                                    ${step === currentStatus ? 'bg-[#714B67] text-white hover:bg-[#5D3E55]' : 'bg-white text-gray-600 hover:bg-gray-100'}
                                `}
                            >
                                {step}
                            </div>
                        )).filter(() => false) /* Disabled alternative implementation */}

                    </div>
                )}

                {/* Standard Odoo Pipeline CSS Implementation */}
                {statusTimeline.length > 0 && (
                    <div className="odoo-status-bar ml-auto">
                        {statusTimeline.map((step, i) => (
                            <div
                                key={step}
                                className={`odoo-status-step ${step === currentStatus ? 'active' : ''} ${statusTimeline.indexOf(currentStatus || '') > i ? 'completed' : ''}`}
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                )}


            </div>

            {/* 2. Sheet Container */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 flex justify-center">
                <div className="w-full max-w-6xl bg-white border border-[#D8DADD] shadow-sm rounded flex flex-col min-h-[600px] relative odoo-sheet">

                    {/* Ribbon Widget */}
                    {ribbonText && (
                        <div className={`odoo-ribbon`}>
                            <div className={`odoo-ribbon-text ${ribbonColor === 'danger' ? 'archived' : ''}`}>
                                {ribbonText}
                            </div>
                        </div>
                    )}

                    {/* Sheet Header */}
                    <div className="px-8 pt-6 pb-4 md:flex justify-between items-start">
                        <div className="w-full max-w-3xl">
                            <div className="text-3xl font-bold text-[#212529] mb-4">
                                {title}
                            </div>
                            {subtitle && (
                                <div className="text-lg text-gray-500 font-medium mb-4">{subtitle}</div>
                            )}
                        </div>

                        {/* Smart Buttons (Stats) */}
                        <div className="flex gap-2">
                            <button className="flex flex-col items-center justify-center border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 min-w-[100px]">
                                <span className="text-lg font-bold text-[#017E84]">5</span>
                                <span className="text-xs text-gray-600 uppercase tracking-wide">Meetings</span>
                            </button>
                            <button className="flex flex-col items-center justify-center border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 min-w-[100px]">
                                <span className="text-lg font-bold text-[#017E84]">$ 12k</span>
                                <span className="text-xs text-gray-600 uppercase tracking-wide">Invoiced</span>
                            </button>
                        </div>
                    </div>

                    {/* Tabs / Notebook */}
                    {tabs.length > 0 && (
                        <div className="mt-4">
                            <div className="flex border-b border-[#DEE2E6] px-6 gap-6">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`pb-3 text-sm font-semibold uppercase tracking-wide transition-all border-b-2
                                            ${activeTab === tab.id
                                                ? 'border-[#714B67] text-[#714B67]'
                                                : 'border-transparent text-gray-500 hover:text-gray-800'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            <div className="p-8">
                                {tabs.find(t => t.id === activeTab)?.content}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. Chatter Placeholder (Bottom) */}
            <div className="bg-white border-t border-[#D8DADD] p-4 flex gap-4 justify-center items-start text-sm text-gray-500">
                <div className="flex gap-4 max-w-4xl w-full">
                    <img src="https://i.pravatar.cc/150?u=admin" className="w-8 h-8 rounded-full" alt="User" />
                    <div className="flex-1">
                        <div className="border border-gray-300 rounded bg-gray-50 p-2 mb-2 text-gray-400">
                            Send a message or log a note...
                        </div>
                        <div className="flex gap-2 text-xs">
                            <button className="font-bold text-[#714B67]">Send message</button>
                            <span>|</span>
                            <button className="font-bold text-gray-600">Log note</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
