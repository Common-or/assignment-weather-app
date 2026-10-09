import { Header, Footer } from './components/layout/Chrome'
import { Dashboard } from './pages/Dashboard'
import { useTheme } from './hooks/useTheme'
import { useWeather } from './hooks/useWeather'

function App() {
  const { theme, toggle } = useTheme()
  const weather = useWeather()

  return (
    <div className="min-h-screen text-[var(--text)]">
      <Header theme={theme} onToggleTheme={toggle} />
      <Dashboard weather={weather} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Footer />
      </div>
    </div>
  )
}

export default App
