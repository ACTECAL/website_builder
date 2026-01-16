import React, { useState } from 'react';
import { BuilderCanvas } from './BuilderCanvas';
import { BuilderChatPanel } from './BuilderChatPanel';
import { useBuilder } from './BuilderContext';
import { 
  Monitor, Smartphone, Tablet, Download, ZoomIn, ZoomOut, Upload, Sparkles, Settings, 
  Palette, Eye, Undo, Redo, Save, FolderOpen, FileText, Code, Share, Layout, 
  Grid, Box, Type, Image, Database, Cpu, Globe, Shield, Zap, ArrowUpRight, 
  ChevronDown, Plus, Trash2, Copy, Edit3, Layers, AlignLeft, AlignCenter, 
  AlignRight, Bold, Italic, Underline, List, ListOrdered, Minus, Maximize2, 
  Minimize2, RefreshCw, RotateCcw, RotateCw, Scissors, Save as SaveIcon,
  FolderOpen as FolderOpenIcon, FileText as FileTextIcon, Code as CodeIcon,
  Share as ShareIcon, Download as DownloadIcon, Upload as UploadIcon,
  Eye as EyeIcon, EyeOff, Play, StopCircle, Pause, Square, Circle, Triangle,
  Hexagon, Octagon, Star, Heart, MessageSquare, MessageCircle, Send, Send as SendIcon,
  Mail, Phone, MapPin, Calendar, Clock, Users, User, UserPlus, UserCheck, UserX,
  Users as UsersIcon, UserPlus as UsersPlusIcon, Users as UsersRoundIcon, Building, Building2, Factory, Store,
  ShoppingBag, ShoppingCart, CreditCard, DollarSign, Euro, PoundSterling, Bitcoin,
  Globe as GlobeIcon, Wifi, WifiOff, Wifi as WifiIcon, WifiOff as WifiOffIcon
} from 'lucide-react';
import './BuilderLayout.css';

const DeviceToggle: React.FC<{ device: any, setDevice: any }> = ({ device, setDevice }) => (
    <div className="device-toggle-container">
        <button
            className={`device-toggle-btn ${device === 'desktop' ? 'active' : ''}`}
            onClick={() => setDevice('desktop')}
            title="Desktop View"
        >
            <Monitor size={16} />
        </button>
        <button
            className={`device-toggle-btn ${device === 'tablet' ? 'active' : ''}`}
            onClick={() => setDevice('tablet')}
            title="Tablet View"
        >
            <Tablet size={16} />
        </button>
        <button
            className={`device-toggle-btn ${device === 'mobile' ? 'active' : ''}`}
            onClick={() => setDevice('mobile')}
            title="Mobile View"
        >
            <Smartphone size={16} />
        </button>
    </div>
);

const QuickActions: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => (
    <div className="quick-actions">
        <button className="quick-action-btn" onClick={() => onAction('undo')} title="Undo">
            <Undo size={16} />
        </button>
        <button className="quick-action-btn" onClick={() => onAction('redo')} title="Redo">
            <Redo size={16} />
        </button>
        <button className="quick-action-btn" onClick={() => onAction('duplicate')} title="Duplicate">
            <Copy size={16} />
        </button>
        <button className="quick-action-btn" onClick={() => onAction('delete')} title="Delete">
            <Trash2 size={16} />
        </button>
        <button className="quick-action-btn" onClick={() => onAction('group')} title="Group">
            <Layers size={16} />
        </button>
        <button className="quick-action-btn" onClick={() => onAction('ungroup')} title="Ungroup">
            <Layers size={16} style={{ transform: 'rotate(45deg)' }} />
        </button>
    </div>
);

const AlignmentTools: React.FC<{ onAlign: (alignment: string) => void }> = ({ onAlign }) => (
    <div className="alignment-tools">
        <button className="align-btn" onClick={() => onAlign('left')} title="Align Left">
            <AlignLeft size={16} />
        </button>
        <button className="align-btn" onClick={() => onAlign('center')} title="Align Center">
            <AlignCenter size={16} />
        </button>
        <button className="align-btn" onClick={() => onAlign('right')} title="Align Right">
            <AlignRight size={16} />
        </button>
    </div>
);

const TextFormatting: React.FC<{ onFormat: (format: string) => void }> = ({ onFormat }) => (
    <div className="text-formatting">
        <button className="format-btn" onClick={() => onFormat('bold')} title="Bold">
            <Bold size={16} />
        </button>
        <button className="format-btn" onClick={() => onFormat('italic')} title="Italic">
            <Italic size={16} />
        </button>
        <button className="format-btn" onClick={() => onFormat('underline')} title="Underline">
            <Underline size={16} />
        </button>
        <button className="format-btn" onClick={() => onFormat('list')} title="Bullet List">
            <List size={16} />
        </button>
        <button className="format-btn" onClick={() => onFormat('numbered')} title="Numbered List">
            <ListOrdered size={16} />
        </button>
    </div>
);

export const BuilderLayout: React.FC = () => {
    const { device, setDevice, zoom, setZoom, blocks } = useBuilder();
    const [showTemplates, setShowTemplates] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showComponents, setShowComponents] = useState(false);
    const [showExport, setShowExport] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(false);

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

    const handleLoad = () => {
        const saved = localStorage.getItem('launch-plan-design');
        if (saved) {
            const design = JSON.parse(saved);
            alert('Load functionality coming soon!');
        } else {
            alert('No saved design found!');
        }
    };

    const templates = [
        { id: 'blank', name: 'Blank Canvas', description: 'Start from scratch', icon: Layout },
        { id: 'landing', name: 'Landing Page', description: 'Hero + Features + CTA', icon: Globe },
        { id: 'business', name: 'Business Site', description: 'Professional layout', icon: Building },
        { id: 'portfolio', name: 'Portfolio', description: 'Showcase your work', icon: Image },
        { id: 'blog', name: 'Blog Layout', description: 'Content-focused design', icon: FileText },
        { id: 'ecommerce', name: 'E-commerce', description: 'Product catalog + cart', icon: ShoppingBag },
        { id: 'dashboard', name: 'Dashboard', description: 'Data visualization', icon: Database },
        { id: 'app', name: 'Web App', description: 'Interactive application', icon: Cpu }
    ];

    const components = [
        { id: 'hero', name: 'Hero Section', icon: ArrowUpRight },
        { id: 'features', name: 'Features Grid', icon: Grid },
        { id: 'testimonials', name: 'Testimonials', icon: MessageSquare },
        { id: 'pricing', name: 'Pricing Tables', icon: DollarSign },
        { id: 'contact', name: 'Contact Form', icon: Mail },
        { id: 'team', name: 'Team Members', icon: Users },
        { id: 'gallery', name: 'Image Gallery', icon: Image },
        { id: 'stats', name: 'Statistics', icon: Database },
        { id: 'cta', name: 'Call to Action', icon: Zap },
        { id: 'footer', name: 'Footer', icon: Shield }
    ];

    const handleTemplateSelect = (templateId: string) => {
        alert(`Template "${templateId}" selected! Implementation coming soon.`);
        setShowTemplates(false);
    };

    const handleComponentSelect = (componentId: string) => {
        alert(`Component "${componentId}" added! Implementation coming soon.`);
        setShowComponents(false);
    };

    const handleExportAction = (format: string) => {
        alert(`Exporting to ${format}... Coming soon!`);
        setShowExport(false);
    };

    return (
        <div className="builder-root">
            {/* Professional Header */}
            <header className="builder-header">
                <div className="header-left">
                    <div className="brand-section">
                        <div className="brand-logo">
                            <Sparkles size={24} />
                        </div>
                        <div className="brand-info">
                            <div className="brand-name">Actyx</div>
                            <div className="brand-subtitle">AI-Powered ERP Solutions</div>
                        </div>
                    </div>
                    
                    <div className="project-info">
                        <div className="project-name">Launch Plan Designer</div>
                        <div className="project-status">Active Project</div>
                    </div>
                </div>

                <div className="header-center">
                    <DeviceToggle device={device} setDevice={setDevice} />
                    
                    <div className="canvas-controls">
                        <div className="zoom-controls">
                            <button
                                className="zoom-btn"
                                onClick={() => setZoom(Math.max(0.25, zoom - 0.1))}
                                title="Zoom Out"
                            >
                                <ZoomOut size={16} />
                            </button>
                            <span className="zoom-value">{Math.round(zoom * 100)}%</span>
                            <button
                                className="zoom-btn"
                                onClick={() => setZoom(Math.min(4, zoom + 0.1))}
                                title="Zoom In"
                            >
                                <ZoomIn size={16} />
                            </button>
                            <button
                                className="zoom-btn"
                                onClick={() => setZoom(1)}
                                title="Reset Zoom"
                            >
                                <RefreshCw size={16} />
                            </button>
                        </div>
                        
                        <div className="view-controls">
                            <button
                                className={`view-btn ${previewMode ? 'active' : ''}`}
                                onClick={() => setPreviewMode(!previewMode)}
                                title={previewMode ? "Exit Preview" : "Preview Mode"}
                            >
                                <EyeIcon size={16} />
                            </button>
                            <button
                                className="view-btn"
                                onClick={() => alert('Fullscreen mode coming soon!')}
                                title="Fullscreen"
                            >
                                <Maximize2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="header-right">
                    {/* File Operations */}
                    <div className="toolbar-group">
                        <div className="dropdown-container">
                            <button
                                className="toolbar-btn"
                                onClick={() => setShowTemplates(!showTemplates)}
                                title="Templates"
                            >
                                <FileTextIcon size={16} />
                                Templates
                                <ChevronDown size={12} />
                            </button>
                            {showTemplates && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-header">Templates</div>
                                    {templates.map(template => (
                                        <button
                                            key={template.id}
                                            className="dropdown-item"
                                            onClick={() => handleTemplateSelect(template.id)}
                                        >
                                            <template.icon size={16} />
                                            <div className="template-info">
                                                <div className="template-name">{template.name}</div>
                                                <div className="template-desc">{template.description}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="dropdown-container">
                            <button
                                className="toolbar-btn"
                                onClick={() => setShowComponents(!showComponents)}
                                title="Components"
                            >
                                <Box size={16} />
                                Components
                                <ChevronDown size={12} />
                            </button>
                            {showComponents && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-header">Components</div>
                                    {components.map(component => (
                                        <button
                                            key={component.id}
                                            className="dropdown-item"
                                            onClick={() => handleComponentSelect(component.id)}
                                        >
                                            <component.icon size={16} />
                                            <div className="component-name">{component.name}</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            className="toolbar-btn"
                            onClick={handleSave}
                            title="Save Project"
                        >
                            <SaveIcon size={16} />
                            Save
                        </button>

                        <button
                            className="toolbar-btn"
                            onClick={handleLoad}
                            title="Load Project"
                        >
                            <FolderOpenIcon size={16} />
                            Load
                        </button>
                    </div>

                    {/* Edit Operations */}
                    <div className="toolbar-group">
                        <button
                            className="toolbar-btn"
                            onClick={() => alert('Undo functionality coming soon!')}
                            title="Undo"
                        >
                            <RotateCcw size={16} />
                            Undo
                        </button>

                        <button
                            className="toolbar-btn"
                            onClick={() => alert('Redo functionality coming soon!')}
                            title="Redo"
                        >
                            <RotateCw size={16} />
                            Redo
                        </button>

                        <button
                            className="toolbar-btn"
                            onClick={() => alert('Cut functionality coming soon!')}
                            title="Cut"
                        >
                            <Scissors size={16} />
                            Cut
                        </button>

                        <button
                            className="toolbar-btn"
                            onClick={() => alert('Copy functionality coming soon!')}
                            title="Copy"
                        >
                            <Copy size={16} />
                            Copy
                        </button>

                        <button
                            className="toolbar-btn"
                            onClick={() => alert('Paste functionality coming soon!')}
                            title="Paste"
                        >
                            <Copy size={16} style={{ opacity: 0.5 }} />
                            Paste
                        </button>
                    </div>

                    {/* Export Operations */}
                    <div className="toolbar-group">
                        <div className="dropdown-container">
                            <button
                                className="export-btn"
                                onClick={() => setShowExport(!showExport)}
                                title="Export"
                            >
                                <DownloadIcon size={16} />
                                Export
                                <ChevronDown size={12} />
                            </button>
                            {showExport && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-header">Export Options</div>
                                    <button className="dropdown-item" onClick={() => handleExportAction('JSON')}>
                                        <DownloadIcon size={16} />
                                        <div>Export JSON</div>
                                    </button>
                                    <button className="dropdown-item" onClick={() => handleExportAction('HTML')}>
                                        <CodeIcon size={16} />
                                        <div>Export HTML</div>
                                    </button>
                                    <button className="dropdown-item" onClick={() => handleExportAction('React')}>
                                        <CodeIcon size={16} />
                                        <div>Export React</div>
                                    </button>
                                    <button className="dropdown-item" onClick={() => handleExportAction('Vue')}>
                                        <CodeIcon size={16} />
                                        <div>Export Vue</div>
                                    </button>
                                    <button className="dropdown-item" onClick={() => handleExportAction('Angular')}>
                                        <CodeIcon size={16} />
                                        <div>Export Angular</div>
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            className="toolbar-btn"
                            onClick={() => alert('Code export coming soon!')}
                            title="Export Code"
                        >
                            <CodeIcon size={16} />
                            Code
                        </button>

                        <button
                            className="toolbar-btn"
                            onClick={() => alert('Share functionality coming soon!')}
                            title="Share Project"
                        >
                            <ShareIcon size={16} />
                            Share
                        </button>
                    </div>
                </div>
            </header>

            {/* Professional Toolbar */}
            <div className="builder-toolbar">
                <div className="toolbar-section">
                    <span className="toolbar-label">Quick Actions</span>
                    <QuickActions onAction={(action) => alert(`${action} action coming soon!`)} />
                </div>

                <div className="toolbar-section">
                    <span className="toolbar-label">Alignment</span>
                    <AlignmentTools onAlign={(alignment) => alert(`Align ${alignment} coming soon!`)} />
                </div>

                <div className="toolbar-section">
                    <span className="toolbar-label">Text Formatting</span>
                    <TextFormatting onFormat={(format) => alert(`Format ${format} coming soon!`)} />
                </div>

                <div className="toolbar-section">
                    <span className="toolbar-label">Canvas Tools</span>
                    <div className="canvas-tools">
                        <button className="tool-btn" onClick={() => alert('Grid toggle coming soon!')}>
                            <Grid size={16} />
                        </button>
                        <button className="tool-btn" onClick={() => alert('Rulers coming soon!')}>
                            <Type size={16} />
                        </button>
                        <button className="tool-btn" onClick={() => alert('Guides coming soon!')}>
                            <AlignLeft size={16} />
                        </button>
                        <button className="tool-btn" onClick={() => alert('Snapping coming soon!')}>
                            <Grid size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="builder-workspace">
                <BuilderChatPanel />
                <BuilderCanvas />
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
                        <SaveIcon size={14} />
                        Save Now
                    </button>
                </div>
            </div>
        </div>
    );
};
