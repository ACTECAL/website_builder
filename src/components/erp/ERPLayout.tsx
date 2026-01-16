import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutGrid,
    Search,
    MessageSquare,
    Clock,
    X,
    ChevronRight,
    Menu,
    Plus,
    Upload,
    Kanban,
    List,
    Activity
} from 'lucide-react';
import { appCategories } from '../../data/appModules';
import '../../styles/next-gen-design.css';
import '../../styles/enhanced-design.css';

// Actyx Backend Layout replica
export const ERPLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Identify current module
    const currentPath = location.pathname.split('/')[2];
    const currentModule = appCategories
        .flatMap(c => c.modules)
        .find(m => m.slug === currentPath);

    // Breadcrumbs logic
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
        return { label, path };
    });

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans text-sm" style={{ background: 'var(--aurora-primary)' }}>
            {/* Modern Glass Morphism Header */}
            <header className="card-glass border-0 rounded-none" style={{
                height: 56,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                zIndex: 50,
                position: 'relative',
                overflow: 'visible'
            }}>
                {/* 1. App Switcher (Left) */}
                <button
                    onClick={() => navigate('/apps')}
                    className="btn-neon mr-3 transition-all duration-300 hover:scale-110"
                    style={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'var(--glass-blur)'
                    }}
                    title="Home Menu"
                >
                    <LayoutGrid size={18} />
                </button>

                {/* 2. Brand / Breadcrumbs */}
                <div className="flex items-center text-white mr-auto overflow-hidden whitespace-nowrap">
                    {/* If on a module, show module name bold */}
                    <span className="font-bold text-lg px-3 text-glow">
                        {currentModule ? currentModule.name : 'Dashboard'}
                    </span>

                    {/* Breadcrumbs for sub-pages */}
                    {breadcrumbs.length > 2 && (
                        <div className="hidden md:flex items-center text-white/80 text-sm">
                            <ChevronRight size={14} className="mx-2 opacity-50" />
                            <span>{breadcrumbs[breadcrumbs.length - 1].label}</span>
                        </div>
                    )}
                </div>

                {/* 3. Global Search (Floating Pill Overlay) */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 top-2 z-[100]" style={{ width: 620 }}>
                    <div className="input-glass flex items-center w-full rounded-full transition-all duration-300 focus-within:scale-105 focus-within:shadow-xl"
                        style={{ height: 42, border: '1px solid var(--glass-border)' }}
                    >
                        <button className="pl-4 pr-3 text-gray-500 hover:text-primary-600 transition-colors">
                            <Search size={16} />
                        </button>
                        <input
                            type="text"
                            placeholder="Search across all modules..."
                            className="w-full bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-500 h-full"
                        />
                        <button className="p-2 hover:bg-primary-100 rounded-full mr-3 text-gray-500 hover:text-primary-600 transition-all">
                            <ChevronRight size={14} className="rotate-90" />
                        </button>
                    </div>
                </div>

                {/* 4. Right Actions (Chat, Activity, User) */}
                <div className="flex items-center gap-2 ml-auto">
                    <button className="btn-ghost p-3 rounded-xl hover:bg-white/10 text-white/90 transition-all duration-300 hover:scale-110" title="Conversations">
                        <MessageSquare size={16} />
                    </button>
                    <button className="btn-ghost p-3 rounded-xl hover:bg-white/10 text-white/90 transition-all duration-300 hover:scale-110" title="Activities">
                        <Activity size={16} />
                    </button>

                    <div className="h-8 w-px bg-white/20 mx-2"></div>

                    <button className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-xl ml-2 transition-all duration-300 hover:scale-105">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-success-400 to-success-600 flex items-center justify-center text-xs font-bold ring-2 ring-white/30 shadow-lg">
                            D
                        </div>
                        <span className="hidden sm:block text-sm font-medium text-white">DemoUser</span>
                    </button>
                </div>
            </header>

            {/* Main Workspace (Split View: Menu + Content) */}
            <div className="flex flex-1 overflow-hidden relative">

                {/* Actyx Sidebar (Module specific menu) - Only implies existence, implementation depends on module */}
                {/* For this replica, we'll keep a slim menu on the left if "Discuss" or specific apps need it, 
                    but Actyx often puts menu in top bar for simple modules.
                    Let's mock a 'Discuss' style sidebar for demonstration if needed, or keeping it clean.
                */}

                <main className="flex-1 overflow-auto relative w-full h-full" style={{ background: 'var(--aurora-primary)' }}>
                    {/* Modern Control Panel with Glass Effect */}
                    <div className="card-glass border-0 rounded-none px-6 py-4 flex items-center justify-between sticky top-0 z-40 mx-4 mt-4 mb-6" style={{ borderBottom: '1px solid var(--glass-border)' }}>
                        <div className="flex items-center gap-3">
                            <button className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-primary">
                                <Plus size={16} />
                                New
                            </button>
                            <button className="btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                                <Upload size={16} />
                                Upload
                            </button>
                        </div>

                        {/* Modern View Switchers with Glass Effect */}
                        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20 shadow-lg">
                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white shadow-sm transition-all duration-300 hover:scale-110 hover:bg-white/30" title="Kanban">
                                <Kanban size={16} />
                            </button>
                            <button className="p-2 hover:bg-white/20 backdrop-blur-sm text-white/70 rounded-lg transition-all duration-300 hover:scale-110 hover:text-white" title="List">
                                <List size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Page Content with Particle Effects */}
                    <div className="p-6 relative">
                        <div className="particle-field absolute inset-0 opacity-30 pointer-events-none"></div>
                        <div className="relative z-10">
                            <Outlet />
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
};
