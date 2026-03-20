import React, { useEffect, useRef } from 'react';
import { useBuilder } from '../builder/BuilderContext';
import { CelestialParticles } from './CelestialParticles';
import './InfiniteAura.css';

export const InfiniteAura: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { themeColor } = useBuilder();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;
        let isVisible = true;

        const observer = new IntersectionObserver((entries) => {
            const wasVisible = isVisible;
            isVisible = entries[0].isIntersecting;
            if (isVisible && !wasVisible) {
                render();
            }
        }, { threshold: 0.1 });
        observer.observe(canvas);

        const resize = () => {
            // Performance trick: In low power mode, we render at 1x regardless of retina display density
            const dpr = (window as any).isLowPower ? 1 : (window.devicePixelRatio || 1);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('resize', resize);
        resize();

        const rgb = {
            r: parseInt(themeColor.slice(1, 3), 16),
            g: parseInt(themeColor.slice(3, 5), 16),
            b: parseInt(themeColor.slice(5, 7), 16)
        };

        const render = () => {
            if (!isVisible) return;

            time += 0.002;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const drawLiquidLayer = (offsetX: number, offsetY: number, scale: number, alpha: number, speed: number) => {
                const shiftX = Math.sin(time * speed + offsetX) * 100;
                const shiftY = Math.cos(time * speed + offsetY) * 100;
                
                const gradient = ctx.createRadialGradient(
                    canvas.width / 2 + shiftX,
                    canvas.height / 2 + shiftY,
                    0,
                    canvas.width / 2 + shiftX * 0.5,
                    canvas.height / 2 + shiftY * 0.5,
                    canvas.width * scale
                );

                const baseColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}`;
                gradient.addColorStop(0, `${baseColor}, ${alpha})`);
                gradient.addColorStop(0.6, `${baseColor}, ${alpha * 0.2})`);
                gradient.addColorStop(1, 'transparent');

                ctx.fillStyle = gradient;
                ctx.globalCompositeOperation = 'screen';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            };

            // Optimization: Only one high-quality layer + one subtle layer
            drawLiquidLayer(0, 0, 1.2, 0.12, 1.0);
            drawLiquidLayer(Math.PI, Math.PI, 1.5, 0.05, 0.6);
            
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, [themeColor]);

    return (
        <div className="infinite-aura-wrapper">
            <canvas ref={canvasRef} className="infinite-aura-canvas" />
            <CelestialParticles />
        </div>
    );
};
