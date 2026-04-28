import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Community.css';
import { posts } from './blogData';
import {
  Search, X, BookOpen, Download, Users, Wrench,
  GraduationCap, ArrowRight, Github, Youtube,
  Twitter, Linkedin, Instagram, Facebook,
  Calendar, MapPin, ChevronUp, ExternalLink,
  Zap, MessageSquare, Star, CheckCircle2
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────── */
type CommunitySection = {
  title: string;
  links: string[];
  color: string;
  iconColor: string;
  iconBg: string;
};

/* ─── Data ──────────────────────────────────────── */
const communitySections: CommunitySection[] = [
  {
    title: 'Learn',
    color: '#2563eb', iconColor: '#2563eb', iconBg: '#eff6ff',
    links: ['Tutorials', 'Documentation', 'Certifications', 'Training', 'Blog', 'Podcast', 'Help Center', 'API Reference', 'Status'],
  },
  {
    title: 'Empower Education',
    color: '#f97316', iconColor: '#f97316', iconBg: '#fff7ed',
    links: ['Education Program', 'Scale Up! Business Game', 'Student Certifications'],
  },
  {
    title: 'Get the Software',
    color: '#10b981', iconColor: '#10b981', iconBg: '#f0fdf4',
    links: ['Download', 'Compare Editions', 'Releases', 'Security'],
  },
  {
    title: 'Collaborate',
    color: '#8b5cf6', iconColor: '#8b5cf6', iconBg: '#faf5ff',
    links: ['Github', 'Forum', 'Events', 'Translations', 'Become a Partner', 'Services for Partners', 'Register your Accounting Firm'],
  },
  {
    title: 'Get Services',
    color: '#14b8a6', iconColor: '#14b8a6', iconBg: '#f0fdfa',
    links: ['Find a Partner', 'Find an Accountant', 'Meet an advisor', 'Implementation Services', 'Customer References', 'Support', 'Upgrades', 'Contact Sales'],
  },
];

const pathOverrides: Record<string, string> = {
  'Tutorials': '/tutorials', 'Documentation': '/docs', 'Certifications': '/certifications',
  'Training': '/training', 'Find a Partner': '/find-a-partner', 'Find an Accountant': '/find-an-accountant',
  'Meet an advisor': '/meet-an-advisor', 'Implementation Services': '/implementation-services',
  'Customer References': '/customer-references', 'Support': '/support', 'Upgrades': '/upgrades',
  'Blog': '/blog', 'Podcast': '/podcast', 'Help Center': '/help-center',
  'API Reference': '/api-reference', 'Status': '/status', 'Security': '/security',
  'Contact Sales': '/contact-sales', 'Student Certifications': '/certifications',
};

const featuredEvents = [
  { title: 'Acteal Annual Conference 2025', date: 'March 15–17, 2025', location: 'San Francisco, CA', description: 'Three days of workshops, networking, and keynote speeches from industry leaders.', link: '/events/annual-conference' },
  { title: 'Community Meetup — New York', date: 'November 20, 2024', location: 'New York, NY', description: 'A casual meetup to connect with local Acteal users and share best practices.', link: '/events/ny-meetup' },
  { title: 'Webinar: Inventory Optimization', date: 'December 2, 2024', location: 'Online', description: 'Practical strategies to reduce stockouts and excess inventory using Acteal.', link: '/events/inventory-webinar' },
  { title: 'Partner Summit Europe 2025', date: 'May 9, 2025', location: 'Berlin, Germany', description: 'A full-day deep dive into partner solutions, roadmap, and co-selling strategies.', link: '/events/partner-summit-eu' },
];
/* ─── Testimonials ──────────────────────────────────────── */
const testimonials = [
  {
    initials: 'JD',
    quote: 'Joining the Acteal community has transformed the way I run my business. The support and resources are invaluable.',
    author: 'Jane Doe',
    company: 'SmallBiz Solutions',
    stars: 5
  },
  {
    initials: 'JS',
    quote: 'The forums and events have helped me solve complex issues and learn from others.',
    author: 'John Smith',
    company: 'TechStart Inc.',
    stars: 5
  },
  {
    initials: 'SP',
    quote: 'Our implementation finished 30% faster thanks to the training tracks and partner guidance.',
    author: 'Sofia Patel',
    company: 'BluePeak Manufacturing',
    stars: 5
  },
  {
    initials: 'ML',
    quote: 'Documentation and API examples made integration straightforward for our dev team.',
    author: 'Marcus Lee',
    company: 'Finlytics',
    stars: 4
  },
];
const statsValues = [12000, 3500, 120, 85];

const getSectionIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t === 'learn')               return <BookOpen size={20} />;
  if (t === 'get the software')    return <Download size={20} />;
  if (t === 'collaborate')         return <Users size={20} />;
  if (t === 'get services')        return <Wrench size={20} />;
  return <GraduationCap size={20} />;
};

/* ══════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════ */
export const Community: React.FC = () => {
  const [query, setQuery]       = useState('');
  const [openFaq, setOpenFaq]   = useState<number | null>(null);
  const [counts, setCounts]     = useState([0, 0, 0, 0]);
  const [backVisible, setBackVisible] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  /* search filter */
  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return communitySections;
    return communitySections
      .map(s => ({ ...s, links: s.links.filter(l => l.toLowerCase().includes(q)) }))
      .filter(s => s.links.length > 0);
  }, [query]);

  const resultsCount = useMemo(
    () => filteredSections.reduce((sum, s) => sum + s.links.length, 0),
    [filteredSections]
  );

  const highlight = (text: string) => {
    const q = query.trim();
    if (!q) return text;
    const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${esc})`, 'ig'));
    return parts.map((p, i) =>
      p.toLowerCase() === q.toLowerCase()
        ? <mark key={i} className="cm-mark">{p}</mark>
        : <span key={i}>{p}</span>
    );
  };

  /* keyboard shortcut */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.key === '/') { e.preventDefault(); searchRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* animated counters */
  useEffect(() => {
    const intervals = statsValues.map((target, i) => {
      const step = Math.ceil(target / 50);
      return setInterval(() => {
        setCounts(prev => {
          const next = [...prev];
          if (next[i] < target) next[i] = Math.min(next[i] + step, target);
          return next;
        });
      }, 30);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  /* scroll → back to top */
  useEffect(() => {
    const onScroll = () => setBackVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="cm-page">

      {/* ── HERO ────────────────────────────────────── */}
      <section className="cm-hero">
        <div className="cm-container">
          <div className="cm-hero-badge">
            <Users size={13} /> Community
          </div>
          <h1 className="cm-hero-title">
            Join Our<br />
            <span className="cm-hero-blue">Community</span>
          </h1>
          <p className="cm-hero-sub">
            Connect with other Acteal users, get help, and share your ideas.
            Explore resources to learn, collaborate, and get the most out of our platform.
          </p>
          <div className="cm-hero-actions">
            <Link to="/get-started" className="cm-btn cm-btn-blue"><Zap size={15} /> Get Started Free</Link>
            <Link to="/docs"        className="cm-btn cm-btn-ghost"><BookOpen size={15} /> Read the Docs</Link>
          </div>
          {/* mini stats */}
          <div className="cm-hero-stats">
            {[
              { num: '12K+', lbl: 'Members' },
              { num: '3.5K+', lbl: 'Forum posts' },
              { num: '120+', lbl: 'Repos' },
              { num: '85+', lbl: 'Events/year' },
            ].map((s, i) => (
              <React.Fragment key={s.lbl}>
                <div className="cm-hero-stat">
                  <span className="cm-hero-stat-num">{s.num}</span>
                  <span className="cm-hero-stat-lbl">{s.lbl}</span>
                </div>
                {i < 3 && <div className="cm-hero-stat-div" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES ───────────────────────────────── */}
      <section className="cm-section cm-resources">
        <div className="cm-container">
          <div className="cm-section-hdr">
            <p className="cm-section-label">EXPLORE</p>
            <h2 className="cm-section-title">Community Resources</h2>
            <p className="cm-section-sub">Everything you need in one place — from docs to partner services.</p>
          </div>

          {/* Search */}
          <div className="cm-search-wrap">
            <div className="cm-search-box">
              <Search size={16} className="cm-search-icon" />
              <input
                ref={searchRef}
                type="search"
                placeholder='Search tutorials, docs, events… (press "/")'
                value={query}
                onChange={e => setQuery(e.target.value)}
                aria-label="Search community resources"
                className="cm-search-input"
              />
              {query && (
                <button className="cm-search-clear" onClick={() => setQuery('')} aria-label="Clear">
                  <X size={14} />
                </button>
              )}
            </div>
            {query && (
              <p className="cm-results-meta" aria-live="polite">
                {resultsCount} result{resultsCount !== 1 ? 's' : ''} in {filteredSections.length} section{filteredSections.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Grid */}
          <div className="cm-res-grid">
            {filteredSections.map(sec => (
              <div key={sec.title} className="cm-res-card" style={{ '--cm-accent': sec.color } as React.CSSProperties}>
                <div className="cm-res-card-top" style={{ borderColor: sec.color }} />
                <div className="cm-res-card-hdr">
                  <div className="cm-res-icon" style={{ background: sec.iconBg, color: sec.iconColor }}>
                    {getSectionIcon(sec.title)}
                  </div>
                  <h3 className="cm-res-title">{highlight(sec.title)}</h3>
                </div>
                <div className="cm-res-links">
                  {sec.links.map(link => (
                    <Link
                      key={link}
                      to={pathOverrides[link] ?? `/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="cm-res-link"
                      style={{ '--cm-accent': sec.color } as React.CSSProperties}
                    >
                      {highlight(link)}
                      <ArrowRight size={13} className="cm-res-link-arrow" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS ──────────────────────────────────── */}
      <section className="cm-section cm-events-section">
        <div className="cm-container">
          <div className="cm-section-hdr">
            <p className="cm-section-label">EVENTS</p>
            <h2 className="cm-section-title">Upcoming Community Events</h2>
            <p className="cm-section-sub">Connect in person or online — workshops, meetups, and webinars.</p>
          </div>
          <div className="cm-events-grid">
            {featuredEvents.map(ev => (
              <div key={ev.title} className="cm-event-card">
                <div className="cm-event-body">
                  <h3 className="cm-event-title">{ev.title}</h3>
                  <div className="cm-event-meta">
                    <span><Calendar size={13} /> {ev.date}</span>
                    <span><MapPin size={13} /> {ev.location}</span>
                  </div>
                  <p className="cm-event-desc">{ev.description}</p>
                </div>
                <Link to={ev.link} className="cm-event-link">Learn More <ArrowRight size={13} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────── */}
      <section className="cm-section cm-stats-section">
        <div className="cm-container">
          <div className="cm-section-hdr">
            <p className="cm-section-label">BY THE NUMBERS</p>
            <h2 className="cm-section-title">Community at a Glance</h2>
          </div>
          <div className="cm-stats-grid">
            {[
              { raw: counts[0], suffix: 'k+', label: 'Members',        icon: <Users size={26} /> },
              { raw: counts[1], suffix: 'k+', label: 'Forum Posts',    icon: <MessageSquare size={26} /> },
              { raw: counts[2], suffix: '+',  label: 'Open-source Repos', icon: <Github size={26} /> },
              { raw: counts[3], suffix: '+',  label: 'Events / Year',  icon: <Calendar size={26} /> },
            ].map(s => (
              <div key={s.label} className="cm-stat-card">
                <div className="cm-stat-icon">{s.icon}</div>
                <div className="cm-stat-num">
                  {s.raw >= 1000 ? `${(s.raw / 1000).toFixed(1)}${s.suffix}` : `${s.raw}${s.suffix}`}
                </div>
                <div className="cm-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REPOS ───────────────────────────────────── */}
      <section className="cm-section cm-repos-section">
        <div className="cm-container">
          <div className="cm-section-hdr">
            <p className="cm-section-label">OPEN SOURCE</p>
            <h2 className="cm-section-title">Featured Repositories</h2>
            <p className="cm-section-sub">Explore our open-source ecosystem and contribute to the platform.</p>
          </div>
          <div className="cm-repos-grid">
            {[
              { name: 'acteal-core',         desc: 'Core modules and utilities',         url: 'https://github.com/example/acteal-core' },
              { name: 'acteal-ui',           desc: 'UI components and design system',    url: 'https://github.com/example/acteal-ui' },
              { name: 'acteal-integrations', desc: 'Official third-party integrations',  url: 'https://github.com/example/acteal-integrations' },
              { name: 'acteal-examples',     desc: 'Starter projects and code examples', url: 'https://github.com/example/acteal-examples' },
            ].map(r => (
              <a key={r.name} href={r.url} target="_blank" rel="noreferrer" className="cm-repo-card">
                <div className="cm-repo-top">
                  <div className="cm-repo-dot" />
                  <ExternalLink size={14} className="cm-repo-ext" />
                </div>
                <h3 className="cm-repo-name">{r.name}</h3>
                <p className="cm-repo-desc">{r.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ────────────────────────────────────── */}
      <section className="cm-section cm-blog-section">
        <div className="cm-container">
          <div className="cm-section-hdr">
            <p className="cm-section-label">BLOG</p>
            <h2 className="cm-section-title">From the Blog</h2>
            <p className="cm-section-sub">Insights, tutorials, and news from the Acteal team.</p>
          </div>
          <div className="cm-blog-grid">
            {posts.slice(0, 3).map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="cm-blog-card">
                <span className="cm-blog-cat">{post.category}</span>
                <h3 className="cm-blog-title">{post.title}</h3>
                <p className="cm-blog-meta">{post.date} · {post.read}</p>
                <p className="cm-blog-summary">{post.summary}</p>
                <span className="cm-blog-link">Read more <ArrowRight size={13} /></span>
              </Link>
            ))}
          </div>
          <div className="cm-blog-footer">
            <Link to="/blog" className="cm-btn cm-btn-blue">View all posts <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────── */}
      <section className="cm-section cm-testi-section">
        <div className="cm-container">
          <div className="cm-section-hdr">
            <p className="cm-section-label">TESTIMONIALS</p>
            <h2 className="cm-section-title">What Our Community Says</h2>
          </div>
          <div className="cm-testi-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="cm-testi-card">
                {/* <div className="cm-testi-stars">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={13} fill="#f59e0b" stroke="none" />
                  ))}
                </div> */}

{/* Stars rendering - safe version */}
<div className="cm-testi-stars">
  {Array.from({ length: t.stars || 5 }).map((_, j) => (
    <Star key={j} size={13} fill="#f59e0b" stroke="none" />
  ))}
</div>                <p className="cm-testi-quote">"{t.quote}"</p>
                <div className="cm-testi-author">
                  <div className="cm-testi-avatar">{t.initials}</div>
                  <div>
                    <div className="cm-testi-name">{t.author}</div>
                    <div className="cm-testi-role">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="cm-section cm-cta-section">
        <div className="cm-container">
          <div className="cm-cta-card">
            <div>
              <h2 className="cm-cta-title">Ready to join the community?</h2>
              <p className="cm-cta-sub">Start for free — no credit card required. Upgrade anytime.</p>
            </div>
            <div className="cm-cta-actions">
              <Link to="/get-started" className="cm-btn cm-btn-cta-white">Get Started Free <ArrowRight size={14} /></Link>
              <Link to="/contact"     className="cm-btn cm-btn-cta-ghost">Talk to Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL STRIP ────────────────────────────── */}
      <section className="cm-social-strip">
        <div className="cm-container cm-social-inner">
          <p className="cm-social-label">Follow us</p>
          <div className="cm-social-icons">
            {[
              { icon: <Github size={18} />,    label: 'GitHub' },
              { icon: <Youtube size={18} />,   label: 'YouTube' },
              { icon: <Twitter size={18} />,   label: 'Twitter' },
              { icon: <Linkedin size={18} />,  label: 'LinkedIn' },
              { icon: <Instagram size={18} />, label: 'Instagram' },
              { icon: <Facebook size={18} />,  label: 'Facebook' },
            ].map(s => (
              <a key={s.label} href="#" aria-label={s.label} className="cm-social-btn">{s.icon}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Back to top */}
      {backVisible && (
        <button
          className="cm-back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <ChevronUp size={18} />
        </button>
      )}
    </div>
  );
};

export default Community;