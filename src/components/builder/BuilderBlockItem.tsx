import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BuilderBlock } from './types';
import { useBuilder } from './BuilderContext';
import './BuilderBlockItem.css';

interface Props {
    block: BuilderBlock;
}

export const BuilderBlockItem: React.FC<Props> = ({ block }) => {
    const { selectedId, selectBlock } = useBuilder();
    const [isHovered, setIsHovered] = React.useState(false);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        ...block.styles,
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        selectBlock(block.id);
    };

    const showHandle = isHovered || selectedId === block.id;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group builder-block-item ${selectedId === block.id ? 'selected' : 'not-selected'}`}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Drag Handle - only visible on hover/select */}
            <div
                {...attributes}
                {...listeners}
                className={`drag-handle z-10 ${showHandle ? 'visible' : 'hidden'}`}
            >
                ⋮⋮
            </div>

            {/* Render Content */}
            <BlockContent block={block} />
        </div>
    );
};

const BlockContent: React.FC<{ block: BuilderBlock }> = ({ block }) => {
    const { content } = block;
    switch (block.type) {
        case 'hero':
            return (
                <div className="block-hero" style={{ textAlign: block.styles?.textAlign || 'center' }}>
                    <h1 className="block-hero-title">{content.title}</h1>
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
