// src/components/Hero.jsx — Landing hero section
//
// Performance optimisations applied:
//  • scan-line + float animations DEFERRED via requestAnimationFrame
//    so they never compete with LCP element painting
//  • No inline opacity:0 — keyframe handles initial state
//  • Typing animation starts after first paint
//  • GlitchText layers are aria-hidden (no accessibility cost)

import React, { useState, useEffect, useRef } from 'react'
import { ArrowDown, Shield, Code2, Youtube, ExternalLink } from 'lucide-react'

// ── Edit these to personalise ─────────────────────────────────────────────────

const TYPED_STRINGS = [
  'Building Python Automations.',
  'Learning Cybersecurity.',
  'Building OSINT Tools.',
  'Hacking the System (ethically).',
  'Creating YouTube Pipelines.',
  'Shipping Open-Source Projects.',
]

const STATS = [
  { value: '12+', label: 'Projects Shipped'   },
  { value: '3+',  label: 'Tools Open-Sourced' },
  { value: '∞',   label: 'Lines of Python'    },
]

const CORNER_LINES = [
  '/* SKY PORTFOLIO v1.0 */',
  'import { passion } from "life"',
  'const skill = build()',
]

// ── Typing animation hook ─────────────────────────────────────────────────────
function useTypingAnimation(strings, { speed = 80, deleteSpeed = 40, pause = 1600 } = {}) {
  const [displayed,   setDisplayed]   = useState('')
  const [stringIndex, setStringIndex] = useState(0)
  const [isDeleting,  setIsDeleting]  = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const current = strings[stringIndex]
    const tick = () => {
      if (!isDeleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1))
          timeoutRef.current = setTimeout(tick, speed)
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1))
          timeoutRef.current = setTimeout(tick, deleteSpeed)
        } else {
          setIsDeleting(false)
          setStringIndex(i => (i + 1) % strings.length)
        }
      }
    }
    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : speed)
    return () => clearTimeout(timeoutRef.current)
  }, [displayed, isDeleting, stringIndex, strings, speed, deleteSpeed, pause])

  return displayed
}

// ── Glitch Text ───────────────────────────────────────────────────────────────
// Hover over the name to trigger the RGB-split glitch effect.
function GlitchText({ children }) {
  return (
    <span className="relative inline-block group">
      <span className="relative z-10">{children}</span>
      {/* Cyan layer — clips top half, slides left on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-cyber-cyan opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1 transition-opacity"
        style={{ clipPath: 'inset(0 0 50% 0)' }}
      >{children}</span>
      {/* Purple layer — clips bottom half, slides right on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-cyber-purple opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2 transition-opacity"
        style={{ clipPath: 'inset(50% 0 0 0)' }}
      >{children}</span>
    </span>
  )
}

// ── Terminal Card ─────────────────────────────────────────────────────────────
// Decorative card mimicking a terminal status readout.
// Float animation is NOT applied here — the parent applies it post-mount
// so it doesn't run during the critical LCP window.
function TerminalCard() {
  const lines = [
    { label: 'user',   value: 'SKY@portfolio',        color: 'text-cyber-cyan'   },
    { label: 'role',   value: 'Security Engineer',     color: 'text-cyber-purple' },
    { label: 'stack',  value: 'Python / React / TW',   color: 'text-white'        },
    { label: 'status', value: 'Open to Opportunities', color: 'text-cyber-cyan'   },
    { label: 'tools',  value: 'Guardian-OSINT v1.0',   color: 'text-cyber-yellow' },
    { label: 'focus',  value: 'YouTube Automation',    color: 'text-cyber-pink'   },
  ]

  return (
    <div className="relative w-full max-w-sm bg-cyber-dark border border-cyber-border rounded-xl overflow-hidden shadow-card scanlines">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-cyber-border bg-cyber-black/50">
        <span className="w-3 h-3 rounded-full bg-cyber-pink/70"   />
        <span className="w-3 h-3 rounded-full bg-cyber-yellow/70" />
        <span className="w-3 h-3 rounded-full bg-cyber-cyan/70"   />
        <span className="ml-3 font-mono text-xs text-cyber-muted tracking-wider">~/status.sh</span>
      </div>

      {/* Output lines */}
      <div className="p-4 space-y-2">
        {lines.map(({ label, value, color }) => (
          <div key={label} className="flex items-start gap-3 font-mono text-xs">
            <span className="text-cyber-muted w-12 shrink-0">{label}</span>
            <span className="text-cyber-border">-&gt;</span>
            <span className={color}>{value}</span>
          </div>
        ))}
        {/* Blinking cursor */}
        <div className="flex items-center gap-2 pt-2 font-mono text-xs text-cyber-cyan">
          <span>$</span>
          <span className="animate-blink-cursor">|</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/60 to-transparent" />
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const typedText = useTypingAnimation(TYPED_STRINGS)

  // `mounted` gates all decorative/looping animations so they start only
  // after the first browser paint — keeps LCP fast and uncontested.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-16 pb-12 overflow-hidden"
    >

      {/* ── Radial glow — static, no animation cost ──────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-hero-radial pointer-events-none" />

      {/* ── Scan-line — deferred so it never blocks LCP ───────────────── */}
      {mounted && (
        <div className="absolute inset-x-0 h-px opacity-20 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent animate-scan-line pointer-events-none" />
      )}

      {/* ── Corner code decoration ────────────────────────────────────── */}
      <div className="absolute top-20 left-4 sm:left-8 font-mono text-[10px] text-cyber-cyan/30 leading-5 pointer-events-none select-none">
        {CORNER_LINES.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* ── Left Column ──────────────────────────────────────────── */}
          <div className="flex-1 text-center lg:text-left space-y-6">

            {/* Status badge — animates in immediately (delay 0) */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-cyan/25 bg-cyber-cyan/5 animate-fade-up"
              style={{ animationDelay: '0ms' }}
            >
              <span className="dot-online" />
              <span className="font-mono text-xs text-cyber-cyan">Open to new opportunities</span>
            </div>

            {/* Headline — LCP element, animates in at 100ms */}
            <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
              <p className="font-mono text-cyber-cyan/80 text-sm mb-2 tracking-[0.2em] uppercase">
                Hello, World. I'm
              </p>
              {/* h1 is the LCP element — no text-shadow or filter here */}
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
                <GlitchText>SKY</GlitchText>
                <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-cyber-muted font-semibold">
                  &mdash; Dev &amp; Security
                </span>
              </h1>
            </div>

            {/* Typing line — animates in at 200ms */}
            <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
              <p className="font-mono text-lg sm:text-xl text-cyber-text/90 min-h-[2rem]">
                <span className="text-cyber-muted">$ ./me.py&nbsp;&nbsp;</span>
                <span className="text-cyber-cyan text-glow-cyan">{typedText}</span>
                <span className="animate-blink-cursor text-cyber-cyan">|</span>
              </p>
            </div>

            {/* Bio — animates in at 300ms */}
            <p
              className="text-cyber-text/70 max-w-xl text-base leading-relaxed animate-fade-up mx-auto lg:mx-0"
              style={{ animationDelay: '300ms' }}
            >
              Cybersecurity engineer &amp; Python automation developer based in{' '}
              <span className="text-cyber-cyan">Kolkata, India</span>. I build OSINT tools,
              security scanners, and creative YouTube automation pipelines.
              Passionate about open-source and writing about what I learn.
            </p>

            {/* Specialty tags — animates in at 380ms */}
            <div
              className="flex flex-wrap gap-2 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: '380ms' }}
            >
              {[
                { icon: Shield,  text: 'Ethical Hacking'    },
                { icon: Code2,   text: 'Python / OSINT'     },
                { icon: Youtube, text: 'YouTube Automation' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="tag-cyber flex items-center gap-1.5">
                  <Icon size={12} />
                  {text}
                </span>
              ))}
            </div>

            {/* CTA buttons — animates in at 460ms */}
            <div
              className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-up pt-2"
              style={{ animationDelay: '460ms' }}
            >
              <a href="/projects" className="btn-primary flex items-center gap-2">
                <Code2 size={15} />
                View Projects
              </a>
              <a
                href="https://github.com/your-github"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex items-center gap-2"
              >
                <ExternalLink size={14} />
                GitHub Profile
              </a>
            </div>

            {/* Stats row — animates in at 540ms */}
            <div
              className="flex gap-8 justify-center lg:justify-start pt-4 animate-fade-up border-t border-cyber-border"
              style={{ animationDelay: '540ms' }}
            >
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <p className="font-display font-bold text-2xl text-white text-glow-cyan">{value}</p>
                  <p className="font-mono text-xs text-cyber-muted mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column — Terminal Card (desktop only) ───────────── */}
          {/* Outer div fades in; inner div starts float only after mount  */}
          <div
            className="hidden lg:flex justify-center items-center flex-shrink-0 animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            {/* float animation deferred: applied only after first paint   */}
            <div className={mounted ? 'animate-float' : ''}>
              <TerminalCard />
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cyber-muted animate-bounce opacity-60 hover:opacity-100 transition-opacity">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ArrowDown size={14} />
      </div>

    </section>
  )
}