import React from 'react';
import { Plus, Mail, Phone, MoreHorizontal, Search, Filter } from 'lucide-react';
import '../../styles/AdminTheme.css';

interface Contact {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    role: string;
    city: string;
}

export const CRMContacts: React.FC = () => {
    const contacts: Contact[] = [
        { id: '1', name: 'Alice Freeman', company: 'Acme Corp', email: 'alice@acme.com', phone: '+1 555-0123', role: 'Purchasing Manager', city: 'San Francisco' },
        { id: '2', name: 'Bob Smith', company: 'Globex Inc', email: 'bob@globex.com', phone: '+1 555-0124', role: 'CTO', city: 'New York' },
        { id: '3', name: 'Charlie Brown', company: 'Stark Ind', email: 'charlie@stark.com', phone: '+1 555-0125', role: 'Engineer', city: 'Los Angeles' },
        { id: '4', name: 'Diana Prince', company: 'Wayne Ent', email: 'diana@wayne.com', phone: '+1 555-0126', role: 'Director', city: 'Gotham' },
        { id: '5', name: 'Evan Wright', company: 'Cyberdyne', email: 'evan@cyberdyne.net', phone: '+1 555-0199', role: 'AI Specialist', city: 'Silicon Valley' },
        { id: '6', name: 'Fiona Gallagher', company: 'Dunder Mifflin', email: 'fiona@dm.com', phone: '+1 555-9999', role: 'Sales', city: 'Scranton' },
    ];

    return (
        <div className="flex flex-col h-full bg-[#f9fafb] animate-in fade-in" style={{ height: 'calc(100vh - 56px)' }}>

            {/* Control Panel */}
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-gray-800">Contacts</h1>
                    <button className="admin-btn admin-btn-primary text-sm flex items-center gap-2">
                        <Plus size={16} /> New
                    </button>
                </div>

                <div className="flex items-center gap-2 w-96">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded focus:border-[#714B67] focus:ring-1 focus:ring-[#714B67] outline-none text-sm"
                        />
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <button className="p-2 border border-gray-300 rounded bg-white hover:bg-gray-50 text-gray-600">
                        <Filter size={16} />
                    </button>
                </div>
            </div>

            {/* Contact Grid */}
            <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {contacts.map(contact => (
                        <div key={contact.id} className="erp-card bg-white rounded border border-gray-200 p-4 hover:shadow-md transition-shadow relative group">
                            <div className="flex items-start gap-4">
                                <img
                                    src={`https://i.pravatar.cc/150?u=${contact.email}`}
                                    alt={contact.name}
                                    className="w-12 h-12 rounded-full border border-gray-100 shadow-sm"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 truncate">{contact.name}</h3>
                                    <p className="text-sm text-gray-500 truncate">{contact.role}, {contact.company}</p>

                                    <div className="mt-3 flex flex-col gap-1 text-sm text-gray-600">
                                        <div className="flex items-center gap-2 truncate">
                                            <Mail size={12} className="text-gray-400" />
                                            <span className="truncate">{contact.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 truncate">
                                            <Phone size={12} className="text-gray-400" />
                                            <span>{contact.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Location Badge */}
                            <div className="absolute top-4 right-4 text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                                {contact.city}
                            </div>

                            {/* Actions Overlay */}
                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1 hover:bg-gray-100 rounded text-gray-500">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
