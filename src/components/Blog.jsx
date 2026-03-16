// src/components/Blog.jsx — Blog section component
//
// Used on both the HomePage (featuredOnly) and BlogPage (all posts + filters).
//
// Props:
//   featuredOnly  {boolean}  — limit to posts with featured:true
//   showHeader    {boolean}  — renders section title + tag filter bar
//
// Adding a new post:
//   1. Add its metadata to src/data/posts.js
//   2. Create src/posts/<slug>.md with your Markdown content
//   That's it — the card appears automatically.

import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { POSTS } from '../data/posts.js'

// ── Utility: format ISO date to readable string ──────────────────────────────
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

// ── Single blog post card ────────────────────────────────────────────────────
function PostCard({ post, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <article
      ref={ref}
      className={`
        card-cyber flex flex-col cursor-pointer group
        transition-all duration-500
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Cover image — shown if post.cover is set */}
      {post.cover && (
        <div className="h-44 overflow-hidden rounded-t-xl bg-cyber-border">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
            loading="lazy"
          />
        </div>
      )}

      {/* No-cover placeholder — gradient bar */}
      {!post.cover && (
        <div className="h-1 rounded-t-xl bg-gradient-to-r from-cyber-cyan/60 via-cyber-purple/60 to-transparent" />
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Meta row: date + read time */}
        <div className="flex items-center gap-4 mb-3">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-cyber-muted">
            <Calendar size={11} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-cyber-muted">
            <Clock size={11} />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="
          font-display font-bold text-white text-base leading-snug mb-3
          group-hover:text-cyber-cyan transition-colors
        ">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-cyber-text/65 text-sm leading-relaxed flex-1 mb-4">
          {post.excerpt}
        </p>

        {/* Tag chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="tag-cyber text-[10px] py-0.5 flex items-center gap-1">
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>

        {/* Read more link */}
        <Link
          to={`/blog/${post.slug}`}
          className="
            flex items-center gap-1.5 font-mono text-xs text-cyber-cyan
            hover:gap-2.5 transition-all mt-auto
          "
        >
          Read Article <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  )
}

// ── Blog Section ─────────────────────────────────────────────────────────────
export default function Blog({ featuredOnly = false, showHeader = true }) {
  // Active tag filter — null means "show all"
  const [activeTag, setActiveTag] = useState(null)

  // Derive a deduplicated list of all tags across all posts
  const allTags = useMemo(() => {
    const tags = new Set()
    POSTS.forEach(p => p.tags.forEach(t => tags.add(t)))
    return Array.from(tags).sort()
  }, [])

  // Filter posts by featuredOnly flag and active tag
  const posts = useMemo(() => {
    let filtered = featuredOnly ? POSTS.filter(p => p.featured) : POSTS
    if (activeTag) filtered = filtered.filter(p => p.tags.includes(activeTag))
    return filtered
  }, [featuredOnly, activeTag])

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        {showHeader && (
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase mb-3">
                // 03 — thoughts & tutorials
              </p>
              <h2 className="section-title text-3xl sm:text-4xl">Blog</h2>
              <p className="text-cyber-muted text-sm mt-4 max-w-lg">
                Technical write-ups on cybersecurity, Python, and automation.
                Written for developers who like to understand the "why".
              </p>
            </div>
            {featuredOnly && (
              <Link
                to="/blog"
                className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-cyber-cyan hover:text-white transition-colors shrink-0"
              >
                All articles <ArrowRight size={13} />
              </Link>
            )}
          </div>
        )}

        {/* Tag filter bar — only shown on full blog page (not featuredOnly) */}
        {!featuredOnly && (
          <div className="flex flex-wrap gap-2 mb-10">
            {/* "All" button */}
            <button
              onClick={() => setActiveTag(null)}
              className={`
                font-mono text-xs px-3 py-1.5 rounded-lg border transition-all
                ${!activeTag
                  ? 'bg-cyber-cyan text-cyber-black border-cyber-cyan'
                  : 'text-cyber-muted border-cyber-border hover:text-white hover:border-cyber-cyan/40'
                }
              `}
            >
              All
            </button>

            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`
                  font-mono text-xs px-3 py-1.5 rounded-lg border transition-all
                  flex items-center gap-1.5
                  ${activeTag === tag
                    ? 'bg-cyber-cyan text-cyber-black border-cyber-cyan'
                    : 'text-cyber-muted border-cyber-border hover:text-white hover:border-cyber-cyan/40'
                  }
                `}
              >
                <Tag size={10} />
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Post count when filtered */}
        {!featuredOnly && activeTag && (
          <p className="font-mono text-xs text-cyber-muted mb-6">
            {posts.length} post{posts.length !== 1 ? 's' : ''} tagged "{activeTag}"
          </p>
        )}

        {/* Posts grid — 1 → 2 → 3 columns */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-mono text-cyber-muted text-sm">
              No posts found for tag "{activeTag}".
            </p>
            <button
              onClick={() => setActiveTag(null)}
              className="mt-4 font-mono text-xs text-cyber-cyan hover:underline"
            >
              Clear filter →
            </button>
          </div>
        )}

        {/* Mobile "view all" */}
        {featuredOnly && (
          <div className="mt-8 text-center sm:hidden">
            <Link to="/blog" className="btn-ghost text-xs inline-flex items-center gap-2">
              All Articles <ArrowRight size={13} />
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}