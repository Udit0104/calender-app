// US Public Holidays — fixed-date + computed floating ones
// Returns a map: "YYYY-M-D" -> { name, emoji }

const fixed = [
  { month: 1,  day: 1,  name: "New Year's Day",    emoji: '🎆' },
  { month: 2,  day: 14, name: "Valentine's Day",    emoji: '❤️' },
  { month: 3,  day: 17, name: "St. Patrick's Day",  emoji: '🍀' },
  { month: 7,  day: 4,  name: "Independence Day",   emoji: '🎇' },
  { month: 10, day: 31, name: "Halloween",           emoji: '🎃' },
  { month: 11, day: 11, name: "Veterans Day",        emoji: '🎖️' },
  { month: 12, day: 25, name: "Christmas Day",       emoji: '🎄' },
  { month: 12, day: 31, name: "New Year's Eve",      emoji: '🥂' },
]

// nth weekday of a month: nthWeekday(year, month(1-based), weekday(0=Sun), n(1-based))
function nthWeekday(year, month, weekday, n) {
  const d = new Date(year, month - 1, 1)
  let count = 0
  while (d.getMonth() === month - 1) {
    if (d.getDay() === weekday) { count++; if (count === n) return d.getDate() }
    d.setDate(d.getDate() + 1)
  }
  return null
}

// Last weekday of a month
function lastWeekday(year, month, weekday) {
  const d = new Date(year, month, 0) // last day of month
  while (d.getDay() !== weekday) d.setDate(d.getDate() - 1)
  return d.getDate()
}

export function getHolidaysForYear(year) {
  const map = {}
  const key = (m, d) => `${year}-${m}-${d}`

  // Fixed holidays
  fixed.forEach(({ month, day, name, emoji }) => {
    map[key(month, day)] = { name, emoji }
  })

  // MLK Day: 3rd Monday of January
  map[key(1, nthWeekday(year, 1, 1, 3))] = { name: "MLK Day", emoji: '✊' }

  // Presidents' Day: 3rd Monday of February
  map[key(2, nthWeekday(year, 2, 1, 3))] = { name: "Presidents' Day", emoji: '🏛️' }

  // Mother's Day: 2nd Sunday of May
  map[key(5, nthWeekday(year, 5, 0, 2))] = { name: "Mother's Day", emoji: '💐' }

  // Memorial Day: last Monday of May
  map[key(5, lastWeekday(year, 5, 1))] = { name: "Memorial Day", emoji: '🪖' }

  // Father's Day: 3rd Sunday of June
  map[key(6, nthWeekday(year, 6, 0, 3))] = { name: "Father's Day", emoji: '👔' }

  // Labor Day: 1st Monday of September
  map[key(9, nthWeekday(year, 9, 1, 1))] = { name: "Labor Day", emoji: '⚒️' }

  // Columbus Day: 2nd Monday of October
  map[key(10, nthWeekday(year, 10, 1, 2))] = { name: "Columbus Day", emoji: '⛵' }

  // Thanksgiving: 4th Thursday of November
  map[key(11, nthWeekday(year, 11, 4, 4))] = { name: "Thanksgiving", emoji: '🦃' }

  return map
}
