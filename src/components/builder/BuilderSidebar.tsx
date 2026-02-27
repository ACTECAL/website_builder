import React from 'react';
import { useBuilder } from './BuilderContext';
import { BlockType } from './types';
import {
    Type, Image as ImageIcon, Layout, Box,
    MinusSquare, AlignCenter, MousePointer
} from 'lucide-react';

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
        <div style={{ width: 280, borderRight: '1px solid #e5e7eb', background: '#fff', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 20, borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ margin: 0, fontSize: 18 }}>Blocks</h3>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
                <div style={{ display: 'grid', gap: 10 }}>
                    {BLOCK_TYPES.map((item) => (
                        <button
                            key={item.type}
                            onClick={() => addBlock(item.type)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                padding: '12px 16px',
                                border: '1px solid #e5e7eb',
                                borderRadius: 8,
                                background: 'white',
                                cursor: 'pointer',
                                textAlign: 'left',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
                        >
                            <item.icon size={18} color="var(--color-muted)" />
                            <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: 32 }}>
                    <h4 style={{ fontSize: 14, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 12 }}>Templates</h4>
                    <button
                        className="btn-outline-primary"
                        style={{ width: '100%', marginBottom: 8 }}
                        onClick={() => insertTemplate('landing')}
                    >
                        Landing Page
                    </button>
                </div>
            </div>
        </div>
    );
};
