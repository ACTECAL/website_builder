import React from 'react';
import { useBuilder } from './BuilderContext';
import { BlockType } from './types';
import {
    Type, Image as ImageIcon, Layout, Box,
    MinusSquare, AlignCenter, MousePointer
} from 'lucide-react';
import './BuilderSidebar.css';

const BLOCK_TYPES: { type: BlockType; label: string; icon: any }[] = [
    { type: 'hero', label: 'Hero Section', icon: Layout },
    { type: 'header', label: 'Navbar', icon: MinusSquare },
    { type: 'features', label: 'Feature Grid', icon: Box },
    { type: 'text', label: 'Text Block', icon: Type },
    { type: 'image', label: 'Image', icon: ImageIcon },
    { type: 'button', label: 'Button', icon: MousePointer },
    { type: 'footer', label: 'Footer', icon: AlignCenter },
    // { type: 'pricing', label: 'Pricing', icon: TableProperties },
];

export const BuilderSidebar: React.FC = () => {
    const { addBlock, insertTemplate } = useBuilder();

    return (
        <div className="builder-sidebar-root">
            <div className="sidebar-header">
                <h3 className="sidebar-title">Blocks</h3>
            </div>

            <div className="sidebar-content">
                <div className="blocks-grid">
                    {BLOCK_TYPES.map((item) => (
                        <button
                            key={item.type}
                            onClick={() => addBlock(item.type)}
                            className="block-btn"
                        >
                            <item.icon size={18} color="var(--color-muted)" />
                            <span className="block-label">{item.label}</span>
                        </button>
                    ))}
                </div>

                <div className="templates-section">
                    <h4 className="templates-title">Templates</h4>
                    <button
                        className="btn-outline-primary template-btn"
                        onClick={() => insertTemplate('landing')}
                    >
                        Landing Page
                    </button>
                </div>
            </div>
        </div>
    );
};
