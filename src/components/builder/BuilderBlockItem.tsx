import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BuilderBlock } from './types';
import { useBuilder } from './BuilderContext';
import { useSonicFeedback } from '../../hooks/useSonicFeedback';
import { GripVertical } from 'lucide-react';
import './BuilderBlockItem.css';

interface Props {
    block: BuilderBlock;
}

export const BuilderBlockItem = React.memo(({ block }: Props) => {
    const { selectedId, selectBlock, isPreviewMode } = useBuilder();
    const { playSound } = useSonicFeedback();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: block.id });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPreviewMode) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const el = e.currentTarget as HTMLElement;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);

        // Update neural properties locally for blocks inside
        const neuralElements = el.querySelectorAll('.neural-text');
        neuralElements.forEach((node) => {
            const nEl = node as HTMLElement;
            const nRect = nEl.getBoundingClientRect();
            // I'll just use the mouse position relative to the block
            const dx = e.clientX - (nRect.left + nRect.width / 2);
            const dy = e.clientY - (nRect.top + nRect.height / 2);
            const dist = Math.sqrt(dx*dx + dy*dy);
            const factor = Math.max(0, 1 - dist / 400);
            nEl.style.setProperty('--neural-weight', `${400 + factor * 500}`);
            nEl.style.setProperty('--neural-spacing', `${-0.05 + factor * 0.1}em`);
        });
    };

    const style = {
        transition,
        ...block.styles,
        // Kinetic Morphing & Quantum Depth
        transform: [
            CSS.Transform.toString(transform),
            block.styles?.rotateX ? `perspective(1000px) rotateX(${block.styles.rotateX}deg)` : '',
            block.styles?.rotateY ? `perspective(1000px) rotateY(${block.styles.rotateY}deg)` : '',
            transform ? `scale(${1 - Math.abs(transform.y) / 2000})` : ''
        ].filter(Boolean).join(' '),
        ...(transform ? {
            filter: `blur(${Math.min(Math.abs(transform.y) / 50, 4)}px)`,
            opacity: 0.8
        } : {}),
        // Specular Shimmer
    } as React.CSSProperties;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes} // Moved attributes here
            {...listeners} // Moved listeners here
            className={`builder-block-item ${selectedId === block.id ? 'selected' : 'not-selected'} ${isPreviewMode ? 'preview-mode' : ''} glass-block aura-shadow`}
            onClick={(e) => {
                if (isPreviewMode) return;
                e.stopPropagation();
                selectBlock(block.id);
                playSound('click');
            }}
            onMouseMove={handleMouseMove}
            // onMouseEnter and onMouseLeave removed
        >
            {/* Shimmer Overlay */}
            <div className="specular-shimmer" />
            {/* Refractive Layer */}
            <div className="refractive-layer" />
            
            {/* Drag Handle - only visible when not in preview mode and selected */}
            {!isPreviewMode && (
                <div className={`drag-handle z-10 ${selectedId === block.id ? 'visible' : 'hidden'}`}>
                    <GripVertical size={16} />
                </div>
            )}

            {/* Render Content */}
            <BlockContent block={block} isPreviewMode={isPreviewMode} />
        </div>
    );
});

const BlockContent: React.FC<{ block: BuilderBlock; isPreviewMode: boolean }> = ({ block, isPreviewMode }) => {
    const { content } = block;

    // Optimized: Neural effect now handled by parent's onMouseMove via CSS variables
    // removed window.mousemove listener to prevent performance degradation

    switch (block.type) {
        case 'hero':
            return (
                <div className="block-hero" style={{ textAlign: block.styles?.textAlign || 'center' }}>
                    <h1 
                        className="block-hero-title neural-text"
                        style={{ 
                            fontWeight: 'var(--neural-weight, 700)',
                            letterSpacing: 'var(--neural-spacing, normal)'
                        }}
                    >
                        {content.title}
                    </h1>
                    <p className="block-hero-subtitle">{content.subtitle}</p>
                    <button className="btn-primary">{content.cta}</button>
                </div>
            );
        case 'text':
            return <p>{content.text}</p>;
        case 'image':
            return <img src={content.src} alt={content.alt} className="block-image" />;
        case 'button':
            return <button className="btn-primary">{content.label}</button>;
        case 'header':
            return (
                <div className="block-header">
                    <div className="block-header-title">{content.title}</div>
                    <nav className="block-header-nav">
                        {content.nav?.map((link: string, i: number) => <span key={i}>{link}</span>)}
                    </nav>
                </div>
            );
        case 'features':
            return (
                <div className="block-features">
                    {content.items?.map((item: any, i: number) => (
                        <div key={i} className="block-feature-card">
                            <h3 className="block-feature-title">{item.title}</h3>
                            <p className="block-feature-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            );
        default:
            return <div>Unknown block type: {block.type}</div>;
    }
};
