export const useSonicFeedback = () => {
    const playSound = (type: 'hover' | 'click' | 'add') => {
        try {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = context.createOscillator();
            const gain = context.createGain();

            oscillator.connect(gain);
            gain.connect(context.destination);

            if (type === 'hover') {
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(800, context.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(1200, context.currentTime + 0.1);
                gain.gain.setValueAtTime(0.01, context.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1);
            } else if (type === 'click') {
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(1000, context.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, context.currentTime + 0.1);
                gain.gain.setValueAtTime(0.02, context.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1);
            } else if (type === 'add') {
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(400, context.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(800, context.currentTime + 0.2);
                gain.gain.setValueAtTime(0.03, context.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.2);
            }

            oscillator.start();
            oscillator.stop(context.currentTime + 0.2);
        } catch (e) {
            // Audio context might be blocked by browser policy until user interaction
        }
    };

    return { playSound };
};
