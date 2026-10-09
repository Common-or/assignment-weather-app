import { CloudRain, CloudRainWind, Droplets, Eye, Gauge, Palette, Sun, Thermometer, Wind } from 'lucide-react'
import { uvLabel } from '../../lib/weather'

function Stat({ icon, label, value, sub, bg }) {
  // Pastel mini-cards are always light → fixed dark ink in both themes (WCAG AA).
  return (
    <div className="doodle-card p-2 text-[#1c1917] sm:p-2.5" style={{ background: bg }}>
      <div className="flex items-center gap-2">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-[2.5px] border-[#1c1917] bg-white text-[#1c1917] shadow-[2px_2px_0_#1c1917] sm:h-11 sm:w-11">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold tracking-[0.1em] text-[#44403c] uppercase">{label}</p>
          <p className="font-display truncate text-base leading-tight font-bold text-[#1c1917] sm:text-lg">{value}</p>
          {sub && <p className="truncate text-xs font-semibold text-[#57534e]">{sub}</p>}
        </div>
      </div>
    </div>
  )
}

export function WeatherStats({ data }) {
  if (!data) return null
  const stats = [
    { icon: <Thermometer size={22} />, label: 'Feels like', value: data.feelslike != null ? `${data.feelslike}°C` : '—', sub: `real ${data.temperature}°C`, bg: '#ffe4e6' },
    { icon: <Droplets size={22} />, label: 'Humidity', value: data.humidity != null ? `${data.humidity}%` : '—', sub: data.humidity >= 80 ? 'sticky air' : 'comfy air', bg: '#e0f2fe' },
    { icon: <Wind size={22} />, label: 'Wind', value: data.windSpeed != null ? `${data.windSpeed} km/h` : '—', sub: data.windDegree != null ? `from ${data.windDir} · ${data.windDegree}°` : `from ${data.windDir}`, bg: '#dcfce7' },
    { icon: <Gauge size={22} />, label: 'Pressure', value: data.pressure != null ? `${data.pressure} mb` : '—', sub: 'sky weight', bg: '#fef3c7' },
    { icon: <Eye size={22} />, label: 'Visibility', value: data.visibility != null ? `${data.visibility} km` : '—', sub: data.visibility >= 10 ? 'see far!' : 'low drawing', bg: '#f3e8ff' },
    { icon: <Sun size={22} />, label: 'UV index', value: data.uv != null ? `${data.uv} · ${uvLabel(data.uv)}` : '—', sub: 'sun power', bg: '#fff7ad' },
    { icon: <CloudRainWind size={22} />, label: 'Clouds', value: data.cloudcover != null ? `${data.cloudcover}%` : '—', sub: 'sky doodles', bg: '#e0e7ff' },
    { icon: <CloudRain size={22} />, label: 'Precip', value: data.precip != null ? `${data.precip} mm` : '—', sub: 'rain drops', bg: '#cffafe' },
  ]
  return (
    <section aria-label="Weather statistics" className="grid grid-cols-4 gap-2 lg:grid-cols-8 lg:gap-2.5">
      {stats.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </section>
  )
}

export function WeatherSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading weather" className="space-y-3" aria-live="polite">
      <div className="doodle-card skeleton-shimmer h-44 sm:h-52" />
      <p className="font-hand inline-flex items-center justify-center gap-2 text-center text-2xl text-[var(--text-2)]">
        colouring the sky… <Palette size={20} />
      </p>
    </div>
  )
}
