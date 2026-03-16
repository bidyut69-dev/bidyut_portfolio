// src/components/Footer.jsx — Site-wide footer
//
// Update SOCIAL links and the copyright name as needed.

import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Twitter, Heart } from 'lucide-react'

const NAV_LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/projects', label: 'Projects' },
  { to: '/blog',     label: 'Blog'     },
]

const SOCIAL = [
  { icon: Github,  href: 'https://github.com/your-github',   label: 'GitHub'  },
  { icon: Twitter, href: 'https://twitter.com/your-twitter', label: 'Twitter' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-cyber-border mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <div className="flex items-center">
            <img
              src="/logo.svg"
              alt="SKY Logo"
              width={120}
              height={30}
              className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Nav links */}
          <nav className="flex gap-6">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="font-mono text-xs text-cyber-muted hover:text-cyber-cyan transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-cyber-muted hover:text-cyber-cyan transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-cyber-border text-center">
          <p className="font-mono text-xs text-cyber-muted flex items-center justify-center gap-2">
            © {year} SKY — Built with
            <Heart size={11} className="text-cyber-pink inline" />
            using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}