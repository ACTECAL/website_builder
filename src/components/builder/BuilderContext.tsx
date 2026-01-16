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
        colors: { primary: '#667eea', secondary: '#764ba2', accent: '#ed64a6', background: '#ffffff', text: '#2d3748' },
        font: 'Inter, sans-serif',
        borderRadius: '8px'
    }));

    const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');

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
                { id: uuidv4(), type: 'header', content: { title: 'Brand', nav: ['Home', 'Features', 'Pricing'] }, styles: { background: '#ffffff', padding: 20 } },
                { id: uuidv4(), type: 'hero', content: { title: 'Build Faster', subtitle: 'The ultimate builder for modern web apps.', cta: 'Get Started' }, styles: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: 80, textAlign: 'center' } },
                { id: uuidv4(), type: 'features', content: { items: [{ title: 'Fast', desc: 'Blazing fast performance' }, { title: 'Secure', desc: 'Enterprise grade security' }, { title: 'Easy', desc: 'Drag and drop interface' }] }, styles: { padding: 60, background: '#f8fafc' } },
                { id: uuidv4(), type: 'footer', content: { text: '© 2024 Brand Inc.' }, styles: { background: '#1a202c', color: '#cbd5e0', padding: 40, textAlign: 'center' } }
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
        default: return {};
    }
}

function getDefaultStyles(type: BlockType): any {
    const base = { padding: 20, margin: 0, background: 'transparent' };
    if (type === 'hero') return { ...base, padding: 60, textAlign: 'center', background: '#f3f4f6' };
    if (type === 'header') return { ...base, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', borderBottom: '1px solid #e5e7eb' };
    if (type === 'footer') return { ...base, background: '#1f2937', color: '#f3f4f6', textAlign: 'center' };
    return base;
}
