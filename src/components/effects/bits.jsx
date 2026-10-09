import { useEffect, useRef } from 'react'
import { Cloud, CloudSun, Moon, Pencil, Sparkles } from 'lucide-react'

// React Bits–style: scroll reveal wrapper (respects prefers-reduced-motion via CSS)
export function FadeIn({ children, delay = 0, className = '', y = 14 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('in')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, '--reveal-y': `${y}px` }}>
      {children}
    </div>
  )
}

// React Bits–style: playful staggered headline
export function SplitText({ text, className = '', charClass = '' }) {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  return (
    <span className={className} aria-label={text} role="heading" aria-level={1}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className={`split-char ${charClass}`}
          style={reduce ? { opacity: 1, transform: 'none' } : { animationDelay: `${i * 28}ms` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

// React Bits–style: animated crayon sky background
export function DoodleSky({ condition = 'partly' }) {
  const isNight = condition.includes('night') || condition.includes('clear-night')
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="aurora-blob h-72 w-72 bg-[#ffd166]/70" style={{ left: '-4%', top: '-8%' }} />
      <div className="aurora-blob h-80 w-80 bg-[#7dd3fc]/60" style={{ right: '-6%', top: '4%', animationDelay: '-6s' }} />
      <div className="aurora-blob h-64 w-64 bg-[#ff8fab]/50" style={{ left: '38%', top: '22%', animationDelay: '-11s' }} />
      <div className="hero-grid-overlay absolute inset-0 opacity-60" />
      {/* doodle stars / clouds */}
      <span className="absolute top-[18%] left-[8%] animate-[float-slow_5s_ease-in-out_infinite] text-[var(--text-3)]">
        {isNight ? <Sparkles size={30} /> : <Cloud size={32} />}
      </span>
      <span className="absolute top-[12%] right-[12%] animate-[float-slow_6s_ease-in-out_infinite] text-[var(--text-3)]" style={{ animationDelay: '-2s' }}>
        {isNight ? <Moon size={26} /> : <CloudSun size={28} />}
      </span>
      <span className="absolute bottom-[18%] left-[14%] hidden animate-[wiggle_3s_ease-in-out_infinite] font-hand text-2xl text-[var(--text-3)] sm:inline-flex sm:items-center sm:gap-1.5">
        drawn with love <Pencil size={16} />
      </span>
      <svg className="absolute bottom-[8%] right-[6%] w-28 opacity-70" viewBox="0 0 120 40" fill="none">
        <path d="M4 26 Q 22 8 40 24 T 76 24 T 116 22" stroke="var(--text-3)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 8" />
      </svg>
    </div>
  )
}
