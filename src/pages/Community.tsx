import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import '../styles/Community.css';
import { posts } from './blogData';

type CommunitySection = {
  title: string;
  links: string[];
  color: string;
};

const communitySections: CommunitySection[] = [
  {
    title: 'Learn',
    links: ['Tutorials', 'Documentation', 'Certifications', 'Training', 'Blog', 'Podcast', 'Help Center', 'API Reference', 'Status'],
    color: '#E97326',
  },
  {
    title: 'Empower Education',
    links: ['Education Program', 'Scale Up! Business Game', 'Student Certifications'],
    color: '#E97326',
  },
  {
    title: 'Get the Software',
    links: ['Download', 'Compare Editions', 'Releases', 'Security'],
    color: '#00A09D',
  },
  {
    title: 'Collaborate',
    links: ['Github', 'Forum', 'Events', 'Translations', 'Become a Partner', 'Services for Partners', 'Register your Accounting Firm'],
    color: '#6B5B95',
  },
  {
    title: 'Get Services',
    links: ['Find a Partner', 'Find an Accountant', 'Meet an advisor', 'Implementation Services', 'Customer References', 'Support', 'Upgrades', 'Contact Sales'],
    color: '#007A87',
  },
];

const pathOverrides: Record<string, string> = {
  'Tutorials': '/tutorials',
  'Documentation': '/docs',
  'Certifications': '/certifications',
  'Training': '/training',
  'Find a Partner': '/find-a-partner',
  'Find an Accountant': '/find-an-accountant',
  'Meet an advisor': '/meet-an-advisor',
  'Implementation Services': '/implementation-services',
  'Customer References': '/customer-references',
  'Support': '/support',
  'Upgrades': '/upgrades',
  'Blog': '/blog',
  'Podcast': '/podcast',
  'Help Center': '/help-center',
  'API Reference': '/api-reference',
  'Status': '/status',
  'Security': '/security',
  'Contact Sales': '/contact-sales',
  'Student Certifications': '/certifications',
};

const featuredEvents = [
  {
    title: 'Nexora Annual Conference 2025',
    date: 'March 15-17, 2025',
    location: 'San Francisco, CA',
    description: 'Join us for three days of workshops, networking, and keynote speeches from industry leaders.',
    link: '/events/annual-conference',
  },
  {
    title: 'Community Meetup - New York',
    date: 'November 20, 2024',
    location: 'New York, NY',
    description: 'A casual meetup to connect with local Nexora users and share best practices.',
    link: '/events/ny-meetup',
  },
  {
    title: 'Webinar: Inventory Optimization',
    date: 'December 2, 2024',
    location: 'Online',
    description: 'Practical strategies to reduce stockouts and excess inventory using Nexora.',
    link: '/events/inventory-webinar',
  },
  {
    title: 'Partner Summit Europe 2025',
    date: 'May 9, 2025',
    location: 'Berlin, Germany',
    description: 'A full-day deep dive into partner solutions, roadmap, and co-selling strategies.',
    link: '/events/partner-summit-eu',
  },
];

const testimonials = [
  {
    quote: 'Joining the Nexora community has transformed the way I run my business. The support and resources are invaluable.',
    author: 'Jane Doe',
    company: 'SmallBiz Solutions',
  },
  {
    quote: 'The forums and events have helped me solve complex issues and learn from others’ experiences.',
    author: 'John Smith',
    company: 'TechStart Inc.',
  },
  {
    quote: 'Our implementation finished 30% faster thanks to the training tracks and partner guidance.',
    author: 'Sofia Patel',
    company: 'BluePeak Manufacturing',
  },
  {
    quote: 'Documentation and API examples made integration straightforward for our dev team.',
    author: 'Marcus Lee',
    company: 'Finlytics',
  },
];

const getSectionIcon = (title: string) => {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 } as const;
  switch (title.toLowerCase()) {
    case 'learn':
      return (
        <svg {...common} aria-hidden="true"><path d="M4 19.5V6.8a1 1 0 0 1 .6-.9l6.7-3a1 1 0 0 1 .8 0l6.7 3a1 1 0 0 1 .6.9V19.5" /><path d="M12 22V7" /></svg>
      );
    case 'get the software':
      return (
        <svg {...common} aria-hidden="true"><path d="M12 3v12" /><path d="M8 11l4 4 4-4" /><path d="M20 21H4" /></svg>
      );
    case 'collaborate':
      return (
        <svg {...common} aria-hidden="true"><circle cx="9" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><path d="M2 21a7 7 0 0 1 14 0" /><path d="M10 21a7 7 0 0 1 12 0" /></svg>
      );
    case 'get services':
      return (
        <svg {...common} aria-hidden="true"><path d="M12 1v6" /><path d="M5.22 6.22l4.24 4.24" /><path d="M1 12h6" /><path d="M6.22 18.78l4.24-4.24" /><path d="M12 23v-6" /><path d="M18.78 17.78l-4.24-4.24" /><path d="M23 12h-6" /><path d="M17.78 6.22l-4.24 4.24" /></svg>
      );
    case 'empower education':
    default:
      return (
        <svg {...common} aria-hidden="true"><path d="M22 12l-10 7L2 12l10-7 10 7z" /><path d="M6 15v3a10 10 0 0 0 12 0v-3" /></svg>
      );
  }
};

const statsValues = [12000, 3500, 120, 85];

export const Community: React.FC = () => {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<SVGCircleElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [sparks, setSparks] = useState<{ id: number, x: number, y: number, tx: number, ty: number, color: string }[]>([]);
  const lastScrollY = useRef(0);
  const sparkIdCounter = useRef(0);
  const currentlyHoveredRef = useRef<HTMLElement | null>(null);

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return communitySections;
    return communitySections
      .map((sec) => ({ ...sec, links: sec.links.filter((l) => l.toLowerCase().includes(q)) }))
      .filter((sec) => sec.links.length > 0);
  }, [query]);

  const highlight = (text: string) => {
    const q = query.trim();
    if (!q) return text;
    const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${esc})`, 'ig'));
    return parts.map((p, i) => (p.toLowerCase() === q.toLowerCase() ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>));
  };

  const resultsCount = useMemo(
    () => filteredSections.reduce((sum, s) => sum + s.links.length, 0),
    [filteredSections]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || (e as any).isComposing) return;
      if (e.key === '/') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const intervals = statsValues.map((target, i) => {
      const step = Math.ceil(target / 50);
      return setInterval(() => {
        setCounts(prev => {
          const next = [...prev];
          if (next[i] < target) {
            next[i] = Math.min(next[i] + step, target);
          }
          return next;
        });
      }, 30);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal-text, .reveal-content');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredSections]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const velocity = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 176 : 0;
          
          if (progressBarRef.current) {
            progressBarRef.current.style.strokeDashoffset = String(176 - progress);
          }
          
          if (backToTopRef.current) {
            if (currentScrollY > 300) {
              backToTopRef.current.classList.add('visible');
            } else {
              backToTopRef.current.classList.remove('visible');
            }
          }

          // Apply kinetic skew to headers
          const headers = document.querySelectorAll('.section-title');
          const skew = Math.max(Math.min(velocity * 0.1, 10), -10);
          headers.forEach(h => {
             (h as HTMLElement).style.transform = `skewY(${skew}deg)`;
             setTimeout(() => {
                (h as HTMLElement).style.transform = `skewY(0deg)`;
             }, 100);
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Network Aura Canvas logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number, y: number, vx: number, vy: number }[] = [];
    const particleCount = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
      ctx.lineWidth = 0.5;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        // Mouse connection
        const cx = cursorPosRef.current.x;
        const cy = cursorPosRef.current.y - window.scrollY;
        
        const mdx = p.x - cx;
        const mdy = p.y - cy;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 200) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${1 - mdist/200})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(cx, cy);
            ctx.stroke();
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.15)';
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    createParticles();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const createSpark = (x: number, y: number, color: string = '#a855f7') => {
    const numSparks = 5;
    const newSparks: { id: number, x: number, y: number, tx: number, ty: number, color: string }[] = [];
    for (let i = 0; i < numSparks; i++) {
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        newSparks.push({
            id: ++sparkIdCounter.current,
            x: x - 2,
            y: y - 2,
            tx,
            ty,
            color
        });
    }
    setSparks(prev => [...prev, ...newSparks]);
    setTimeout(() => {
        setSparks(prev => prev.filter(s => !newSparks.find(ns => ns.id === s.id)));
    }, 1500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cursorPosRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    
    if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
    }

    const target = (e.target as HTMLElement).closest('.community-section, .event-card, .repo-card, .testimonial-card, .magnetic-btn, .blog-card') as HTMLElement;
    
    // Reset previous hovered item if it changed
    if (currentlyHoveredRef.current && currentlyHoveredRef.current !== target) {
        currentlyHoveredRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translate(0px, 0px)`;
        if (cursorRef.current) cursorRef.current.classList.remove('hovering');
    }

    if (target) {
        if (cursorRef.current) cursorRef.current.classList.add('hovering');
        currentlyHoveredRef.current = target;
        
        const rect = target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        target.style.setProperty('--mouse-x', `${x}%`);
        target.style.setProperty('--mouse-y', `${y}%`);

        if (!target.classList.contains('magnetic-btn')) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const rotateX = (centerY - e.clientY) / 30;
            const rotateY = (e.clientX - centerX) / 30;
            target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            target.style.setProperty('--glow-x', `${(e.clientX - centerX) * 0.1}px`);
            target.style.setProperty('--glow-y', `${(e.clientY - centerY) * 0.1}px`);
        } else {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.35;
            const deltaY = (e.clientY - centerY) * 0.35;
            target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
    } else {
        currentlyHoveredRef.current = null;
        if (cursorRef.current) cursorRef.current.classList.remove('hovering');
    }
  };

  const handleMouseLeave = () => {
    if (currentlyHoveredRef.current) {
        currentlyHoveredRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translate(0px, 0px)`;
        currentlyHoveredRef.current = null;
    }
    if (cursorRef.current) cursorRef.current.classList.remove('hovering');
  };

  return (
    <main className="community-page" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <canvas ref={canvasRef} className="network-aura-canvas" />
      <div 
        ref={cursorRef}
        className="custom-cursor" 
      ></div>

      <div className="community-ambient-blob blob-com-1"></div>
      <div className="community-ambient-blob blob-com-2"></div>
      <div className="community-ambient-blob blob-com-3"></div>
      <div className="community-ambient-blob blob-com-4"></div>

      <div className="particle-trail">
          {sparks.map(s => (
              <div key={s.id} className="spark" style={{
                  left: s.x,
                  top: s.y,
                  '--tx': `${s.tx}px`,
                  '--ty': `${s.ty}px`,
                  '--spark-color': s.color
              } as any}></div>
          ))}
      </div>

      <div className="auth-particles">
        {[...Array(25)].map((_, i) => (
          <div key={i} className={`particle p-${i % 4}`} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.1 + Math.random() * 0.4
          } as any}></div>
        ))}
      </div>

      <div className="hero-orbit-container">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="orbiting-avatar" style={{
            '--orbit-speed': `${20 + i * 5}s`,
            animationDelay: `-${i * 4}s`,
            opacity: 0.2 + (i * 0.1)
          } as any}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="5" />
              <path d="M3 21v-2a7 7 0 0 1 14 0v2" />
            </svg>
          </div>
        ))}
      </div>

      <PageHero
        title="Join Our Community"
        subtitle="Connect with other Nexora users, get help, and share your ideas. Explore our resources to learn, collaborate, and get the most out of our software."
        emphasize='none'
      />
      
      <div className="energy-beam-container eb-pos-1">
        <div className="energy-beam"></div>
      </div>

      <section className="community-page-section">
        <div className="community-container">
          <div className="reveal-text">
            <h2 className="section-title center stagger-0 kinetic-header">Explore Our Community Resources</h2>
          </div>
          
          <div className="community-search stagger-1 reveal-content">
            <input
              type="search"
              placeholder="Search tutorials, docs, events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search community resources"
              ref={searchRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const first = filteredSections[0]?.links?.[0];
                  if (first) {
                    const path = pathOverrides[first] ?? `/${first.toLowerCase().replace(/\s+/g, '-')}`;
                    window.location.assign(path);
                  }
                }
              }}
            />
            {query && (
              <button type="button" className="clear-btn" onClick={() => setQuery('')} aria-label="Clear search">Clear</button>
            )}
          </div>

          <div className="community-controls stagger-1 reveal-content">
            <div className="results-meta" aria-live="polite">
              {resultsCount} result{resultsCount === 1 ? '' : 's'} in {filteredSections.length} section{filteredSections.length === 1 ? '' : 's'}
            </div>
          </div>
          
          <div className="community-grid stagger-2 reveal-content">
            {filteredSections.map((section: CommunitySection) => (
              <div
                key={section.title}
                className="community-section"
                style={{ '--accent-color': section.color } as React.CSSProperties}
                onMouseEnter={(e) => createSpark(e.clientX, e.clientY, section.color)}
              >
                <div className="specular-highlight"></div>
                <div className="card-glow-aura"></div>
                <h4 className="community-section-title">
                  <span className="section-icon">{getSectionIcon(section.title)}</span>
                  <span className="title-text">{highlight(section.title)}</span>
                </h4>
                <div className="community-links">
                  {section.links.map((link: string) => (
                    <Link
                      key={link}
                      to={pathOverrides[link] ?? `/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="community-link"
                      reloadDocument
                    >
                      {highlight(link)}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="energy-beam-container eb-pos-2">
        <div className="energy-beam" style={{ animationDelay: '-2s' }}></div>
      </div>

      <section className="events-section stagger-3">
        <div className="community-container">
          <div className="reveal-text">
            <h2 className="section-title center text-shimmer kinetic-header">Upcoming Community Events</h2>
          </div>
          <div className="events-grid reveal-content">
            {featuredEvents.map((event) => (
              <div key={event.title} className="event-card" onMouseEnter={(e) => createSpark(e.clientX, e.clientY, '#a855f7')}>
                <div className="specular-highlight"></div>
                <div className="card-glow-aura"></div>
                <h3 style={{ position: 'relative', zIndex: 1 }}>{event.title}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p>{event.description}</p>
                <Link to={event.link} className="btn magnetic-btn" reloadDocument>Learn More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="community-container">
          <div className="reveal-text">
            <h2 className="section-title center kinetic-header">Community at a Glance</h2>
          </div>
          <div className="stats-grid reveal-content">
            {[
              { value: counts[0], suffix: 'k+', label: 'Members' },
              { value: counts[1], suffix: 'k+', label: 'Forum posts' },
              { value: counts[2], suffix: '+', label: 'Open-source repos' },
              { value: counts[3], suffix: '+', label: 'Events / year' },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-value">
                  {s.value >= 1000 ? (s.value / 1000).toFixed(1) : s.value}{s.suffix}
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="energy-beam-container eb-pos-3">
        <div className="energy-beam" style={{ animationDelay: '-1s' }}></div>
      </div>

      <section className="repos-section">
        <div className="community-container">
          <div className="reveal-text">
            <h2 className="section-title center kinetic-header">Featured Repositories</h2>
          </div>
          <div className="repos-grid reveal-content">
            {[
              { name: 'Nexora-core', desc: 'Core modules and utilities', url: 'https://github.com/example/Nexora-core' },
              { name: 'Nexora-ui', desc: 'UI components and patterns', url: 'https://github.com/example/Nexora-ui' },
              { name: 'Nexora-integrations', desc: 'Official integrations', url: 'https://github.com/example/Nexora-integrations' },
              { name: 'Nexora-examples', desc: 'Starter projects and examples', url: 'https://github.com/example/Nexora-examples' },
            ].map((repo) => (
              <a key={repo.name} href={repo.url} className="repo-card" target="_blank" rel="noreferrer" onMouseEnter={(e) => createSpark(e.clientX, e.clientY, '#22c55e')}>
                <div className="specular-highlight"></div>
                <div className="card-glow-aura"></div>
                <h3 className="repo-name">
                  <span className="pulse-indicator"></span>
                  {repo.name}
                </h3>
                <p className="repo-desc">{repo.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-section">
        <div className="community-container">
          <div className="energy-beam-container eb-pos-blog">
            <div className="energy-beam" style={{ animationDelay: '-3s' }}></div>
          </div>
          <div className="reveal-text">
            <h2 className="section-title center kinetic-header">From the Blog</h2>
          </div>
          <div className="blog-grid reveal-content">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card" reloadDocument onMouseEnter={(e) => createSpark(e.clientX, e.clientY, '#ec4899')}>
                <div className="specular-highlight"></div>
                <div className="card-glow-aura"></div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-meta">{post.category} • {post.date} • {post.read}</p>
                <p className="blog-summary">{post.summary}</p>
              </Link>
            ))}
          </div>
          <div className="blog-actions reveal-content">
            <Link to="/blog" className="btn magnetic-btn" reloadDocument>View all posts</Link>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="community-container">
          <div className="reveal-text">
            <h2 className="section-title center kinetic-header">What Our Community Says</h2>
          </div>
          <div className="testimonials-grid reveal-content">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card" onMouseEnter={(e) => createSpark(e.clientX, e.clientY, '#60a5fa')}>
                <div className="specular-highlight"></div>
                <div className="card-glow-aura"></div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <p className="testimonial-author">- {testimonial.author}, {testimonial.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <button 
        ref={backToTopRef}
        className="back-to-top" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <svg className="scroll-progress-ring" width="56" height="56">
          <circle cx="28" cy="28" r="28" />
          <circle ref={progressBarRef} className="progress-bar" cx="28" cy="28" r="28" style={{ strokeDashoffset: 176 } as any} />
        </svg>
        <i className="fa-solid fa-arrow-up"></i>
      </button>

      <section className="social-strip">
        <div className="community-container">
          <ul className="social-list">
            {[
              { icon: 'github', label: 'GitHub' },
              { icon: 'youtube', label: 'YouTube' },
              { icon: 'x-twitter', label: 'X Twitter' },
              { icon: 'linkedin', label: 'LinkedIn' },
              { icon: 'instagram', label: 'Instagram' },
              { icon: 'facebook-f', label: 'Facebook' },
              { icon: 'spotify', label: 'Spotify' },
            ].map((s) => (
              <li key={s.icon}>
                <Link to={`/social/${s.icon}`} aria-label={s.label} className="magnetic-btn">
                  <i className={`fa-brands fa-${s.icon}`}></i>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Community;
