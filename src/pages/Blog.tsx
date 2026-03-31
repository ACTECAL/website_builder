import React from 'react';
import { PageHero } from '../components/PageHero';
import { GothicH3 } from '../components/GothicHeading';
import { posts } from './blogData';
import '../styles/Blog.css';

export const Blog: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Nexora Blog"
        subtitle="Ideas on productivity, modular platforms, automation, and the future of work."
        imageUrl="https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1200&auto=format&fit=crop"
      />
      <section className="blog-section">
        <div className="blog-grid-container">
          <div className="blog-grid">
            {posts.map((post, idx) => (
              <article key={idx} className="blog-card">
                <div className="blog-category">{post.category}</div>
                <div className="blog-title-wrapper">
                  <a href={`/blog/${post.slug}`} className="blog-title-link">
                    <GothicH3 text={post.title} className="blog-title" />
                  </a>
                </div>
                <p className="blog-summary">{post.summary}</p>
                <div className="blog-meta">{post.date} • {post.read} read</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};


