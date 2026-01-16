import React from 'react';

interface KanbanColumn {
    id: string;
    title: string;
    color?: string;
}

interface KanbanCard {
    id: string;
    columnId: string;
    title: string;
    subtitle?: string;
    tag?: string;
    avatar?: string;
}

interface KanbanBoardProps {
    columns: KanbanColumn[];
    cards: KanbanCard[];
    onCardClick?: (card: KanbanCard) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, cards, onCardClick }) => {
    return (
        <div style={{ display: 'flex', gap: 20, overflowX: 'auto', padding: '10px 0', height: '100%' }}>
            {columns.map((col) => {
                const colCards = cards.filter(c => c.columnId === col.id);

                return (
                    <div key={col.id} style={{ minWidth: 280, width: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontWeight: 600, color: 'var(--erp-text-secondary)', fontSize: '0.9rem' }}>{col.title}</span>
                                <span style={{ background: '#e5e7eb', padding: '2px 8px', borderRadius: 99, fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>{colCards.length}</span>
                            </div>
                            {col.color && <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />}
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {colCards.map((card) => (
                                <div
                                    key={card.id}
                                    onClick={() => onCardClick && onCardClick(card)}
                                    style={{
                                        background: 'white',
                                        padding: 12,
                                        borderRadius: 8,
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        border: '1px solid var(--erp-border)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <h4 style={{ margin: '0 0 6px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--erp-text-main)' }}>{card.title}</h4>
                                    {card.subtitle && <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--erp-text-secondary)' }}>{card.subtitle}</p>}

                                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        {card.tag && (
                                            <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: '#e0e7ff', color: '#4338ca', borderRadius: 4, fontWeight: 600 }}>
                                                {card.tag}
                                            </span>
                                        )}
                                        {card.avatar ? (
                                            <img src={card.avatar} alt="User" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                                        ) : (
                                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#d1d5db' }} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
