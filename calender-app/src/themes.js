export const THEMES = {
  midnight: {
    label: 'Midnight',
    emoji: '🌙',
    bg: '#0f0f1a',
    bgGrad1: 'rgba(99,102,241,.18)',
    bgGrad2: 'rgba(168,85,247,.14)',
    card: '#1a1b2e',
    accent1: '#6366f1',
    accent2: '#8b5cf6',
    accentRgb: '99,102,241',
    text: '#e2e8f0',
    textMuted: '#a5b4fc',
    border: 'rgba(255,255,255,.06)',
    heroFilter: 'brightness(.75) saturate(1.1)',
  },
  forest: {
    label: 'Forest',
    emoji: '🌿',
    bg: '#0d1a12',
    bgGrad1: 'rgba(34,197,94,.15)',
    bgGrad2: 'rgba(16,185,129,.12)',
    card: '#111f17',
    accent1: '#22c55e',
    accent2: '#10b981',
    accentRgb: '34,197,94',
    text: '#d1fae5',
    textMuted: '#6ee7b7',
    border: 'rgba(255,255,255,.06)',
    heroFilter: 'brightness(.7) saturate(1.3) hue-rotate(60deg)',
  },
  sunset: {
    label: 'Sunset',
    emoji: '🌅',
    bg: '#1a0f0a',
    bgGrad1: 'rgba(251,146,60,.18)',
    bgGrad2: 'rgba(239,68,68,.14)',
    card: '#1f1410',
    accent1: '#f97316',
    accent2: '#ef4444',
    accentRgb: '249,115,22',
    text: '#fef3c7',
    textMuted: '#fcd34d',
    border: 'rgba(255,255,255,.06)',
    heroFilter: 'brightness(.7) saturate(1.4) hue-rotate(-20deg)',
  },
  ocean: {
    label: 'Ocean',
    emoji: '🌊',
    bg: '#050f1a',
    bgGrad1: 'rgba(14,165,233,.18)',
    bgGrad2: 'rgba(6,182,212,.14)',
    card: '#0a1628',
    accent1: '#0ea5e9',
    accent2: '#06b6d4',
    accentRgb: '14,165,233',
    text: '#e0f2fe',
    textMuted: '#7dd3fc',
    border: 'rgba(255,255,255,.06)',
    heroFilter: 'brightness(.7) saturate(1.3) hue-rotate(180deg)',
  },
}

export function applyTheme(t) {
  const r = document.documentElement.style
  r.setProperty('--bg',         t.bg)
  r.setProperty('--bg-grad1',   t.bgGrad1)
  r.setProperty('--bg-grad2',   t.bgGrad2)
  r.setProperty('--card',       t.card)
  r.setProperty('--accent1',    t.accent1)
  r.setProperty('--accent2',    t.accent2)
  r.setProperty('--accent-rgb', t.accentRgb)
  r.setProperty('--text',       t.text)
  r.setProperty('--text-muted', t.textMuted)
  r.setProperty('--border',     t.border)
  r.setProperty('--hero-filter',t.heroFilter)
}
