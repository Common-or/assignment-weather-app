import { Droplets, Eye, Gauge, Heart, MapPin, Sun, Wind } from 'lucide-react'
import { CONDITION_META, formatLocalTime, humanSummary, normalizeCondition } from '../../lib/weather'
import { Badge } from '../ui/primitives'

function DoodleIcon({ condition }) {
  const c = normalizeCondition(condition?.description, condition?.isDay)
  const drawings = {
    sunny: (
      <svg viewBox="0 0 100 100" className="h-full w-full animate-[spin_24s_linear_infinite]">
        <circle cx="50" cy="50" r="20" fill="#ffc93c" stroke="#1c1917" strokeWidth="4" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4
          const x1 = 50 + Math.cos(a) * 28
          const y1 = 50 + Math.sin(a) * 28
          const x2 = 50 + Math.cos(a) * 40
          const y2 = 50 + Math.sin(a) * 40
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1c1917" strokeWidth="5" strokeLinecap="round" />
        })}
      </svg>
    ),
    rain: (
      <svg viewBox="0 0 100 80" className="h-full w-full">
        <ellipse cx="50" cy="30" rx="30" ry="18" fill="#fff" stroke="#1c1917" strokeWidth="4" />
        {[30, 45, 60].map((x) => (
          <g key={x} stroke="#0ea5e9" strokeWidth="5" strokeLinecap="round">
            <line x1={x} y1={52} x2={x - 6} y2={68} />
          </g>
        ))}
      </svg>
    ),
    cloudy: (
      <svg viewBox="0 0 100 70" className="h-full w-full">
        <ellipse cx="38" cy="40" rx="24" ry="16" fill="#fff" stroke="#1c1917" strokeWidth="4" />
        <ellipse cx="62" cy="34" rx="26" ry="18" fill="#e0f2fe" stroke="#1c1917" strokeWidth="4" />
      </svg>
    ),
  }
  const art = drawings[c] || drawings.cloudy
  return <div className="h-24 w-24 sm:h-28 sm:w-28">{art}</div>
}

export function WeatherHero({ data, isFavorite, onToggleFavorite }) {
  if (!data) return null
  const kind = normalizeCondition(data.description, data.isDay)
  const meta = CONDITION_META[kind] || CONDITION_META.partly
  const [c1, c2, c3] = meta.hero
  const summary = humanSummary(data)

  return (
    <article
      className="doodle-card relative overflow-hidden p-6 text-white sm:p-8"
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2} 55%, ${c3})`, borderColor: '#1c1917' }}
      aria-live="polite"
    >
      <div className="hero-grid-overlay absolute inset-0 opacity-30" />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <Badge color="#fff">
            <MapPin size={13} /> {data.city} · {data.country}
          </Badge>
          <Badge color="#fff7ad">🕒 {formatLocalTime(data.localtime)}</Badge>
          <button
            onClick={onToggleFavorite}
            aria-pressed={!!isFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            className={`ml-auto inline-flex items-center gap-1 rounded-full border-[2.5px] border-black px-3 py-1 text-sm font-bold transition-transform hover:scale-105 ${
              isFavorite ? 'bg-[#ff5d8f] text-white' : 'bg-white/90 text-black'
            }`}
          >
            <Heart size={15} fill={isFavorite ? 'currentColor' : 'none'} /> {isFavorite ? 'saved!' : 'save'}
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
          <DoodleIcon condition={data} />
          <div className="min-w-0">
            <div className="font-display text-[72px] leading-none font-bold tracking-tight drop-shadow-[3px_3px_0_rgba(0,0,0,0.9)] sm:text-[92px]">
              {data.temperature ?? '—'}
              <span className="align-top text-3xl">°C</span>
            </div>
            <p className="font-display mt-1 text-xl font-semibold capitalize drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
              {meta.emoji} {data.description}
            </p>
            <p className="mt-1 text-[15px] font-bold text-white/95">feels like {data.feelslike ?? '—'}°C</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:ml-auto sm:max-w-[220px]">
            <span className="rounded-2xl border-[2.5px] border-black/80 bg-white/20 px-3 py-1.5 text-[13px] font-bold backdrop-blur-sm">
              <Droplets size={13} className="mr-1 inline" /> {data.humidity ?? '—'}%
            </span>
            <span className="rounded-2xl border-[2.5px] border-black/80 bg-white/20 px-3 py-1.5 text-[13px] font-bold backdrop-blur-sm">
              <Wind size={13} className="mr-1 inline" /> {data.windSpeed ?? '—'} km/h {data.windDir}
            </span>
            <span className="rounded-2xl border-[2.5px] border-black/80 bg-white/20 px-3 py-1.5 text-[13px] font-bold backdrop-blur-sm">
              <Gauge size={13} className="mr-1 inline" /> {data.pressure ?? '—'} mb
            </span>
            <span className="rounded-2xl border-[2.5px] border-black/80 bg-white/20 px-3 py-1.5 text-[13px] font-bold backdrop-blur-sm">
              <Eye size={13} className="mr-1 inline" /> {data.visibility ?? '—'} km
            </span>
            <span className="rounded-2xl border-[2.5px] border-black/80 bg-white/20 px-3 py-1.5 text-[13px] font-bold backdrop-blur-sm">
              <Sun size={13} className="mr-1 inline" /> UV {data.uv ?? '—'}
            </span>
          </div>
        </div>

        {summary && <p className="font-hand mt-4 text-2xl text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.7)]">✎ {summary}</p>}
        {data.icon && (
          <img src={data.icon} alt="" aria-hidden className="absolute right-4 bottom-4 hidden h-12 w-12 rounded-full border-2 border-white/70 bg-white/30 opacity-90" />
        )}
      </div>
    </article>
  )
}
