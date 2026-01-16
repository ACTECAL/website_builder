import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Download, MoreHorizontal, Search, ArrowUpDown } from 'lucide-react';

interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
    width?: string;
    sortable?: boolean;
}

interface ERPTableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (item: T) => void;
    title?: string;
    actions?: React.ReactNode;
}

export function ERPTable<T extends { id: string | number }>({ columns, data, onRowClick, title, actions }: ERPTableProps<T>) {
    const [density, setDensity] = useState<'compact' | 'comfortable'>('comfortable');
    const [selected, setSelected] = useState<Set<string | number>>(new Set());

    const toggleSelectAll = () => {
        if (selected.size === data.length) {
            setSelected(new Set());
        } else {
            setSelected(new Set(data.map(d => d.id)));
        }
    };

    const toggleRow = (id: string | number) => {
        const newSet = new Set(selected);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelected(newSet);
    };

    return (
        <div className="erp-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 0, border: '1px solid var(--erp-neutral-200)' }}>
            {/* Table Toolbar */}
            <div style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--erp-neutral-200)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'white'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    {title && <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--erp-neutral-900)' }}>{title}</h3>}

                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--erp-neutral-50)', border: '1px solid var(--erp-neutral-200)', borderRadius: 6, padding: '4px 8px', width: 240 }}>
                        <Search size={14} color="var(--erp-neutral-500)" />
                        <input placeholder="Filter records..." style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: 8, fontSize: '0.85rem', width: '100%' }} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={() => setDensity(d => d === 'compact' ? 'comfortable' : 'compact')}
                        className="erp-btn erp-btn-secondary"
                        style={{ padding: 6 }}
                        title="Toggle Density"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <div style={{ width: 14, height: 2, background: 'currentColor' }} />
                            <div style={{ width: 14, height: 2, background: 'currentColor' }} />
                            <div style={{ width: 14, height: 2, background: 'currentColor' }} />
                        </div>
                    </button>

                    <button className="erp-btn erp-btn-secondary">
                        <Filter size={14} /> Filter
                    </button>
                    <button className="erp-btn erp-btn-secondary">
                        <Download size={14} /> Export
                    </button>
                    {actions}
                </div>
            </div>

            {/* Bulk Actions Banner */}
            {selected.size > 0 && (
                <div style={{ padding: '8px 16px', background: 'var(--erp-primary-50)', borderBottom: '1px solid var(--erp-primary-100)', display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.9rem', color: 'var(--erp-primary-700)' }}>
                    <span style={{ fontWeight: 600 }}>{selected.size} selected</span>
                    <div style={{ height: 16, width: 1, background: 'var(--erp-primary-200)' }} />
                    <button className="erp-btn-ghost" style={{ fontSize: '0.85rem', color: 'var(--erp-primary-700)' }}>Delete</button>
                    <button className="erp-btn-ghost" style={{ fontSize: '0.85rem', color: 'var(--erp-primary-700)' }}>Archive</button>
                    <button className="erp-btn-ghost" style={{ fontSize: '0.85rem', color: 'var(--erp-primary-700)' }} onClick={() => setSelected(new Set())}>Clear Selection</button>
                </div>
            )}

            {/* Table Area */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                <table className="erp-table" style={{ width: '100%' }}>
                    <thead style={{ position: 'sticky', top: 0, zIndex: 5 }}>
                        <tr>
                            <th style={{ width: 40, paddingLeft: 16 }}>
                                <input type="checkbox" onChange={toggleSelectAll} checked={selected.size > 0 && selected.size === data.length} />
                            </th>
                            {columns.map((col, idx) => (
                                <th key={idx} style={{ width: col.width, cursor: col.sortable ? 'pointer' : 'default' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        {col.header}
                                        {col.sortable && <ArrowUpDown size={12} color="var(--erp-neutral-400)" />}
                                    </div>
                                </th>
                            ))}
                            <th style={{ width: 40 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 2} style={{ textAlign: 'center', padding: 40, color: 'var(--erp-neutral-500)' }}>
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr
                                    key={row.id}
                                    onClick={() => onRowClick && onRowClick(row)}
                                    style={{
                                        cursor: onRowClick ? 'pointer' : 'default',
                                        background: selected.has(row.id) ? 'var(--erp-primary-50)' : undefined
                                    }}
                                >
                                    <td style={{ paddingLeft: 16 }}>
                                        <input
                                            type="checkbox"
                                            checked={selected.has(row.id)}
                                            onClick={(e) => { e.stopPropagation(); toggleRow(row.id); }}
                                            onChange={() => { }}
                                        />
                                    </td>
                                    {columns.map((col, idx) => (
                                        <td key={idx} style={{ paddingTop: density === 'compact' ? 8 : 12, paddingBottom: density === 'compact' ? 8 : 12 }}>
                                            {col.render ? col.render(row) : (row as any)[col.key]}
                                        </td>
                                    ))}
                                    <td>
                                        <button className="erp-btn-ghost" style={{ padding: 4 }}><MoreHorizontal size={16} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--erp-neutral-200)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, background: 'var(--erp-neutral-50)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--erp-text-secondary)' }}>Showing 1-{data.length} of {data.length} records</span>
                <div style={{ display: 'flex', gap: 4 }}>
                    <button className="erp-btn-secondary" style={{ padding: 6 }} disabled><ChevronLeft size={16} /></button>
                    <button className="erp-btn-secondary" style={{ padding: 6 }} disabled><ChevronRight size={16} /></button>
                </div>
            </div>
        </div>
    );
}
