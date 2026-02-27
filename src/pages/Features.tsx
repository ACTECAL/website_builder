import React from 'react';
import { PageHero } from '../components/PageHero';
import { HandBullets } from '../components/CreativeBits';

export const Features: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Nexora Features"
        subtitle="At Nexora, we don’t just give you tools—we give you a connected system that grows with your business. Every feature helps your team move faster and work as one."
        imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
      />
      <section style={{ padding: '0 24px 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 12,
            marginBottom: 20
          }}>
            {[
              'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop'
            ].map((src, i) => (
              <img key={i} src={src} alt="" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 12 }} />
            ))}
          </div>
          <p style={{ color: '#475569', lineHeight: 1.9 }}>
            Here’s what makes Nexora powerful:
          </p>

          <h3>1. Modular Apps – Start Small, Scale Confidently</h3>
          <HandBullets
            items={[
              'Start with one app and expand when you’re ready',
              'Choose from CRM, Finance, HR, or Operations',
              'Add modules without messy migrations'
            ]}
          />
          <p style={{ color: '#475569' }}>
            <strong>Benefit:</strong> Flexibility without the overwhelm. Pay for what you need today—stay future‑ready.
          </p>

          <h3>2. Unified CRM – Build Stronger Relationships</h3>
          <HandBullets
            items={[
              'Centralized customer database',
              'Automated reminders and follow‑ups',
              'Integrated sales pipeline tracking'
            ]}
          />
          <p style={{ color: '#475569' }}>
            <strong>Benefit:</strong> No lost emails, no missed opportunities—stronger, smarter relationships.
          </p>

          <h3>3. Finance & Accounting – Simplified Money Management</h3>
          <HandBullets
            items={[
              'Smart invoicing and recurring billing',
              'Expense tracking and approvals',
              'Real‑time financial dashboards'
            ]}
          />
          <p style={{ color: '#475569' }}>
            <strong>Benefit:</strong> Spend less time crunching numbers and more time growing your bottom line.
          </p>

          <h3>4. Operations Hub – Streamline How Work Gets Done</h3>
          <HandBullets
            items={[
              'Task and project management',
              'Workflow automation',
              'Cross‑team visibility'
            ]}
          />
          <p style={{ color: '#475569' }}>
            <strong>Benefit:</strong> Everyone knows what’s happening, who’s responsible, and when things are due—no chaos.
          </p>

          <h3>5. Human Resources – Put People First</h3>
          <HandBullets
            items={[
              'Employee onboarding and digital records',
              'Leave management and payroll integration',
              'Performance tracking'
            ]}
          />
          <p style={{ color: '#475569' }}>
            <strong>Benefit:</strong> A workplace where people feel supported and processes feel effortless.
          </p>

          <h3>6. Open Integrations – Connect Everything You Already Use</h3>
          <HandBullets
            items={[
              'API‑first and ecosystem‑friendly',
              'Sync data across your existing stack',
              'Extend functionality with custom integrations'
            ]}
          />
          <p style={{ color: '#475569' }}>
            <strong>Benefit:</strong> No data silos. Everything works together—your way.
          </p>

          <h3>7. Delightful Design – Tools Your Team Actually Loves</h3>
          <HandBullets
            items={[
              'Clean, modern interface',
              'Mobile‑friendly for work on the go',
              'Designed for speed and simplicity'
            ]}
          />
          <p style={{ color: '#475569' }}>
            <strong>Benefit:</strong> When software feels good to use, adoption soars.
          </p>

          <h3>8. Enterprise‑Grade Security – Built on Trust</h3>
          <HandBullets
            items={[
              'Bank‑level encryption',
              'Role‑based access control',
              'Regular security audits'
            ]}
          />
          <p style={{ color: '#475569' }}>
            <strong>Benefit:</strong> Peace of mind knowing your business is safe.
          </p>

          <h3>9. AI‑Powered Insights – Smarter Decisions, Faster</h3>
          <HandBullets
            items={[
              'Predictive analytics for sales and finance',
              'Automated workflow suggestions',
              'Smart recommendations for efficiency'
            ]}
          />
          <p style={{ color: '#475569' }}>
            <strong>Benefit:</strong> Make better decisions backed by real‑time intelligence.
          </p>

          <h3>10. One System, Endless Possibilities</h3>
          <HandBullets
            items={[
              'One login, one platform, one experience',
              'No jumping between tabs',
              'A coherent system for the entire company'
            ]}
          />
          <p style={{ color: '#475569' }}>
            <strong>Benefit:</strong> Finally—business software that feels like it’s on your side.
          </p>

          <p style={{ color: '#0f172a', marginTop: 24 }}>
            <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" style={{ marginRight: 8 }}></i>
            In short: Nexora isn’t just a set of apps. It’s the operating system for your business—modular, open, secure, and delightfully easy to use.
          </p>
          <p style={{ marginTop: 12 }}>
            <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ marginRight: 8 }}></i>
            <a href="/solutions" style={{ color: '#667eea', textDecoration: 'none' }}>Ready to simplify your workflows?</a>
          </p>
        </div>
      </section>
    </main>
  );
};


