// src/pages/HomePage.jsx — Main landing page
//
// Sections (in order):
//   1. Hero — typing animation, glitch name, terminal card
//   2. Projects — featured 3 projects
//   3. Blog — featured 3 articles
//
// All section components accept `featuredOnly` and `showHeader` props
// so they can be reused on their respective full-page views.

import React from 'react'
import Hero     from '../components/Hero.jsx'
import About    from '../components/About.jsx'
import Projects from '../components/Projects.jsx'
import Blog     from '../components/Blog.jsx'

export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <Hero />

      <div className="h-px max-w-6xl mx-auto bg-gradient-to-r from-transparent via-cyber-border to-transparent" />

      {/* ── 2. About Me ───────────────────────────────────────────────────── */}
      <About />

      <div className="h-px max-w-6xl mx-auto bg-gradient-to-r from-transparent via-cyber-border to-transparent" />

      {/* ── 2. Featured Projects ──────────────────────────────────────────── */}
      {/*
        featuredOnly={true} — renders only the 3 projects marked featured:true
        showHeader={true}   — renders the section title + "View All" link
      */}
      <Projects featuredOnly showHeader />

      <div className="h-px max-w-6xl mx-auto bg-gradient-to-r from-transparent via-cyber-border to-transparent" />

      {/* ── 3. Featured Blog Posts ────────────────────────────────────────── */}
      <Blog featuredOnly showHeader />
    </>
  )
}