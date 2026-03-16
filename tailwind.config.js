/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Color Palette ────────────────────────────────────────────────────
      colors: {
        cyber: {
          black:  "#08080f",
          dark:   "#0d0d1a",
          border: "#1a1a2e",
          cyan:   "#00f5d4",
          purple: "#b14aed",
          pink:   "#ff2d78",
          yellow: "#ffd60a",
          muted:  "#4a4a6a",
          text:   "#c0c0d0",
        },
      },
      // ── Fonts ─────────────────────────────────────────────────────────────
      fontFamily: {
        display: ["'Syne'",          "system-ui", "sans-serif"],
        body:    ["'DM Sans'",       "system-ui", "sans-serif"],
        mono:    ["'JetBrains Mono'","ui-monospace", "monospace"],
      },
      // ── Keyframes ────────────────────────────────────────────────────────
      keyframes: {
        // Cursor blink
        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        // Decorative scan-line sweep (deferred in Hero)
        "scan-line": {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        // Glitch RGB-split layers (hover-triggered only)
        "glitch-1": {
          "0%, 100%": { clipPath: "inset(50% 0 30% 0)", transform: "translate(-4px, 0)" },
          "25%":      { clipPath: "inset(10% 0 60% 0)", transform: "translate(4px, 0)"  },
          "50%":      { clipPath: "inset(70% 0 10% 0)", transform: "translate(-4px, 0)" },
          "75%":      { clipPath: "inset(30% 0 50% 0)", transform: "translate(4px, 0)"  },
        },
        "glitch-2": {
          "0%, 100%": { clipPath: "inset(20% 0 60% 0)", transform: "translate(4px, 0)",  color: "#b14aed" },
          "33%":      { clipPath: "inset(60% 0 20% 0)", transform: "translate(-4px, 0)"               },
          "66%":      { clipPath: "inset(40% 0 40% 0)", transform: "translate(4px, 0)",  color: "#ff2d78" },
        },
        // Entrance — fade + slide up
        // animation-fill-mode:both ensures element stays at opacity:1 after
        // the animation ends (critical — without this elements disappear again
        // on some browsers after the keyframe completes)
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)"    },
        },
        // Dot/card glow pulse
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 8px 2px rgba(0,245,212,0.3)"  },
          "50%":      { boxShadow: "0 0 24px 6px rgba(0,245,212,0.5)" },
        },
        // Terminal card gentle float
        "float": {
          "0%, 100%": { transform: "translateY(0px)"  },
          "50%":      { transform: "translateY(-8px)" },
        },
      },
      // ── Animations ───────────────────────────────────────────────────────
      animation: {
        "blink-cursor": "blink-cursor 1s step-end infinite",
        "scan-line":    "scan-line 6s linear infinite",
        "glitch-1":     "glitch-1 0.4s infinite",
        "glitch-2":     "glitch-2 0.4s infinite",
        // fill-mode:both — element starts invisible (from) and stays visible
        // after the animation finishes (to). This replaces the old broken
        // pattern of setting inline opacity:0 on each element.
        "fade-up":      "fade-up 0.6s ease both",
        "glow-pulse":   "glow-pulse 2s ease-in-out infinite",
        "float":        "float 3s ease-in-out infinite",
      },
      // ── Shadows ──────────────────────────────────────────────────────────
      boxShadow: {
        "neon-cyan":   "0 0 20px 4px rgba(0, 245, 212, 0.3)",
        "neon-purple": "0 0 20px 4px rgba(177, 74, 237, 0.3)",
        "neon-pink":   "0 0 20px 4px rgba(255, 45, 120, 0.3)",
        "card":        "0 4px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
      },
      // ── Background helpers ────────────────────────────────────────────────
      backgroundImage: {
        "hero-radial": "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,245,212,0.08) 0%, transparent 70%)",
        "card-shine":  "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
}