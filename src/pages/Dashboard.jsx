import { SearchBar } from '../components/weather/SearchBar'
import { WeatherHero } from '../components/weather/WeatherHero'
import { WeatherStats, WeatherSkeleton } from '../components/weather/WeatherStats'
import { EmptyState, ErrorState } from '../components/weather/States'
import { FavoritesBar } from '../components/weather/FavoritesBar'
import { DoodleSky, FadeIn } from '../components/effects/bits'
import { normalizeCondition } from '../lib/weather'

export function Dashboard({ weather }) {
  const { data, loading, error, search, clear, retry, locate, geoStatus, history, favorites, toggleFavorite, isFavorite, clearFavorites } = weather
  const condition = data ? normalizeCondition(data.description, data.isDay) : 'partly'

  return (
    <div className="relative">
      <section className="relative overflow-hidden border-b-[3px] border-[var(--border)] bg-[var(--bg-soft)]">
        <DoodleSky condition={condition} />
        <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16">
          <FadeIn>
            <p className="font-hand text-2xl text-[var(--text-2)]">✎ hello, sky explorer!</p>
            <h1 className="font-display mt-2 text-4xl leading-[1.12] font-bold tracking-tight text-balance sm:text-6xl">
              What’s the sky <br />
              <span className="doodle-underline">drawing today?</span> 🎨
            </h1>
            <p className="mt-3 max-w-2xl text-[16px] font-semibold text-[var(--text-2)]">
              A fancy childish weather dashboard — geolocate yourself or search any city, and we fetch the <b>real live sky</b> from Weatherstack. No fake
              numbers, only crayons.
            </p>
          </FadeIn>
          <FadeIn delay={120} className="mt-6">
            <div className="doodle-card bg-[var(--surface)] p-4 sm:p-5">
              <SearchBar onSearch={search} onClear={clear} onLocate={locate} loading={loading} geoStatus={geoStatus} history={history} />
            </div>
          </FadeIn>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-5 px-4 pt-6 sm:px-6">
        {loading && <WeatherSkeleton />}
        {!loading && error && (
          <FadeIn>
            <ErrorState error={error} onRetry={retry} onClear={clear} />
          </FadeIn>
        )}
        {!loading && !error && !data && (
          <FadeIn>
            <EmptyState onLocate={locate} geoStatus={geoStatus} />
          </FadeIn>
        )}
        {!loading && !error && data && (
          <>
            <FadeIn>
              <WeatherHero data={data} isFavorite={isFavorite} onToggleFavorite={() => toggleFavorite()} />
            </FadeIn>
            <FadeIn delay={80}>
              <WeatherStats data={data} />
            </FadeIn>
            <FadeIn delay={140}>
              <div className="doodle-card bg-[#f0fdf4] p-4 text-[14px] font-semibold text-[#1c1917]">
                📍 <b>{data.city}, {data.region ? `${data.region}, ` : ''}{data.country}</b>
                {data.lat != null && <> · {data.lat}, {data.lon}</>} · {data.timezone || 'local sky time'} · query “{data.rawQuery}”
                <span className="font-hand ml-2 text-xl">— real API data, not hardcoded!</span>
              </div>
            </FadeIn>
          </>
        )}
        <FadeIn delay={60}>
          <FavoritesBar favorites={favorites} onSelect={search} onToggle={toggleFavorite} onClear={clearFavorites} />
        </FadeIn>
      </main>
    </div>
  )
}
