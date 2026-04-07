import React, { useState, useCallback, useEffect, useRef } from 'react'
import heroImg from './assets/hero.png'
import { getHolidaysForYear } from './holidays'
import { THEMES, applyTheme } from './themes'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const MOODS = ['😊', '😔', '🔥', '😴', '🎉', '💪', '😤', '🌧️']

const isSameDay = (a, b) => a && b && a.toDateString() === b.toDateString()

const isBetween = (date, start, end) => {
  if (!start || !end) return false
  const d = date.getTime()
  return d > Math.min(start.getTime(), end.getTime()) && d < Math.max(start.getTime(), end.getTime())
}

const getDaysInMonth = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push({ date: new Date(year, month, -firstDay.getDay() + i + 1), currentMonth: false })
  }
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({ date: new Date(year, month, i), currentMonth: true })
  }
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: new Date(year, month + 1, i), currentMonth: false })
  }
  return days
}

const formatDate = (date) =>
  date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

// Confetti burst
function spawnConfetti(x, y) {
  const colors = ['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6']
  for (let i = 0; i < 28; i++) {
    const el = document.createElement('span')
    el.className = 'confetti-piece'
    el.style.cssText = `
      left:${x}px; top:${y}px;
      background:${colors[i % colors.length]};
      --dx:${(Math.random() - .5) * 160}px;
      --dy:${-(Math.random() * 120 + 60)}px;
      --rot:${Math.random() * 720}deg;
      width:${Math.random() * 6 + 4}px;
      height:${Math.random() * 6 + 4}px;
      border-radius:${Math.random() > .5 ? '50%' : '2px'};
    `
    document.body.appendChild(el)
    el.addEventListener('animationend', () => el.remove())
  }
}

export default function App() {
  const [currentDate, setCurrentDate]     = useState(new Date())
  const [flipDir, setFlipDir]             = useState(null)   // 'left' | 'right'
  const [isFlipping, setIsFlipping]       = useState(false)
  const [rangeStart, setRangeStart]       = useState(null)
  const [rangeEnd, setRangeEnd]           = useState(null)
  const [hoverDate, setHoverDate]         = useState(null)
  const [notes, setNotes]                 = useState({})
  const [noteInput, setNoteInput]         = useState('')
  const [selectedNoteDate, setSelectedNoteDate] = useState(null)
  const [monthNotes, setMonthNotes]       = useState({})
  const [monthNoteInput, setMonthNoteInput] = useState('')
  const [moods, setMoods]                 = useState({})
  const [moodPickerDate, setMoodPickerDate] = useState(null)
  const [themeKey, setThemeKey]           = useState('midnight')
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [showHolidays, setShowHolidays]   = useState(true)
  const themePickerRef                    = useRef(null)

  const today    = new Date()
  const days     = getDaysInMonth(currentDate)
  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`
  const holidays = getHolidaysForYear(currentDate.getFullYear())

  // Apply theme on change
  useEffect(() => {
    applyTheme(THEMES[themeKey])
  }, [themeKey])

  // Sync month note input when month changes
  useEffect(() => {
    setMonthNoteInput(monthNotes[monthKey] || '')
  }, [monthKey])

  // Close theme picker on outside click
  useEffect(() => {
    const handler = (e) => {
      if (themePickerRef.current && !themePickerRef.current.contains(e.target))
        setShowThemePicker(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navigate = (dir) => {
    if (isFlipping) return
    setFlipDir(dir)
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentDate(prev =>
        new Date(prev.getFullYear(), prev.getMonth() + (dir === 'right' ? 1 : -1), 1)
      )
      setIsFlipping(false)
      setFlipDir(null)
    }, 320)
  }

  const handleDayClick = useCallback((date, isCurrentMonth, e) => {
    if (!isCurrentMonth) return

    // Confetti on today
    if (isSameDay(date, today)) {
      const rect = e.currentTarget.getBoundingClientRect()
      spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2)
    }

    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date); setRangeEnd(null)
      setSelectedNoteDate(date)
      setNoteInput(notes[date.toDateString()] || '')
    } else {
      if (date.getTime() === rangeStart.getTime()) { setRangeStart(null); return }
      setRangeEnd(date)
      setSelectedNoteDate(date)
      setNoteInput(notes[date.toDateString()] || '')
    }
  }, [rangeStart, rangeEnd, notes, today])

  const handleDayRightClick = (e, date, isCurrentMonth) => {
    if (!isCurrentMonth) return
    e.preventDefault()
    setMoodPickerDate(isSameDay(date, moodPickerDate) ? null : date)
  }

  const setMood = (date, emoji) => {
    setMoods(prev => ({ ...prev, [date.toDateString()]: emoji }))
    setMoodPickerDate(null)
  }

  const saveNote = () => {
    if (!selectedNoteDate) return
    setNotes(prev => ({ ...prev, [selectedNoteDate.toDateString()]: noteInput }))
  }

  const saveMonthNote = () => {
    setMonthNotes(prev => ({ ...prev, [monthKey]: monthNoteInput }))
  }

  const getDayClass = (day) => {
    const { date, currentMonth } = day
    const isToday   = isSameDay(date, today)
    const isStart   = isSameDay(date, rangeStart)
    const isEnd     = isSameDay(date, rangeEnd)
    const inRange   = currentMonth && isBetween(date, rangeStart, rangeEnd || hoverDate)
    const isSelected = isSameDay(date, selectedNoteDate)
    const hasNote   = !!notes[date.toDateString()]
    let cls = 'day-cell'
    if (!currentMonth) cls += ' day-other'
    else cls += ' day-current'
    if (isToday)    cls += ' day-today'
    if (isStart)    cls += ' day-range-start'
    if (isEnd)      cls += ' day-range-end'
    if (inRange)    cls += ' day-in-range'
    if (isSelected && !isStart && !isEnd) cls += ' day-selected'
    if (hasNote && currentMonth) cls += ' day-has-note'
    return cls
  }

  const rangeLabel = () => {
    if (!rangeStart) return 'Click a date to start selection'
    if (!rangeEnd)   return `From: ${formatDate(rangeStart)} — click end date`
    const s = rangeStart < rangeEnd ? rangeStart : rangeEnd
    const e = rangeStart < rangeEnd ? rangeEnd   : rangeStart
    const diff = Math.round((e - s) / 86400000)
    return `${formatDate(s)} → ${formatDate(e)}  (${diff} day${diff !== 1 ? 's' : ''})`
  }

  const holidayKey = (date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

  return (
    <div className="app-wrapper" onClick={() => setMoodPickerDate(null)}>
      <div className="calendar-card">

        {/* ── Hero ── */}
        <div className="hero-section">
          <img src={heroImg} alt="Calendar hero" className="hero-img" />
          <div className="hero-overlay">
            <div className="hero-text">
              <span className="hero-month-label">
                {currentDate.toLocaleString('default', { month: 'long' })}
              </span>
              <span className="hero-year-label">{currentDate.getFullYear()}</span>
            </div>
            {/* Theme switcher */}
            <div className="theme-switcher" ref={themePickerRef} onClick={e => e.stopPropagation()}>
              <button
                className="theme-toggle-btn"
                onClick={() => setShowThemePicker(p => !p)}
                title="Switch theme"
              >
                {THEMES[themeKey].emoji} Theme
              </button>
              {showThemePicker && (
                <div className="theme-dropdown">
                  {Object.entries(THEMES).map(([key, t]) => (
                    <button
                      key={key}
                      className={`theme-option ${themeKey === key ? 'active' : ''}`}
                      onClick={() => { setThemeKey(key); setShowThemePicker(false) }}
                    >
                      <span>{t.emoji}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="content-area">

          {/* ── Calendar Panel ── */}
          <div className="calendar-panel">

            {/* Month nav */}
            <div className="month-nav">
              <button className="nav-btn" onClick={() => navigate('left')} aria-label="Previous month">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <h2 className="month-title">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <button className="nav-btn" onClick={() => navigate('right')} aria-label="Next month">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>

            {/* Toolbar */}
            <div className="calendar-toolbar">
              <button
                className={`toolbar-btn ${showHolidays ? 'active' : ''}`}
                onClick={() => setShowHolidays(p => !p)}
              >
                🎉 Holidays
              </button>
              <button
                className="toolbar-btn"
                onClick={() => setCurrentDate(new Date())}
              >
                📍 Today
              </button>
              <span className="toolbar-hint">Right-click a day to set mood</span>
            </div>

            {/* Day headers */}
            <div className="days-header">
              {DAYS_OF_WEEK.map(d => (
                <div key={d} className="day-header">{d}</div>
              ))}
            </div>

            {/* Day grid with flip animation */}
            <div className={`days-grid-wrapper ${isFlipping ? `flip-${flipDir}` : ''}`}>
              <div className="days-grid">
                {days.map((day, i) => {
                  const hk = holidayKey(day.date)
                  const holiday = showHolidays ? holidays[hk] : null
                  const mood = moods[day.date.toDateString()]
                  const isMoodTarget = isSameDay(day.date, moodPickerDate)
                  return (
                    <div key={i} className="day-cell-wrapper" onClick={e => e.stopPropagation()}>
                      <button
                        className={getDayClass(day)}
                        onClick={(e) => handleDayClick(day.date, day.currentMonth, e)}
                        onContextMenu={(e) => handleDayRightClick(e, day.date, day.currentMonth)}
                        onMouseEnter={() => rangeStart && !rangeEnd && day.currentMonth && setHoverDate(day.date)}
                        onMouseLeave={() => setHoverDate(null)}
                        disabled={!day.currentMonth}
                        aria-label={day.date.toDateString()}
                      >
                        {holiday && (
                          <span className="holiday-emoji" title={holiday.name}>{holiday.emoji}</span>
                        )}
                        <span className="day-number">{day.date.getDate()}</span>
                        {mood && <span className="mood-badge">{mood}</span>}
                        {notes[day.date.toDateString()] && day.currentMonth && (
                          <span className="note-dot" aria-hidden="true" />
                        )}
                      </button>

                      {/* Mood picker popover */}
                      {isMoodTarget && (
                        <div className="mood-picker" onClick={e => e.stopPropagation()}>
                          {MOODS.map(emoji => (
                            <button
                              key={emoji}
                              className="mood-emoji-btn"
                              onClick={() => setMood(day.date, emoji)}
                            >{emoji}</button>
                          ))}
                          {moods[day.date.toDateString()] && (
                            <button
                              className="mood-clear-btn"
                              onClick={() => { setMoods(p => { const n={...p}; delete n[day.date.toDateString()]; return n }); setMoodPickerDate(null) }}
                            >✕</button>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Range bar */}
            <div className="range-bar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>{rangeLabel()}</span>
              {(rangeStart || rangeEnd) && (
                <button className="clear-btn" onClick={() => { setRangeStart(null); setRangeEnd(null) }}>Clear</button>
              )}
            </div>
          </div>

          {/* ── Notes Panel ── */}
          <div className="notes-panel">
            <div className="notes-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              <h3>Notes</h3>
            </div>

            {/* Monthly memo */}
            <div className="note-section">
              <label className="note-label">
                Monthly Memo — {currentDate.toLocaleString('default', { month: 'long' })}
              </label>
              <textarea
                className="note-textarea"
                rows={3}
                placeholder="Jot down your plans for this month…"
                value={monthNoteInput}
                onChange={e => setMonthNoteInput(e.target.value)}
              />
              <button className="save-btn" onClick={saveMonthNote}>Save Memo</button>
            </div>

            {/* Date note */}
            <div className="note-section">
              <label className="note-label">
                {selectedNoteDate ? `Note for ${formatDate(selectedNoteDate)}` : 'Select a date to add a note'}
              </label>
              <textarea
                className="note-textarea"
                rows={4}
                placeholder={selectedNoteDate ? 'Write a note for this date…' : 'Click any date on the calendar…'}
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                disabled={!selectedNoteDate}
              />
              <button className="save-btn" onClick={saveNote} disabled={!selectedNoteDate}>Save Note</button>
            </div>

            {/* Saved notes */}
            {Object.keys(notes).length > 0 && (
              <div className="saved-notes">
                <p className="saved-notes-title">Saved Notes</p>
                <ul className="saved-notes-list">
                  {Object.entries(notes)
                    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
                    .map(([dateStr, text]) => (
                      <li key={dateStr} className="saved-note-item">
                        <button className="saved-note-date" onClick={() => {
                          setSelectedNoteDate(new Date(dateStr))
                          setNoteInput(text)
                        }}>
                          {new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </button>
                        <span className="saved-note-text">{text}</span>
                        <button className="delete-note-btn" onClick={() =>
                          setNotes(prev => { const n={...prev}; delete n[dateStr]; return n })
                        } aria-label="Delete note">×</button>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Holiday legend for current month */}
            {showHolidays && (() => {
              const monthHolidays = Object.entries(holidays).filter(([k]) => {
                const [y, m] = k.split('-').map(Number)
                return y === currentDate.getFullYear() && m === currentDate.getMonth() + 1
              })
              return monthHolidays.length > 0 ? (
                <div className="holiday-legend">
                  <p className="saved-notes-title">This Month's Holidays</p>
                  <ul className="holiday-list">
                    {monthHolidays.map(([k, h]) => {
                      const [,, d] = k.split('-')
                      return (
                        <li key={k} className="holiday-item">
                          <span className="holiday-item-emoji">{h.emoji}</span>
                          <span className="holiday-item-name">{h.name}</span>
                          <span className="holiday-item-day">
                            {currentDate.toLocaleString('default', { month: 'short' })} {d}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : null
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}
