// src/App.jsx — Root component: handles routing and page layout
//
// Structure:
//   <Navbar />          — sticky top navigation (always visible)
//   <Routes>            — page-level routing via react-router-dom
//     /                 — HomePage  (Hero + Projects + Blog preview)
//     /blog             — BlogPage  (all articles grid)
//     /blog/:slug       — PostPage  (single Markdown article)
//     /projects         — ProjectsPage (full projects gallery)
//   </Routes>
//   <Footer />          — site-wide footer
//
// To add a new page:
//   1. Create `src/pages/MyPage.jsx`
//   2. Add a <Route path="/my-page" element={<MyPage />} /> below

import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar  from './components/Navbar.jsx'
import Footer  from './components/Footer.jsx'

// ── Lazy-load pages for code-splitting (faster initial load) ──────────────────
// Each page chunk is only downloaded when the user navigates to it.
const HomePage    = lazy(() => import('./pages/HomePage.jsx'))
const BlogPage    = lazy(() => import('./pages/BlogPage.jsx'))
const PostPage    = lazy(() => import('./pages/PostPage.jsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
const QuickLegalPage = lazy(() => import('./pages/QuickLegalPage.jsx'))

// ── Loading fallback shown while a lazy page chunk loads ─────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Terminal-style loader */}
      <div className="font-mono text-cyber-cyan text-sm flex items-center gap-3">
        <span className="dot-online" />
        <span>Loading<span className="animate-blink-cursor">_</span></span>
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    // Root wrapper — min-h ensures footer stays at bottom on short pages
    <div className="min-h-screen flex flex-col">

      {/* Navigation — fixed to top, sits above all content (z-50) */}
      <Navbar />

      {/* Main content area — flex-1 pushes footer to bottom */}
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"           element={<HomePage />}     />
            <Route path="/blog"       element={<BlogPage />}     />
            <Route path="/blog/:slug" element={<PostPage />}     />
            <Route path="/projects"   element={<ProjectsPage />} />
            <Route path="/quick-legal" element={<QuickLegalPage />} />

            {/* 404 catch-all — replace with a proper NotFoundPage if desired */}
            <Route
              path="*"
              element={
                <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                  <p className="font-mono text-cyber-cyan text-5xl font-bold">404</p>
                  <p className="text-cyber-muted">Page not found in this dimension.</p>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}