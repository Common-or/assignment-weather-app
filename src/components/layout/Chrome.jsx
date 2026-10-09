import { CloudSun, Moon, Sun } from 'lucide-react'
import { Button } from '../ui/button'

export function Header({ theme, onToggleTheme }) {
  const dark = theme === 'dark'
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2.5 px-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 animate-[wiggle_3s_ease-in-out_infinite] place-items-center rounded-xl border-[3px] border-[var(--border)] bg-[#ffc93c] shadow-[3px_3px_0_var(--border)]">
            <CloudSun size={20} className="text-black" />
          </span>
          <div>
            <p className="font-display text-lg leading-none font-bold tracking-tight">
              Meteo Doodle
            </p>
            <p className="text-[10px] font-extrabold tracking-[0.18em] text-[var(--text-2)] uppercase">weather intelligence</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span aria-hidden className="font-hand hidden items-center gap-1.5 text-xl text-[var(--text-3)] sm:inline-flex">
            {dark ? (
              <>night doodles <Moon size={16} /></>
            ) : (
              <>day doodles <Sun size={16} /></>
            )}
          </span>
          <Button variant="paper" size="icon" onClick={onToggleTheme} aria-label={dark ? 'Switch to day mode' : 'Switch to night mode'} title="Toggle day / night">
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </Button>
        </div>
      </div>
    </header>
  )
}

