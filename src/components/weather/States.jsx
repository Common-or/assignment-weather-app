import { useState } from 'react'
import { AlertTriangle, Ghost, KeyRound, Satellite, WifiOff } from 'lucide-react'
import { Alert, Card } from '../ui/primitives'
import { Button } from '../ui/button'

export function EmptyState({ onLocate, geoStatus }) {
  return (
    <Card className="relative overflow-hidden bg-[#fffbe6] text-center text-[#1c1917]">
      <div className="mx-auto max-w-md py-6">
        <div className="mx-auto grid h-24 w-24 animate-[float-slow_4s_ease-in-out_infinite] place-items-center rounded-full border-[3px] border-dashed border-[var(--text-3)] bg-white text-5xl">
          🗺️
        </div>
        <h2 className="font-display mt-4 text-3xl font-bold">Draw me some weather!</h2>
        <p className="font-hand mt-1 text-2xl text-[#57534e]">geolocate yourself, or doodle a city name above ✎</p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <Button variant="sky" onClick={onLocate} disabled={geoStatus === 'locating'}>
            <Satellite size={18} /> {geoStatus === 'locating' ? 'Finding you…' : '📍 Use my location'}
          </Button>
        </div>
        <p className="mt-4 text-[13px] font-semibold text-[#78716c]">No fake data here — every drawing comes from the real Weatherstack API.</p>
      </div>
    </Card>
  )
}

export function ErrorState({ error, onRetry, onClear, onSaveKey }) {
  const kind = error?.kind || 'api'
  const [draftKey, setDraftKey] = useState('')
  const [keyError, setKeyError] = useState(null)
  const saveKey = (e) => {
    e?.preventDefault()
    setKeyError(null)
    try {
      onSaveKey?.(draftKey)
      setDraftKey('')
    } catch (err) {
      setKeyError(err?.message || 'Could not save that key.')
    }
  }
  const icons = {
    'missing-key': <KeyRound size={22} />,
    'not-found': <Ghost size={22} />,
    network: <WifiOff size={22} />,
    limit: <AlertTriangle size={22} />,
    https: <AlertTriangle size={22} />,
    api: <AlertTriangle size={22} />,
  }
  const titles = {
    'missing-key': 'Oops — no crayon box (API key)!',
    'not-found': "Can't find that doodle-town",
    network: 'The sky radio broke 📻',
    limit: 'Slow down — sky is rate-limited',
    https: 'Free key + HTTPS hiccup',
    api: 'The clouds scribbled an error',
  }
  return (
    <div className="space-y-3">
      <Alert kind="error">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-[2.5px] border-black bg-white">{icons[kind] || icons.api}</span>
        <div>
          <p className="font-display text-lg font-bold">{titles[kind] || titles.api}</p>
          <p className="mt-0.5 font-semibold">{error?.message || 'Something went wrong. Try again.'}</p>
          {kind === 'missing-key' && (
            <div className="mt-2">
              <p className="text-[13px]">
                Add <code className="rounded bg-black/10 px-1.5 py-0.5 font-mono">VITE_WEATHER_API_KEY</code> to <code className="rounded bg-black/10 px-1.5 py-0.5 font-mono">.env</code>, then restart{' '}
                <code className="rounded bg-black/10 px-1.5 py-0.5 font-mono">npm run dev</code>.
              </p>
              {onSaveKey && (
                <form onSubmit={saveKey} className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="password"
                    value={draftKey}
                    onChange={(e) => setDraftKey(e.target.value)}
                    placeholder="…or paste a key for this browser"
                    aria-label="Paste a Weatherstack API key for this browser"
                    autoComplete="off"
                    className="h-11 min-h-[44px] flex-1 rounded-xl border-[2.5px] border-black bg-white px-3 font-mono text-sm text-black outline-none placeholder:font-sans placeholder:font-semibold placeholder:text-black/40 focus:shadow-[0_0_0_3px_var(--sky)]"
                  />
                  <Button type="submit" variant="dark" size="sm" className="min-h-[44px]">
                    <KeyRound size={16} /> Use key
                  </Button>
                </form>
              )}
              {keyError && <p className="mt-1 text-[13px] font-bold">{keyError}</p>}
              <p className="mt-1 text-[12px] font-semibold opacity-70">Browser keys stay in this device's local storage — never in git.</p>
            </div>
          )}
        </div>
      </Alert>
      <div className="flex flex-wrap gap-2">
        <Button variant="sunny" onClick={onRetry}>
          ↻ Try again
        </Button>
        <Button variant="paper" onClick={onClear}>
          Erase & start over
        </Button>
      </div>
    </div>
  )
}
