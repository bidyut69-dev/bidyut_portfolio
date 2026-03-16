// src/components/Projects.jsx — Projects gallery section
//
// Used on both the HomePage (featured subset) and ProjectsPage (all projects).
//
// Props:
//   featuredOnly  {boolean}  — if true, only shows projects with featured:true
//   showHeader    {boolean}  — shows the section title + "View All" link
//
// The accent colour on each card is driven by the `accent` field in projects.js.

import React from 'react'
import { Github, ExternalLink, ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { PROJECTS } from '../data/projects.js'

// ── Colour maps for the accent field ────────────────────────────────────────
const ACCENT_BORDER = {
  cyan:   'border-cyber-cyan/40  hover:border-cyber-cyan/70',
  purple: 'border-cyber-purple/40 hover:border-cyber-purple/70',
  pink:   'border-cyber-pink/40  hover:border-cyber-pink/70',
  yellow: 'border-cyber-yellow/40 hover:border-cyber-yellow/70',
}
const ACCENT_TOP_BAR = {
  cyan:   'bg-cyber-cyan',
  purple: 'bg-cyber-purple',
  pink:   'bg-cyber-pink',
  yellow: 'bg-cyber-yellow',
}
const ACCENT_TEXT = {
  cyan:   'text-cyber-cyan',
  purple: 'text-cyber-purple',
  pink:   'text-cyber-pink',
  yellow: 'text-cyber-yellow',
}

// ── Status badge colours ─────────────────────────────────────────────────────
const STATUS_STYLE = {
  complete: 'text-cyber-cyan   bg-cyber-cyan/10   border-cyber-cyan/20',
  wip:      'text-cyber-yellow bg-cyber-yellow/10 border-cyber-yellow/20',
  archived: 'text-cyber-muted  bg-cyber-muted/10  border-cyber-muted/20',
}
const STATUS_LABEL = {
  complete: 'Complete',
  wip:      'In Progress',
  archived: 'Archived',
}

// ── Single project card ──────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const accent = project.accent || 'cyan'

  return (
    <article
      ref={ref}
      className={`
        card-cyber border ${ACCENT_BORDER[accent]}
        flex flex-col
        transition-all duration-500
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Coloured top accent bar */}
      <div className={`h-0.5 ${ACCENT_TOP_BAR[accent]} rounded-t-xl`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Header row: icon + title + status badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 px-1.5 py-0.5 rounded shrink-0">
              {project.icon}
            </span>
            <h3 className="font-display font-bold text-white text-base leading-tight">
              {project.title}
            </h3>
          </div>
          {/* Status badge */}
          <span className={`
            font-mono text-[10px] px-2 py-0.5 rounded-full border shrink-0
            ${STATUS_STYLE[project.status]}
          `}>
            {STATUS_LABEL[project.status]}
          </span>
        </div>

        {/* Description */}
        <p className="text-cyber-text/70 text-sm leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span key={tag} className="tag-cyber text-[10px] py-0.5">
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons row */}
        <div className="flex items-center gap-3 mt-auto border-t border-cyber-border pt-4">
          {/* GitHub link — always shown */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center gap-1.5 font-mono text-xs
              ${ACCENT_TEXT[accent]}
              hover:underline transition-colors
            `}
          >
            <Github size={13} />
            Source Code
          </a>

          {/* Live demo link — only shown if project.demo is not null */}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-cyber-muted hover:text-white transition-colors ml-auto"
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

// ── Projects Section ──────────────────────────────────────────────────────────
export default function Projects({ featuredOnly = false, showHeader = true }) {
  const projects = featuredOnly
    ? PROJECTS.filter(p => p.featured)
    : PROJECTS

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        {showHeader && (
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase mb-3">
                // 02 — what I've built
              </p>
              <h2 className="section-title text-3xl sm:text-4xl">Projects</h2>
              <p className="text-cyber-muted text-sm mt-4 max-w-lg">
                Open-source tools, automation systems, and experiments. All code is
                public on GitHub.
              </p>
            </div>

            {/* "View all" link shown only when in featured mode */}
            {featuredOnly && (
              <Link
                to="/projects"
                className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-cyber-cyan hover:text-white transition-colors shrink-0"
              >
                All projects <ArrowRight size={13} />
              </Link>
            )}
          </div>
        )}

        {/* Card grid — responsive: 1 col → 2 col → 3 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Mobile "view all" link */}
        {featuredOnly && (
          <div className="mt-8 text-center sm:hidden">
            <Link to="/projects" className="btn-ghost text-xs inline-flex items-center gap-2">
              All Projects <ArrowRight size={13} />
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}