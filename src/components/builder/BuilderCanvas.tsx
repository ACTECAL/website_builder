import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useBuilder } from './BuilderContext';
import { BuilderBlockItem } from './BuilderBlockItem';

export const BuilderCanvas: React.FC = () => {
    const { blocks, moveBlock, selectBlock, device, zoom } = useBuilder();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id && over) {
            moveBlock(active.id as string, over.id as string);
        }
    };

    const getWidth = () => {
        switch (device) {
            case 'mobile': return '375px';
            case 'tablet': return '768px';
            default: return '100%';
        }
    };

    return (
        <div style={{
            flex: 1,
            background: '#eee',
            padding: 40,
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
        }} onClick={() => selectBlock(null)}>
            <div style={{
                width: getWidth(),
                maxWidth: '1200px',
                minHeight: '80vh',
                background: 'white',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transform: `scale(${zoom})`,
                transformOrigin: 'top center',
                transition: 'width 0.3s ease, transform 0.3s ease',
                paddingBottom: 40
            }}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={blocks.map(b => b.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {blocks.map((block) => (
                            <BuilderBlockItem key={block.id} block={block} />
                        ))}
                        {blocks.length === 0 && (
                            <div style={{
                                padding: 40,
                                textAlign: 'center',
                                color: 'var(--color-muted)',
                                border: '2px dashed var(--color-muted)',
                                margin: 20
                            }}>
                                Drag blocks here or select a template to start
                            </div>
                        )}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};
