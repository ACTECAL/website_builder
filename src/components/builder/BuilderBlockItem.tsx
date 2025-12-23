import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BuilderBlock, BlockType } from './types';
import { useBuilder } from './BuilderContext';

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
        ...block.styles, // Apply user-defined styles
        position: 'relative' as const,
        border: selectedId === block.id ? '2px solid var(--color-primary)' : '2px dashed transparent',
        cursor: 'default',
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
            className="group"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Drag Handle - only visible on hover/select */}
            <div
                {...attributes}
                {...listeners}
                className="z-10"
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    padding: 4,
                    cursor: 'grab',
                    opacity: showHandle ? 1 : 0,
                    transition: 'opacity 0.2s',
                    transform: 'translateX(-100%)',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px 0 0 4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
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
                <div style={{ textAlign: block.styles?.textAlign || 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{content.title}</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--color-muted)' }}>{content.subtitle}</p>
                    <button className="btn-primary">{content.cta}</button>
                </div>
            );
        case 'text':
            return <p>{content.text}</p>;
        case 'image':
            return <img src={content.src} alt={content.alt} style={{ maxWidth: '100%', borderRadius: 8 }} />;
        case 'button':
            return <button className="btn-primary">{content.label}</button>;
        case 'header':
            return (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 20 }}>{content.title}</div>
                    <nav style={{ display: 'flex', gap: 20 }}>
                        {content.nav?.map((link: string, i: number) => <span key={i}>{link}</span>)}
                    </nav>
                </div>
            );
        case 'features':
            return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                    {content.items?.map((item: any, i: number) => (
                        <div key={i} style={{ padding: 20, background: 'var(--surface-alt)', borderRadius: 8, boxShadow: 'var(--shadow-sm)' }}>
                            <h3 style={{ margin: '0 0 10px' }}>{item.title}</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-muted)' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            );
        default:
            return <div>Unknown block type: {block.type}</div>;
    }
};
