import React, { useEffect, useRef, useState } from 'react';
import { useBuilder } from '../builder/BuilderContext';
import { Volume2, VolumeX } from 'lucide-react';
import './AuraSoundscape.css';

export const AuraSoundscape: React.FC = () => {
    const { themeColor, isPreviewMode } = useBuilder();
    const [isMuted, setIsMuted] = useState(true);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const filterRef = useRef<BiquadFilterNode | null>(null);
    const gainRef = useRef<GainNode | null>(null);

    const initAudio = () => {
        if (audioCtxRef.current) return;

        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, ctx.currentTime);
        gain.gain.setValueAtTime(0, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        filterRef.current = filter;
        gainRef.current = gain;
    };

    useEffect(() => {
        if (!gainRef.current || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const volume = isMuted ? 0 : (isPreviewMode ? 0.08 : 0.04);
        gainRef.current.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1);
    }, [isMuted, isPreviewMode]);

    useEffect(() => {
        if (!oscillatorRef.current || !filterRef.current || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        
        // Map color to frequency (simplified)
        const hex = themeColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        const baseFreq = 40 + (r / 255) * 40; // Low frequency base
        const filterFreq = 100 + (b / 255) * 800; // Filter brightness based on blue channel

        oscillatorRef.current.frequency.exponentialRampToValueAtTime(baseFreq, ctx.currentTime + 2);
        filterRef.current.frequency.exponentialRampToValueAtTime(filterFreq, ctx.currentTime + 2);
    }, [themeColor]);

    const toggleMute = () => {
        initAudio();
        if (audioCtxRef.current?.state === 'suspended') {
            audioCtxRef.current.resume();
        }
        setIsMuted(!isMuted);
    };

    return (
        <button 
            className={`soundscape-toggle ${isMuted ? 'muted' : 'active'}`} 
            onClick={toggleMute}
            title={isMuted ? 'Enable Soundscape' : 'Mute Soundscape'}
        >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="pulse-icon" />}
        </button>
    );
};
