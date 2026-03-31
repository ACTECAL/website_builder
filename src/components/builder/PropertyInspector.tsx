import React from 'react';
import { useBuilder } from './BuilderContext';
import { Trash2, Sparkles } from 'lucide-react';
import { GeminiService } from '../../services/gemini';
import './PropertyInspector.css';

const PropertyInput: React.FC<{ 
    label: string; 
    value: string; 
    onChange: (val: string) => void;
    type?: string;
    textarea?: boolean;
}> = ({ label, value, onChange, type = "text", textarea = false }) => {
    const [localValue, setLocalValue] = React.useState(value);

    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleBlur = () => {
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    return (
        <div className="form-group">
            <label>{label}</label>
            {textarea ? (
                <textarea
                    title={`Edit ${label}`}
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onBlur={handleBlur}
                    rows={4}
                />
            ) : (
                <input
                    title={`Edit ${label}`}
                    type={type}
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    onBlur={handleBlur}
                />
            )}
        </div>
    );
};

export const PropertyInspector: React.FC = () => {
    const { selectedId, blocks, updateBlock, removeBlock, addMessage } = useBuilder();
    const [reviewing, setReviewing] = React.useState(false);
    const [apiKey] = React.useState(() => localStorage.getItem('gemini_api_key') || '');

    const selectedBlock = blocks.find(b => b.id === selectedId);

    if (!selectedBlock) {
        return (
            <div className="inspector-empty">
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

    const runAIReview = async () => {
        if (!apiKey) {
            addMessage('model', "Please set your Gemini API key in the chat panel first.");
            return;
        }
        setReviewing(true);
        try {
            const service = new GeminiService(apiKey);
            const feedback = await service.analyzeLayout(blocks);
            addMessage('model', `AI Design Review:\n${feedback}`);
        } catch (err: any) {
            addMessage('model', `AI Review Error: ${err.message}`);
        } finally {
            setReviewing(false);
        }
    };

    return (
        <div className="property-inspector-root">
            <div className="inspector-header">
                <h3 className="inspector-title">Inspector</h3>
                <div className="header-actions">
                    <button 
                        className={`btn-ai-review ${reviewing ? 'loading' : ''}`}
                        onClick={runAIReview}
                        disabled={reviewing}
                        title="AI Design Critique"
                    >
                        <Sparkles size={16} />
                    </button>
                    <button
                        onClick={() => removeBlock(selectedId!)}
                        className="btn-delete"
                        title="Delete Block"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="inspector-body">
                <div className="inspector-section">
                    <h4 className="section-label">Content</h4>

                    {selectedBlock.type === 'text' && (
                        <PropertyInput
                            label="Text"
                            value={selectedBlock.content.text}
                            onChange={(val) => handleContentChange('text', val)}
                            textarea
                        />
                    )}

                    {selectedBlock.type === 'hero' && (
                        <>
                            <PropertyInput
                                label="Title"
                                value={selectedBlock.content.title}
                                onChange={(val) => handleContentChange('title', val)}
                            />
                            <PropertyInput
                                label="Subtitle"
                                value={selectedBlock.content.subtitle}
                                onChange={(val) => handleContentChange('subtitle', val)}
                            />
                            <PropertyInput
                                label="CTA Label"
                                value={selectedBlock.content.cta}
                                onChange={(val) => handleContentChange('cta', val)}
                            />
                        </>
                    )}

                    {selectedBlock.type === 'button' && (
                        <PropertyInput
                            label="Label"
                            value={selectedBlock.content.label}
                            onChange={(val) => handleContentChange('label', val)}
                        />
                    )}

                    {selectedBlock.type === 'image' && (
                        <PropertyInput
                            label="Image URL"
                            value={selectedBlock.content.src}
                            onChange={(val) => handleContentChange('src', val)}
                        />
                    )}
                </div>

                <div className="inspector-section">
                    <h4 className="section-label">Styles</h4>

                    <div className="form-group">
                        <label htmlFor="style-padding">Padding (px)</label>
                        <input
                            id="style-padding"
                            type="range" min="0" max="100"
                            value={selectedBlock.styles?.padding || 0}
                            onChange={(e) => handleStyleChange('padding', Number(e.target.value))}
                        />
                        <span className="range-value">{selectedBlock.styles?.padding}px</span>
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

                    <div className="form-group">
                        <label>Quantum Depth (3D)</label>
                        <div className="dual-range">
                            <input
                                type="range" min="-30" max="30"
                                value={selectedBlock.styles?.rotateX || 0}
                                onChange={(e) => handleStyleChange('rotateX', Number(e.target.value))}
                                title="Rotate X"
                            />
                            <input
                                type="range" min="-30" max="30"
                                value={selectedBlock.styles?.rotateY || 0}
                                onChange={(e) => handleStyleChange('rotateY', Number(e.target.value))}
                                title="Rotate Y"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
