import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const Events: React.FC = () => {
  const items = [
    { title: 'Nexora Annual Conference 2025', date: 'Mar 15-17, 2025', location: 'San Francisco, CA', link: '/events/annual-conference' },
    { title: 'Community Meetup - New York', date: 'Nov 20, 2024', location: 'New York, NY', link: '/events/ny-meetup' },
    { title: 'Webinar: Accounting Automation', date: 'Dec 2, 2024', location: 'Online', link: '/events/accounting-webinar' },
  ];
  return (
    <main>
      <PageHero
        title="Events"
        subtitle="Join us for conferences, meetups, and webinars. Connect, learn, and grow with the community."
        emphasize="none"
      />
      <section style={{ padding: '10px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <Link to="/community" style={{ textDecoration: 'none', color: '#667eea' }} reloadDocument>← Back to Community</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {items.map((e) => (
              <div key={e.title} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <h4 style={{ margin: '0 0 8px' }}>{e.title}</h4>
                <p style={{ margin: 0, color: '#4a5568' }}><strong>Date:</strong> {e.date}</p>
                <p style={{ margin: 0, color: '#4a5568' }}><strong>Location:</strong> {e.location}</p>
                <div style={{ marginTop: 10 }}>
                  <Link to={e.link} className="btn btn-outline-primary" reloadDocument>Learn More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
