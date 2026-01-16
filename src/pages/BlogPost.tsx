import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { posts } from './blogData';
import '../styles/BlogPost.css';

export const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <main className="blogpost-page">
        <div className="blogpost-not-found">
          <h2 className="blogpost-not-found-title">Post not found</h2>
          <Link to="/blog" className="blogpost-back-link">← Back to Blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="blogpost-page">
      <PageHero
        title={post.title}
        subtitle={`${post.category} • ${post.date} • ${post.read} read`}
        imageUrl={undefined}
        emphasize="none"
      />
      <section className="blogpost-container">
        {/* Brief version: show summary and one concise paragraph */}
        <p className="blogpost-content">
          {post.summary}
        </p>
        {post.content.slice(0, 1).map((para, idx) => (
          <p key={idx} className="blogpost-paragraph">{para}</p>
        ))}
        <div className="blogpost-back-section">
          <Link to="/blog" className="blogpost-back-link">← Back to Blog</Link>
        </div>
      </section>
    </main>
  );
};

export default BlogPost;


