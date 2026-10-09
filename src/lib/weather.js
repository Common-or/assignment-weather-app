// Doodle helpers: map Weatherstack conditions to a playful visual language.
// Keeps presentation logic out of components (brief: separation of concerns).

export function normalizeCondition(description = '', isDay = 'yes') {
  const d = description.toLowerCase()
  const night = isDay === 'no' || isDay === false
  if (/(thunder|storm|lightning)/.test(d)) return night ? 'storm-night' : 'storm'
  if (/(snow|blizzard|sleet|hail|ice)/.test(d)) return 'snow'
  if (/(rain|drizzle|shower|precip)/.test(d)) return night ? 'rain-night' : 'rain'
  if (/(fog|mist|haze|smoke|dust|sand)/.test(d)) return 'fog'
  if (/(overcast|cloudy)/.test(d)) return night ? 'cloudy-night' : 'cloudy'
  if (/(partly)/.test(d)) return night ? 'partly-night' : 'partly'
  if (/(sunny|clear)/.test(d)) return night ? 'clear-night' : 'sunny'
  return night ? 'partly-night' : 'partly'
}

export const CONDITION_META = {
  sunny: { emoji: '☀️', label: 'Sunny doodle', hero: ['#fbbf24', '#f97316', '#f43f5e'] },
  'clear-night': { emoji: '🌙', label: 'Clear night', hero: ['#1e1b4b', '#4c1d95', '#0ea5e9'] },
  partly: { emoji: '⛅', label: 'Partly cloudy', hero: ['#38bdf8', '#818cf8', '#fbbf24'] },
  'partly-night': { emoji: '☁️', label: 'Partly night', hero: ['#1e293b', '#475569', '#818cf8'] },
  cloudy: { emoji: '☁️', label: 'Cloudy', hero: ['#64748b', '#94a3b8', '#38bdf8'] },
  'cloudy-night': { emoji: '☁️', label: 'Cloudy night', hero: ['#0f172a', '#334155', '#64748b'] },
  rain: { emoji: '🌧️', label: 'Rainy', hero: ['#0ea5e9', '#2563eb', '#1e40af'] },
  'rain-night': { emoji: '🌧️', label: 'Rainy night', hero: ['#0c4a6e', '#1e3a8a', '#0f172a'] },
  storm: { emoji: '⛈️', label: 'Stormy', hero: ['#7c3aed', '#4c1d95', '#1e1b4b'] },
  'storm-night': { emoji: '⛈️', label: 'Stormy night', hero: ['#1e1b4b', '#312e81', '#0f172a'] },
  snow: { emoji: '❄️', label: 'Snowy', hero: ['#7dd3fc', '#bae6fd', '#f0f9ff'] },
  fog: { emoji: '🌫️', label: 'Foggy', hero: ['#a8a29e', '#d6d3d1', '#e7e5e4'] },
}

export function humanSummary(data) {
  if (!data) return ''
  const { temperature, feelslike, description, humidity, windSpeed } = data
  const bits = []
  if (description) bits.push(description.toLowerCase())
  if (typeof temperature === 'number') {
    if (temperature >= 30) bits.push('crayon-melting hot — find shade and water')
    else if (temperature >= 22) bits.push('warm and smiley — perfect for outside')
    else if (temperature >= 14) bits.push('cosy sweater weather')
    else if (temperature >= 5) bits.push('chilly — draw a scarf on')
    else bits.push('brrr — hot chocolate weather')
  }
  if (typeof feelslike === 'number' && typeof temperature === 'number' && Math.abs(feelslike - temperature) >= 3) {
    bits.push(`feels more like ${Math.round(feelslike)}°`)
  }
  if (typeof humidity === 'number' && humidity >= 80) bits.push('sticky air')
  if (typeof windSpeed === 'number' && windSpeed >= 30) bits.push('windy — hold your drawing')
  return bits.length ? `It's ${bits.join(', ')}. ` : ''
}

export function uvLabel(uv) {
  if (uv == null) return '—'
  if (uv <= 2) return 'Low'
  if (uv <= 5) return 'Moderate'
  if (uv <= 7) return 'High'
  if (uv <= 10) return 'Very high'
  return 'Extreme'
}

export function windCompass(deg) {
  if (deg == null) return '—'
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  return dirs[Math.round(deg / 22.5) % 16]
}

export function formatLocalTime(localtime) {
  if (!localtime) return '—'
  try {
    const d = new Date(localtime.replace(' ', 'T'))
    if (Number.isNaN(d.getTime())) return localtime
    return d.toLocaleString(undefined, { weekday: 'short', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })
  } catch {
    return localtime
  }
}
