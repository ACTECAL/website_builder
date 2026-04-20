import React from 'react';
import '../styles/CommunitySubpage.css';
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
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {items.map((e) => (
              <div key={e.title} className="community-subpage-card">
                <h4 className="community-card-title">{e.title}</h4>
                <p className="community-card-desc"><strong>Date:</strong> {e.date}</p>
                <p className="community-card-desc"><strong>Location:</strong> {e.location}</p>
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
