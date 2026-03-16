// src/pages/PostPage.jsx — Single blog post renderer
//
// How it works:
//   1. Reads the :slug param from the URL (/blog/:slug)
//   2. Looks up the post metadata from posts.js
//   3. Dynamically imports the matching .md file from src/posts/
//   4. Renders it using react-markdown with syntax highlighting
//
// To add a post: create src/posts/<slug>.md and add metadata to posts.js.
// No config changes needed.

import React, { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { POSTS } from '../data/posts.js'

// Helper to format date
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default function PostPage() {
  const { slug } = useParams()
  const post = POSTS.find(p => p.slug === slug)

  const [content, setContent]   = useState('')
  const [loading, setLoading]   = useState(true)
  const [error,   setError]     = useState(false)

  // If no post metadata found, redirect to /blog (404 fallback)
  if (!post) return <Navigate to="/blog" replace />

  // Dynamically import the Markdown file for this slug
  useEffect(() => {
    setLoading(true)
    setError(false)

    // Vite's import.meta.glob lets us import all .md files lazily
    const modules = import.meta.glob('../posts/*.md', { as: 'raw' })
    const key = `../posts/${slug}.md`

    if (modules[key]) {
      modules[key]()
        .then(raw => { setContent(raw); setLoading(false) })
        .catch(() => { setError(true); setLoading(false) })
    } else {
      setError(true)
      setLoading(false)
    }
  }, [slug])

  // ── Custom renderers for react-markdown ─────────────────────────────────
  const components = {
    // Syntax-highlighted code blocks
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          customStyle={{
            background: '#0d0d1a',
            border: '1px solid #1a1a2e',
            borderRadius: '0.75rem',
            margin: '1.5rem 0',
            fontSize: '0.85rem',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>{children}</code>
      )
    },
  }

  return (
    <article className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-cyber-muted hover:text-cyber-cyan transition-colors mb-10"
        >
          <ArrowLeft size={13} /> Back to Blog
        </Link>

        {/* Post header */}
        <header className="mb-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map(tag => (
              <span key={tag} className="tag-cyber flex items-center gap-1 text-[11px]">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight mb-5">
            {post.title}
          </h1>

          <div className="flex items-center gap-5 font-mono text-xs text-cyber-muted">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {post.readTime}
            </span>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-cyber-cyan/40 via-cyber-border to-transparent mb-10" />

        {/* Post body */}
        {loading && (
          <div className="flex items-center gap-3 font-mono text-sm text-cyber-cyan py-12">
            <span className="dot-online" />
            Loading article<span className="animate-blink-cursor">_</span>
          </div>
        )}

        {error && (
          <div className="py-12 text-center">
            <p className="font-mono text-cyber-muted text-sm">
              Could not load this article. Make sure{' '}
              <code className="text-cyber-cyan">src/posts/{slug}.md</code> exists.
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="prose-cyber">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {content}
            </ReactMarkdown>
          </div>
        )}

      </div>
    </article>
  )
}