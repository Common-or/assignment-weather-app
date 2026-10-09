import { CloudSun, Moon, Pencil, Sun } from 'lucide-react'
import { Button } from '../ui/button'

export function Header({ theme, onToggleTheme }) {
  const dark = theme === 'dark'
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-11 w-11 animate-[wiggle_3s_ease-in-out_infinite] place-items-center rounded-2xl border-[3px] border-[var(--border)] bg-[#ffc93c] text-2xl shadow-[3px_3px_0_var(--border)]">
            <CloudSun size={24} className="text-black" />
          </span>
          <div>
            <p className="font-display text-xl leading-none font-bold tracking-tight">
              Zephyr <span className="font-hand text-[var(--text-2)]">doodle sky</span>
            </p>
            <p className="text-[11px] font-extrabold tracking-[0.18em] text-[var(--text-3)] uppercase">weather intelligence dashboard</p>
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

export function Footer() {
  return (
    <footer className="mt-12 border-t-[3px] border-dashed border-[var(--text-3)] py-8 text-center">
      <p className="font-hand inline-flex items-center gap-2 text-2xl text-[var(--text-2)]">drawn with crayons, powered by Weatherstack <Pencil size={18} /></p>
      <p className="mt-1 text-[13px] font-bold text-[var(--text-3)]">
        React · Vite · Tailwind · shadcn/ui doodled · React Bits sparkles · Fetch + Hooks
      </p>
    </footer>
  )
}
