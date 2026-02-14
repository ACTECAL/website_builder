import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BuilderBlock, BlockType } from './types';
import { Sparkles } from 'lucide-react';
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
            className={`group builder-block-wrapper ${selectedId === block.id ? 'active-block-premium' : ''}`}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                {...attributes}
                {...listeners}
                className="drag-handle-minimal"
            >
                <div className="drag-dot"></div>
                <div className="drag-dot"></div>
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
                <div
                    className="hero-block-premium animate-in fade-in"
                    style={{
                        textAlign: block.styles?.textAlign || 'center',
                        padding: block.styles?.padding || '80px 40px',
                        background: block.styles?.background || 'transparent',
                        color: block.styles?.color || 'var(--text-primary)',
                        borderRadius: '16px',
                        overflow: 'hidden'
                    }}
                >
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.02em'
                    }}>
                        {content.title}
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        maxWidth: '700px',
                        margin: '0 auto 2.5rem',
                        opacity: 0.8,
                        fontWeight: 400
                    }}>
                        {content.subtitle}
                    </p>
                    <button className="export-btn primary-pulse" style={{ padding: '12px 32px', fontSize: '1rem' }}>
                        {content.cta}
                    </button>
                </div>
            );
        case 'text':
            return (
                <div style={{ padding: '20px', lineHeight: 1.6, fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    {content.text}
                </div>
            );
        case 'image':
            return (
                <div style={{ padding: '10px' }}>
                    <img src={content.src} alt={content.alt} style={{ width: '100%', display: 'block', borderRadius: 16, boxShadow: 'var(--shadow-lg)' }} />
                </div>
            );
        case 'button':
            return (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <button className="preview-toggle-btn" style={{ padding: '10px 24px' }}>{content.label}</button>
                </div>
            );
        case 'header':
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 40px',
                    background: 'white',
                    borderBottom: '1px solid var(--glass-border)'
                }}>
                    <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.01em', color: 'var(--accent-primary)' }}>{content.title}</div>
                    <nav style={{ display: 'flex', gap: 32, fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {content.nav?.map((link: string, i: number) => (
                            <span key={i} className="hover:text-primary cursor-pointer transition-colors">{link}</span>
                        ))}
                    </nav>
                </div>
            );
        case 'features':
            return (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 30,
                    padding: '60px 40px'
                }}>
                    {content.items?.map((item: any, i: number) => (
                        <div
                            key={i}
                            className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl transition-all duration-300 group"
                            style={{
                                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            }}
                        >
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <Sparkles size={20} />
                            </div>
                            <h3 style={{ margin: '0 0 12px', fontSize: '1.25rem', fontWeight: 700 }}>{item.title}</h3>
                            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            );
        case 'pricing':
            return (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 30,
                    padding: '80px 40px',
                    justifyContent: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {content.plans?.map((plan: any, i: number) => (
                        <div
                            key={i}
                            className={`pricing-card-premium ${plan.popular ? 'popular' : ''}`}
                            style={{
                                padding: '40px',
                                borderRadius: '24px',
                                background: 'white',
                                border: plan.popular ? '2px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 20,
                                boxShadow: plan.popular ? '0 20px 40px rgba(95, 90, 240, 0.15)' : 'var(--shadow-lg)'
                            }}
                        >
                            {plan.popular && <div className="popular-badge">MOST POPULAR</div>}
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{plan.name}</h3>
                            <div style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{plan.price}</div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--text-secondary)' }}>
                                {plan.features.map((f: string, idx: number) => <li key={idx}>✓ {f}</li>)}
                            </ul>
                            <button className={`export-btn ${plan.popular ? '' : 'preview-toggle-btn'}`} style={{ width: '100%', padding: '12px' }}>
                                {plan.cta || 'Get Started'}
                            </button>
                        </div>
                    ))}
                </div>
            );
        case 'stats':
            return (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 40,
                    padding: '60px 40px',
                    textAlign: 'center'
                }}>
                    {content.items?.map((stat: any, i: number) => (
                        <div key={i} className="animate-in fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{
                                fontSize: '4rem',
                                fontWeight: 800,
                                background: 'var(--gradient-primary)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.03em'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            );
        case 'testimonials':
            return (
                <div style={{ padding: '80px 40px', background: 'var(--builder-bg)', borderRadius: 24, margin: '20px' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '32px', lineHeight: 1.4 }}>
                            "{content.items?.[0]?.quote}"
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                                {content.items?.[0]?.author[0]}
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontWeight: 700 }}>{content.items?.[0]?.author}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>{content.items?.[0]?.role}</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        default:
            return <div>Unknown block type: {block.type}</div>;
    }
};
