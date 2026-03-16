// src/components/Navbar.jsx — Sticky navigation bar
//
// Features:
//  • Background becomes opaque + blurred after scrolling 60px
//  • Active route is highlighted with cyan underline
//  • Hamburger menu for mobile (slides down on small screens)
//  • Logo with animated "online" indicator
//
// To add a nav link: edit the LINKS array at the top.

import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Terminal, Github, Twitter } from 'lucide-react'

// ── Navigation links ─────────────────────────────────────────────────────────
// Edit this array to add, remove, or rename links.
const LINKS = [
  { to: '/',         label: 'Home',  isHash: false },
  { to: '/about',   label: 'About', isHash: false  },
  { to: '/projects', label: 'Projects', isHash: false },
  { to: '/blog',     label: 'Blog',  isHash: false },
]

// ── Social links ──────────────────────────────────────────────────────────────
// Replace href values with your own profiles.
const SOCIAL = [
  { icon: Github,  href: 'https://github.com/your-github',   label: 'GitHub'  },
  { icon: Twitter, href: 'https://twitter.com/your-twitter', label: 'Twitter' },
]

// ── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  // Track whether the page has been scrolled past the hero top
  const [scrolled,     setScrolled]     = useState(false)
  // Toggle mobile menu open/closed
  const [mobileOpen,   setMobileOpen]   = useState(false)

  // ── Scroll listener — updates `scrolled` state ───────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change (handled by NavLink itself via onClick)
  const closeMobile = () => setMobileOpen(false)

  return (
    // ── Outer wrapper: fixed position, full width, above all content ─────────
    <header
      className={`
        fixed top-0 inset-x-0 z-50
        transition-all duration-300
        ${scrolled
          ? 'bg-cyber-black/90 backdrop-blur-md border-b border-cyber-border shadow-[0_4px_32px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent'
        }
      `}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={closeMobile}
          >
            {/* Icon with neon glow on hover */}
            <div className="
              w-8 h-8 rounded-lg flex items-center justify-center
              bg-cyber-cyan/10 border border-cyber-cyan/30
              group-hover:bg-cyber-cyan/20 group-hover:border-cyber-cyan/60
              group-hover:shadow-neon-cyan
              transition-all duration-300
            ">
              <Terminal size={15} className="text-cyber-cyan" />
            </div>

            <div className="flex flex-col leading-none">
              {/* Your name/brand — change "SKY" to your name */}
              <span className="font-display font-bold text-white text-sm tracking-widest uppercase">
                SKY
              </span>
              {/* Status indicator row */}
              <span className="flex items-center gap-1.5 mt-0.5">
                <span className="dot-online" />
                <span className="font-mono text-[10px] text-cyber-muted">available for work</span>
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation Links ──────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1">
            {LINKS.map(({ to, label, isHash }) => (
              <li key={to}>
                {isHash ? (
                  // Plain <a> for same-page hash links — NavLink would
                  // incorrectly mark these as active on matching routes
                  <a
                    href={to}
                    className="relative font-mono text-sm px-4 py-2 rounded-lg transition-all duration-200 text-cyber-muted hover:text-white hover:bg-white/5"
                  >
                    {label}
                  </a>
                ) : (
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) => `
                      relative font-mono text-sm px-4 py-2 rounded-lg
                      transition-all duration-200
                      ${isActive
                        ? 'text-cyber-cyan'
                        : 'text-cyber-muted hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        {label}
                        {isActive && (
                          <span className="
                            absolute bottom-0.5 left-1/2 -translate-x-1/2
                            w-4 h-px bg-cyber-cyan rounded-full
                            shadow-[0_0_8px_#00f5d4]
                          " />
                        )}
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* ── Desktop Right Section: social icons + CTA ─────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            {/* Social icon buttons */}
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="
                  w-8 h-8 rounded-lg flex items-center justify-center
                  text-cyber-muted hover:text-white hover:bg-white/8
                  transition-all duration-200
                "
              >
                <Icon size={16} />
              </a>
            ))}

            {/* CTA button — links to your resume or contact section */}
            <a
              href="#contact"
              className="btn-primary text-xs px-4 py-2"
            >
              Hire Me
            </a>
          </div>

          {/* ── Mobile: hamburger toggle ──────────────────────────────────── */}
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
            className="
              md:hidden w-9 h-9 rounded-lg flex items-center justify-center
              text-cyber-muted hover:text-white hover:bg-white/8
              border border-cyber-border hover:border-cyber-cyan/30
              transition-all duration-200
            "
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </nav>

      {/* ── Mobile Dropdown Menu ──────────────────────────────────────────── */}
      {/*
        Uses CSS max-height transition for smooth open/close animation.
        No JS animation library needed.
      */}
      <div
        className={`
          md:hidden overflow-hidden
          bg-cyber-dark/95 backdrop-blur-md border-b border-cyber-border
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
          {LINKS.map(({ to, label, isHash }) => (
              isHash ? (
                <a
                  key={to}
                  href={to}
                  onClick={closeMobile}
                  className="font-mono text-sm px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 text-cyber-muted hover:text-white hover:bg-white/5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-border" />
                  {label}
                </a>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={closeMobile}
                  className={({ isActive }) => `
                    font-mono text-sm px-4 py-3 rounded-lg
                    flex items-center gap-3
                    transition-all duration-200
                    ${isActive
                      ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20'
                      : 'text-cyber-muted hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyber-cyan shadow-[0_0_6px_#00f5d4]' : 'bg-cyber-border'}`} />
                      {label}
                    </>
                  )}
                </NavLink>
              )
            ))}

          {/* Social + CTA row in mobile menu */}
          <div className="mt-3 pt-3 border-t border-cyber-border flex items-center gap-3">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-cyber-muted hover:text-white transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
            <a href="#contact" className="btn-primary ml-auto text-xs px-4 py-2" onClick={closeMobile}>
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}