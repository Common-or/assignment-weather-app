import { AlertTriangle, Ghost, KeyRound, Satellite, WifiOff } from 'lucide-react'
import { Alert, Card } from '../ui/primitives'
import { Button } from '../ui/button'

export function EmptyState({ onLocate, geoStatus }) {
  return (
    <Card className="relative overflow-hidden bg-[#fffbe6] text-center">
      <div className="mx-auto max-w-md py-6">
        <div className="mx-auto grid h-24 w-24 animate-[float-slow_4s_ease-in-out_infinite] place-items-center rounded-full border-[3px] border-dashed border-[var(--text-3)] bg-white text-5xl">
          🗺️
        </div>
        <h2 className="font-display mt-4 text-3xl font-bold">Draw me some weather!</h2>
        <p className="font-hand mt-1 text-2xl text-[var(--text-2)]">geolocate yourself, or doodle a city name above ✎</p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <Button variant="sky" onClick={onLocate} disabled={geoStatus === 'locating'}>
            <Satellite size={18} /> {geoStatus === 'locating' ? 'Finding you…' : '📍 Use my location'}
          </Button>
        </div>
        <p className="mt-4 text-[13px] font-semibold text-[var(--text-3)]">No fake data here — every drawing comes from the real Weatherstack API.</p>
      </div>
    </Card>
  )
}

export function ErrorState({ error, onRetry, onClear }) {
  const kind = error?.kind || 'api'
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
    limit: 'Out of sky-tickets this month',
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
            <p className="mt-1 text-[13px]">
              Add <code className="rounded bg-black/10 px-1.5 py-0.5 font-mono">VITE_WEATHER_API_KEY</code> to <code className="rounded bg-black/10 px-1.5 py-0.5 font-mono">.env</code>, then restart{' '}
              <code className="rounded bg-black/10 px-1.5 py-0.5 font-mono">npm run dev</code>.
            </p>
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
