import React from 'react';
import { useBuilder } from './BuilderContext';
import { Check, X } from 'lucide-react';
import './HolographicOverlay.css';

export const HolographicOverlay: React.FC = () => {
    const { draftBlock, setDraftBlock, commitDraft } = useBuilder();

    if (!draftBlock) return null;

    return (
        <div className="holographic-overlay">
            <div className="holographic-blueprint">
                <div className="holographic-glitch-layer"></div>
                <div className="holographic-content">
                    <div className="holographic-badge">AI DRAFT</div>
                    <div className="holographic-wireframe">
                        {/* Recursive wireframe simulation based on block type */}
                        <div className="holographic-type">{draftBlock.type.toUpperCase()}</div>
                    </div>
                </div>
                
                <div className="holographic-controls">
                    <button className="holographic-btn confirm" onClick={commitDraft}>
                        <Check size={18} /> Confirm
                    </button>
                    <button className="holographic-btn cancel" onClick={() => setDraftBlock(null)}>
                        <X size={18} /> Discard
                    </button>
                </div>
            </div>
            <div className="holographic-scanline"></div>
        </div>
    );
};
