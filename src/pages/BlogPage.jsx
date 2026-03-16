// src/pages/BlogPage.jsx — Full blog listing with tag filters
import React from 'react'
import Blog from '../components/Blog.jsx'

export default function BlogPage() {
  return (
    <>
      {/* Page hero */}
      <div className="pt-32 pb-4 px-4 max-w-6xl mx-auto">
        <p className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase mb-3">
          // all articles
        </p>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white">
          Tech Blog
        </h1>
        <p className="text-cyber-muted mt-4 max-w-xl text-sm">
          Deep-dives, tutorials, and notes on cybersecurity, Python, and automation.
          No fluff — just what works.
        </p>
      </div>

      {/*
        showHeader={false} — we already rendered the page header above
        featuredOnly={false} — show all posts with the tag filter bar
      */}
      <Blog showHeader={false} featuredOnly={false} />
    </>
  )
}