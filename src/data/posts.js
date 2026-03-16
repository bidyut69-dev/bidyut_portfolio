// src/data/posts.js — Blog post metadata registry.
//
// Each entry here maps to a Markdown file at:
//   src/posts/<slug>.md
//
// To publish a new post:
//   1. Create `src/posts/my-new-post.md` with your content.
//   2. Add an entry below with the matching `slug`.
//
// Fields:
//   slug      -- used in the URL: /blog/<slug>
//   title     -- displayed in cards and the post header
//   excerpt   -- 1-2 sentence summary for cards (no Markdown)
//   date      -- ISO date string "YYYY-MM-DD"
//   readTime  -- estimated read time string e.g. "5 min read"
//   tags      -- array of topic tags (keep them short)
//   cover     -- optional cover image URL (set null to skip)
//   featured  -- true to show in homepage blog preview

export const POSTS = [
  {
    slug: 'building-guardian-osint',
    title: 'Building Guardian-OSINT: A Modular Python Security Tool',
    excerpt:
      'How I designed a modular CLI tool that audits HTTP security headers and cross-references URLs against live threat intelligence feeds.',
    date: '2025-03-10',
    readTime: '8 min read',
    tags: ['Python', 'OSINT', 'Security', 'CLI'],
    cover: null,
    featured: true,
  },
  {
    slug: 'youtube-automation-with-ai',
    title: 'Building a Faceless YouTube Channel with Python and AI',
    excerpt:
      'A deep dive into my full pipeline: AI script generation, TTS audio, automated video editing, and scheduled uploads -- zero manual work.',
    date: '2025-02-24',
    readTime: '12 min read',
    tags: ['Python', 'AI', 'YouTube', 'Automation'],
    cover: null,
    featured: true,
  },
  {
    slug: 'http-security-headers-guide',
    title: 'HTTP Security Headers: The Complete Developer Guide',
    excerpt:
      'Everything you need to know about CSP, HSTS, X-Frame-Options, and more -- what they do, how to configure them, and how to audit them.',
    date: '2025-01-18',
    readTime: '10 min read',
    tags: ['Security', 'Web Dev', 'HTTP', 'Guide'],
    cover: null,
    featured: true,
  },
  {
    slug: 'alienvault-otx-python',
    title: 'Integrating AlienVault OTX Threat Intelligence with Python',
    excerpt:
      'Step-by-step tutorial on pulling live threat indicators from OTX and using them to enrich your security tools.',
    date: '2024-12-05',
    readTime: '7 min read',
    tags: ['Python', 'Threat Intel', 'OTX', 'Tutorial'],
    cover: null,
    featured: false,
  },
]