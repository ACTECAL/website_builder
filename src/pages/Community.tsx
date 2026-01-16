import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { posts } from './blogData';
import { MessageCircle, ArrowRight, Search, Hash, Eye } from 'lucide-react';
import '../styles/odoo-theme.css'; // Ensure access to Odoo vars

type CommunitySection = {
  title: string;
  links: string[];
  color: string;
  icon: React.ReactNode;
};

const communitySections: CommunitySection[] = [
  {
    title: 'Learn',
    links: ['Tutorials', 'Documentation', 'Certifications', 'Training', 'Blog', 'Podcast', 'Help Center'],
    color: '#E04006',
    icon: <i className="fa-solid fa-graduation-cap"></i>
  },
  {
    title: 'Empower Education',
    links: ['Education Program', 'Scale Up! Business Game', 'Student Certifications'],
    color: '#E04006',
    icon: <i className="fa-solid fa-book-open"></i>
  },
  {
    title: 'Get the Software',
    links: ['Download', 'Compare Editions', 'Releases', 'Security'],
    color: '#017E84',
    icon: <i className="fa-solid fa-download"></i>
  },
  {
    title: 'Collaborate',
    links: ['Github', 'Forum', 'Events', 'Translations', 'Become a Partner'],
    color: '#714B67',
    icon: <i className="fa-solid fa-users-gear"></i>
  },
  {
    title: 'Services',
    links: ['Find a Partner', 'Find an Accountant', 'Meet an advisor', 'Contact Sales'],
    color: '#007A87',
    icon: <i className="fa-solid fa-handshake"></i>
  },
];

export const Community: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return communitySections;
    return communitySections
      .map((sec) => ({ ...sec, links: sec.links.filter((l) => l.toLowerCase().includes(q)) }))
      .filter((sec) => sec.links.length > 0);
  }, [query]);

  return (
    <main className="bg-[#F9F9F9] min-h-screen font-sans">
      <PageHero
        title="Community"
        subtitle="The heart of Actyx. Connect, share, and grow with thousands of users worldwide."
        emphasize='none'
      />

      {/* Forum-Style Main Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row g-5">

            {/* Left Column: Topics List */}
            <div className="col-lg-8">

              {/* Search Bar */}
              <div className="mb-5 position-relative">
                <input
                  type="search"
                  className="form-control form-control-lg border-0 shadow-sm ps-5 py-3 rounded-3"
                  placeholder="Search topics, documentation, posts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={20} />
              </div>

              {/* Sections as Forum Categories */}
              <div className="d-flex flex-column gap-4">
                {filteredSections.map((section) => (
                  <div key={section.title} className="card border-0 shadow-sm overflow-hidden rounded-3">
                    <div className="card-header bg-white border-bottom p-3 d-flex align-items-center gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center text-white"
                        style={{ width: 40, height: 40, background: section.color }}>
                        {section.icon}
                      </div>
                      <h5 className="mb-0 fw-bold text-dark">{section.title}</h5>
                    </div>
                    <div className="list-group list-group-flush">
                      {section.links.map(link => (
                        <Link
                          key={link}
                          to="#"
                          className="list-group-item list-group-item-action d-flex align-items-center justify-content-between p-3 border-light"
                        >
                          <div className="d-flex align-items-center gap-3">
                            <div className="text-muted opacity-50"><Hash size={16} /></div>
                            <span className="fw-medium text-secondary hover-text-primary transition-colors">{link}</span>
                          </div>
                          <div className="d-flex gap-4 text-muted small">
                            <div className="d-flex align-items-center gap-1" title="Posts">
                              <MessageCircle size={14} /> <span>{Math.floor(Math.random() * 50) + 10}</span>
                            </div>
                            <div className="d-flex align-items-center gap-1" title="Views">
                              <Eye size={14} /> <span>{Math.floor(Math.random() * 1000) + 100}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="col-lg-4">
              <div className="d-flex flex-column gap-4">

                {/* Trending Posts */}
                <div className="card border-0 shadow-sm rounded-3">
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                      <i className="fa-solid fa-fire text-danger"></i> Trending Now
                    </h5>
                    <div className="d-flex flex-column gap-3">
                      {[
                        'How to configure custom email servers?',
                        'Best practices for inventory valuation',
                        'New API endpoints for v17 release',
                        'Migrating from Salesforce to Nexora CRM'
                      ].map((topic, i) => (
                        <div key={i} className="d-flex gap-3 align-items-start">
                          <span className="fw-bold text-muted small w-5">0{i + 1}</span>
                          <Link to="#" className="text-decoration-none text-dark fw-medium small hover-text-primary lh-sm">
                            {topic}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Contributors */}
                <div className="card border-0 shadow-sm rounded-3 position-relative overflow-hidden">
                  <div className="position-absolute top-0 start-0 w-100 h-1 bg-gradient-to-r from-primary to-secondary"></div>
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-4">Top Contributors</h5>
                    <div className="d-flex flex-column gap-3">
                      {['Alice Freeman', 'Bob Smith', 'Charlie Brown'].map((name, i) => (
                        <div key={i} className="d-flex align-items-center gap-3">
                          <img src={`https://i.pravatar.cc/150?u=${name}`} className="rounded-circle" width="40" height="40" alt={name} />
                          <div>
                            <div className="fw-bold text-sm">{name}</div>
                            <div className="text-xs text-muted">Level {5 - i} • {500 - i * 50} Karma</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-outline-primary btn-sm w-100 mt-4 rounded-pill">View Leaderboard</button>
                  </div>
                </div>

                {/* Join Us CTA */}
                <div className="bg-[#714B67] text-white rounded-3 p-4 text-center">
                  <h5 className="fw-bold mb-2">Join the Conversation</h5>
                  <p className="small opacity-75 mb-3">Ask questions, share knowledge, and help others.</p>
                  <Link to="/signup" className="btn btn-light text-primary btn-sm fw-bold w-100 shadow-sm">
                    Create Account
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Blog Teaser (Using existing data) */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="fw-bold mb-0 text-dark">Latest Blog Posts</h2>
            <Link to="/blog" className="btn btn-link text-primary fw-bold text-decoration-none">View all <ArrowRight size={16} className="ms-1 inline" /></Link>
          </div>
          <div className="row g-4">
            {posts.slice(0, 3).map((post) => (
              <div key={post.slug} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden hover-shadow transition-all group">
                  <div className="bg-light position-relative" style={{ height: 180 }}>
                    <div className="position-absolute inset-0 d-flex items-center justify-center text-muted opacity-25">
                      <i className="fa-regular fa-image display-4"></i>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="small text-primary fw-bold text-uppercase mb-2">{post.date}</div>
                    <h5 className="fw-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h5>
                    <p className="text-muted small line-clamp-2">{post.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .hover-shadow:hover { box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; transform: translateY(-2px); }
        .hover-text-primary:hover { color: var(--o-color-primary) !important; }
        .transition-colors { transition: color 0.2s ease; }
        .transition-all { transition: all 0.2s ease; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </main>
  );
};
