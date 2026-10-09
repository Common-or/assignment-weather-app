import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchCurrentWeather, WeatherApiError } from '../services/weatherApi'

const HISTORY_KEY = 'zephyr-history'
const FAVORITES_KEY = 'zephyr-favorites'
const MIN_INTERVAL_MS = 1500
const CACHE_TTL_MS = 5 * 60 * 1000

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function useWeather() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastQuery, setLastQuery] = useState('')
  const [geoStatus, setGeoStatus] = useState('idle') // idle | locating | denied | done
  const [history, setHistory] = useState(() => readJson(HISTORY_KEY, []))
  const [favorites, setFavorites] = useState(() => readJson(FAVORITES_KEY, []))
  const abortRef = useRef(null)
  const cacheRef = useRef(new Map()) // query -> { data, ts }
  const lastCallRef = useRef(0)

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 8)))
    } catch {}
  }, [history])

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.slice(0, 12)))
    } catch {}
  }, [favorites])

  useEffect(() => () => abortRef.current?.abort(), [])

  const search = useCallback(async (query) => {
    const q = String(query || '').trim()
    if (!q) {
      setError(new WeatherApiError('Type a city first — we skip empty searches on purpose.', { kind: 'not-found' }))
      return
    }
    const key = q.toLowerCase()
    const now = Date.now()
    const cached = cacheRef.current.get(key)
    if (cached && now - cached.ts < CACHE_TTL_MS) {
      setData(cached.data)
      setLastQuery(q)
      setError(null)
      return
    }
    if (now - lastCallRef.current < MIN_INTERVAL_MS) {
      setError(
        new WeatherApiError('Whoa, speedy artist! Wait a second between drawings — the free sky is rate-limited.', { kind: 'limit' }),
      )
      return
    }
    lastCallRef.current = now
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setLoading(true)
    setError(null)
    try {
      const result = await fetchCurrentWeather(q, { signal: controller.signal })
      cacheRef.current.set(key, { data: result, ts: Date.now() })
      setData(result)
      setLastQuery(q)
      setHistory((h) => {
        const label = result.city && result.country ? `${result.city}, ${result.country}` : q
        const next = [label, ...h.filter((x) => x.toLowerCase() !== label.toLowerCase())]
        return next.slice(0, 8)
      })
    } catch (e) {
      if (e?.name === 'AbortError') return
      setError(e instanceof WeatherApiError ? e : new WeatherApiError('Something went wrong. Retry.', { kind: 'api' }))
    } finally {
      if (abortRef.current === controller) setLoading(false)
    }
  }, [])

  const clear = useCallback(() => {
    abortRef.current?.abort()
    setData(null)
    setError(null)
    setLastQuery('')
    setLoading(false)
  }, [])

  const retry = useCallback(() => {
    if (lastQuery) search(lastQuery)
  }, [lastQuery, search])

  const locate = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setError(new WeatherApiError('Geolocation is not supported in this browser. Search a city instead.', { kind: 'api' }))
      return
    }
    setGeoStatus('locating')
    setError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setGeoStatus('done')
        search(`${latitude.toFixed(2)},${longitude.toFixed(2)}`)
      },
      (err) => {
        setGeoStatus('denied')
        const msg =
          err?.code === 1
            ? 'Location permission was denied. Allow it in the browser, or just search a city — both work.'
            : 'Could not get your location. Search a city instead.'
        setError(new WeatherApiError(msg, { kind: 'api' }))
      },
      { timeout: 10000, maximumAge: 60000 },
    )
  }, [search])

  const toggleFavorite = useCallback(
    (label) => {
      const name = label || (data ? `${data.city}, ${data.country}` : '')
      if (!name) return
      setFavorites((f) =>
        f.some((x) => x.toLowerCase() === name.toLowerCase())
          ? f.filter((x) => x.toLowerCase() !== name.toLowerCase())
          : [name, ...f].slice(0, 12),
      )
    },
    [data],
  )

  const isFavorite = data ? favorites.some((x) => x.toLowerCase() === `${data.city}, ${data.country}`.toLowerCase()) : false

  const clearFavorites = useCallback(() => setFavorites([]), [])
  const clearHistory = useCallback(() => setHistory([]), [])

  return { data, loading, error, lastQuery, search, clear, retry, locate, geoStatus, history, favorites, toggleFavorite, isFavorite, setHistory, clearFavorites, clearHistory }
}
