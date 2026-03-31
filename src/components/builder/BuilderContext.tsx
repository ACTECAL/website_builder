import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { BuilderBlock, BlockType, DeviceType, ChatMessage } from './types';
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
    themeColor: string;
    setThemeColor: (c: string) => void;
    messages: ChatMessage[];
    addMessage: (role: 'user' | 'model', text: string) => void;
    clearMessages: () => void;
    isPreviewMode: boolean;
    setIsPreviewMode: (v: boolean) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    draftBlock: BuilderBlock | null;
    setDraftBlock: (b: BuilderBlock | null) => void;
    commitDraft: () => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const useBuilder = () => {
    const context = useContext(BuilderContext);
    if (context === undefined) {
        // Fallback for global use (e.g. in SiteLayout)
        return {
            blocks: [],
            setBlocks: () => {}, // Added setBlocks to the default context
            selectedId: null,
            addBlock: () => {},
            updateBlock: () => {},
            removeBlock: () => {},
            moveBlock: () => {},
            selectBlock: () => {},
            device: 'desktop' as DeviceType,
            setDevice: () => {},
            zoom: 1,
            setZoom: () => {},
            insertTemplate: () => {},
            themeColor: '#6366f1',
            setThemeColor: () => {},
            messages: [],
            addMessage: () => {},
            clearMessages: () => {},
            isPreviewMode: false,
            setIsPreviewMode: () => {},
            undo: () => {},
            redo: () => {},
            canUndo: false,
            canRedo: false,
            draftBlock: null,
            setDraftBlock: () => {},
            commitDraft: () => {}
        };
    }
    return context;
};

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
    const [themeColor, setThemeColor] = useState(() => {
        return localStorage.getItem('lovable_builder_theme') || '#6366f1';
    });
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [draftBlock, setDraftBlock] = useState<BuilderBlock | null>(null);
    const [history, setHistory] = useState<{ past: BuilderBlock[][], future: BuilderBlock[][] }>({
        past: [],
        future: []
    });

    const undo = useCallback(() => {
        setHistory(prev => {
            if (prev.past.length === 0) return prev;
            const previous = prev.past[prev.past.length - 1];
            const newPast = prev.past.slice(0, prev.past.length - 1);
            setBlocks(previous);
            return {
                past: newPast,
                future: [blocks, ...prev.future]
            };
        });
    }, [blocks]);

    const redo = useCallback(() => {
        setHistory(prev => {
            if (prev.future.length === 0) return prev;
            const next = prev.future[0];
            const newFuture = prev.future.slice(1);
            setBlocks(next);
            return {
                past: [...prev.past, blocks],
                future: newFuture
            };
        });
    }, [blocks]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
                if (e.shiftKey) redo();
                else undo();
            } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
                redo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo]);

    // Helper to push to history before update
    const pushHistory = useCallback((currentBlocks: BuilderBlock[]) => {
        setHistory(prev => ({
            past: [...prev.past, currentBlocks],
            future: []
        }));
    }, []);

    // Auto-save blocks
    useEffect(() => {
        localStorage.setItem('lovable_builder_blocks', JSON.stringify(blocks));
    }, [blocks]);

    // Auto-save theme
    useEffect(() => {
        localStorage.setItem('lovable_builder_theme', themeColor);
        document.documentElement.style.setProperty('--aura-primary', themeColor);
        document.documentElement.style.setProperty('--aura-primary-transparent', `${themeColor}22`);
    }, [themeColor]);

    const addBlock = useCallback((type: BlockType, content?: any) => {
        const newId = uuidv4();
        const newBlock: BuilderBlock = {
            id: newId,
            type,
            content: content || getDefaultContent(type),
            styles: getDefaultStyles(type),
        };
        setBlocks(prev => {
            pushHistory(prev);
            return [...prev, newBlock];
        });
        setSelectedId(newId);
    }, [pushHistory]);

    const updateBlock = useCallback((id: string, updates: Partial<BuilderBlock>) => {
        setBlocks(prev => {
            pushHistory(prev);
            return prev.map(b => b.id === id ? { ...b, ...updates } : b);
        });
    }, [pushHistory]);

    const removeBlock = useCallback((id: string) => {
        setBlocks(prev => {
            pushHistory(prev);
            return prev.filter(b => b.id !== id);
        });
        setSelectedId(prev => prev === id ? null : prev);
    }, [pushHistory]);

    const moveBlock = useCallback((activeId: string, overId: string) => {
        setBlocks((items) => {
            pushHistory(items);
            const oldIndex = items.findIndex((item) => item.id === activeId);
            const newIndex = items.findIndex((item) => item.id === overId);
            const newItems = [...items];
            const [movedItem] = newItems.splice(oldIndex, 1);
            newItems.splice(newIndex, 0, movedItem);
            return newItems;
        });
    }, [pushHistory]);

    const commitDraft = useCallback(() => {
        setDraftBlock(draft => {
            if (!draft) return draft;
            setBlocks(prev => {
                pushHistory(prev);
                return [...prev, draft];
            });
            setSelectedId(draft.id);
            return null;
        });
    }, [pushHistory]);

    const insertTemplate = useCallback((templateName: string) => {
        // Demo templates
        if (templateName === 'landing') {
            const newBlocks: BuilderBlock[] = [
                { id: uuidv4(), type: 'header', content: { title: 'Brand', nav: ['Home', 'Features', 'Pricing'] }, styles: { background: '#ffffff', padding: 20 } },
                { id: uuidv4(), type: 'hero', content: { title: 'Build Faster', subtitle: 'The ultimate builder for modern web apps.', cta: 'Get Started' }, styles: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: 80, textAlign: 'center' } },
                { id: uuidv4(), type: 'features', content: { items: [{ title: 'Fast', desc: 'Blazing fast performance' }, { title: 'Secure', desc: 'Enterprise grade security' }, { title: 'Easy', desc: 'Drag and drop interface' }] }, styles: { padding: 60, background: '#f8fafc' } },
                { id: uuidv4(), type: 'footer', content: { text: '© 2024 Brand Inc.' }, styles: { background: '#1a202c', color: '#cbd5e0', padding: 40, textAlign: 'center' } }
            ];
            setBlocks(prev => {
                pushHistory(prev);
                return [...prev, ...newBlocks];
            });
        }
    }, [pushHistory]);

    const addMessage = useCallback((role: 'user' | 'model', text: string) => {
        setMessages(prev => [...prev, {
            id: uuidv4(),
            role,
            text,
            timestamp: new Date()
        }]);
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    const contextValue = React.useMemo(() => ({
        blocks,
        setBlocks,
        addBlock,
        updateBlock,
        removeBlock,
        moveBlock,
        insertTemplate,
        selectedId,
        selectBlock: setSelectedId,
        themeColor,
        setThemeColor,
        device,
        setDevice,
        zoom,
        setZoom,
        messages,
        addMessage,
        clearMessages,
        isPreviewMode,
        setIsPreviewMode,
        undo,
        redo,
        canUndo: history.past.length > 0,
        canRedo: history.future.length > 0,
        draftBlock,
        setDraftBlock,
        commitDraft
    }), [
        blocks, addBlock, updateBlock, removeBlock, moveBlock, insertTemplate, 
        selectedId, themeColor, device, zoom, messages, addMessage, clearMessages, 
        isPreviewMode, undo, redo, history.past.length, history.future.length, 
        draftBlock, commitDraft
    ]);

    return (
        <BuilderContext.Provider value={contextValue}>
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
