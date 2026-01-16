import React from 'react';
import { Check } from 'lucide-react';

interface StatusStep {
    id: string;
    label: string;
    isCompleted?: boolean;
}

interface StatusTimelineProps {
    steps: StatusStep[];
    currentStepId: string;
    onStepClick?: (stepId: string) => void;
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({ steps, currentStepId, onStepClick }) => {
    const currentIndex = steps.findIndex(s => s.id === currentStepId);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            border: '1px solid var(--erp-neutral-200)',
            borderRadius: 'var(--erp-radius-md)',
            overflow: 'hidden'
        }}>
            {steps.map((step, idx) => {
                const isCurrent = step.id === currentStepId;
                const isPast = idx < currentIndex;
                const isFuture = idx > currentIndex;

                let bg = 'white';
                let color = 'var(--erp-neutral-600)';

                if (isCurrent) {
                    bg = 'var(--erp-primary-600)';
                    color = 'white';
                } else if (isPast) {
                    bg = 'var(--erp-primary-50)';
                    color = 'var(--erp-primary-700)';
                }

                return (
                    <button
                        key={step.id}
                        onClick={() => onStepClick && onStepClick(step.id)}
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            padding: '8px 16px',
                            background: bg,
                            color: color,
                            border: 'none',
                            borderRight: '1px solid var(--erp-neutral-200)',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            position: 'relative',
                            clipPath: idx === steps.length - 1 ? 'none' : 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)',
                            marginLeft: idx === 0 ? 0 : -8, // Overlap for chevron effect
                            zIndex: steps.length - idx, // Stack order
                            paddingLeft: idx === 0 ? 16 : 24, // Account for chevron indentation
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isPast && <Check size={14} strokeWidth={3} />}
                        {step.label}
                    </button>
                );
            })}
        </div>
    );
};
