import { posts } from '../pages/blogData';
import { appModules } from './appModules';
import { industryCategories } from './industries';

export type SiteDoc = {
  title: string;
  path: string;
  category: string;
  description?: string;
  tags?: string[];
};

const baseDocs: SiteDoc[] = [
  { title: 'Community', path: '/community', category: 'Hub', description: 'Explore resources, events, and community areas.' },
  { title: 'Tutorials', path: '/tutorials', category: 'Learn', description: 'Step-by-step guides to get started.', tags: ['quick start', 'guides'] },
  { title: 'Documentation', path: '/docs', category: 'Learn', description: 'Technical documentation and references.', tags: ['api', 'guide', 'reference'] },
  { title: 'Certifications', path: '/certifications', category: 'Learn', description: 'Validate your BizSuite skills.' },
  { title: 'Training', path: '/training', category: 'Learn', description: 'Learning tracks, workshops, and labs.' },
  { title: 'Help Center', path: '/help-center', category: 'Support', description: 'Knowledge base and FAQs.' },
  { title: 'API Reference', path: '/api-reference', category: 'Develop', description: 'Explore API endpoints and examples.', tags: ['api', 'reference'] },
  { title: 'Status', path: '/status', category: 'Support', description: 'System uptime and incidents.' },
  { title: 'Podcast', path: '/podcast', category: 'Learn', description: 'Conversations with experts.' },
  { title: 'Education Program', path: '/education-program', category: 'Education', description: 'Resources for students and educators.' },
  { title: 'Scale Up! Business Game', path: '/scale-up-business-game', category: 'Education', description: 'Simulation for strategy and finance.' },
  { title: 'Download', path: '/download', category: 'Get the Software', description: 'Get BizSuite for your platform.' },
  { title: 'Compare Editions', path: '/compare-editions', category: 'Get the Software', description: 'Community vs Enterprise features.' },
  { title: 'Releases', path: '/releases', category: 'Get the Software', description: 'What’s new in each version.' },
  { title: 'Github', path: '/github', category: 'Collaborate', description: 'Source, issues, and PRs.' },
  { title: 'Forum', path: '/forum', category: 'Collaborate', description: 'Ask questions and share solutions.' },
  { title: 'Events', path: '/events', category: 'Collaborate', description: 'Conferences, meetups, and webinars.' },
  { title: 'Translations', path: '/translations', category: 'Collaborate', description: 'Help localize BizSuite.' },
  { title: 'Become a Partner', path: '/become-a-partner', category: 'Collaborate', description: 'Join the partner program.' },
  { title: 'Services for Partners', path: '/services-for-partners', category: 'Collaborate', description: 'Enablement and co-selling resources.' },
  { title: 'Register your Accounting Firm', path: '/register-your-accounting-firm', category: 'Collaborate', description: 'List your accounting firm.' },
  { title: 'Find a Partner', path: '/find-a-partner', category: 'Get Services', description: 'Directory of certified partners.' },
  { title: 'Find an Accountant', path: '/find-an-accountant', category: 'Get Services', description: 'Directory of accountants.' },
  { title: 'Meet an advisor', path: '/meet-an-advisor', category: 'Get Services', description: 'Book time with a BizSuite expert.' },
  { title: 'Implementation Services', path: '/implementation-services', category: 'Get Services', description: 'From discovery to go-live.' },
  { title: 'Customer References', path: '/customer-references', category: 'Get Services', description: 'See customer success stories.' },
  { title: 'Support', path: '/support', category: 'Support', description: 'Open tickets and browse knowledge base.' },
  { title: 'Upgrades', path: '/upgrades', category: 'Support', description: 'Plan and execute upgrades safely.' },
  { title: 'All Industries', path: '/industries', category: 'Industries', description: 'Explore BizSuite solutions by industry.' },
  { title: 'Blog', path: '/blog', category: 'Learn', description: 'All blog posts.' }
];

const appDocs: SiteDoc[] = appModules.map(m => ({
  title: m.name,
  path: `/apps/${m.slug}`,
  category: `App • ${m.category}`,
  description: m.description,
  tags: ['app', 'module', m.category, ...m.integrations]
}));

const industryDocs: SiteDoc[] = industryCategories.flatMap(cat =>
  cat.industries.map(ind => ({
    title: ind.name,
    path: `/industries/${ind.slug}`,
    category: `Industry • ${cat.name}`,
    description: ind.description,
    tags: ['industry', 'solution', cat.name, ...ind.keyFeatures]
  }))
);

const blogDocs: SiteDoc[] = posts.map(p => ({
  title: p.title,
  path: `/blog/${p.slug}`,
  category: `Blog • ${p.category}`,
  description: p.summary,
  tags: ['blog', 'article', p.category]
}));

export const siteIndex: SiteDoc[] = [...baseDocs, ...appDocs, ...industryDocs, ...blogDocs];

export function searchSite(query: string): Array<{ doc: SiteDoc; score: number }> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = siteIndex.map(doc => {
    let score = 0;
    for (const t of tokens) {
      if (doc.title.toLowerCase().includes(t)) score += 3;
      if ((doc.description ?? '').toLowerCase().includes(t)) score += 2;
      if ((doc.category ?? '').toLowerCase().includes(t)) score += 1;
      if ((doc.tags ?? []).some(tag => tag.toLowerCase().includes(t))) score += 2;
      if (doc.path.toLowerCase().includes(t)) score += 1;
    }
    // small boost for exact phrase in title
    if (doc.title.toLowerCase().includes(q)) score += 2;
    return { doc, score };
  });
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

