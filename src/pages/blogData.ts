export type Post = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  read: string;
  content: string[]; // paragraphs
};

export const posts: Post[] = [
  {
    slug: 'why-modular-software-future-business-tools',
    title: 'Why Modular Software is the Future of Business Tools',
    category: 'Productivity & Growth',
    summary: 'The benefits of modular platforms vs monolithic systems—and how they lower risk while increasing adaptability.',
    date: '2025-01-10',
    read: '6 min',
    content: [
      'Monolithic suites try to do everything at once and often slow teams down. Modular platforms let you start small and expand as you grow.',
      'This article breaks down costs, risks, and a practical adoption path for teams moving to a modular stack.'
    ]
  },
  {
    slug: 'hidden-cost-of-tool-sprawl',
    title: 'The Hidden Cost of Tool Sprawl—and How to Fix It',
    category: 'Productivity & Growth',
    summary: 'Wasted time and budget from juggling too many apps, plus a playbook to consolidate without disruption.',
    date: '2025-01-12',
    read: '7 min',
    content: [
      'Tool sprawl creates invisible drag across onboarding, reporting, and security.',
      'We share a 4-step plan to consolidate without breaking existing workflows.'
    ]
  },
  {
    slug: 'lean-tech-stack-without-compromise',
    title: 'How to Build a Lean Tech Stack Without Compromising Efficiency',
    category: 'Productivity & Growth',
    summary: 'Practical guidance for startups and SMEs to craft a lightweight, scalable stack.',
    date: '2025-01-15',
    read: '5 min',
    content: [
      'Lean stacks reduce maintenance and improve focus.',
      'Start with core workflows, measure outcomes, and add only what compounds value.'
    ]
  },
  {
    slug: 'unified-platforms-boost-teamwork',
    title: 'Breaking Down Silos: How Unified Platforms Boost Teamwork',
    category: 'Customer & Team Collaboration',
    summary: 'Align sales, finance, HR, and ops with one shared source of truth.',
    date: '2025-01-18',
    read: '6 min',
    content: [
      'Unified platforms remove duplicate data and context switching.',
      'Here is how to migrate gradually and win buy‑in from each department.'
    ]
  },
  {
    slug: 'streamline-operations-2025',
    title: 'From Chaos to Clarity: 5 Ways to Streamline Operations in 2025',
    category: 'Customer & Team Collaboration',
    summary: 'Tactical steps leaders can take this quarter to simplify workflows.',
    date: '2025-01-20',
    read: '5 min',
    content: [
      'Five quick wins to reduce handoffs, clarify ownership, and shorten cycle times.'
    ]
  },
  {
    slug: 'automation-in-smbs',
    title: 'The Role of Automation in Scaling Small Businesses',
    category: 'Automation & AI',
    summary: 'Where automation saves time, reduces errors, and how to start small.',
    date: '2025-01-22',
    read: '6 min',
    content: [
      'Start with repeatable, rules‑based processes; add human approval steps where needed.'
    ]
  },
  {
    slug: 'ai-in-business-apps',
    title: 'AI in Business Apps: Hype vs. Real Value',
    category: 'Automation & AI',
    summary: 'A practical lens on applying AI today while avoiding buzzword traps.',
    date: '2025-01-24',
    read: '7 min',
    content: [
      'Prioritize measurable outcomes (resolution time, CSAT, margin) over model novelty.'
    ]
  },
  {
    slug: 'future-of-work-is-modular',
    title: 'The Future of Work is Modular: A CEO’s Guide',
    category: 'Leadership & Vision',
    summary: 'An executive playbook for evolving from monoliths to adaptive systems.',
    date: '2025-01-26',
    read: '8 min',
    content: [
      'Modularity increases resilience and speeds up experimentation across teams.'
    ]
  },
  {
    slug: 'journey-from-invoice-to-platform',
    title: 'Lessons from Our Journey: From Invoicing Tool to Platform',
    category: 'Leadership & Vision',
    summary: 'What we learned turning a single-use tool into a cohesive platform.',
    date: '2025-01-28',
    read: '6 min',
    content: [
      'Focus, customer feedback loops, and a clear modular architecture.'
    ]
  },
  {
    slug: 'design-apps-teams-love',
    title: 'Inside Nexora: How We Design Apps Teams Love Using',
    category: 'Nexora Product & Community',
    summary: 'A behind-the-scenes look at our design principles and customer feedback loops.',
    date: '2025-01-30',
    read: '6 min',
    content: [
      'Clarity, speed, and reduction of cognitive load guide every decision.'
    ]
  },
  // Extra posts requested
  {
    slug: 'finance-automation-checklist-2025',
    title: 'Finance Automation Checklist for 2025',
    category: 'Operations',
    summary: 'A practical checklist to automate billing, reconciliation, and reporting.',
    date: '2025-02-02',
    read: '5 min',
    content: ['Step‑by‑step tasks your team can complete in a week.']
  },
  {
    slug: 'customer-ops-playbook',
    title: 'The Customer Ops Playbook',
    category: 'Customer & Team Collaboration',
    summary: 'Processes and tooling to scale support without losing quality.',
    date: '2025-02-05',
    read: '7 min',
    content: ['SLAs, automations, and a shared source of truth.']
  }
];


