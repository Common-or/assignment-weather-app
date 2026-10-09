import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Debug helper (boolean only — never prints the key itself).
// Open devtools console after `npm run dev` and check:
//   window.__METEO_DOODLE_KEY_PRESENT === true
try {
  window.__METEO_DOODLE_KEY_PRESENT = Boolean(import.meta.env?.VITE_WEATHER_API_KEY?.trim())
  console.info(`[Meteo Doodle] API key present: ${window.__METEO_DOODLE_KEY_PRESENT}`)
} catch {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
