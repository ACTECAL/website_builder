import React from 'react';
import { PageHero } from '../components/PageHero';
import { GothicH3 } from '../components/GothicHeading';
import { posts } from './blogData';

export const Blog: React.FC = () => {
  return (
    <main>
      <PageHero
        title="BizSuite Blog"
        subtitle="Ideas on productivity, modular platforms, automation, and the future of work."
        imageUrl="https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1200&auto=format&fit=crop"
      />
      <section style={{ padding: '0 24px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20
          }}>
            {posts.map((post, idx) => (
              <article key={idx} style={{
                background: 'white',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: 14,
                padding: 16,
                boxShadow: '0 6px 20px rgba(0,0,0,0.06)'
              }}>
                <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: 6 }}>{post.category}</div>
                <div style={{ margin: '0 0 8px', fontSize: '1.05rem' }}>
                  <div style={{ margin: '0 0 8px', fontSize: '1.05rem' }}>
                    <a href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: '#111827' }}>
                      <GothicH3 text={post.title} style={{ fontSize: '1.05rem', margin: 0 }} />
                    </a>
                  </div>
                </div>
                <p style={{ color: '#475569', margin: '0 0 12px' }}>{post.summary}</p>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{post.date} • {post.read} read</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};


