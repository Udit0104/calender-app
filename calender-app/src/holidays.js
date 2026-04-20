// Indian Public Holidays
// Fixed Gregorian dates + hardcoded lunar/religious dates for 2024–2027
// Returns a map: "YYYY-M-D" -> { name, emoji }

// ── Fixed-date holidays (same every year) ──────────────────────────────────
const FIXED = [
  { month: 1,  day: 1,  name: "New Year's Day",        emoji: '🎆' },
  { month: 1,  day: 26, name: "Republic Day",           emoji: '🇮🇳' },
  { month: 4,  day: 14, name: "Dr. Ambedkar Jayanti",   emoji: '📘' },
  { month: 5,  day: 1,  name: "Labour Day",             emoji: '⚒️'  },
  { month: 8,  day: 15, name: "Independence Day",       emoji: '�🇳' },
  { month: 10, day: 2,  name: "Gandhi Jayanti",         emoji: '🕊️' },
  { month: 12, day: 25, name: "Christmas Day",          emoji: '🎄' },
]

// ── Lunar / religious holidays — dates shift each year ─────────────────────
// Sourced from official Govt. of India gazette & public holiday calendars.
// Covers 2024 – 2027. For years outside this range we fall back gracefully.
const VARIABLE = {
  2024: [
    { month: 1,  day: 14, name: 'Makar Sankranti',     emoji: '🪁' },
    { month: 1,  day: 22, name: 'Ram Mandir Pran Pratishtha', emoji: '🛕' },
    { month: 2,  day: 14, name: 'Basant Panchami',     emoji: '�' },
    { month: 3,  day: 8,  name: 'Maha Shivratri',      emoji: '🔱' },
    { month: 3,  day: 25, name: 'Holi',                emoji: '🎨' },
    { month: 3,  day: 29, name: 'Good Friday',         emoji: '✝️'  },
    { month: 4,  day: 9,  name: 'Ugadi / Gudi Padwa',  emoji: '🌅' },
    { month: 4,  day: 11, name: 'Id-ul-Fitr (Eid)',    emoji: '🌙' },
    { month: 4,  day: 17, name: 'Ram Navami',          emoji: '🛕' },
    { month: 4,  day: 21, name: 'Mahavir Jayanti',     emoji: '🙏' },
    { month: 4,  day: 23, name: 'Hanuman Jayanti',     emoji: '🐒' },
    { month: 5,  day: 23, name: 'Buddha Purnima',      emoji: '☸️'  },
    { month: 6,  day: 17, name: 'Eid ul-Adha',         emoji: '🌙' },
    { month: 7,  day: 17, name: 'Muharram',            emoji: '🌙' },
    { month: 8,  day: 19, name: 'Raksha Bandhan',      emoji: '🪢' },
    { month: 8,  day: 26, name: 'Janmashtami',         emoji: '🦚' },
    { month: 9,  day: 16, name: 'Milad-un-Nabi',       emoji: '🌙' },
    { month: 10, day: 2,  name: 'Gandhi Jayanti',      emoji: '🕊️' },
    { month: 10, day: 12, name: 'Dussehra',            emoji: '🏹' },
    { month: 10, day: 31, name: 'Halloween / Sardar Patel Jayanti', emoji: '🗓️' },
    { month: 11, day: 1,  name: 'Diwali',              emoji: '🪔' },
    { month: 11, day: 15, name: 'Guru Nanak Jayanti',  emoji: '🙏' },
  ],
  2025: [
    { month: 1,  day: 14, name: 'Makar Sankranti',     emoji: '🪁' },
    { month: 2,  day: 2,  name: 'Basant Panchami',     emoji: '🌼' },
    { month: 2,  day: 26, name: 'Maha Shivratri',      emoji: '🔱' },
    { month: 3,  day: 14, name: 'Holi',                emoji: '🎨' },
    { month: 3,  day: 30, name: 'Eid-ul-Fitr (Eid)',   emoji: '🌙' },
    { month: 4,  day: 6,  name: 'Ugadi / Gudi Padwa',  emoji: '🌅' },
    { month: 4,  day: 10, name: 'Ram Navami',          emoji: '🛕' },
    { month: 4,  day: 14, name: 'Dr. Ambedkar Jayanti',emoji: '📘' },
    { month: 4,  day: 18, name: 'Good Friday',         emoji: '✝️'  },
    { month: 4,  day: 10, name: 'Mahavir Jayanti',     emoji: '🙏' },
    { month: 5,  day: 12, name: 'Buddha Purnima',      emoji: '☸️'  },
    { month: 6,  day: 7,  name: 'Eid ul-Adha',         emoji: '🌙' },
    { month: 7,  day: 6,  name: 'Muharram',            emoji: '🌙' },
    { month: 8,  day: 9,  name: 'Raksha Bandhan',      emoji: '🪢' },
    { month: 8,  day: 16, name: 'Janmashtami',         emoji: '🦚' },
    { month: 9,  day: 5,  name: 'Milad-un-Nabi',       emoji: '🌙' },
    { month: 10, day: 2,  name: 'Dussehra',            emoji: '🏹' },
    { month: 10, day: 20, name: 'Diwali',              emoji: '🪔' },
    { month: 11, day: 5,  name: 'Guru Nanak Jayanti',  emoji: '🙏' },
  ],
  2026: [
    { month: 1,  day: 14, name: 'Makar Sankranti',     emoji: '🪁' },
    { month: 1,  day: 23, name: 'Basant Panchami',     emoji: '🌼' },
    { month: 2,  day: 15, name: 'Maha Shivratri',      emoji: '🔱' },
    { month: 3,  day: 3,  name: 'Holi',                emoji: '🎨' },
    { month: 3,  day: 20, name: 'Eid-ul-Fitr (Eid)',   emoji: '🌙' },
    { month: 3,  day: 27, name: 'Good Friday',         emoji: '✝️'  },
    { month: 3,  day: 28, name: 'Ugadi / Gudi Padwa',  emoji: '🌅' },
    { month: 3,  day: 30, name: 'Ram Navami',          emoji: '🛕' },
    { month: 4,  day: 14, name: 'Dr. Ambedkar Jayanti',emoji: '📘' },
    { month: 4,  day: 19, name: 'Mahavir Jayanti',     emoji: '🙏' },
    { month: 5,  day: 1,  name: 'Buddha Purnima',      emoji: '☸️'  },
    { month: 5,  day: 27, name: 'Eid ul-Adha',         emoji: '🌙' },
    { month: 6,  day: 26, name: 'Muharram',            emoji: '�' },
    { month: 8,  day: 28, name: 'Raksha Bandhan',      emoji: '🪢' },
    { month: 9,  day: 4,  name: 'Janmashtami',         emoji: '🦚' },
    { month: 9,  day: 25, name: 'Milad-un-Nabi',       emoji: '🌙' },
    { month: 10, day: 19, name: 'Dussehra',            emoji: '🏹' },
    { month: 11, day: 8,  name: 'Diwali',              emoji: '🪔' },
    { month: 11, day: 24, name: 'Guru Nanak Jayanti',  emoji: '�' },
  ],
  2027: [
    { month: 1,  day: 14, name: 'Makar Sankranti',     emoji: '🪁' },
    { month: 1,  day: 12, name: 'Basant Panchami',     emoji: '🌼' },
    { month: 2,  day: 4,  name: 'Maha Shivratri',      emoji: '🔱' },
    { month: 3,  day: 10, name: 'Eid-ul-Fitr (Eid)',   emoji: '🌙' },
    { month: 3,  day: 22, name: 'Holi',                emoji: '🎨' },
    { month: 3,  day: 26, name: 'Good Friday',         emoji: '✝️'  },
    { month: 4,  day: 14, name: 'Dr. Ambedkar Jayanti',emoji: '📘' },
    { month: 4,  day: 17, name: 'Ugadi / Gudi Padwa',  emoji: '🌅' },
    { month: 4,  day: 19, name: 'Ram Navami',          emoji: '🛕' },
    { month: 4,  day: 8,  name: 'Mahavir Jayanti',     emoji: '�' },
    { month: 5,  day: 20, name: 'Buddha Purnima',      emoji: '☸️'  },
    { month: 5,  day: 17, name: 'Eid ul-Adha',         emoji: '🌙' },
    { month: 6,  day: 15, name: 'Muharram',            emoji: '🌙' },
    { month: 8,  day: 17, name: 'Raksha Bandhan',      emoji: '🪢' },
    { month: 8,  day: 24, name: 'Janmashtami',         emoji: '🦚' },
    { month: 9,  day: 14, name: 'Milad-un-Nabi',       emoji: '🌙' },
    { month: 10, day: 8,  name: 'Dussehra',            emoji: '🏹' },
    { month: 10, day: 29, name: 'Diwali',              emoji: '🪔' },
    { month: 11, day: 13, name: 'Guru Nanak Jayanti',  emoji: '🙏' },
  ],
}

export function getHolidaysForYear(year) {
  const map = {}
  const key = (m, d) => `${year}-${m}-${d}`

  // Fixed holidays
  FIXED.forEach(({ month, day, name, emoji }) => {
    map[key(month, day)] = { name, emoji }
  })

  // Variable holidays for the year (fall back to 2025 if year not listed)
  const variable = VARIABLE[year] || VARIABLE[2025]
  variable.forEach(({ month, day, name, emoji }) => {
    map[key(month, day)] = { name, emoji }
  })

  return map
}
