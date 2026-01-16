import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, Shield, Mail, CheckCircle, XCircle } from 'lucide-react';
import '../../styles/odoo-theme.css';
import '../../styles/core-components.css';
import '../../styles/AdminTheme.css';

export const AdminUsers: React.FC = () => {
    const [users] = useState([
        { id: 1, name: 'Alice Freeman', email: 'alice@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
        { id: 3, name: 'Charlie Days', email: 'charlie@example.com', role: 'User', status: 'Inactive' },
        { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'Active' },
        { id: 5, name: 'Evelyn Waugh', email: 'eve@example.com', role: 'User', status: 'Active' },
    ]);

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-300" style={{ background: 'var(--admin-bg)' }}>
            {/* Odoo Control Panel Style */}
            {/* Odoo Control Panel Style */}
            <div className="bg-white px-4 py-2 flex items-center justify-between sticky top-0 z-20" style={{ borderBottom: '1px solid var(--admin-border)' }}>
                <div className="flex items-center gap-2">
                    <button className="btn btn-primary text-sm shadow-sm">
                        New
                    </button>
                    <button className="btn btn-secondary text-sm shadow-sm">
                        Import
                    </button>
                </div>

                {/* Search / Filter Bar */}
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search size={14} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-8 pr-3 py-1 text-sm border border-gray-300 rounded outline-none w-64 transition-all focus:ring-1"
                            style={{ borderColor: 'var(--admin-border)', '--tw-ring-color': 'var(--admin-primary)' } as React.CSSProperties}
                        />
                    </div>
                    <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500 border border-transparent hover:border-gray-200">
                        <Filter size={16} />
                    </button>
                </div>
            </div>

            <div className="p-4 md:p-6 overflow-auto">
                <div className="odoo-card p-0 overflow-hidden shadow-sm">
                    <table className="odoo-table">
                        <thead>
                            <tr>
                                <th style={{ width: 40 }}>
                                    <input type="checkbox" className="rounded border-gray-300 focus:ring-1" style={{ color: 'var(--admin-primary)', '--tw-ring-color': 'var(--admin-primary)' } as React.CSSProperties} />
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="group cursor-pointer">
                                    <td>
                                        <input type="checkbox" className="rounded border-gray-300 focus:ring-1" style={{ color: 'var(--admin-primary)', '--tw-ring-color': 'var(--admin-primary)' } as React.CSSProperties} />
                                    </td>
                                    <td className="font-medium" style={{ color: 'var(--admin-text-primary)' }}>{user.name}</td>
                                    <td>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Mail size={12} /> {user.email}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                            <Shield size={10} /> {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        {user.status === 'Active' ? (
                                            <span className="odoo-badge success">Active</span>
                                        ) : (
                                            <span className="odoo-badge error">Inactive</span>
                                        )}
                                    </td>
                                    <td className="text-right">
                                        <button className="p-1 text-gray-400 hover:text-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
