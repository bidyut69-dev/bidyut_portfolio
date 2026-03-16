// src/pages/ProjectsPage.jsx — Full projects gallery
import React from 'react'
import Projects from '../components/Projects.jsx'

export default function ProjectsPage() {
  return (
    <>
      <div className="pt-32 pb-4 px-4 max-w-6xl mx-auto">
        <p className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase mb-3">
          // all builds
        </p>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white">
          Projects
        </h1>
        <p className="text-cyber-muted mt-4 max-w-xl text-sm">
          Open-source tools, automation systems, and side experiments. All code
          is public on GitHub — fork, star, or contribute.
        </p>
      </div>

      {/*
        featuredOnly={false} — show all projects
        showHeader={false}   — we already rendered the page header above
      */}
      <Projects featuredOnly={false} showHeader={false} />
    </>
  )
}