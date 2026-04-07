import React, { useState, useCallback } from 'react'
import heroImg from './assets/hero.png'

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const isSameDay = (a, b) =>
  a && b && a.toDateString() === b.toDateString()

const isBetween = (date, start, end) => {
  if (!start || !end) return false
  const d = date.getTime()
  const s = start.getTime()
  const e = end.getTime()
  return d > Math.min(s, e) && d < Math.max(s, e)
}

const getDaysInMonth = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []

  for (let i = 0; i < firstDay.getDay(); i++) {
    const d = new Date(year, month, -firstDay.getDay() + i + 1)
    days.push({ date: d, currentMonth: false })
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

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [rangeStart, setRangeStart] = useState(null)
  const [rangeEnd, setRangeEnd] = useState(null)
  const [hoverDate, setHoverDate] = useState(null)
  const [notes, setNotes] = useState({})
  const [noteInput, setNoteInput] = useState('')
  const [selectedNoteDate, setSelectedNoteDate] = useState(null)
  const [monthNote, setMonthNote] = useState('')
  const [monthNotes, setMonthNotes] = useState({})

  const today = new Date()
  const days = getDaysInMonth(currentDate)
  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`

  const goToPrev = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  const goToNext = () =>
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))

  const handleDayClick = useCallback((date, isCurrentMonth) => {
    if (!isCurrentMonth) return
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date)
      setRangeEnd(null)
      setSelectedNoteDate(date)
      setNoteInput(notes[date.toDateString()] || '')
    } else {
      if (date.getTime() === rangeStart.getTime()) {
        setRangeStart(null)
        return
      }
      setRangeEnd(date)
      setSelectedNoteDate(date)
      setNoteInput(notes[date.toDateString()] || '')
    }
  }, [rangeStart, rangeEnd, notes])

  const saveNote = () => {
    if (!selectedNoteDate) return
    setNotes(prev => ({ ...prev, [selectedNoteDate.toDateString()]: noteInput }))
  }

  const saveMonthNote = () => {
    setMonthNotes(prev => ({ ...prev, [monthKey]: monthNote }))
  }

  const getDayClass = (day) => {
    const { date, currentMonth } = day
    const isToday = isSameDay(date, today)
    const isStart = isSameDay(date, rangeStart)
    const isEnd = isSameDay(date, rangeEnd)
    const effectiveEnd = rangeEnd || hoverDate
    const inRange = currentMonth && isBetween(date, rangeStart, effectiveEnd)
    const isSelected = isSameDay(date, selectedNoteDate)
    const hasNote = !!notes[date.toDateString()]

    let cls = 'day-cell'
    if (!currentMonth) cls += ' day-other'
    else cls += ' day-current'
    if (isToday) cls += ' day-today'
    if (isStart) cls += ' day-range-start'
    if (isEnd) cls += ' day-range-end'
    if (inRange) cls += ' day-in-range'
    if (isSelected && !isStart && !isEnd) cls += ' day-selected'
    if (hasNote && currentMonth) cls += ' day-has-note'
    return cls
  }

  const rangeLabel = () => {
    if (!rangeStart) return 'Click a date to start selection'
    if (!rangeEnd) return `From: ${formatDate(rangeStart)} — click end date`
    const start = rangeStart < rangeEnd ? rangeStart : rangeEnd
    const end = rangeStart < rangeEnd ? rangeEnd : rangeStart
    const diff = Math.round((end - start) / 86400000)
    return `${formatDate(start)} → ${formatDate(end)}  (${diff} day${diff !== 1 ? 's' : ''})`
  }

  return (
    <div className="app-wrapper">
      <div className="calendar-card">

        {/* Hero Image */}
        <div className="hero-section">
          <img src={heroImg} alt="Calendar hero" className="hero-img" />
          <div className="hero-overlay">
            <span className="hero-month-label">
              {currentDate.toLocaleString('default', { month: 'long' })}
            </span>
            <span className="hero-year-label">
              {currentDate.getFullYear()}
            </span>
          </div>
        </div>

        {/* Main content: calendar + notes side by side on desktop */}
        <div className="content-area">

          {/* Calendar Panel */}
          <div className="calendar-panel">

            {/* Month navigation */}
            <div className="month-nav">
              <button className="nav-btn" onClick={goToPrev} aria-label="Previous month">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <h2 className="month-title">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <button className="nav-btn" onClick={goToNext} aria-label="Next month">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="days-header">
              {DAYS_OF_WEEK.map(d => (
                <div key={d} className="day-header">{d}</div>
              ))}
            </div>

            {/* Day grid */}
            <div className="days-grid">
              {days.map((day, i) => (
                <button
                  key={i}
                  className={getDayClass(day)}
                  onClick={() => handleDayClick(day.date, day.currentMonth)}
                  onMouseEnter={() => rangeStart && !rangeEnd && day.currentMonth && setHoverDate(day.date)}
                  onMouseLeave={() => setHoverDate(null)}
                  disabled={!day.currentMonth}
                  aria-label={day.date.toDateString()}
                >
                  <span className="day-number">{day.date.getDate()}</span>
                  {notes[day.date.toDateString()] && day.currentMonth && (
                    <span className="note-dot" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>

            {/* Range indicator */}
            <div className="range-bar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>{rangeLabel()}</span>
              {(rangeStart || rangeEnd) && (
                <button className="clear-btn" onClick={() => { setRangeStart(null); setRangeEnd(null) }}>Clear</button>
              )}
            </div>
          </div>

          {/* Notes Panel */}
          <div className="notes-panel">
            <div className="notes-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
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
                value={monthNotes[monthKey] || monthNote}
                onChange={e => setMonthNote(e.target.value)}
              />
              <button className="save-btn" onClick={saveMonthNote}>Save Memo</button>
            </div>

            {/* Date-specific note */}
            <div className="note-section">
              <label className="note-label">
                {selectedNoteDate
                  ? `Note for ${formatDate(selectedNoteDate)}`
                  : 'Select a date to add a note'}
              </label>
              <textarea
                className="note-textarea"
                rows={4}
                placeholder={selectedNoteDate ? 'Write a note for this date…' : 'Click any date on the calendar…'}
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                disabled={!selectedNoteDate}
              />
              <button className="save-btn" onClick={saveNote} disabled={!selectedNoteDate}>
                Save Note
              </button>
            </div>

            {/* Saved notes list */}
            {Object.keys(notes).length > 0 && (
              <div className="saved-notes">
                <p className="saved-notes-title">Saved Notes</p>
                <ul className="saved-notes-list">
                  {Object.entries(notes)
                    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
                    .map(([dateStr, text]) => (
                      <li key={dateStr} className="saved-note-item">
                        <button
                          className="saved-note-date"
                          onClick={() => {
                            const d = new Date(dateStr)
                            setSelectedNoteDate(d)
                            setNoteInput(text)
                          }}
                        >
                          {new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </button>
                        <span className="saved-note-text">{text}</span>
                        <button
                          className="delete-note-btn"
                          onClick={() => setNotes(prev => {
                            const n = { ...prev }
                            delete n[dateStr]
                            return n
                          })}
                          aria-label="Delete note"
                        >×</button>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
