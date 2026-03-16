// src/components/About.jsx — About Me section
//
// Layout: Left column = photo + fun facts | Right column = bio + skills + tech stack
//
// To customise:
//  • Replace PROFILE_PHOTO with your actual image URL or local path
//  • Edit BIO_LINES, SKILLS, TECH_STACK, FUN_FACTS with your own info
//  • Skills percentage = your honest self-rating (0–100)

import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'
// import profilePhoto from '../assets/sky.jpg'
import {
  User, MapPin, Calendar, Coffee, Terminal,
  BookOpen, Music, Gamepad2, ChevronRight
} from 'lucide-react'

// ── Edit these ────────────────────────────────────────────────────────────────

// Replace with your photo URL. For local file: put image in /public/ and use '/your-photo.jpg'
 const PROFILE_PHOTO = '/sky.jpg' // Public folder ki files direct '/' se access hoti hain // Set to your image URL e.g. '/me.jpg' or 'https://...'

// Short bio — each string is one paragraph
const BIO_LINES = [
  "I'm a Cybersecurity engineer and Python automation developer from Kolkata, India. I build tools that make security accessible and automation seamless.",
  "Currently focused on OSINT tooling, threat intelligence systems, and building a fully automated YouTube content pipeline using AI. I love open-source and writing about what I learn.",
]

// Skills with percentage (your honest self-rating)
const SKILLS = [
  { name: 'Python',         percent: 85, color: 'cyan'   },
  { name: 'Cybersecurity',  percent: 75, color: 'purple' },
  { name: 'React / JS',     percent: 70, color: 'cyan'   },
  { name: 'Linux / Bash',   percent: 80, color: 'purple' },
  { name: 'OSINT',          percent: 78, color: 'cyan'   },
  { name: 'Automation',     percent: 82, color: 'purple' },
]

// Tech stack icons — uses devicons CDN (free, no install needed)
// Full list: https://devicons.github.io/devicon/
const TECH_STACK = [
  { name: 'Python',     icon: 'python'     },
  { name: 'React',      icon: 'react'      },
  { name: 'Linux',      icon: 'linux'      },
  { name: 'Git',        icon: 'git'        },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'Tailwind',   icon: 'tailwindcss'},
  { name: 'VS Code',    icon: 'vscode'     },
  { name: 'Bash',       icon: 'bash'       },
]

// Fun facts — keep them short and personal
const FUN_FACTS = [
  { icon: Coffee,   text: 'Runs on chai, not coffee' },
  { icon: Terminal, text: 'Has 200+ starred GitHub repos' },
  { icon: BookOpen, text: 'Reads 1 tech blog daily' },
  { icon: Music,    text: 'Codes better with lo-fi music' },
  { icon: Gamepad2, text: 'CTF challenges on weekends' },
]

// ── Skill Bar ─────────────────────────────────────────────────────────────────
function SkillBar({ name, percent, color, animate }) {
  const colorMap = {
    cyan:   { bar: 'bg-cyber-cyan',   text: 'text-cyber-cyan',   glow: 'shadow-neon-cyan'   },
    purple: { bar: 'bg-cyber-purple', text: 'text-cyber-purple', glow: 'shadow-neon-purple' },
  }
  const c = colorMap[color] || colorMap.cyan

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs text-cyber-text">{name}</span>
        <span className={`font-mono text-xs font-medium ${c.text}`}>{percent}%</span>
      </div>
      {/* Track */}
      <div className="h-1.5 bg-cyber-border rounded-full overflow-hidden">
        {/* Fill — animates width from 0 to percent when in view */}
        <div
          className={`h-full ${c.bar} rounded-full transition-all duration-1000 ease-out`}
          style={{
            width: animate ? `${percent}%` : '0%',
            boxShadow: animate ? `0 0 8px currentColor` : 'none',
          }}
        />
      </div>
    </div>
  )
}

// ── Tech Icon ─────────────────────────────────────────────────────────────────
function TechIcon({ name, icon }) {
  return (
    <div className="
      flex flex-col items-center gap-2 p-3 rounded-xl
      bg-cyber-dark border border-cyber-border
      hover:border-cyber-cyan/40 hover:shadow-neon-cyan
      transition-all duration-300 cursor-default group
    ">
      {/* Devicon — loaded from CDN, no install needed */}
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`}
        alt={name}
        width={32}
        height={32}
        loading="lazy"
        className="opacity-70 group-hover:opacity-100 transition-opacity"
        onError={e => {
          // Fallback: show first letter if icon fails to load
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
      />
      {/* Fallback div (hidden by default) */}
      <div
        className="w-8 h-8 rounded-lg bg-cyber-cyan/10 items-center justify-center font-mono text-cyber-cyan text-sm font-bold hidden"
      >
        {name[0]}
      </div>
      <span className="font-mono text-[10px] text-cyber-muted group-hover:text-cyber-text transition-colors">
        {name}
      </span>
    </div>
  )
}

// ── About Section ─────────────────────────────────────────────────────────────
export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-14">
          <p className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase mb-3">
            // 01 — who I am
          </p>
          <h2 className="section-title text-3xl sm:text-4xl">About Me</h2>
        </div>

        {/* Main grid: Left photo col + Right content col */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* ── LEFT COLUMN (2/5 width on desktop) ─────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Profile Photo */}
            <div
              className={`
                relative rounded-2xl overflow-hidden border border-cyber-border
                transition-all duration-700
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              {PROFILE_PHOTO ? (
                /* Your actual photo */
                <img
                  src={PROFILE_PHOTO}
                  alt="Profile photo"
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              ) : (
                /* Placeholder avatar when no photo is set */
                <div className="w-full aspect-square bg-cyber-dark flex flex-col items-center justify-center gap-4 relative">
                  {/* Neon circle avatar */}
                  <div className="w-28 h-28 rounded-full border-2 border-cyber-cyan/50 shadow-neon-cyan flex items-center justify-center bg-cyber-cyan/5">
                    <User size={52} className="text-cyber-cyan/60" />
                  </div>
                  {/* Replace prompt */}
                  <p className="font-mono text-xs text-cyber-muted text-center px-4">
                    Set <span className="text-cyber-cyan">PROFILE_PHOTO</span> in<br/>
                    <span className="text-cyber-cyan">About.jsx</span> to show your photo
                  </p>
                  {/* Decorative corner brackets */}
                  <span className="absolute top-4 left-4 text-cyber-cyan/20 font-mono text-lg leading-none">[</span>
                  <span className="absolute top-4 right-4 text-cyber-cyan/20 font-mono text-lg leading-none">]</span>
                  <span className="absolute bottom-4 left-4 text-cyber-cyan/20 font-mono text-lg leading-none">]</span>
                  <span className="absolute bottom-4 right-4 text-cyber-cyan/20 font-mono text-lg leading-none">[</span>
                </div>
              )}

              {/* Neon bottom accent */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink" />
            </div>

            {/* Quick info card */}
            <div
              className={`
                card-cyber p-5 space-y-3
                transition-all duration-700 delay-100
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              {[
                { icon: User,     text: 'SKY'              },
                { icon: MapPin,   text: 'Kolkata, India'   },
                { icon: Calendar, text: 'Available for work'},
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 font-mono text-xs">
                  <Icon size={13} className="text-cyber-cyan shrink-0" />
                  <span className="text-cyber-text">{text}</span>
                </div>
              ))}
            </div>

            {/* Fun Facts */}
            <div
              className={`
                card-cyber p-5
                transition-all duration-700 delay-200
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <p className="font-mono text-xs text-cyber-cyan mb-4 tracking-wider uppercase">
                // fun facts
              </p>
              <ul className="space-y-3">
                {FUN_FACTS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 group">
                    <ChevronRight size={12} className="text-cyber-cyan shrink-0" />
                    <Icon size={13} className="text-cyber-purple shrink-0" />
                    <span className="font-mono text-xs text-cyber-text/80 group-hover:text-cyber-text transition-colors">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── RIGHT COLUMN (3/5 width on desktop) ────────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-8">

            {/* Bio */}
            <div
              className={`
                transition-all duration-700
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center">
                  <Terminal size={14} className="text-cyber-cyan" />
                </div>
                <h3 className="font-display font-bold text-white text-lg">Hello, World!</h3>
              </div>
              <div className="space-y-4">
                {BIO_LINES.map((line, i) => (
                  <p key={i} className="text-cyber-text/75 text-sm leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div
              className={`
                card-cyber p-6
                transition-all duration-700 delay-100
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <p className="font-mono text-xs text-cyber-cyan mb-5 tracking-wider uppercase">
                // skill levels
              </p>
              <div className="space-y-4">
                {SKILLS.map(skill => (
                  <SkillBar key={skill.name} {...skill} animate={inView} />
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div
              className={`
                transition-all duration-700 delay-200
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <p className="font-mono text-xs text-cyber-cyan mb-4 tracking-wider uppercase">
                // tech stack
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {TECH_STACK.map(tech => (
                  <TechIcon key={tech.name} {...tech} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}