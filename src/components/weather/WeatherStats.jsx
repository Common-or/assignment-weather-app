import { CloudRainWind, Droplets, Eye, Gauge, Sun, Thermometer, Wind } from 'lucide-react'
import { uvLabel } from '../../lib/weather'

function Stat({ icon, label, value, sub, bg, rotate = '' }) {
  // Pastel sticker backgrounds are always light → fixed dark ink in both themes (WCAG AA).
  return (
    <div className={`doodle-card p-4 text-[#1c1917] ${rotate}`} style={{ background: bg }}>
      <div className="flex items-center gap-2.5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border-[2.5px] border-[#1c1917] bg-white text-xl text-[#1c1917] shadow-[2px_2px_0_#1c1917]">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold tracking-[0.12em] text-[#44403c] uppercase">{label}</p>
          <p className="font-display truncate text-xl font-bold text-[#1c1917]">{value}</p>
          {sub && <p className="truncate text-[13px] font-semibold text-[#57534e]">{sub}</p>}
        </div>
      </div>
    </div>
  )
}

export function WeatherStats({ data }) {
  if (!data) return null
  const stats = [
    { icon: <Thermometer size={20} />, label: 'Feels like', value: data.feelslike != null ? `${data.feelslike}°C` : '—', sub: `real ${data.temperature}°C`, bg: '#ffe4e6', rotate: '-rotate-1' },
    { icon: <Droplets size={20} />, label: 'Humidity', value: data.humidity != null ? `${data.humidity}%` : '—', sub: data.humidity >= 80 ? 'sticky crayons' : 'comfy air', bg: '#e0f2fe', rotate: 'rotate-1' },
    { icon: <Wind size={20} />, label: 'Wind', value: data.windSpeed != null ? `${data.windSpeed} km/h` : '—', sub: data.windDegree != null ? `from ${data.windDir} · ${data.windDegree}°` : `from ${data.windDir}`, bg: '#dcfce7', rotate: '-rotate-1' },
    { icon: <Gauge size={20} />, label: 'Pressure', value: data.pressure != null ? `${data.pressure} mb` : '—', sub: 'sky weight', bg: '#fef3c7', rotate: 'rotate-1' },
    { icon: <Eye size={20} />, label: 'Visibility', value: data.visibility != null ? `${data.visibility} km` : '—', sub: data.visibility >= 10 ? 'see far!' : 'foggy drawing', bg: '#f3e8ff', rotate: '-rotate-1' },
    { icon: <Sun size={20} />, label: 'UV index', value: data.uv != null ? `${data.uv} · ${uvLabel(data.uv)}` : '—', sub: 'sun power', bg: '#fff7ad', rotate: 'rotate-1' },
    { icon: <CloudRainWind size={20} />, label: 'Clouds', value: data.cloudcover != null ? `${data.cloudcover}%` : '—', sub: 'sky doodles', bg: '#e0e7ff', rotate: '-rotate-1' },
    { icon: <span>🌧️</span>, label: 'Precip', value: data.precip != null ? `${data.precip} mm` : '—', sub: 'rain drops', bg: '#cffafe', rotate: 'rotate-1' },
  ]
  return (
    <section aria-label="Weather statistics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </section>
  )
}

export function WeatherSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading weather" className="space-y-4">
      <div className="doodle-card skeleton-shimmer h-64" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="doodle-card skeleton-shimmer h-28" style={{ animationDelay: `${i * 90}ms` }} />
        ))}
      </div>
      <p className="font-hand text-center text-2xl text-[var(--text-2)]">colouring the sky… 🎨</p>
    </div>
  )
}
