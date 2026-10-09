import { Heart, Trash2 } from 'lucide-react'

export function FavoritesBar({ favorites = [], onSelect, onToggle, onClear }) {
  if (!favorites.length) return null
  return (
    <section aria-label="Favorite places" className="doodle-card bg-[#fff0f5] p-4">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full border-[2.5px] border-[var(--border)] bg-[#ff5d8f] text-white">
          <Heart size={16} fill="currentColor" />
        </span>
        <h2 className="font-display text-lg font-bold">my sticker album</h2>
        <button onClick={onClear} className="ml-auto inline-flex items-center gap-1 text-[13px] font-bold text-[var(--text-3)] hover:text-[var(--text)]">
          <Trash2 size={14} /> clear
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {favorites.map((f) => (
          <button
            key={f}
            onClick={() => onSelect(f.split(',')[0])}
            title={`Show ${f}`}
            className="group inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-[var(--border)] bg-white px-3 py-1.5 text-sm font-bold shadow-[2px_2px_0_var(--border)] transition-transform hover:-translate-y-0.5 hover:rotate-1"
          >
            ⭐ {f}
            <span
              role="button"
              tabIndex={0}
              aria-label={`Remove ${f} from favorites`}
              onClick={(e) => {
                e.stopPropagation()
                onToggle(f)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation()
                  onToggle(f)
                }
              }}
              className="grid h-5 w-5 place-items-center rounded-full bg-black/10 text-xs group-hover:bg-[#ff5d8f] group-hover:text-white"
            >
              ×
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
