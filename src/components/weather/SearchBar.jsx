import { useRef, useState } from 'react'
import { Crosshair, Eraser, Heart, Loader2, Search, X } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/primitives'

const QUICK = ['Casablanca', 'Paris', 'London', 'New York', 'Tokyo', 'Dubai']

export function SearchBar({
  onSearch,
  onClear,
  onLocate,
  loading,
  geoStatus,
  history = [],
  favorites = [],
  onToggleFavorite,
  onClearFavorites,
}) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  const submit = (e) => {
    e?.preventDefault()
    onSearch(value)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setValue('')
      onClear()
      inputRef.current?.blur()
    }
  }

  const pick = (place) => {
    setValue(place.split(',')[0])
    onSearch(place.split(',')[0])
  }

  return (
    <div className="w-full">
      <form onSubmit={submit} role="search" aria-label="Search weather by city" className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="city-search" className="sr-only">
            City or location
          </label>
          <span aria-hidden className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[var(--text-3)]">
            <Search size={19} />
          </span>
          <Input
            id="city-search"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Draw a city… try Casablanca!"
            autoComplete="off"
            maxLength={80}
            className="pr-12 pl-12"
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                setValue('')
                onClear()
                inputRef.current?.focus()
              }}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border-2 border-[#1c1917] bg-white text-[#1c1917] transition-transform hover:rotate-12"
            >
              <Eraser size={16} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={loading || !value.trim()} className="flex-1 sm:flex-none" aria-live="polite">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            {loading ? 'Drawing…' : 'Search'}
          </Button>
          <Button
            type="button"
            variant="sky"
            size="icon"
            onClick={onLocate}
            title={geoStatus === 'locating' ? 'Locating…' : 'Use my location'}
            aria-label="Use my location"
          >
            {geoStatus === 'locating' ? <Loader2 size={18} className="animate-spin" /> : <Crosshair size={18} />}
          </Button>
        </div>
      </form>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-extrabold tracking-[0.12em] text-[var(--text-2)] uppercase">Try:</span>
        {QUICK.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => pick(c)}
            className="font-display rounded-full border-[2.5px] border-[#1c1917] bg-[#fff7ad] px-2.5 py-0.5 text-[13px] font-semibold text-[#1c1917] shadow-[2px_2px_0_#1c1917] transition-transform hover:-translate-y-0.5 hover:rotate-1"
          >
            {c}
          </button>
        ))}
      </div>

      {history.length > 0 && (
        <div className="hide-short mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-extrabold tracking-[0.12em] text-[var(--text-2)] uppercase">Recent:</span>
          {history.slice(0, 6).map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => pick(h)}
              className="rounded-full border-2 border-dashed border-[var(--text-3)] px-2.5 py-0.5 text-xs font-bold text-[var(--text-2)] hover:border-solid hover:text-[var(--text)]"
            >
              {h}
            </button>
          ))}
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold tracking-[0.12em] text-[var(--text-2)] uppercase">
            <Heart size={12} fill="currentColor" /> Saved:
          </span>
          {favorites.map((f) => (
            <span
              key={f}
              className="inline-flex items-center gap-1 rounded-full border-[2.5px] border-[#1c1917] bg-white py-0.5 pr-1 pl-2.5 text-xs font-bold text-[#1c1917] shadow-[2px_2px_0_#1c1917]"
            >
              <button type="button" onClick={() => pick(f)} title={`Show ${f}`}>
                {f}
              </button>
              <button
                type="button"
                onClick={() => onToggleFavorite?.(f)}
                aria-label={`Remove ${f} from saved places`}
                className="grid h-5 w-5 place-items-center rounded-full bg-black/10 hover:bg-[#ff5d8f] hover:text-white"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={onClearFavorites}
            className="text-xs font-bold text-[var(--text-3)] underline underline-offset-2 hover:text-[var(--text)]"
          >
            clear
          </button>
        </div>
      )}
    </div>
  )
}
