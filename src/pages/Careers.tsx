import React from 'react';
import { PageHero } from '../components/PageHero';
import { Link } from 'react-router-dom';
import '../styles/Careers.css';

export const Careers: React.FC = () => {
  return (
    <main className="careers-page">
      <PageHero
        title="Careers at BizSuite"
        subtitle="Work with us. Build the future of business software."
        imageUrl="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
      />

      <section className="careers-container">
        <div className="careers-intro">
          <p className="careers-intro-text">
            At BizSuite, we're not just building apps — we're building the foundation for how businesses of all sizes will work in the future. Our mission is simple but ambitious: help teams move faster and work as one. If you're passionate about creating technology that makes a real impact, we'd love for you to join our journey.
          </p>
        </div>

        <div className="careers-section">
          <h2 className="careers-section-title">Why Work at BizSuite?</h2>
          <div className="careers-why-grid">
            {[
              { title: "A Mission That Matters", text: "We're creating a modular, unified platform that simplifies work for thousands of companies—every decision moves us closer to that mission." },
              { title: "Growth with Impact", text: "Own big problems early. Your work shapes how companies worldwide operate and grow." },
              { title: "People First, Always", text: "Openness, empathy, and collaboration. Ideas matter here—titles don't." },
              { title: "Flexibility & Balance", text: "Hybrid/remote options and outcome‑focused culture so you can do your best work and have a life outside it." }
            ].map((item, i) => (
              <div key={i} className="careers-why-card">
                <div className="careers-why-number">{i + 1}. {item.title}</div>
                <h3 className="careers-why-title">{item.title}</h3>
                <p className="careers-why-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="careers-section">
          <div className="careers-two-col">
            <div>
              <h3 className="careers-subtitle">Life at BizSuite</h3>
              <ul className="careers-list">
                {[
                  'Collaborative culture: cross‑functional teams solving problems together',
                  'Continuous learning: mentorship, workshops, and learning stipends',
                  'Innovation‑driven: we test, experiment, and iterate',
                  'Diversity & inclusion: different voices make better products'
                ].map((item, i) => (
                  <li key={i} className="careers-list-item">
                    <i className="fa-solid fa-check careers-list-icon check"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="careers-subtitle">Our Values</h3>
              <ul className="careers-list">
                {[
                  'Modular First – start small, grow smart',
                  'Open by Default – be transparent and build trust',
                  'Delightfully Usable – craft and polish matter',
                  'One Team – work as one, win as one'
                ].map((item, i) => (
                  <li key={i} className="careers-list-item">
                    <i className="fa-solid fa-star careers-list-icon star"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="careers-section">
          <h3 className="careers-section-title">Opportunities</h3>
          <div className="careers-opportunities-grid">
            {[
              'Engineering (Frontend, Backend, Full Stack, DevOps, AI/ML)',
              'Product & Design',
              'Sales & Customer Success',
              'Marketing & Growth',
              'Operations & HR'
            ].map((role, i) => (
              <div key={i} className="careers-opportunity-card">
                {role}
              </div>
            ))}
          </div>
          <p className="careers-note">Don't see the perfect role? Send us your resume and let's explore opportunities together.</p>
        </div>

        <div className="careers-section">
          <div className="careers-perks">
            <div className="careers-perks-inner">
              <h3 className="careers-section-title">Perks & Benefits</h3>
              <div className="careers-perks-grid">
                {[
                  'Competitive salary & equity options',
                  'Health and wellness programs',
                  'Flexible work (remote & hybrid)',
                  'Learning and development budget',
                  'Generous leave policy',
                  'Team offsites & retreats',
                  'A culture of recognition and celebration'
                ].map((perk, i) => (
                  <span key={i} className="careers-perk-badge">
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="careers-section">
          <h3 className="careers-section-title">Hear from Our Team</h3>
          <div className="careers-testimonials-grid">
            <div className="careers-testimonial-card">
              <blockquote className="careers-testimonial-quote">
                "At BizSuite, I get to work on challenging problems while collaborating with some of the smartest and kindest people I've ever met."
              </blockquote>
              <figcaption className="careers-testimonial-role">Product Engineer</figcaption>
            </div>
            <div className="careers-testimonial-card">
              <blockquote className="careers-testimonial-quote">
                "The flexibility and trust here are unmatched. I feel supported both as a professional and as a person."
              </blockquote>
              <figcaption className="careers-testimonial-role">HR Manager</figcaption>
            </div>
          </div>
        </div>

        <div className="careers-cta">
          <h2 className="careers-cta-title">Build the Future with Us</h2>
          <p className="careers-cta-text">
            BizSuite is growing—and so is our impact. If you want to reshape how businesses work and have fun while doing it, we'd love to meet you.
          </p>
          <Link to="/contact" className="careers-cta-btn">
            Explore open roles <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </section>
    </main>
  );
};


