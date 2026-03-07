import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useBuilder } from './BuilderContext';
import { BuilderBlockItem } from './BuilderBlockItem';
import './BuilderCanvas.css';

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
        <div className="canvas-root" onClick={() => selectBlock(null)}>
            <div
                className="canvas-surface"
                style={{
                    width: getWidth(),
                    transform: `scale(${zoom})`
                }}
            >
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
                            <div className="empty-canvas-msg">
                                Drag blocks here or select a template to start
                            </div>
                        )}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};
