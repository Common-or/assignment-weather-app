// Service layer — all Weatherstack communication lives here.
// Components never fetch directly (brief: separation of concerns).

const BASE_URL = 'https://api.weatherstack.com/current'

function getApiKey() {
  return import.meta.env.VITE_WEATHER_API_KEY?.trim() || ''
}

export class WeatherApiError extends Error {
  constructor(message, { kind = 'api', code = null } = {}) {
    super(message)
    this.name = 'WeatherApiError'
    this.kind = kind // 'missing-key' | 'not-found' | 'limit' | 'https' | 'network' | 'api'
    this.code = code
  }
}

function mapApiError(payload) {
  const err = payload?.error
  if (!err) return null
  const code = err.code
  // Weatherstack docs: 101 invalid key, 104 usage limit, 105 https restricted (free plan),
  // 601/602/615 request failed / invalid query / ... treat 615-ish as not found
  if (code === 101) {
    return new WeatherApiError('That API key looks invalid. Check VITE_WEATHER_API_KEY in your .env.', { kind: 'missing-key', code })
  }
  if (code === 104) {
    return new WeatherApiError('Monthly request limit reached (free plan ≈ 100 calls). Wait or upgrade the key.', { kind: 'limit', code })
  }
  if (code === 105) {
    return new WeatherApiError('This free key only allows HTTP, but the app uses HTTPS. Upgrade the key or proxy the request.', { kind: 'https', code })
  }
  if (code === 601 || code === 602 || code === 615 || code === 616) {
    return new WeatherApiError("We couldn't find weather for this location. Try another city spelling.", { kind: 'not-found', code })
  }
  return new WeatherApiError(err.info || 'The weather service returned an error. Try again.', { kind: 'api', code })
}

export function normalizePayload(payload) {
  const loc = payload.location || {}
  const cur = payload.current || {}
  const description = cur.weather_descriptions?.[0] || '—'
  return {
    rawQuery: payload.request?.query || '',
    city: loc.name || '—',
    region: loc.region || '',
    country: loc.country || '—',
    lat: loc.lat != null ? Number(loc.lat) : null,
    lon: loc.lon != null ? Number(loc.lon) : null,
    localtime: loc.localtime || '',
    timezone: loc.timezone_id || '',
    temperature: cur.temperature ?? null,
    feelslike: cur.feelslike ?? null,
    description,
    icon: cur.weather_icons?.[0] || '',
    humidity: cur.humidity ?? null,
    windSpeed: cur.wind_speed ?? null,
    windDir: cur.wind_dir || '—',
    windDegree: cur.wind_degree ?? null,
    pressure: cur.pressure ?? null,
    visibility: cur.visibility ?? null,
    uv: cur.uv_index ?? null,
    cloudcover: cur.cloudcover ?? null,
    isDay: cur.is_day || 'yes',
    precip: cur.precip ?? null,
  }
}

export async function fetchCurrentWeather(query, { signal } = {}) {
  const key = getApiKey()
  if (!key) {
    throw new WeatherApiError('Missing API key. Add VITE_WEATHER_API_KEY to your .env file.', { kind: 'missing-key' })
  }
  const q = String(query || '').trim()
  if (!q) {
    throw new WeatherApiError('Type a city first — we skip empty searches on purpose.', { kind: 'not-found' })
  }
  const url = `${BASE_URL}?access_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q)}&units=m`
  let res
  try {
    res = await fetch(url, { signal })
  } catch (e) {
    if (e?.name === 'AbortError') throw e
    throw new WeatherApiError('Could not reach the weather service. Check your connection and retry.', { kind: 'network' })
  }
  let payload = null
  try {
    payload = await res.json()
  } catch {
    throw new WeatherApiError('The weather service sent a strange reply. Retry in a moment.', { kind: 'network' })
  }
  if (!res.ok || payload?.success === false || payload?.error) {
    throw mapApiError(payload) || new WeatherApiError('Something went wrong fetching weather. Retry.', { kind: 'api' })
  }
  if (!payload?.current || !payload?.location) {
    throw new WeatherApiError("We couldn't find weather for this location. Try another city spelling.", { kind: 'not-found' })
  }
  return normalizePayload(payload)
}
