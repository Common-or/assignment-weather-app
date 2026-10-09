import { SearchBar } from '../components/weather/SearchBar'
import { WeatherHero } from '../components/weather/WeatherHero'
import { WeatherStats, WeatherSkeleton } from '../components/weather/WeatherStats'
import { EmptyState, ErrorState } from '../components/weather/States'
import { DoodleSky, FadeIn } from '../components/effects/bits'
import { normalizeCondition } from '../lib/weather'
import { KeyRound } from 'lucide-react'

export function Dashboard({ weather }) {
  const { data, loading, error, search, clear, retry, locate, geoStatus, history, favorites, toggleFavorite, isFavorite, clearFavorites, keySource, saveBrowserKey, forgetBrowserKey } = weather
  const condition = data ? normalizeCondition(data.description, data.isDay) : 'partly'

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-2.5 px-3 pt-2.5 sm:gap-3 sm:px-6 sm:pt-3">
      <h1 className="sr-only">Meteo Doodle — weather intelligence dashboard</h1>

      <section aria-label="Search for a city" className="relative shrink-0 overflow-hidden rounded-[28px]">
        <DoodleSky condition={condition} />
        <div className="doodle-card relative bg-[var(--surface)] p-3 sm:p-3.5">
          <p className="font-display text-base font-bold sm:text-lg">What&rsquo;s the sky drawing today?</p>
          <div className="mt-1.5">
            <SearchBar
              onSearch={search}
              onClear={clear}
              onLocate={locate}
              loading={loading}
              geoStatus={geoStatus}
              history={history}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onClearFavorites={clearFavorites}
            />
          </div>
        </div>
      </section>

      <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
        {loading && <WeatherSkeleton />}
        {!loading && error && (
          <FadeIn>
            <ErrorState error={error} onRetry={retry} onClear={clear} onSaveKey={saveBrowserKey} />
          </FadeIn>
        )}
        {!loading && !error && !data && (
          <FadeIn>
            <EmptyState onLocate={locate} geoStatus={geoStatus} />
          </FadeIn>
        )}
        {!loading && !error && data && (
          <FadeIn className="flex min-h-0 flex-1 flex-col">
            <WeatherHero data={data} isFavorite={isFavorite} onToggleFavorite={() => toggleFavorite()} />
          </FadeIn>
        )}
      </div>

      {!loading && !error && data && (
        <section aria-label="Statistics" className="shrink-0 pb-2.5 sm:pb-3">
          <WeatherStats data={data} />
        </section>
      )}

      {keySource === 'browser' && (
        <p className="inline-flex shrink-0 items-center justify-center gap-1.5 pb-1 text-center text-xs font-bold text-[var(--text-3)]">
          <KeyRound size={13} /> browser-pasted key in use ·{' '}
          <button onClick={forgetBrowserKey} className="underline underline-offset-2 hover:text-[var(--text)]">
            forget it
          </button>
        </p>
      )}
    </div>
  )
}
