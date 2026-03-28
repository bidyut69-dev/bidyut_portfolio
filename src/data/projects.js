// src/data/projects.js — All project data lives here.
//
// To add a new project, copy one of the objects below and fill in your details.
// `tags`     — technology badges shown on the card
// `status`   — "complete" | "wip" | "archived"
// `github`   — your GitHub repo URL (required)
// `demo`     — live demo URL (optional, set to null to hide the button)
// `featured` — true to show in the homepage preview section (max 3 recommended)
// `icon`     — short text label used on the card (keep under 4 chars)
// `accent`   — card accent colour: "cyan" | "purple" | "pink" | "yellow"

export const PROJECTS = [
  {
    id: 'guardian-osint',
    title: 'Guardian-OSINT',
    description:
      'Modular Python CLI tool for security recon -- HTTP header auditing, threat intelligence aggregation via URLhaus & AlienVault OTX, and cross-reference alerting for malicious domains.',
    tags: ['Python', 'OSINT', 'Security', 'CLI', 'URLhaus', 'AlienVault OTX'],
    status: 'complete',
    github: 'https://github.com/your-github/guardian-osint',
    demo: null,
    featured: true,
    accent: 'cyan',
    icon: '[S]',
  },
  {
    id: 'youtube-automator',
    title: 'YouTube Automation Pipeline',
    description:
      'End-to-end faceless YouTube channel pipeline: AI script generation (Anthropic SDK), TTS audio synthesis, stock video selection, auto-editing, thumbnail generation, and scheduled uploading.',
    tags: ['Python', 'Anthropic API', 'TTS', 'FFmpeg', 'YouTube API', 'Automation'],
    status: 'wip',
    github: 'https://github.com/your-github/yt-automator',
    demo: null,
    featured: true,
    accent: 'purple',
    icon: '[Y]',
  },
  {
    id: 'http-header-scanner',
    title: 'HTTP Header Security Scanner',
    description:
      'Standalone scanner that audits websites for missing or misconfigured security headers (CSP, HSTS, X-Frame-Options, etc.) and produces a severity-ranked remediation report.',
    tags: ['Python', 'requests', 'Security', 'CLI', 'Report'],
    status: 'complete',
    github: 'https://github.com/your-github/http-header-scanner',
    demo: null,
    featured: true,
    accent: 'pink',
    icon: '[H]',
  },
  {
    id: 'threat-intel-aggregator',
    title: 'Threat Intel Aggregator',
    description:
      'Aggregates live threat feeds from multiple sources (URLhaus, OTX, VirusTotal) and cross-references a target domain/IP in real time with two-tier URL and domain matching.',
    tags: ['Python', 'Threat Intel', 'API', 'Async', 'Security'],
    status: 'complete',
    github: 'https://github.com/your-github/threat-intel',
    demo: null,
    featured: false,
    accent: 'cyan',
    icon: '[T]',
  },
  {
    id: 'portfolio-site',
    title: 'This Portfolio Site',
    description:
      'Personal portfolio & tech blog built with React, Vite, and Tailwind CSS. Cyber-tech dark aesthetic, Markdown-based blog, SEO optimised, fully responsive.',
    tags: ['React', 'Tailwind CSS', 'Vite', 'Markdown', 'SEO'],
    status: 'wip',
    github: 'https://github.com/your-github/portfolio',
    demo: 'https://your-domain.com',
    featured: false,
    accent: 'yellow',
    icon: '[P]',
  },
  {
    id: 'quick-legal',
    title: 'Quick-Legal',
    description:
      'AI-powered T&C analyzer -- paste any Terms & Conditions and get instant red flags, privacy score (1-10), and plain-English summary. Built with FastAPI + Google Gemini AI.',
    tags: ['Python', 'FastAPI', 'React', 'Gemini AI', 'Full-Stack'],
    status: 'complete',
    github: 'https://github.com/bidyut69-dev/quick-legal',
    demo: 'https://quick-legal-refxdf512-bidyut69-devs-projects.vercel.app/',  // ← apna actual URL daalo
    featured: true,
    accent: 'yellow',
    icon: '[L]',
},
]