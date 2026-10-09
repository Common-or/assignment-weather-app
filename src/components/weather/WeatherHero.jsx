import { Clock, Cloud, CloudFog, CloudLightning, CloudRain, CloudSun, Droplets, Eye, Gauge, Heart, MapPin, Moon, Pencil, Snowflake, Sun, Wind } from 'lucide-react'
import { CONDITION_META, formatLocalTime, humanSummary, normalizeCondition } from '../../lib/weather'
import { Badge } from '../ui/primitives'
import { SkyScene } from './SkyScene'

const CONDITION_ICONS = {
  sunny: Sun,
  'clear-night': Moon,
  partly: CloudSun,
  'partly-night': Cloud,
  cloudy: Cloud,
  'cloudy-night': Cloud,
  rain: CloudRain,
  'rain-night': CloudRain,
  storm: CloudLightning,
  'storm-night': CloudLightning,
  snow: Snowflake,
  fog: CloudFog,
}

function DoodleIcon({ condition }) {
  const c = normalizeCondition(condition?.description, condition?.isDay)
  const night = c.includes('night')
  const sun = (
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
  )
  const moon = (
    <svg viewBox="0 0 100 100" className="h-full w-full animate-[float-slow_5s_ease-in-out_infinite]">
      <path d="M62 10 A42 42 0 1 0 90 68 A34 34 0 0 1 62 10 Z" fill="#fde047" stroke="#1c1917" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="28" cy="30" r="3" fill="#1c1917" />
      <circle cx="40" cy="70" r="2.5" fill="#1c1917" />
      <circle cx="78" cy="24" r="2.5" fill="#fff" stroke="#1c1917" strokeWidth="2" />
    </svg>
  )
  const cloud = (
    <svg viewBox="0 0 100 70" className="h-full w-full">
      <ellipse cx="38" cy="40" rx="24" ry="16" fill="#fff" stroke="#1c1917" strokeWidth="4" />
      <ellipse cx="62" cy="34" rx="26" ry="18" fill="#e0f2fe" stroke="#1c1917" strokeWidth="4" />
    </svg>
  )
  const partly = (
    <svg viewBox="0 0 100 90" className="h-full w-full">
      <circle cx="34" cy="30" r="16" fill="#ffc93c" stroke="#1c1917" strokeWidth="4" />
      <ellipse cx="58" cy="60" rx="28" ry="17" fill="#fff" stroke="#1c1917" strokeWidth="4" />
    </svg>
  )
  const rain = (
    <svg viewBox="0 0 100 80" className="h-full w-full">
      <ellipse cx="50" cy="30" rx="30" ry="18" fill={night ? '#334155' : '#fff'} stroke="#1c1917" strokeWidth="4" />
      {[30, 45, 60].map((x) => (
        <g key={x} stroke="#0ea5e9" strokeWidth="5" strokeLinecap="round">
          <line x1={x} y1={52} x2={x - 6} y2={68} />
        </g>
      ))}
    </svg>
  )
  const storm = (
    <svg viewBox="0 0 100 90" className="h-full w-full">
      <ellipse cx="50" cy="28" rx="30" ry="18" fill="#312e81" stroke="#1c1917" strokeWidth="4" />
      <path d="M54 48 L40 70 L52 70 L44 86 L66 62 L54 62 Z" fill="#fde047" stroke="#1c1917" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  )
  const snow = (
    <svg viewBox="0 0 100 80" className="h-full w-full">
      <ellipse cx="50" cy="28" rx="30" ry="17" fill="#fff" stroke="#1c1917" strokeWidth="4" />
      {[[32, 58], [50, 64], [68, 58]].map(([x, y]) => (
        <g key={x} transform={`translate(${x} ${y})`} stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round">
          {[0, 60, 120].map((r) => (
            <line key={r} x1="-6" y1="0" x2="6" y2="0" transform={`rotate(${r})`} />
          ))}
        </g>
      ))}
    </svg>
  )
  const fog = (
    <svg viewBox="0 0 100 70" className="h-full w-full">
      <ellipse cx="50" cy="24" rx="28" ry="15" fill="#e7e5e4" stroke="#1c1917" strokeWidth="4" />
      {[40, 52, 62].map((y) => (
        <line key={y} x1="18" y1={y} x2="82" y2={y - 4} stroke="#78716c" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 7" />
      ))}
    </svg>
  )
  const drawings = {
    sunny: sun,
    'clear-night': moon,
    partly,
    'partly-night': (
      <svg viewBox="0 0 100 90" className="h-full w-full">
        <path d="M52 6 A30 30 0 1 0 74 50 A24 24 0 0 1 52 6 Z" fill="#fde047" stroke="#1c1917" strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="60" cy="62" rx="26" ry="16" fill="#cbd5e1" stroke="#1c1917" strokeWidth="4" />
      </svg>
    ),
    cloudy: cloud,
    'cloudy-night': cloud,
    rain,
    'rain-night': rain,
    storm,
    'storm-night': storm,
    snow,
    fog,
  }
  const art = drawings[c] || (night ? moon : cloud)
  return <div className="h-[clamp(5rem,18vh,10rem)] w-[clamp(5rem,18vh,10rem)] shrink-0">{art}</div>
}

export function WeatherHero({ data, isFavorite, onToggleFavorite }) {
  if (!data) return null
  const kind = normalizeCondition(data.description, data.isDay)
  const meta = CONDITION_META[kind] || CONDITION_META.partly
  const [c1, c2, c3] = meta.hero
  const summary = humanSummary(data)
  const ConditionIcon = CONDITION_ICONS[kind] || Cloud

  return (
    <article
      className="doodle-card relative h-full overflow-hidden bg-[#171321] p-4 text-white sm:p-5"
      aria-live="polite"
      aria-label={`Current weather in ${data.city}, ${data.country}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: `linear-gradient(135deg, ${c2}, ${c3})` }}
      />
      <SkyScene kind={kind} />
      <div className="relative flex h-full min-h-0 flex-col">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge color="#fff" className="text-[#1c1917]">
            <MapPin size={13} /> {data.city} · {data.country}
          </Badge>
          <Badge color="#fff7ad" className="text-[#1c1917]">
            <Clock size={13} /> {formatLocalTime(data.localtime)}
          </Badge>
          <button
            onClick={onToggleFavorite}
            aria-pressed={!!isFavorite}
            aria-label={isFavorite ? 'Remove from saved places' : 'Save to saved places'}
            className={`ml-auto inline-flex min-h-[36px] items-center gap-1 rounded-full border-[2.5px] border-black px-3 py-1 text-sm font-bold transition-transform hover:scale-105 ${
              isFavorite ? 'bg-[#ffc93c] text-black' : 'bg-white text-black'
            }`}
          >
            <Heart size={15} fill={isFavorite ? 'currentColor' : 'none'} /> {isFavorite ? 'saved!' : 'save'}
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center gap-4 sm:gap-6">
          <DoodleIcon condition={data} />
          <div className="min-w-0">
            <div className="font-display text-[clamp(3.5rem,15vh,6.5rem)] leading-none font-bold tracking-tight text-white">
              {data.temperature ?? '—'}
              <span className="align-top text-[0.35em]">°C</span>
            </div>
            <p className="font-display mt-1 inline-flex items-center gap-2 text-lg font-semibold text-white capitalize sm:text-xl">
              <ConditionIcon size={24} strokeWidth={2.5} /> {data.description}
            </p>
            <p className="mt-0.5 text-sm font-bold text-white">feels like {data.feelslike ?? '—'}°C</p>
          </div>
          <div className="ml-auto hidden flex-col gap-1.5 md:flex">
            {[
              { icon: Droplets, text: `${data.humidity ?? '—'}% humidity` },
              { icon: Wind, text: `${data.windSpeed ?? '—'} km/h ${data.windDir}` },
              { icon: Gauge, text: `${data.pressure ?? '—'} mb` },
              { icon: Eye, text: `${data.visibility ?? '—'} km` },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-white/40 bg-black/55 px-3 py-1 text-[13px] font-bold whitespace-nowrap text-white"
              >
                <Icon size={14} /> {text}
              </span>
            ))}
          </div>
        </div>

        {summary && (
          <p className="hide-short font-hand mt-2 inline-flex w-fit items-center gap-2 rounded-2xl bg-black/45 px-3 py-1 text-xl text-white">
            <Pencil size={16} /> {summary}
          </p>
        )}
      </div>
    </article>
  )
}
