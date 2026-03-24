import React, { useEffect, useRef } from 'react';
import './CelestialParticles.css';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

export const CelestialParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let isVisible = true;
        
        const isLowPower = (window as any).isLowPower || false;
        const particleCount = isLowPower ? 20 : 40; // Reduced from 30/60 for smoothness
        const connectionDistance = 140; // Slightly tighter connections
        const maxConnectionsPerParticle = 3; // Hard limit for performance

        const observer = new IntersectionObserver((entries) => {
            const wasVisible = isVisible;
            isVisible = entries[0].isIntersecting;
            if (isVisible && !wasVisible) {
                render();
            }
        }, { threshold: 0.1 });
        observer.observe(canvas);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    size: Math.random() * 1.5 + 0.8
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        resize();

        const render = () => {
            if (!isVisible) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update particles
            const len = particles.length;
            for (let i = 0; i < len; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            }

            // Batch draw particles
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            for (let i = 0; i < len; i++) {
                const p = particles[i];
                ctx.moveTo(p.x + p.size, p.y);
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            }
            ctx.fill();

            // Batch draw connections
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            
            const connLimitSq = connectionDistance * connectionDistance;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const mouseLimit = connectionDistance * 1.2;
            const mouseLimitSq = mouseLimit * mouseLimit;

            for (let i = 0; i < len; i++) {
                const p = particles[i];
                let connections = 0;
                
                // Optimized connection loop with connection limit
                for (let j = i + 1; j < len; j++) {
                    if (connections >= maxConnectionsPerParticle) break;

                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    
                    if (Math.abs(dx) > connectionDistance || Math.abs(dy) > connectionDistance) continue;
                    
                    const distSq = dx * dx + dy * dy;
                    if (distSq < connLimitSq) {
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        connections++;
                    }
                }

                // Connection to mouse (independent of inter-particle limit)
                const mdx = p.x - mx;
                const mdy = p.y - my;
                if (Math.abs(mdx) < mouseLimit && Math.abs(mdy) < mouseLimit) {
                    const mdistSq = mdx * mdx + mdy * mdy;
                    if (mdistSq < mouseLimitSq) {
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mx, my);
                    }
                }
            }
            ctx.stroke();

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="celestial-canvas" />;
};

export default CelestialParticles;
