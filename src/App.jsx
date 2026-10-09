import { Header } from './components/layout/Chrome'
import { Dashboard } from './pages/Dashboard'
import { useTheme } from './hooks/useTheme'
import { useWeather } from './hooks/useWeather'

function App() {
  const { theme, toggle } = useTheme()
  const weather = useWeather()

  return (
    <div className="flex h-dvh flex-col overflow-hidden text-[var(--text)]">
      <Header theme={theme} onToggleTheme={toggle} />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <Dashboard weather={weather} />
      </main>
    </div>
  )
}

export default App
