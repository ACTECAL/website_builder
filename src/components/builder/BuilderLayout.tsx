import React, { useState, useEffect } from 'react';
import { BuilderCanvas } from './BuilderCanvas';
import { BuilderChatPanel } from './BuilderChatPanel';
import { useBuilder } from './BuilderContext';
import { useAuth } from '../../auth/AuthContext';
import {
    Monitor, Smartphone, Tablet, Sparkles, Settings,
    Palette, Eye, Save, FileText, Image, Database, Zap,
    ChevronDown, Plus, Trash2, Edit3, Layers,
    EyeOff, Search, Type,
    Terminal, Activity, Box,
    Layout, Globe, Building, ShoppingBag, Cpu, ArrowUpRight,
    Grid, MessageSquare, DollarSign, Mail, Users, Shield, Download
} from 'lucide-react';
import './BuilderLayout.css';


/* DeviceToggle removed */


export const BuilderLayout: React.FC = () => {
    const {
        device, setDevice, zoom, blocks,
        pages, setPages, assets, collections,
        siteTheme, updateTheme, editorSettings, updateEditorSettings
    } = useBuilder();
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [activeSection, setActiveSection] = useState<'layers' | 'pages' | 'assets' | 'theme' | 'database' | 'settings'>('layers');
    // Keep sidebar tab for sub-navigation within sections if needed, or simplify.
    // For now, let's keep the existing internal "AI vs Structure" as a sub-feature of 'layers'.
    const [activeSidebarTab, setActiveSidebarTab] = useState<'ai' | 'layers'>('ai');
    const { user } = useAuth();

    const getInitials = (user: any) => {
        if (!user) return 'JD';
        if (user.name) {
            const parts = user.name.split(' ');
            if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
            return parts[0][0].toUpperCase();
        }
        return user.email.slice(0, 2).toUpperCase();
    };

    const initials = getInitials(user);

    // Command Palette Listeners
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowCommandPalette(prev => !prev);
            }
            if (e.key === 'Escape') {
                setShowCommandPalette(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleExport = () => {
        const data = JSON.stringify(blocks, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'website-design.json';
        a.click();
    };

    const handleSave = () => {
        const design = {
            blocks,
            device,
            zoom,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('launch-plan-design', JSON.stringify(design));
        alert('Design saved successfully!');
    };

    // We will render content based on activeSection.

    return (
        <div className="builder-root animate-in fade-in">
            {/* Slim Primary Sidebar (Lovable Style) */}
            <aside className="primary-sidebar animate-in slide-right">
                <div className="sidebar-top">
                    <div className="brand-dot">
                        <Sparkles size={18} />
                    </div>
                </div>
                <div className="sidebar-middle">
                    <button
                        className={`nav-icon-btn ${activeSection === 'layers' ? 'active' : ''}`}
                        onClick={() => setActiveSection('layers')}
                        title="Build & Structure"
                    >
                        <Layers size={20} />
                    </button>
                    <button
                        className={`nav-icon-btn ${activeSection === 'pages' ? 'active' : ''}`}
                        onClick={() => setActiveSection('pages')}
                        title="Pages"
                    >
                        <FileText size={20} />
                    </button>
                    <button
                        className={`nav-icon-btn ${activeSection === 'assets' ? 'active' : ''}`}
                        onClick={() => setActiveSection('assets')}
                        title="Assets"
                    >
                        <Image size={20} />
                    </button>
                    <button
                        className={`nav-icon-btn ${activeSection === 'theme' ? 'active' : ''}`}
                        onClick={() => setActiveSection('theme')}
                        title="Themes"
                    >
                        <Palette size={20} />
                    </button>
                    <button
                        className={`nav-icon-btn ${activeSection === 'database' ? 'active' : ''}`}
                        onClick={() => setActiveSection('database')}
                        title="Database"
                    >
                        <Database size={20} />
                    </button>
                </div>
                <div className="sidebar-bottom">
                    <button
                        className={`nav-icon-btn settings-btn ${activeSection === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveSection('settings')}
                        title="Settings"
                    >
                        <Settings size={20} />
                    </button>
                    <div className="user-avatar-mini">
                        <span>{initials}</span>
                    </div>
                </div>
            </aside>

            <div className="main-editor-container">
                {/* Simplified Header */}
                <header className="builder-header animate-in slide-down">
                    <div className="header-left">
                        <div className="breadcrumb-nav">
                            <div className="breadcrumb-item brand" onClick={() => window.location.href = '/'}>
                                <Sparkles size={18} className="sparkle-icon" />
                                <span style={{ letterSpacing: '-0.02em' }}>Actyx</span>
                            </div>
                            <div className="breadcrumb-separator">/</div>
                            <div className="breadcrumb-item project">
                                <span className="project-name" style={{ fontWeight: 700 }}>Landing Page Builder</span>
                                <div className="live-pill" style={{ background: 'var(--accent-secondary-light)', color: 'white' }}>
                                    Active
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="header-center">
                        {/* Viewport controls removed */}
                    </div>

                    <div className="header-right animate-in slide-left-delayed">
                        <div className="active-actions">
                            <button
                                className={`preview-toggle-btn ${previewMode ? 'active' : ''}`}
                                onClick={() => setPreviewMode(!previewMode)}
                            >
                                {previewMode ? <EyeOff size={18} /> : <Eye size={18} />}
                                <span>{previewMode ? 'Edit' : 'Preview'}</span>
                            </button>

                            <div className="v-divider"></div>

                            <button className="export-btn primary-pulse">
                                <Zap size={16} fill="white" />
                                <span>Publish</span>
                                <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Command Palette Modal */}
                {showCommandPalette && (
                    <div className="command-palette-overlay" onClick={() => setShowCommandPalette(false)}>
                        <div className="command-palette-modal animate-in zoom-in" onClick={e => e.stopPropagation()}>
                            <div className="palette-header">
                                <Search size={18} className="search-icon" />
                                <input type="text" placeholder="Type a command or search..." autoFocus className="palette-input" />
                                <div className="kbd-shortcut">ESC</div>
                            </div>
                            <div className="palette-list">
                                <div className="palette-group">
                                    <div className="group-label">Quick Actions</div>
                                    <button className="palette-item"><Plus size={16} /> Add New Block <span className="item-kbd">A</span></button>
                                    <button className="palette-item"><Save size={16} /> Save Design <span className="item-kbd">S</span></button>
                                    <button className="palette-item" onClick={handleExport}><Download size={16} /> Export Code <span className="item-kbd">E</span></button>
                                </div>
                                <div className="palette-group">
                                    <div className="group-label">View</div>
                                    <button className="palette-item"><Monitor size={16} /> Mobile Preview</button>
                                    <button className="palette-item"><Grid size={16} /> Toggle Dot-Grid</button>
                                </div>
                            </div>
                            <div className="palette-footer">
                                <span>↑↓ to navigate</span>
                                <span>↵ to select</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="builder-workspace-container relative overflow-hidden">
                    <div className="builder-workspace animate-in fade-in-delayed">
                        <aside className="builder-sidebar animate-in slide-right-delayed">

                            {/* Render Content Based on Active Section */}
                            {activeSection === 'layers' && (
                                <>
                                    <div className="sidebar-tabs">
                                        <button
                                            className={`sidebar-tab ${activeSidebarTab === 'ai' ? 'active' : ''}`}
                                            onClick={() => setActiveSidebarTab('ai')}
                                        >
                                            <Sparkles size={14} />
                                            AI Designer
                                        </button>
                                        <button
                                            className={`sidebar-tab ${activeSidebarTab === 'layers' ? 'active' : ''}`}
                                            onClick={() => setActiveSidebarTab('layers')}
                                        >
                                            <Layers size={14} />
                                            Structure
                                        </button>
                                    </div>

                                    {activeSidebarTab === 'ai' ? (
                                        <>
                                            <div className="sidebar-header elite">
                                                <div className="brand-icon-glow">
                                                    <Sparkles size={18} />
                                                </div>
                                                <div className="sidebar-header-info">
                                                    <h3>AI BUILDER</h3>
                                                    <span className="premium-label">Engine v2.0</span>
                                                </div>
                                            </div>
                                            <BuilderChatPanel />
                                        </>
                                    ) : (
                                        <div className="layers-navigator animate-in fade-in">
                                            <div className="layers-header">
                                                <h4>Canvas Layers</h4>
                                                <span className="layers-count">{blocks.length} elements</span>
                                            </div>
                                            <div className="layers-list">
                                                {blocks.length > 0 ? blocks.map((block: any, idx: number) => (
                                                    <div key={block.id || idx} className="layer-item">
                                                        <Box size={14} className="layer-icon" />
                                                        <span className="layer-name">{block.type || 'Generic Block'}</span>
                                                        <div className="layer-actions">
                                                            <Edit3 size={12} />
                                                            <Trash2 size={12} />
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div className="empty-layers">No layers found</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Pages Section */}
                            {activeSection === 'pages' && (
                                <div className="sidebar-section-container animate-in fade-in">
                                    <div className="section-watermark">
                                        <FileText size={120} strokeWidth={1} />
                                    </div>
                                    <div className="section-content-wrapper">
                                        <h2 className="section-title-large">PAGES</h2>
                                        <p className="section-subtitle">Site Map</p>
                                        <div className="section-divider"></div>
                                        <div className="sidebar-list">
                                            {pages.map((page: any) => (
                                                <div key={page.id} className={`sidebar-list-item ${page.isHome ? 'active' : ''}`}>
                                                    <Globe size={14} />
                                                    <span>{page.name}</span>
                                                    {page.isHome && <span className="badge-mini">HOME</span>}
                                                </div>
                                            ))}
                                        </div>
                                        <button className="action-btn-subtle" onClick={() => setPages([...pages, { id: Date.now().toString(), name: 'New Page', path: '/new' }])}>
                                            <Plus size={14} />
                                            Add New Page
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Assets Section */}
                            {activeSection === 'assets' && (
                                <div className="sidebar-section-container animate-in fade-in">
                                    <div className="section-watermark">
                                        <Image size={120} strokeWidth={1} />
                                    </div>
                                    <div className="section-content-wrapper">
                                        <h2 className="section-title-large">ASSETS</h2>
                                        <p className="section-subtitle">Library</p>
                                        <div className="section-divider"></div>
                                        <div className="assets-masonry">
                                            {assets.map((asset: any) => (
                                                <div key={asset.id} className="asset-card-premium group" title={asset.name}>
                                                    <div className="asset-preview-wrap">
                                                        <img src={asset.url} alt={asset.name} />
                                                        <div className="asset-overlay">
                                                            <button className="asset-action-btn"><Plus size={14} /></button>
                                                        </div>
                                                    </div>
                                                    <span className="asset-name-mini">{asset.name}</span>
                                                </div>
                                            ))}
                                            <div className="asset-card-premium upload-placeholder">
                                                <Plus size={20} />
                                                <span>Upload</span>
                                            </div>
                                        </div>
                                        <button className="action-btn-subtle">
                                            <Download size={14} />
                                            Upload Asset
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Theme Section */}
                            {activeSection === 'theme' && (
                                <div className="sidebar-section-container animate-in fade-in">
                                    <div className="section-watermark">
                                        <Palette size={120} strokeWidth={1} />
                                    </div>
                                    <div className="section-content-wrapper">
                                        <h2 className="section-title-large">THEME</h2>
                                        <p className="section-subtitle">Design System</p>
                                        <div className="section-divider"></div>
                                        <div className="sidebar-section-group">
                                            <h4>Brand Colors</h4>
                                            <div className="theme-swatch-grid">
                                                {Object.entries(siteTheme.colors).map(([key, val]: [string, any]) => (
                                                    <div
                                                        key={key}
                                                        className="theme-swatch-wrapper group"
                                                        onClick={() => {
                                                            const newColor = prompt(`Enter new color for ${key}:`, val as string);
                                                            if (newColor) updateTheme({ colors: { ...siteTheme.colors, [key]: newColor } });
                                                        }}
                                                    >
                                                        <div className="theme-swatch" style={{ background: val }} title={key} />
                                                        <span className="swatch-label">{key}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="sidebar-section-group">
                                            <h4>Typography</h4>
                                            <div className="sidebar-list">
                                                <div className="sidebar-list-item active">
                                                    <Type size={14} />
                                                    <span>{siteTheme.font}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="action-btn-subtle">
                                            <Edit3 size={14} />
                                            Open Theme Editor
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Database Section */}
                            {activeSection === 'database' && (
                                <div className="sidebar-section-container animate-in fade-in">
                                    <div className="section-watermark">
                                        <Database size={120} strokeWidth={1} />
                                    </div>
                                    <div className="section-content-wrapper">
                                        <h2 className="section-title-large">DATABASE</h2>
                                        <p className="section-subtitle">CMS Content</p>
                                        <div className="section-divider"></div>
                                        <div className="sidebar-list">
                                            {collections.map((col: any) => (
                                                <div key={col.id} className="sidebar-list-item">
                                                    <Database size={14} />
                                                    <span>{col.name}</span>
                                                    <span className="badge-mini">{col.count} items</span>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="action-btn-subtle">
                                            <Plus size={14} />
                                            New Collection
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Settings Section */}
                            {activeSection === 'settings' && (
                                <div className="sidebar-section-container animate-in fade-in">
                                    <div className="section-watermark">
                                        <Settings size={120} strokeWidth={1} />
                                    </div>
                                    <div className="section-content-wrapper">
                                        <h2 className="section-title-large">SETTINGS</h2>
                                        <p className="section-subtitle">Configuration</p>
                                        <div className="section-divider"></div>
                                        <div className="sidebar-list">
                                            <div className="sidebar-list-item" onClick={() => updateEditorSettings({ showGrid: !editorSettings.showGrid })}>
                                                <Grid size={14} />
                                                <span>Show Grid</span>
                                                <div className={`toggle-switch ${editorSettings.showGrid ? 'active' : ''}`} />
                                            </div>
                                            <div className="sidebar-list-item" onClick={() => updateEditorSettings({ autoSave: !editorSettings.autoSave })}>
                                                <Save size={14} />
                                                <span>Auto-save</span>
                                                <div className={`toggle-switch ${editorSettings.autoSave ? 'active' : ''}`} />
                                            </div>
                                            <div className="sidebar-list-item">
                                                <Shield size={14} />
                                                <span>Project Privacy</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </aside>
                        <main className="builder-content animate-in zoom-in-delayed">
                            <BuilderCanvas />

                            {/* Activity Console Removed */}
                        </main>
                    </div>

                    {/* Professional Status Bar */}
                    <div className="builder-status-bar">
                        <div className="status-left">
                            <span className="status-item">Blocks: {blocks.length}</span>
                            <span className="status-item">Device: {device}</span>
                            <span className="status-item">Zoom: {Math.round(zoom * 100)}%</span>
                        </div>

                        <div className="status-center">
                            <span className="status-item">Auto-save: Enabled</span>
                            <span className="status-item">Version: 1.0.0</span>
                        </div>

                        <div className="status-right">
                            <span className="status-item">Last saved: {new Date().toLocaleTimeString()}</span>
                            <button className="status-btn" onClick={handleSave}>
                                <Save size={14} />
                                Save Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
