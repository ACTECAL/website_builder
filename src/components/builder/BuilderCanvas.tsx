import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useBuilder } from './BuilderContext';
import { BuilderBlockItem } from './BuilderBlockItem';
import { Palette, Sparkles } from 'lucide-react';
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

    const getDeviceLabel = () => {
        switch (device) {
            case 'mobile': return 'Mobile';
            case 'tablet': return 'Tablet';
            default: return 'Desktop';
        }
    };

    return (
        <div className="builder-canvas-container" onClick={() => selectBlock(null)}>
            <div className="canvas-viewport">
                <div className={`canvas-device-frame ${device}`}>
                    <div className="device-label">
                        <Palette size={14} />
                        {getDeviceLabel()} Preview
                    </div>
                    <div
                        className="canvas-content"
                        style={{
                            width: getWidth(),
                            transform: `scale(${zoom})`,
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
                                    <div className="canvas-empty-state">
                                        <div className="empty-state-icon">
                                            <Sparkles size={40} />
                                        </div>
                                        <h3 className="empty-state-title">Start Building Your Website</h3>
                                        <p className="empty-state-description">
                                            Use the AI chat to add components or drag blocks from the left panel
                                        </p>
                                        <div className="empty-state-hint">
                                            Try asking: "Add a hero section" or "Create a features list"
                                        </div>
                                    </div>
                                )}
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>
            </div>
        </div>
    );
};
