import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useBuilder } from './BuilderContext';
import { BuilderBlockItem } from './BuilderBlockItem';
import { HolographicOverlay } from './HolographicOverlay';
import { FluidGrid } from './FluidGrid';
import './BuilderCanvas.css';

export const BuilderCanvas: React.FC = React.memo(() => {
    const { blocks, moveBlock, selectBlock, device, zoom } = useBuilder();
    const [isDragging, setIsDragging] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setIsDragging(true);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setIsDragging(false);
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
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={blocks.map(b => b.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <FluidGrid>
                            {blocks.map((block) => (
                                <BuilderBlockItem key={block.id} block={block} />
                            ))}
                            {blocks.length === 0 && (
                                <div className="empty-canvas-msg">
                                    Drag blocks here or select a template to start
                                </div>
                            )}
                        </FluidGrid>
                    </SortableContext>
                    
                    <HolographicOverlay />
                </DndContext>
                
                {/* Magnetic Alignment Feedback (Phase 12) */}
                {isDragging && (
                    <div className="magnetic-overlay" />
                )}
            </div>

            {/* Global SVG Filters for Performance - Simplified */}
            <svg className="refraction-svg" style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="refraction-filter" x="-10%" y="-10%" width="120%" height="120%">
                        {/* Simplified glass effect without heavy turbulence */}
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
});
