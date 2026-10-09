import { useRef, useState } from 'react'
import { Crosshair, Eraser, Loader2, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/primitives'

const QUICK = ['Casablanca', 'Paris', 'London', 'New York', 'Tokyo', 'Dubai']

export function SearchBar({ onSearch, onClear, onLocate, loading, geoStatus, history = [], initialValue = '' }) {
  const [value, setValue] = useState(initialValue)
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

  return (
    <div className="w-full">
      <form onSubmit={submit} role="search" aria-label="Search weather by city" className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <span aria-hidden className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-xl">
            🔎
          </span>
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Draw a city… try Casablanca!"
            aria-label="City or location"
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
              className="absolute top-1/2 right-3 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border-2 border-[var(--border)] bg-white text-lg transition-transform hover:rotate-12"
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
      <p className="font-hand mt-2 text-xl text-[var(--text-2)]">Enter ↵ to search · Esc to erase · 📍 to geolocate you</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setValue(c)
              onSearch(c)
            }}
            className="font-display rounded-full border-[2.5px] border-[var(--border)] bg-[#fff7ad] px-3 py-1 text-sm font-semibold shadow-[2px_2px_0_var(--border)] transition-transform hover:-translate-y-0.5 hover:rotate-1"
          >
            {c}
          </button>
        ))}
      </div>
      {history.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="font-hand text-xl text-[var(--text-3)]">recent:</span>
          {history.slice(0, 6).map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => {
                setValue(h.split(',')[0])
                onSearch(h.split(',')[0])
              }}
              className="rounded-full border-2 border-dashed border-[var(--text-3)] px-3 py-1 text-[13px] font-bold text-[var(--text-2)] hover:border-solid hover:text-[var(--text)]"
            >
              ↺ {h}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
