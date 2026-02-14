import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { BuilderBlock, BlockType, DeviceType } from './types';
import { v4 as uuidv4 } from "uuid";

interface BuilderContextType {
    blocks: BuilderBlock[];
    setBlocks: React.Dispatch<React.SetStateAction<BuilderBlock[]>>;
    addBlock: (type: BlockType, content?: any) => void;
    updateBlock: (id: string, updates: Partial<BuilderBlock>) => void;
    removeBlock: (id: string) => void;
    moveBlock: (activeId: string, overId: string) => void;
    selectedId: string | null;
    selectBlock: (id: string | null) => void;
    device: DeviceType;
    setDevice: (d: DeviceType) => void;
    zoom: number;
    setZoom: (z: number) => void;
    insertTemplate: (templateName: string) => void;
    siteTheme: any;
    updateTheme: (theme: any) => void;
    pages: any[];
    setPages: React.Dispatch<React.SetStateAction<any[]>>;
    assets: any[];
    setAssets: React.Dispatch<React.SetStateAction<any[]>>;
    collections: any[];
    setCollections: React.Dispatch<React.SetStateAction<any[]>>;
    editorSettings: any;
    updateEditorSettings: (settings: any) => void;
    apiKey: string;
    setApiKey: (key: string) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function useBuilder() {
    const context = useContext(BuilderContext);
    if (!context) {
        throw new Error('useBuilder must be used within a BuilderProvider');
    }
    return context;
}

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [blocks, setBlocks] = useState<BuilderBlock[]>(() => {
        try {
            const saved = localStorage.getItem('lovable_builder_blocks');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [device, setDevice] = useState<DeviceType>('desktop');
    const [zoom, setZoom] = useState(1);

    // Auto-save
    useEffect(() => {
        localStorage.setItem('lovable_builder_blocks', JSON.stringify(blocks));
    }, [blocks]);

    const addBlock = useCallback((type: BlockType, content?: any) => {
        const newBlock: BuilderBlock = {
            id: uuidv4(),
            type,
            content: content || getDefaultContent(type),
            styles: getDefaultStyles(type),
        };
        setBlocks(prev => [...prev, newBlock]);
        setSelectedId(newBlock.id);
    }, []);

    const updateBlock = useCallback((id: string, updates: Partial<BuilderBlock>) => {
        setBlocks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
    }, []);

    const removeBlock = useCallback((id: string) => {
        setBlocks(prev => prev.filter(b => b.id !== id));
        if (selectedId === id) setSelectedId(null);
    }, [selectedId]);

    const moveBlock = useCallback((activeId: string, overId: string) => {
        setBlocks((items) => {
            const oldIndex = items.findIndex((item) => item.id === activeId);
            const newIndex = items.findIndex((item) => item.id === overId);
            // Simple array move implementation without extra deps for now, or use array-move package if present
            const newItems = [...items];
            const [movedItem] = newItems.splice(oldIndex, 1);
            newItems.splice(newIndex, 0, movedItem);
            return newItems;
        });
    }, []);

    const [siteTheme, setSiteTheme] = useState(() => ({
        colors: { primary: '#7c3aed', secondary: '#db2777', accent: '#ed64a6', background: '#ffffff', text: '#0f172a' },
        font: 'Inter, sans-serif',
        borderRadius: '12px'
    }));

    const [pages, setPages] = useState<any[]>([
        { id: '1', name: 'Home', path: '/', isHome: true },
        { id: '2', name: 'About', path: '/about' },
        { id: '3', name: 'Pricing', path: '/pricing' }
    ]);

    const [assets, setAssets] = useState<any[]>([
        { id: 'a1', name: 'hero-bg.png', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c', type: 'image' },
        { id: 'a2', name: 'logo.svg', url: 'https://cdn.worldvectorlogo.com/logos/lightning-2.svg', type: 'image' },
        { id: 'a3', name: 'avatar.jpg', url: 'https://i.pravatar.cc/150?u=jd', type: 'image' }
    ]);

    const [collections, setCollections] = useState<any[]>([
        { id: 'c1', name: 'Blog Posts', count: 5 },
        { id: 'c2', name: 'Authors', count: 2 },
        { id: 'c3', name: 'Categories', count: 3 }
    ]);

    const [editorSettings, setEditorSettings] = useState({
        showGrid: true,
        autoSave: true,
        snapToGrid: true,
        darkMode: false
    });

    const updateEditorSettings = useCallback((updates: any) => {
        setEditorSettings(prev => ({ ...prev, ...updates }));
    }, []);

    const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || 'AIzaSyDo4AHPCS6XNrtH1cqnRdvCk7p7FDTBxas');

    // Sync API key to localStorage
    useEffect(() => {
        if (apiKey) localStorage.setItem('gemini_api_key', apiKey);
    }, [apiKey]);

    const updateTheme = useCallback((updates: any) => {
        setSiteTheme(prev => ({ ...prev, ...updates }));
    }, []);

    // ... existing insertTemplate ...
    const insertTemplate = useCallback((templateName: string) => {
        // Demo templates
        if (templateName === 'landing') {
            const newBlocks: BuilderBlock[] = [
                {
                    id: uuidv4(),
                    type: 'header',
                    content: { title: 'Actyx', nav: ['Solutions', 'Resources', 'Pricing', 'Login'] },
                    styles: { background: '#ffffff', padding: '0 40px' }
                },
                {
                    id: uuidv4(),
                    type: 'hero',
                    content: {
                        title: 'Scale Beyond Limits',
                        subtitle: 'The intelligent operating system for modern enterprises. Built with AI at the core to automate everything.',
                        cta: 'Start Free Trial'
                    },
                    styles: {
                        background: 'radial-gradient(circle at center, #5f5af0 0%, #4b47d1 100%)',
                        color: 'white',
                        padding: '120px 40px',
                        textAlign: 'center'
                    }
                },
                {
                    id: uuidv4(),
                    type: 'stats',
                    content: {
                        items: [
                            { value: '500M+', label: 'Processes Automated' },
                            { value: '99.9%', label: 'Uptime SLA' },
                            { value: '140+', label: 'Countries Supported' }
                        ]
                    },
                    styles: { padding: '60px 40px', background: '#ffffff' }
                },
                {
                    id: uuidv4(),
                    type: 'features',
                    content: {
                        items: [
                            { title: 'AI-Native Workflow', desc: 'Predictive automation that learns from your business processes and optimizes in real-time.' },
                            { title: 'Global Infrastructure', desc: 'Deploy anywhere with enterprise-grade security and 99.99% uptime guaranteed by SLAs.' },
                            { title: 'Unified Data Core', desc: 'Break down silos with a single source of truth for all your operational and financial data.' }
                        ]
                    },
                    styles: { padding: '80px 40px', background: '#f8fafc' }
                },
                {
                    id: uuidv4(),
                    type: 'pricing',
                    content: {
                        plans: [
                            { name: 'Starter', price: '$0', features: ['Core ERP', '1,000 requests', 'Community Support'], cta: 'Get Started' },
                            { name: 'Enterprise', price: 'Custom', features: ['Unlimited scale', 'Dedicated AI Support', 'Full Compliance'], cta: 'Contact Sales', popular: true }
                        ]
                    },
                    styles: { padding: '80px 40px', background: '#ffffff' }
                }
            ];
            setBlocks(prev => [...prev, ...newBlocks]);
        }
    }, []);

    return (
        <BuilderContext.Provider value={{
            blocks,
            setBlocks,
            addBlock,
            updateBlock,
            removeBlock,
            moveBlock,
            selectedId,
            selectBlock: setSelectedId,
            device,
            setDevice,
            zoom,
            setZoom,
            insertTemplate,
            siteTheme,
            updateTheme,
            pages,
            setPages,
            assets,
            setAssets,
            collections,
            setCollections,
            editorSettings,
            updateEditorSettings,
            apiKey,
            setApiKey
        }}>
            {children}
        </BuilderContext.Provider>
    );
};

// Helpers
function getDefaultContent(type: BlockType): any {
    switch (type) {
        case 'hero': return { title: 'Hero Headline', subtitle: 'Subheadline goes here', cta: 'Click Me' };
        case 'text': return { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' };
        case 'button': return { label: 'Button', link: '#' };
        case 'image': return { src: 'https://via.placeholder.com/800x400', alt: 'Placeholder' };
        case 'header': return { title: 'Logo', nav: ['Link 1', 'Link 2', 'Link 3'] };
        case 'footer': return { text: '© 2024 Company Name. All rights reserved.' };
        case 'pricing': return { plans: [{ name: 'Basic', price: '$29', features: ['Feature A', 'Feature B'] }, { name: 'Pro', price: '$99', features: ['All Basic', 'Priority Support'], popular: true }] };
        case 'stats': return { items: [{ value: '10K+', label: 'Users' }, { value: '99%', label: 'Success' }, { value: '24/7', label: 'Support' }] };
        case 'testimonials': return { items: [{ quote: 'Life changing experience!', author: 'Jane Doe', role: 'CEO, TechInc' }] };
        default: return {};
    }
}

function getDefaultStyles(type: BlockType): any {
    const base = { padding: '40px', margin: '0', background: 'transparent' };
    if (type === 'hero') return { ...base, padding: '100px 40px', textAlign: 'center', background: 'var(--builder-bg)' };
    if (type === 'header') return { ...base, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', borderBottom: '1px solid var(--glass-border)', padding: '0 40px' };
    if (type === 'footer') return { ...base, background: 'var(--text-primary)', color: 'white', textAlign: 'center', padding: '60px 40px' };
    return base;
}
