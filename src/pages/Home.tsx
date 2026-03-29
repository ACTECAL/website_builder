import React, { useState } from "react";
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
  Box
} from "lucide-react";

/**
 * Kinetic Data Ecosystem - A Canvas-based physics simulation
 * showcasing integrated data flow.
 */
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
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
      }
      update(mx: number, my: number) {
        const dx = mx - this.x;
        const dy = my - this.y;
        const distSq = dx*dx + dy*dy;
        if (distSq < 22500) { // 150^2
          const dist = Math.sqrt(distSq);
          const force = (150 - dist) / 150;
          this.vx -= dx * force * 0.05;
          this.vy -= dy * force * 0.05;
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
      draw(c: CanvasRenderingContext2D) {
        c.fillStyle = 'rgba(113, 75, 103, 0.6)';
        c.beginPath();
        c.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        c.fill();
      }
    }

    const particles = Array.from({ length: 40 }, () => new Particle());
    let mouse = { x: -1000, y: -1000 };
    let isVisible = true;

    const observer = new IntersectionObserver((entries) => {
      const wasVisible = isVisible;
      isVisible = entries[0].isIntersecting;
      if (isVisible && !wasVisible) {
        render();
      }
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);
      
      // Batched drawing for grid
      ctx.strokeStyle = 'rgba(113, 75, 103, 0.03)';
      ctx.beginPath();
      for(let i=0; i<width; i+=40) { ctx.moveTo(i,0); ctx.lineTo(i,height); }
      for(let i=0; i<height; i+=40) { ctx.moveTo(0,i); ctx.lineTo(width,i); }
      ctx.stroke();

      // Batch all connection lines into one stroke
      ctx.beginPath();
      ctx.lineWidth = 0.5;
      
      const connectionDistSq = 6400; // 80^2

      particles.forEach((p, i) => {
        p.update(mouse.x, mouse.y);
        p.draw(ctx);
        
        // Connection logic - limited search to reduce O(N^2) load
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          
          if (Math.abs(dx) > 80 || Math.abs(dy) > 80) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq < connectionDistSq) { 
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      });
      ctx.strokeStyle = 'rgba(113, 75, 103, 0.08)';
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
  const [revenue, setRevenue] = React.useState(142.8);
  const [customers, setCustomers] = React.useState(1204);

  React.useEffect(() => {
    const dataInterval = setInterval(() => {
      setRevenue(prev => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setCustomers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 3000);
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
      <div className="mock-card">
        <div className="mock-label">New Customers</div>
        <div className="mock-value">{customers.toLocaleString()}</div>
        <div className="mock-trend positive">
          <Users size={12} /> +12%
        </div>
      </div>
    </>
  );
});

const GhostCursor: React.FC = React.memo(() => {
  const [ghostPos, setGhostPos] = React.useState({ x: 40, y: 60 });
  
  React.useEffect(() => {
    const ghostInterval = setInterval(() => {
      setGhostPos({
        x: 20 + Math.random() * 60,
        y: 30 + Math.random() * 50
      });
    }, 4000);
    return () => clearInterval(ghostInterval);
  }, []);

  return (
    <div 
      className="ghost-cursor" 
      style={{ left: `${ghostPos.x}%`, top: `${ghostPos.y}%` }}
    >
      <MousePointer2 size={18} fill="currentColor" />
    </div>
  );
});

const Home: React.FC = () => {
  // Removed unused activeTab state
  const [isIntegrated, setIsIntegrated] = useState(true);
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [isCinematic, setIsCinematic] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [tooltipText, setTooltipText] = useState("Elevate your business");
  const [celestialParticles, setCelestialParticles] = useState<any[]>([]);

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
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
  };

  const handleButtonReset = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = '';
  };


  React.useEffect(() => {
    // Generate Celestial Particles (Reduced for performance)
    const particles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: 2 + Math.random() * 4
    }));
    setCelestialParticles(particles);

    // Detect Low Power Mode (Simple performance heuristic)
    const startTime = performance.now();
    requestAnimationFrame(() => {
      const frameTime = performance.now() - startTime;
      if (frameTime > 32) { // Target < 32ms initial frame for high-end
        setIsLowPower(true);
      }
    });

    // High-Performance Engine with requestAnimationFrame
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

    // Restore persistent aura position
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
      const text = e.target.getAttribute('data-tooltip') || "Explore more";
      setTooltipText(text);
      
      // Semantic Noise Adjustment
      const isContent = e.target.classList.contains('app-card') || e.target.tagName === 'IMG';
      document.documentElement.style.setProperty('--noise-opacity', isContent ? '0.08' : '0.05');
    };
    
    const handleMouseLeave = () => {
      setIsCursorActive(false);
      document.documentElement.style.setProperty('--noise-opacity', '0.05');
    };

    document.querySelectorAll('a, button, .app-card, .mock-card').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    const handleClick = (e: MouseEvent) => {
      // Neural Haptic Ripple Effect
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
          // Gaze-Weighted Stagger: Delay based on mouse proximity
          const rect = entry.target.getBoundingClientRect();
          const dx = Math.abs(mousePosRef.current.x - (rect.left + rect.width / 2));
          const dy = Math.abs(mousePosRef.current.y - (rect.top + rect.height / 2));
          const dist = Math.sqrt(dx*dx + dy*dy);
          const delay = Math.min(dist / 2000, 0.5); // Max 0.5s neural delay
          
          (entry.target as HTMLElement).style.transitionDelay = `${delay}s`;
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      document.querySelectorAll('a, button, .app-card, .mock-card').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Icon mapping for featured apps
  const iconMap: Record<string, React.ReactNode> = {
    'accounting': <Activity size={28} />,
    'crm': <Users size={28} />,
    'sales': <TrendingUp size={28} />,
    'inventory': <Box size={28} />,
    'manufacturing': <Cpu size={28} />,
    'website-builder': <Monitor size={28} />,
    'ecommerce': <ShoppingCart size={28} />,
    'project': <Layers size={28} />,
    'timesheets': <MousePointer2 size={28} />,
    'helpdesk': <ShieldCheck size={28} />,
    'hr': <Users size={28} />,
    'marketing-automation': <Mail size={28} />
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
      
      {/* Celestial Particles Background */}
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
        <span className="tooltip-text">{tooltipText}</span>
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
      <div className="architectural-grid"></div>
      <div className={`luxury-cursor ${isCursorActive ? 'active' : ''}`} ref={cursorRef}></div>
      <div className="spotlight"></div>
      <div className="aura-sync-brush"></div>

      {/* Hero Section */}
      <section className="hero">
        {/* Floating Background Particles */}
        <div className="hero-particle p-1"></div>
        <div className="hero-particle p-2"></div>
        <div className="hero-particle p-3"></div>
        <div className="hero-particle p-4"></div>

        <div className="container hero-inner">
          <div className="hero-content">
            <div className="pricing-badge">Free for 1 user, forever</div>
            <h1 className="hero-title shimmer-active">
              Manage your entire business <br />
              <span className="accent-text">with one platform.</span>
              <span className="handwritten-accent">integrated</span>
            </h1>
            <p className="hero-subtitle">
              The world's easiest all-in-one management software. <br />
              User-friendly, affordable, and highly customizable.
            </p>
            <div className="hero-cta">
              <Link 
                to="/choose-apps" 
                className="btn btn-primary btn-large magnetic-btn"
                onMouseMove={handleButtonMagnetic}
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
              </div>
              <div className="mock-grid">
                <MockDataDisplay />
                <div className="mock-chart-container">
                  <div className="chart-header">
                    <span>Weekly Sales</span>
                    <div className="chart-legend">
                      <span className="legend-dot current"></span>
                      <span className="legend-dot past"></span>
                    </div>
                  </div>
                  
                  <svg className="line-chart-svg" viewBox="0 0 400 120">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path 
                      className="chart-path-area" 
                      d="M0,120 L0,80 Q50,40 100,70 T200,50 T300,90 T400,40 L400,120 Z" 
                      fill="url(#chartGradient)"
                    />
                    <path 
                      className="chart-path-main" 
                      d="M0,80 Q50,40 100,70 T200,50 T300,90 T400,40" 
                    />
                    <circle className="chart-node" cx="100" cy="70" />
                    <circle className="chart-node node-pulse" cx="100" cy="70" />
                    <circle className="chart-node delay-500" cx="200" cy="50" />
                    <circle className="chart-node" cx="300" cy="90" style={{ animationDelay: '1s' }} />
                  </svg>
                </div>
              </div>

              {/* Ghost Cursor Simulation */}
              <GhostCursor />
            </div>

          </div>
        </div>
        <svg className="section-divider-organic" viewBox="0 0 1440 120">
          <path d="M0,120 L1440,120 L1440,0 C1100,80 340,80 0,0 Z" />
        </svg>
      </section>

      {/* Products Grid Section */}
      <section className="apps-section">
        <div className="apps-container">
          <div className="section-header">
            <h2>Our Products</h2>
            <p>Choose the right solution for your business</p>
          </div>
          <div className="apps-grid">
            {PRODUCTS.map((product: any) => (
              <Link
                key={product.name}
                to={`/get-started?product=${encodeURIComponent(product.name)}`}
                className="app-card"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="app-icon-wrapper"
                  style={{
                    background: `rgba(16, 185, 129, 0.1)`,
                    border: "2px solid #10b981",
                  }}
                >
                  <i
                    className={`fa-solid ${
                      product.name === 'ERP' ? 'fa-shield-halved' :
                      product.name === 'Exam' ? 'fa-graduation-cap' :
                      product.name === 'Account' ? 'fa-calculator' :
                      product.name === 'Website' ? 'fa-globe' : 'fa-cube'
                    }`}
                    style={{
                      fontSize: "2.8rem",
                      color: "#10b981",
                    }}
                  />
                </div>
                <h3 className="app-name">{product.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* App Grid Section */}
      <section className="apps-grid-section reveal-on-scroll">
        <div className="container">
          <div className="section-header-lite">
            <div className="badge-alt">The Complete Suite</div>
            <h2>Everything you need, <br />in one simplified suite</h2>
            <p>Ditch the fragmented apps. Get a unified system that grows with you.</p>
          </div>

          <div className="apps-grid-wrapper">
            <div className="apps-grid">
              {featuredApps.map((app, index) => (
                <Link
                  to={`/apps/${app.slug}`}
                  key={app.slug}
                  className="app-card"
                  style={{ 
                    '--delay': `${index * 100}ms`,
                    '--parallax-offset-x': 'calc(var(--mouse-n-x) * 10px)',
                    '--parallax-offset-y': 'calc(var(--mouse-n-y) * 10px)'
                  } as React.CSSProperties}
                >
                  <div className="app-icon-box parallax-layer-deep">
                    <div className="app-icon-placeholder primary-light-bg">
                      {iconMap[app.slug] || <Box size={28} color="var(--color-primary)" />}
                    </div>
                  </div>
                  <h3 className="app-name-label parallax-layer-mid">{app.name}</h3>
                </Link>
              ))}
              <Link
                to="/choose-apps"
                className="app-card view-all"
                style={{ 
                  '--delay': `${featuredApps.length * 100}ms`,
                  '--parallax-offset-x': 'calc(var(--mouse-n-x) * 10px)',
                  '--parallax-offset-y': 'calc(var(--mouse-n-y) * 10px)'
                } as React.CSSProperties}
              >
                <div className="app-icon-box parallax-layer-deep">
                  <div className="app-icon-placeholder more">
                    <ArrowRight size={28} />
                  </div>
                </div>
                <h3 className="app-name-label parallax-layer-mid">View all apps</h3>
              </Link>
            </div>
          </div>
        </div>
        <svg className="section-divider-organic" viewBox="0 0 1440 120">
          <path d="M0,120 L1440,120 L1440,0 C1100,80 340,80 0,0 Z" />
        </svg>
      </section>

      {/* Comparison: Integrated vs Fragmented */}
      <section className="comparison-section reveal-on-scroll">
        <div className="container">
          <div className="section-header-lite">
            <h2 className="title-handwritten">Imagine without Nexora <span className="handwritten-accent alt">fragmented</span></h2>
            <div className="toggle-switch-container">
              <span className={!isIntegrated ? 'active-label' : ''}>Traditional</span>
              <div className={`toggle-switch ${isIntegrated ? 'on' : ''}`} onClick={() => setIsIntegrated(!isIntegrated)}>
                <div className="toggle-knob"></div>
              </div>
              <span className={isIntegrated ? 'active-label' : ''}>Nexora</span>
            </div>
          </div>

          <div className={`comparison-content ${isIntegrated ? 'integrated' : 'fragmented'}`}>
            <div className="comparison-card fragmented-view">
              <div className="pain-points">
                <div className="pain-item"><XCircle color="#ff5f57" size={20} /> Manual data reentry between apps</div>
                <div className="pain-item"><XCircle color="#ff5f57" size={20} /> Expensive multi-vendor subscriptions</div>
                <div className="pain-item"><XCircle color="#ff5f57" size={20} /> Fragmented team workflows</div>
                <div className="pain-item"><XCircle color="#ff5f57" size={20} /> Messy API integrations that break</div>
              </div>
              <div className="pain-visual">
                <div className="messy-nodes">
                  <div className="m-node">App A</div>
                  <div className="m-node">App B</div>
                  <div className="m-node">App C</div>
                  <div className="m-node">App D</div>
                </div>
              </div>
            </div>

            <div className="comparison-card integrated-view">
              <div className="solution-points">
                <div className="solution-item"><CheckCircle2 color="#28c940" size={20} /> Zero manual entry — data flows instantly</div>
                <div className="solution-item"><CheckCircle2 color="#28c940" size={20} /> One predictable, affordable price</div>
                <div className="solution-item"><CheckCircle2 color="#28c940" size={20} /> Unified UX means zero retraining</div>
                <div className="solution-item"><CheckCircle2 color="#28c940" size={20} /> Built-in security & compliance</div>
              </div>
              <div className="solution-visual luxury-box">
                <DataEcosystem />
              </div>
            </div>
          </div>
        </div>
        <svg className="section-divider-organic flipped" viewBox="0 0 1440 120">
          <path d="M0,120 L1440,120 L1440,0 C1100,80 340,80 0,0 Z" />
        </svg>
      </section>

      {/* Value Prop: Integrated Section */}
      <section className="value-prop-section reveal-on-scroll">
        <div className="container">
          <div className="prop-row">
            <div className="prop-text">
              <div className="badge-alt">Unified Platform</div>
              <h2>Integrated by design, <br />not by accident.</h2>
              <p>
                When you install a new app, it's already connected to your existing data.
                Accounting talks to Sales. Inventory talks to Manufacturing.
              </p>
              <ul className="prop-list">
                <li><Zap size={18} /> Real-time sync across all modules</li>
                <li><Layers size={18} /> Single source of truth for your data</li>
                <li><ShieldCheck size={18} /> Consistent team experience</li>
              </ul>
            </div>
            <div className="prop-visual">
              <DataEcosystem />
            </div>
          </div>
        </div>
        <svg className="section-divider-organic" viewBox="0 0 1440 120">
          <path d="M0,120 L1440,120 L1440,0 C1100,80 340,80 0,0 Z" />
        </svg>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content-box">
            <h2>Ready to transform your business?</h2>
            <p>Join the thousands of companies that switched for a better UX.</p>
            <div className="cta-actions">
              <Link 
                to="/signup" 
                className="btn btn-primary btn-large magnetic-btn"
                onMouseMove={handleButtonMagnetic}
                onMouseLeave={handleButtonReset}
              >
                Start your free trial
              </Link>
              <Link 
                to="/meet-an-advisor" 
                className="btn btn-secondary btn-large magnetic-btn"
                onMouseMove={handleButtonMagnetic}
                onMouseLeave={handleButtonReset}
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
        <svg className="section-divider-organic flipped" viewBox="0 0 1440 120">
          <path d="M0,120 L1440,120 L1440,0 C1100,80 340,80 0,0 Z" />
        </svg>
      </section>

    </div>
  );
};

export default Home;
