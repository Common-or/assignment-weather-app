# Zephyr ✎ Doodle Sky — Weather Intelligence Dashboard

A fancy, childish hand-drawn weather app. Geolocate yourself or search any city, and get **real live weather** from Weatherstack — wrapped in crayons, stickers and wobbly doodle cards.

> Portfolio goal: would I proudly show this GitHub to a company? Yes — clean code, real API, thoughtful loading/error/empty states, responsive day/night doodles.

## What it does

- 🔎 **City search** — big doodle input, Enter to search, Esc to erase, loading “Drawing…” state, skeleton cards, friendly errors, designed empty state, clear/reset
- 📍 **Geolocation** — “Use my location” button (with graceful denial handling), queries Weatherstack with `lat,lon`
- 🌈 **Hero doodle card** — city + country, huge temperature anchor, condition + hand-drawn SVG sun/clouds/rain, local date/time, human summary (“sweater weather…”), feels-like + quick chips
- 🧩 **Stats stickers** — reusable cards for Feels like, Humidity, Wind (+compass), Pressure, Visibility, UV (+label), Cloud cover, Precip — each with icon and crayon background
- ⭐ **Sticker album (favorites)** — save places to localStorage, one-tap reload, remove, clear
- ↺ **Recent doodles** — last 8 searches as quick-access chips (localStorage)
- 🌓 **Day / Night doodles** — persisted theme (localStorage), OS preference on first visit, no flash on reload, toggle in header
- 📱 **Responsive** — dashboard grid on desktop, adapted tablet, single-column big-temp + 44px touch targets on mobile

## Technologies

- React.js + Vite + JavaScript
- Tailwind CSS v4 (+ custom doodle utilities)
- shadcn/ui-style primitives (Button, Input, Card, Badge, Skeleton, Alert — customized, not default)
- React Bits-style effects (Aurora sky, SplitText headline, FadeIn reveal — restrained, `prefers-reduced-motion` respected)
- Lucide icons (single consistent set)
- Fetch + React Hooks (`useState`, `useEffect`, custom `useWeather` / `useTheme`)
- Git & GitHub

## API — Weatherstack

Real-time data from `https://api.weatherstack.com/current?access_key=KEY&query=City&units=m`. No hardcoded weather — every number comes from the API and is normalized in `src/services/weatherApi.js`.

Free plan covers current weather (≈100 calls/month). Tested live: `Casablanca → 23°C Sunny`.

## Installation

```bash
git clone https://github.com/Common-or/assignment-weather-app.git
cd assignment-weather-app
npm install
```

Configure your key (see below), then:

```bash
npm run dev
npm run build
npm run preview
```

## Environment (.env)

1. Create a free account at https://weatherstack.com → Dashboard → copy `access_key`
2. Copy the template and paste your key:

```bash
cp .env.example .env
```

```env
VITE_WEATHER_API_KEY=paste_your_key_here
```

3. Restart `npm run dev` after editing `.env`
4. `.env` is git-ignored. Only `.env.example` (empty variable) is committed. If a key leaks, rotate it in the dashboard.
5. No `.env` at hand (e.g. the Vercel deployment)? The app also offers a key field in the error card — pasting there stores it in that browser's local storage only, never in git.

## Project structure

```
src/
  components/
    layout/Chrome.jsx        Header + Footer
    weather/
      SearchBar.jsx          input + geo + quick cities + history
      WeatherHero.jsx        big doodle hero
      WeatherStats.jsx       sticker grid + skeleton
      States.jsx             EmptyState + ErrorState
      FavoritesBar.jsx       sticker album
    ui/
      button.jsx             doodle buttons
      primitives.jsx         Input, Card, Badge, Skeleton, Alert
    effects/bits.jsx         DoodleSky, SplitText, FadeIn
  services/weatherApi.js     fetch + normalize + typed errors
  hooks/
    useWeather.js            search/clear/retry/locate/history/favorites
    useTheme.js              day/night persisted
  lib/
    utils.js                 cn()
    weather.js               condition map, summaries, uv/compass/time
  pages/Dashboard.jsx
  App.jsx / main.jsx / index.css
```

Separation of concerns: API in service, stateful logic in hooks, presentational components pure and reusable. Nothing duplicated, no app-in-one-file.
