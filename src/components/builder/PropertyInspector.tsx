import React from 'react';
import { useBuilder } from './BuilderContext';
import { Trash2 } from 'lucide-react';

export const PropertyInspector: React.FC = () => {
    const { selectedId, blocks, updateBlock, removeBlock } = useBuilder();

    const selectedBlock = blocks.find(b => b.id === selectedId);

    if (!selectedBlock) {
        return (
            <div style={{ width: 300, padding: 20, borderLeft: '1px solid #e5e7eb', background: 'white' }}>
                <p className="muted">Select a block to edit its properties.</p>
            </div>
        );
    }

    const handleStyleChange = (key: string, value: any) => {
        updateBlock(selectedBlock.id, {
            styles: {
                ...selectedBlock.styles,
                [key]: value
            }
        });
    };

    const handleContentChange = (key: string, value: any) => {
        updateBlock(selectedBlock.id, {
            content: {
                ...selectedBlock.content,
                [key]: value
            }
        });
    };

    return (
        <div style={{ width: 320, borderLeft: '1px solid #e5e7eb', background: 'white', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: 16 }}>Inspector</h3>
                <button
                    onClick={() => removeBlock(selectedBlock.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 4 }}
                    title="Delete Block"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div style={{ padding: 20, overflowY: 'auto', flex: 1 }}>
                <div style={{ marginBottom: 24 }}>
                    <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 12 }}>Content</h4>

                    {selectedBlock.type === 'text' && (
                        <div className="form-group">
                            <label htmlFor="content-text">Text</label>
                            <textarea
                                id="content-text"
                                value={selectedBlock.content.text}
                                onChange={(e) => handleContentChange('text', e.target.value)}
                                rows={4}
                            />
                        </div>
                    )}

                    {selectedBlock.type === 'hero' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="content-title">Title</label>
                                <input
                                    id="content-title"
                                    type="text"
                                    value={selectedBlock.content.title}
                                    onChange={(e) => handleContentChange('title', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content-subtitle">Subtitle</label>
                                <input
                                    id="content-subtitle"
                                    type="text"
                                    value={selectedBlock.content.subtitle}
                                    onChange={(e) => handleContentChange('subtitle', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content-cta">CTA Label</label>
                                <input
                                    id="content-cta"
                                    type="text"
                                    value={selectedBlock.content.cta}
                                    onChange={(e) => handleContentChange('cta', e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {selectedBlock.type === 'button' && (
                        <div className="form-group">
                            <label htmlFor="content-label">Label</label>
                            <input
                                id="content-label"
                                type="text"
                                value={selectedBlock.content.label}
                                onChange={(e) => handleContentChange('label', e.target.value)}
                            />
                        </div>
                    )}

                    {selectedBlock.type === 'image' && (
                        <div className="form-group">
                            <label htmlFor="content-src">Image URL</label>
                            <input
                                id="content-src"
                                type="text"
                                value={selectedBlock.content.src}
                                onChange={(e) => handleContentChange('src', e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <div>
                    <h4 style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 12 }}>Styles</h4>

                    <div className="form-group">
                        <label htmlFor="style-padding">Padding (px)</label>
                        <input
                            id="style-padding"
                            type="range" min="0" max="100"
                            value={selectedBlock.styles?.padding || 0}
                            onChange={(e) => handleStyleChange('padding', Number(e.target.value))}
                        />
                        <span style={{ fontSize: 12, color: 'var(--color-muted)', float: 'right' }}>{selectedBlock.styles?.padding}px</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="style-background">Background</label>
                        <input
                            id="style-background"
                            type="text"
                            value={selectedBlock.styles?.background || 'transparent'}
                            onChange={(e) => handleStyleChange('background', e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="style-color">Text Color</label>
                        <input
                            id="style-color"
                            type="color"
                            value={selectedBlock.styles?.color || '#000000'}
                            onChange={(e) => handleStyleChange('color', e.target.value)}
                            style={{ width: '100%', padding: 0, height: 40 }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="style-textAlign">Text Align</label>
                        <select
                            id="style-textAlign"
                            value={selectedBlock.styles?.textAlign || 'left'}
                            onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                        >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                </div>
            </div>
            <style>{`
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: var(--color-text); }
        .form-group input[type=text], .form-group textarea, .form-group select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
        }
        .form-group input[type=text]:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);
        }
      `}</style>
        </div>
    );
};
