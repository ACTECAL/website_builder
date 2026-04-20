import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { appModules } from "../data/appModules";
import { PRODUCTS } from "../data/products";
import { AdvisorDropdown } from '../components/AdvisorDropdown';
import {
  Cpu,
  ShoppingCart,
  Users,
  Activity,
  ArrowRight,
  MousePointer2,
  Mail,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  Layers,
  TrendingUp,
  Monitor,
  Box,
  Star
} from "lucide-react";

/**
 * Kinetic Data Ecosystem - A Canvas-based physics simulation
 * showcasing integrated data flow.
 */
/**
 * Hook to detect if an element is in the viewport
 */
const useIntersectionObserver = (ref: React.RefObject<any>, options: IntersectionObserverInit) => {
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};

const DataEcosystem: React.FC = React.memo(() => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    class Particle {
      x: number; y: number; vx: number; vy: number;
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }
      update(mx: number, my: number) {
        const dx = mx - this.x;
        const dy = my - this.y;
        const distSq = dx*dx + dy*dy;
        if (distSq < 40000) {
          const dist = Math.sqrt(distSq);
          const force = (200 - dist) / 200;
          this.vx += dx * force * 0.02;
          this.vy += dy * force * 0.02;
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
        this.vx *= 0.98;
        this.vy *= 0.98;
      }
      draw(c: CanvasRenderingContext2D) {
        c.fillStyle = 'rgba(113, 75, 103, 0.4)';
        c.beginPath();
        c.arc(this.x, this.y, 1.2, 0, Math.PI * 2);
        c.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => new Particle());
    let mouse = { x: -1000, y: -1000 };
    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      
      ctx.strokeStyle = 'rgba(113, 75, 103, 0.03)';
      ctx.beginPath();
      for(let i=0; i<width; i+=40) { ctx.moveTo(i,0); ctx.lineTo(i,height); }
      for(let i=0; i<height; i+=40) { ctx.moveTo(0,i); ctx.lineTo(width,i); }
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(113, 75, 103, 0.08)';
      const maxDistSq = 6400;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(mouse.x, mouse.y);
        p.draw(ctx);
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          if (Math.abs(dx) < 80 && Math.abs(dy) < 80) {
            const distSq = dx * dx + dy * dy;
            if (distSq < maxDistSq) { 
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
            }
          }
        }
      }
      ctx.stroke();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="data-ecosystem-container">
      <canvas ref={canvasRef} className="data-canvas" />
      <div className="ecosystem-overlay">
        <div className="eco-indicator"><span className="eco-dot"></span> Real-time Sync</div>
        <div className="eco-indicator"><span className="eco-dot delay-500"></span> Neural Flow</div>
      </div>
    </div>
  );
});

const MockDataDisplay: React.FC = React.memo(() => {
  const [revenue, setRevenue] = React.useState(143.3);
  const [customers, setCustomers] = React.useState(1206);

  React.useEffect(() => {
    const dataInterval = setInterval(() => {
      setRevenue(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(1));
      setCustomers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);
    return () => clearInterval(dataInterval);
  }, []);

  return (
    <>
      <div className="mock-card highlight">
        <div className="mock-label">Total Revenue</div>
        <div className="mock-value">${revenue}k</div>
        <div className="mock-trend positive">
          <TrendingUp size={12} /> +24%
        </div>
      </div>
      <div className="mock-card card-dwell-target">
        <div className="mock-label">New Customers</div>
        <div className="mock-value">{customers.toLocaleString()}</div>
        <div className="mock-trend positive">
          <Users size={12} /> +12%
        </div>
      </div>
    </>
  );
});

const GhostCursor: React.FC<{ ghostPos: { x: number; y: number }; isHovering: boolean }> = React.memo(({ ghostPos, isHovering }) => {
  return (
    <div 
      className={`ghost-cursor ${isHovering ? 'dwell' : ''}`} 
      style={{ left: `${ghostPos.x}%`, top: `${ghostPos.y}%` }}
    >
      <MousePointer2 size={18} fill="currentColor" />
    </div>
  );
});

const HyperDriveCanvas: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let particles: { x: number; y: number; z: number; oz: number }[] = [];
    const count = 1000;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width - width / 2,
            y: Math.random() * height - height / 2,
            z: Math.random() * width,
            oz: 0
        });
    }

    let animationId: number;
    const render = () => {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(113, 75, 103, 0.4)';
        ctx.lineWidth = 1;

        particles.forEach(p => {
            p.oz = p.z;
            p.z -= 15;
            if (p.z <= 1) {
                p.z = width;
                p.oz = p.z;
            }

            const x = (p.x / p.z) * width + width / 2;
            const y = (p.y / p.z) * height + height / 2;
            const ox = (p.x / p.oz) * width + width / 2;
            const oy = (p.y / p.oz) * height + height / 2;

            ctx.beginPath();
            ctx.moveTo(ox, oy);
            ctx.lineTo(x, y);
            ctx.stroke();
        });
        animationId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hyper-drive-canvas" />;
});

const NeuralNav: React.FC<{ activeAura: string }> = ({ activeAura }) => {
  const sections = [
    { id: 'hero' },
    { id: 'trust-stats-section' },
    { id: 'bento-apps-section' },
    { id: 'comparison-section' }
  ];

  return (
    <div className="neural-nav" style={{ '--nav-aura': activeAura } as React.CSSProperties}>
      {sections.map(s => (
        <a key={s.id} href={`#${s.id}`} className="nav-node-link">
          <div className="nav-node-dot"></div>
        </a>
      ))}
    </div>
  );
};

const AnimatedCounter: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const [displayValue, setDisplayValue] = React.useState('0');
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.5 });

  React.useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setHasAnimated(true);
      const isFloat = value.includes('.');
      const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''));
      const suffix = value.replace(/[0-9.]/g, '');
      
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        const current = easedProgress * numericPart;
        
        setDisplayValue((isFloat ? current.toFixed(1) : Math.floor(current)) + suffix);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isIntersecting, hasAnimated, value]);

  return (
    <div 
      className="trust-stat-item holographic-stat" 
      ref={ref}
      onMouseMove={(e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = (y - centerY) / 8;
        const tiltY = (centerX - x) / 8;
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
      }}
    >
      <div className="stat-glow-aura"></div>
      <div className="stat-sync-node"></div>
      <div className="trust-stat-content">
        <span className="trust-stat-value">{displayValue}</span>
        <span className="trust-stat-label">{label}</span>
      </div>
    </div>
  );
};

const NeuralFlowLines: React.FC = () => {
  return (
    <div className="neural-flow-container">
      <svg className="neural-svg" preserveAspectRatio="none" viewBox="0 0 1000 200">
        <defs>
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d="M750,10 Q800,100 500,190" className="flow-path path-1" />
        <path d="M800,20 Q850,120 700,190" className="flow-path path-2" />
        <path d="M700,5 Q750,80 300,190" className="flow-path path-3" />
      </svg>
    </div>
  );
};

const Home: React.FC = () => {
  // Removed unused activeTab state
  const [isIntegrated, setIsIntegrated] = useState(true);
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [isCinematic, setIsCinematic] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  // tooltipText and setTooltipText removed as they were unused
  const [celestialParticles, setCelestialParticles] = useState<any[]>([]);

  // Ghost Cursor State lifted from component
  const [ghostPos, setGhostPos] = useState({ x: 50, y: 50 });
  const [isHoveringGhost, setIsHoveringGhost] = useState(false);
  const [auraColor, setAuraColor] = useState('var(--color-primary)');

  const scrollYRef = React.useRef(0);
  const mousePosRef = React.useRef({ x: 0, y: 0 });
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const mouseMoved = React.useRef(false);
  const scrolled = React.useRef(false);
  const rafId = React.useRef<number>(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };
    mouseMoved.current = true;
  };

  const handleButtonMagnetic = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    target.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
  };

  const handleButtonReset = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget) e.currentTarget.style.transform = '';
  };

  const handleButtonSpotlight = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--spotlight-x', `${x}px`);
    target.style.setProperty('--spotlight-y', `${y}px`);
  };

  // Ghost Cursor Logic
  React.useEffect(() => {
    const targets = [
      { x: 25, y: 25 },
      { x: 85, y: 35 },
      { x: 75, y: 65 },
      { x: 45, y: 85 }
    ];
    let currentTargetIdx = 0;
    const ghostInterval = setInterval(() => {
      const target = targets[currentTargetIdx];
      setGhostPos(target);
      setIsHoveringGhost(true);
      setTimeout(() => setIsHoveringGhost(false), 2000);
      currentTargetIdx = (currentTargetIdx + 1) % targets.length;
    }, 4500);
    return () => clearInterval(ghostInterval);
  }, []);

  const handleCardTilt = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCardReset = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    if (!card) return;
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => {
      if (card) card.style.transition = '';
    }, 500);
  };


  React.useEffect(() => {
    const particles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: 2 + Math.random() * 4
    }));
    setCelestialParticles(particles);

    const startTime = performance.now();
    requestAnimationFrame(() => {
      const frameTime = performance.now() - startTime;
      if (frameTime > 32) {
        setIsLowPower(true);
      }
    });

    const updateInteractions = () => {
      const container = containerRef.current;
      if (!container) return;

      const { x, y } = mousePosRef.current;
      const sy = scrollYRef.current;

      let needed = false;

      if (mouseMoved.current) {
        container.style.setProperty('--mouse-x', `${x}px`);
        container.style.setProperty('--mouse-y', `${y}px`);
        
        const gx = (x - window.innerWidth / 2) / 100;
        const gy = (y - window.innerHeight / 2) / 100;
        container.style.setProperty('--gravitational-lean-x', `${-gy}deg`);
        container.style.setProperty('--gravitational-lean-y', `${gx}deg`);

        const nx = (x / window.innerWidth - 0.5) * 2;
        const ny = (y / window.innerHeight - 0.5) * 2;
        container.style.setProperty('--mouse-n-x', nx.toString());
        container.style.setProperty('--mouse-n-y', ny.toString());

        if (sy < 400) {
          const tx = (x - window.innerWidth / 2) / 50;
          container.style.setProperty('--title-tilt-y', `${tx}`);
        }

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }

        mouseMoved.current = false;
        needed = true;
      }

      if (scrolled.current) {
        const scrollPercent = (sy / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        container.style.setProperty('--scroll-percent', `${scrollPercent}%`);
        container.style.setProperty('--scroll-y', `${sy}px`);
        container.style.setProperty('--noise-opacity', `${0.03 + (sy / 5000) * 0.05}`);
        scrolled.current = false;
        needed = true;
      }
      
      if (needed) {
        rafId.current = requestAnimationFrame(updateInteractions);
      } else {
        rafId.current = 0;
      }
    };
    rafId.current = requestAnimationFrame(updateInteractions);

    const sx = sessionStorage.getItem('aura-x');
    const sy = sessionStorage.getItem('aura-y');
    if (sx && sy) {
      mousePosRef.current = { x: parseInt(sx), y: parseInt(sy) };
    }

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      scrolled.current = true;
      if (rafId.current === 0) {
        rafId.current = requestAnimationFrame(updateInteractions);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseMoveGlobal = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      mouseMoved.current = true;
      if (rafId.current === 0) {
        rafId.current = requestAnimationFrame(updateInteractions);
      }
    };
    window.addEventListener('mousemove', handleMouseMoveGlobal, { passive: true });

    const handleMouseEnter = (e: any) => {
      setIsCursorActive(true);
    };

    const container = containerRef.current;
    if (container) {
      const auraSections = container.querySelectorAll('section');
      const auraObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement;
            if (section.classList.contains('hero')) setAuraColor('rgba(113, 75, 103, 0.1)');
            if (section.classList.contains('trust-stats-section')) setAuraColor('rgba(16, 185, 129, 0.1)');
            if (section.classList.contains('bento-apps-section')) setAuraColor('rgba(107, 91, 149, 0.1)');
            if (section.classList.contains('comparison-section')) setAuraColor('rgba(113, 75, 103, 0.12)');
          }
        });
      }, { threshold: 0.2 });

      auraSections.forEach(s => auraObserver.observe(s));
      (window as any)._auraObserver = auraObserver;
    }

    const handleMouseLeave = () => {
      setIsCursorActive(false);
      document.documentElement.style.setProperty('--noise-opacity', '0.05');
    };

    document.querySelectorAll('a, button, .app-card, .mock-card').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    const handleClick = (e: MouseEvent) => {
      document.body.classList.add('haptic-shake');
      setTimeout(() => document.body.classList.remove('haptic-shake'), 200);

      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'sparkle-particle';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 100}px`);
        particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 100}px`);
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
      }
    };
    window.addEventListener('click', handleClick);

    const observerOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          if (!target) return;
          const rect = target.getBoundingClientRect();
          const dx = Math.abs(mousePosRef.current.x - (rect.left + rect.width / 2));
          const dy = Math.abs(mousePosRef.current.y - (rect.top + rect.height / 2));
          const dist = Math.sqrt(dx*dx + dy*dy);
          const delay = Math.min(dist / 2000, 0.5);
          
          target.style.transitionDelay = `${delay}s`;
          target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      revealObserver.disconnect();
      if ((window as any)._auraObserver) (window as any)._auraObserver.disconnect();
      
      document.querySelectorAll('a, button, .app-card, .mock-card').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    'accounting': <Activity size={22} />,
    'crm': <Users size={22} />,
    'sales': <TrendingUp size={22} />,
    'inventory': <Box size={22} />,
    'manufacturing': <Cpu size={22} />,
    'website-builder': <Monitor size={22} />,
    'ecommerce': <ShoppingCart size={22} />,
    'project': <Layers size={22} />,
    'timesheets': <MousePointer2 size={22} />,
    'helpdesk': <ShieldCheck size={22} />,
    'hr': <Users size={22} />,
    'marketing-automation': <Mail size={22} />
  };

  const featuredAppSlugs = [
    'accounting', 'crm', 'sales', 'inventory', 'manufacturing',
    'website-builder', 'ecommerce', 'project', 'timesheets',
    'helpdesk', 'hr', 'marketing-automation'
  ];

  const featuredApps = appModules.filter(app => featuredAppSlugs.includes(app.slug));

  return (
    <div className={`home-container ${isCinematic ? 'cinematic-mode' : ''}`} ref={containerRef} onMouseMove={handleMouseMove} style={{
      '--scroll-percent': '0%',
      '--noise-opacity': '0.03'
    } as React.CSSProperties}>
      
      {!isLowPower && celestialParticles.map((p: { id: number; x: number; y: number; size: number; duration: number }) => (
        <div 
          key={p.id}
          className="celestial-particle"
          style={{
            transform: `translate3d(${p.x}vw, ${p.y}vh, 0)`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--twinkle-duration': `${p.duration}s`
          } as React.CSSProperties}
        />
      ))}

      <div className="sentient-tooltip">
        <span className="tooltip-text">Elevate your business</span>
        <div className="tooltip-ripple"></div>
      </div>
      <button 
        className="cinematic-toggle" 
        onClick={() => setIsCinematic(!isCinematic)}
        title="Toggle Cinematic Mode"
      >
        <Monitor size={20} />
      </button>
      <div className="scroll-progress-liquid"></div>
      <div className="neural-noise-layer"></div>
      <div className="architectural-blueprint b-1"></div>
      <div className="architectural-blueprint b-2"></div>
      <div className="architectural-grid"></div>
      <div className={`luxury-cursor ${isCursorActive ? 'active' : ''}`} ref={cursorRef}></div>
      <div className="spotlight"></div>
      <div className="aura-focus-sphere" style={{ '--aura-color': auraColor } as React.CSSProperties}></div>
      <div className="aura-sync-brush"></div>
      
      <NeuralNav activeAura={auraColor} />

      <section className="hero">
        <div className="hero-particle p-1"></div>
        <div className="hero-particle p-2"></div>
        <div className="hero-particle p-3"></div>
        <div className="hero-particle p-4"></div>

        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-social-proof">
              <div className="social-proof-avatars">
                <span className="avatar-dot dot-purple"></span>
                <span className="avatar-dot dot-cyan"></span>
                <span className="avatar-dot dot-lime"></span>
                <span className="avatar-dot dot-orange"></span>
              </div>
              <span className="social-proof-text">Loved by <strong>50,000+</strong> businesses worldwide</span>
            </div>
            <h1 className="hero-title shimmer-active">
              Run your business on<br />
              <span className="accent-text">One Intelligent Platform</span>
            </h1>
            <p className="hero-subtitle">
              The only ERP designed to eliminate complexity <br />
              and maximize operational resonance.
            </p>
            <div className="hero-badge-row">
              <span className="hero-pill"><ShieldCheck size={13} /> SOC 2 Certified</span>
              <span className="hero-pill"><Zap size={13} /> 99.9% Uptime</span>
              <span className="hero-pill"><Star size={13} /> 4.9/5 Rating</span>
            </div>
            <div className="hero-cta">
              <Link 
                to="/choose-apps" 
                className="btn btn-primary btn-large magnetic-btn"
                onMouseMove={(e) => { handleButtonMagnetic(e); handleButtonSpotlight(e); }}
                onMouseLeave={handleButtonReset}
                data-tooltip="Configuration Launch"
              >
                Start now — It's free
              </Link>
              <AdvisorDropdown />
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-window hero-float">
              <div className="window-header">
                <div className="window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="window-url-bar">app.nexora.io/dashboard</div>
                <div className="window-tabs">
                  <div className="rec-indicator" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 800, color: '#ef4444', marginRight: '16px', letterSpacing: '1px' }}>
                    <span className="rec-dot" style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 5px #ef4444', animation: 'redPulse 1.5s infinite' }}></span>
                    LIVE
                  </div>
                  <button className="active">Overview</button>
                  <button>Live View</button>
                </div>
              </div>
              <div className="scanning-lines" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.02) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none', zIndex: 100 }}></div>
              <div className="mock-grid">
                <MockDataDisplay />
                <div className="mock-card performance-pulse">
                  <div className="mock-label">System Performance</div>
                  <div className="performance-bar-container">
                    <div className="performance-bar"></div>
                  </div>
                  <div className="mock-value">99.9%</div>
                </div>
                <div className="mock-chart-container bento-span-2">
                  <div className="chart-header">
                    <span>Weekly Revenue</span>
                    <div className="chart-legend">
                      <span className="legend-dot current pulse-glow"></span>
                      <span style={{fontSize:'0.75rem', color:'#10b981', fontWeight:800, textShadow: '0 0 10px rgba(16,185,129,0.3)'}}>+24%</span>
                    </div>
                  </div>
                  
                  <div className={`mock-chart-tooltip ${isHoveringGhost && ghostPos.x > 60 && ghostPos.y > 40 ? 'visible' : ''}`}>
                    <div className="mct-date">Friday, April 15</div>
                    <div className="mct-value">$143,302.24</div>
                  </div>

                  <svg className="line-chart-svg" viewBox="0 0 400 120">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#714b67" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#714b67" stopOpacity="0" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <path 
                      className="chart-path-area" 
                      d="M0,120 L0,84 C40,84 60,60 100,60 C140,60 160,80 200,80 C240,80 260,40 300,40 C340,40 360,70 400,70 L400,120 Z" 
                      fill="url(#chartGradient)"
                    />
                    <path 
                      className="chart-path-main" 
                      d="M0,84 C40,84 60,60 100,60 C140,60 160,80 200,80 C240,80 260,40 300,40 C340,40 360,70 400,70" 
                      stroke="#714b67"
                      strokeWidth="3"
                      fill="none"
                      filter="url(#glow)"
                    />
                    
                    <g className="chart-nodes">
                      <circle className="chart-node" cx="100" cy="60" />
                      <circle className="chart-node node-pulse" cx="100" cy="60" />
                      
                      <circle className="chart-node" cx="200" cy="80" style={{ animationDelay: '0.5s' }} />
                      <circle className="chart-node" cx="300" cy="40" style={{ animationDelay: '1s' }} />
                      <circle className="chart-node" cx="395" cy="70" style={{ animationDelay: '1.5s' }} />
                    </g>
                  </svg>
                </div>
                <div className="mock-activity-feed">
                  <div className="mock-label">Live Activity</div>
                  <div className="activity-item stagger-1"><span className="activity-dot green-dot"></span>New order #4521 created</div>
                  <div className="activity-item stagger-2"><span className="activity-dot blue-dot"></span>Invoice #INV-201 paid</div>
                  <div className="activity-item stagger-3"><span className="activity-dot purple-dot"></span>HR module synced</div>
                </div>
              </div>

              <GhostCursor ghostPos={ghostPos} isHovering={isHoveringGhost} />
            </div>

          </div>
        </div>
      </section>
      <NeuralFlowLines />

      <section className="trust-stats-section">
        <div className="container">
          <div className="trust-stats-inner glass-metrics-grid">
            <AnimatedCounter value="50000+" label="Businesses Powered" />
            <div className="holographic-divider"></div>
            <AnimatedCounter value="120+" label="Countries Reached" />
            <div className="holographic-divider"></div>
            <AnimatedCounter value="2.4M+" label="Active Users" />
            <div className="holographic-divider"></div>
            <AnimatedCounter value="98.2%" label="Resonance Score" />
            <div className="holographic-divider"></div>
            <AnimatedCounter value="500+" label="Fortune Trusted" />
          </div>
        </div>
        <div className="metrics-flow-bg"></div>
      </section>

      <section className="bento-apps-section reveal-on-scroll">
        <div className="container">
          <div className="section-header-lite centered">
            <div className="badge-alt holo-badge">Enterprise Suite</div>
            <h2>Tailored Solutions for <br /><span className="holo-text">Every Industry</span></h2>
            <p className="high-density-text">Select a specialized platform built for your specific business needs with hardware-grade stability.</p>
          </div>

          <div className="bento-grid">
            {PRODUCTS.map((product: any, index: number) => (
              <Link
                key={product.name}
                to={`/get-started?product=${encodeURIComponent(product.name)}`}
                className={`bento-card item-${index + 1} ${index === 0 ? 'large' : ''} ${index === 3 || index === 4 ? 'wide' : ''}`}
                style={{ '--accent-color': product.color } as React.CSSProperties}
                onMouseMove={handleCardTilt}
                onMouseLeave={handleCardReset}
              >
                <div className="bento-content">
                  <div className="bento-header">
                    <div className="bento-icon-box">
                      <i className={`fa-solid ${
                        product.name === 'ERP' ? 'fa-shield-halved' :
                        product.name === 'Exam' ? 'fa-graduation-cap' :
                        product.name === 'Account' ? 'fa-calculator' :
                        product.name === 'Website' ? 'fa-globe' : 
                        product.name === 'HMS' ? 'fa-hospital' : 'fa-cube'
                      }`} />
                    </div>
                    <div className="bento-title-group">
                      <h3 className="bento-title">{product.name}</h3>
                      <span className="bento-tag">Enterprise</span>
                    </div>
                  </div>
                  <p className="bento-description">
                    {product.modules && product.modules[0] ? product.modules[0].description : 'Complete business management solution.'}
                  </p>
                  
                  <div className="bento-micro-viz">
                    <div className="viz-hud">
                      <div className="hud-line"></div>
                      <div className="hud-label">SYNC: 99.9%</div>
                    </div>
                    {product.name === 'ERP' && (
                      <div className="micro-viz-erp">
                        <div className="mv-bar" style={{height: '30%'}}></div>
                        <div className="mv-bar" style={{height: '60%'}}></div>
                        <div className="mv-bar" style={{height: '45%'}}></div>
                        <div className="mv-pulse"></div>
                      </div>
                    )}
                    {product.name === 'Exam' && (
                      <div className="micro-viz-exam">
                        <CheckCircle2 size={12} className="mv-icon" />
                        <CheckCircle2 size={12} className="mv-icon" />
                        <CheckCircle2 size={12} className="mv-icon" />
                      </div>
                    )}
                    {product.name === 'Account' && (
                      <div className="micro-viz-account">
                        <TrendingUp size={14} className="mv-trend" />
                        <span className="mv-stat">SECURED</span>
                      </div>
                    )}
                  </div>
                  <div className="bento-hud-overlay">
                    <span className="hud-stat">CORE: ACTIVE</span>
                    <span className="hud-stat">RELIABILITY: 0.999</span>
                  </div>
                </div>
                <div className="bento-visual">
                  <div className="bento-glow"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="system-trace-ticker shadow-glow">
        <div className="ticker-track">
          <span className="ticker-item">[SYSTEM] NEXORA CORE READY</span>
          <span className="ticker-item">[LOG] ERP SYNC: 100%</span>
          <span className="ticker-item">[NET] ACTIVE NODES: 5,420</span>
          <span className="ticker-item">[SEC] STATUS: SECURE</span>
          <span className="ticker-item">[NEURAL] OPTIMIZED</span>
          <span className="ticker-item">[TRACE] RESISTANCE: MINIMAL</span>
          <span className="ticker-item">[CACHE] VALID: 99.9%</span>
        </div>
      </div>

      {/* <section className="apps-grid-section reveal-on-scroll">
        <div className="container">
          <div className="section-header-lite">
            <div className="badge-alt holo-badge">The Complete Suite</div>
            <h2>Everything you need, <br />in one simplified suite</h2>
            <p>Ditch the fragmented apps. Get a unified system that grows with you.</p>
          </div>

          <div className="apps-grid-wrapper">
            <div className="apps-grid">
              {featuredApps.map((app, index) => (
                <Link
                  to={`/apps/${app.slug}`}
                  key={app.slug}
                  className="app-card holo-tile-compact"
                  style={{ 
                    '--delay': `${index * 100}ms`,
                    '--parallax-offset-x': 'calc(var(--mouse-n-x) * 15px)',
                    '--parallax-offset-y': 'calc(var(--mouse-n-y) * 15px)'
                  } as React.CSSProperties}
                  onMouseMove={handleCardTilt}
                  onMouseLeave={handleCardReset}
                >
                  <div className="tile-glow-underlay" style={{ '--accent-color': 'var(--color-primary)' } as React.CSSProperties}></div>
                  <div className="app-icon-box parallax-layer-deep">
                    <div className="app-icon-placeholder primary-light-bg holo-icon-inner">
                      {iconMap[app.slug] || <Box size={24} color="var(--color-primary)" />}
                    </div>
                  </div>
                  <h3 className="app-name-label parallax-layer-mid">{app.name}</h3>
                  <div className="tile-hud-line"></div>
                </Link>
              ))}
              <Link
                to="/choose-apps"
                className="app-card view-all holo-card"
                style={{ 
                  '--delay': `${featuredApps.length * 100}ms`,
                  '--parallax-offset-x': 'calc(var(--mouse-n-x) * 10px)',
                  '--parallax-offset-y': 'calc(var(--mouse-n-y) * 10px)'
                } as React.CSSProperties}
              >
                <div className="app-icon-box parallax-layer-deep">
                  <div className="app-icon-placeholder more holo-icon-placeholder">
                    <ArrowRight size={28} />
                  </div>
                </div>
                <h3 className="app-name-label parallax-layer-mid">View all apps</h3>
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      <section className="features-strip reveal-on-scroll">
        <div className="container">
          <div className="features-strip-inner glass-strip">
            <div className="feature-strip-item magnetic-item" onMouseMove={handleButtonMagnetic} onMouseLeave={handleButtonReset}>
              <div className="fsi-icon holo-icon"><Zap size={22} /></div>
              <div className="fsi-text">
                <span className="fsi-title">Real-time Sync</span>
                <span className="fsi-desc">All modules share a single data layer</span>
              </div>
            </div>
            <div className="fsi-divider"></div>
            <div className="feature-strip-item magnetic-item" onMouseMove={handleButtonMagnetic} onMouseLeave={handleButtonReset}>
              <div className="fsi-icon holo-icon"><ShieldCheck size={22} /></div>
              <div className="fsi-text">
                <span className="fsi-title">Enterprise Security</span>
                <span className="fsi-desc">SOC 2 certified, end-to-end encrypted</span>
              </div>
            </div>
            <div className="fsi-divider"></div>
            <div className="feature-strip-item magnetic-item" onMouseMove={handleButtonMagnetic} onMouseLeave={handleButtonReset}>
              <div className="fsi-icon holo-icon"><Layers size={22} /></div>
              <div className="fsi-text">
                <span className="fsi-title">Modular by Design</span>
                <span className="fsi-desc">Start with one app, grow into all</span>
              </div>
            </div>
            <div className="fsi-divider"></div>
            <div className="feature-strip-item magnetic-item" onMouseMove={handleButtonMagnetic} onMouseLeave={handleButtonReset}>
              <div className="fsi-icon holo-icon"><TrendingUp size={22} /></div>
              <div className="fsi-text">
                <span className="fsi-title">AI-Powered Insights</span>
                <span className="fsi-desc">Predictive analytics across your data</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="comparison-section reveal-on-scroll">
        <div className="container">
          <div className="section-header-lite centered">
            <div className="badge-alt holo-badge">Side by Side</div>
            <h2>Why <span className="holo-text">Nexora</span> wins every time</h2>
            <p>Toggle between Traditional and the Nexora way to feel the difference.</p>
            <div className="toggle-switch-container hardware-grade">
              <span className={`toggle-label ${!isIntegrated ? 'active-label' : ''}`}>Fragmented</span>
              <div 
                className={`toggle-switch hardware-toggle ${isIntegrated ? 'on' : ''}`} 
                onClick={() => {
                  setIsIntegrated(!isIntegrated);
                  if (window.navigator.vibrate) window.navigator.vibrate(50);
                }}
              >
                <div className="toggle-knob holographic-knob">
                  <div className="knob-indicator"></div>
                </div>
                <div className="toggle-track-glow"></div>
              </div>
              <span className={`toggle-label ${isIntegrated ? 'active-label' : ''}`}>Unified</span>
            </div>
          </div>

          <div className={`comparison-content ${isIntegrated ? 'integrated' : 'fragmented'} neural-sync`}>
            <div className="comparison-card fragmented-view satin-glass-premium">
              <div className="blueprint-texture"></div>
              <div className="pain-points">
                <div className="pain-item node-chip"><XCircle color="#ff5f57" size={18} /> <span>Manual data reentry</span></div>
                <div className="pain-item node-chip"><XCircle color="#ff5f57" size={18} /> <span>Costly multi-vendor subs</span></div>
                <div className="pain-item node-chip"><XCircle color="#ff5f57" size={18} /> <span>Fragmented workflows</span></div>
                <div className="pain-item node-chip"><XCircle color="#ff5f57" size={18} /> <span>Broken API integrations</span></div>
              </div>
              <div className="pain-visual">
                <div className="messy-nodes dynamic-drift">
                  <div className="m-node holo-card drift-1">App A</div>
                  <div className="m-node holo-card drift-2">App B</div>
                  <div className="m-node holo-card drift-3">App C</div>
                  <div className="m-node holo-card drift-4">App D</div>
                </div>
              </div>
            </div>

            <div className="comparison-card integrated-view satin-glass-premium">
              <div className="solution-points">
                <div className="solution-item"><CheckCircle2 color="#28c940" size={20} /> Zero manual entry — data flows instantly</div>
                <div className="solution-item"><CheckCircle2 color="#28c940" size={20} /> One predictable, affordable price</div>
                <div className="solution-item"><CheckCircle2 color="#28c940" size={20} /> Unified UX means zero retraining</div>
                <div className="solution-item"><CheckCircle2 color="#28c940" size={20} /> Built-in security & compliance</div>
              </div>
              <div className="solution-visual luxury-box aura-pulse">
                <div className="nebula-overlay"></div>
                <DataEcosystem />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop: Integrated Section */}
      <section className="value-prop-section reveal-on-scroll">
        <div className="container">
          <div className="prop-row">
            <div className="prop-text">
              <div className="badge-alt holo-badge">Unified Platform</div>
              <h2>Integrated by design, <br /><span className="holo-text">not by accident.</span></h2>
              <p>
                When you install a new app, it's already connected to your existing data.
                Accounting talks to Sales. Inventory talks to Manufacturing.
              </p>
              <ul className="prop-list">
                <li className="magnetic-item"><Zap size={18} /> Real-time sync across all modules</li>
                <li className="magnetic-item"><Layers size={18} /> Single source of truth for your data</li>
                <li className="magnetic-item"><ShieldCheck size={18} /> Built-in security &amp; compliance</li>
              </ul>
              <Link
                to="/choose-apps"
                className="prop-cta-link magnetic-btn"
                onMouseMove={handleButtonMagnetic}
                onMouseLeave={handleButtonReset}
              >
                Explore all integrations <ArrowRight size={16} />
              </Link>
            </div>
            <div className="prop-visual">
              <div className="prop-visual-card">
                <DataEcosystem />
                <div className="prop-visual-stats">
                  <div className="pv-stat">
                    <span className="pv-stat-number">∞</span>
                    <span className="pv-stat-label">Data connections</span>
                  </div>
                  <div className="pv-stat">
                    <span className="pv-stat-number">0ms</span>
                    <span className="pv-stat-label">Sync latency</span>
                  </div>
                  <div className="pv-stat">
                    <span className="pv-stat-number">1</span>
                    <span className="pv-stat-label">Unified platform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta reveal-on-scroll">
        <div className="container">
          <div className="cta-content-box final-cta-holo">
            <div className="cta-badge holo-badge">No credit card required</div>
            <h2 className="cta-title">Ready to transform<br /><span className="cta-accent holo-text">your business?</span></h2>
            <p className="cta-desc">Join 50,000+ businesses that chose Nexora for a smarter, faster, and more unified way to operate.</p>
            <div className="cta-actions">
              <Link 
                to="/signup" 
                className="btn btn-primary btn-large magnetic-btn cta-primary-btn holo-btn"
                onMouseMove={handleButtonMagnetic}
                onMouseLeave={handleButtonReset}
              >
                <Zap size={18} />
                Start your free trial
              </Link>
            </div>
            <div className="cta-trust-row">
              <div className="trust-item"><CheckCircle2 size={16} className="trust-icon" /><span>Free for 1 user, forever</span></div>
              <div className="trust-item"><CheckCircle2 size={16} className="trust-icon" /><span>No credit card needed</span></div>
              <div className="trust-item"><CheckCircle2 size={16} className="trust-icon" /><span>Cancel anytime</span></div>
            </div>
            <HyperDriveCanvas />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;