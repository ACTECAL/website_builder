import React from 'react';
import { PageHero } from '../components/PageHero';
import { Link } from 'react-router-dom';
import { posts } from './blogData';
import '../styles/Blog.css';

export const Blog: React.FC = () => {
  return (
    <main className="blog-page">
      <PageHero
        title="BizSuite Blog"
        subtitle="Ideas on productivity, modular platforms, automation, and the future of work."
        imageUrl="https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1200&auto=format&fit=crop"
      />
      <section className="blog-container">
        <div className="blog-grid">
          {posts.map((post, idx) => (
            <article key={idx} className="blog-card">
              <div className="blog-card-body">
                <div className="blog-card-category">{post.category}</div>
                <h3 className="blog-card-title">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="blog-card-summary">{post.summary}</p>
                <div className="blog-card-meta">{post.date} • {post.read} read</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};


