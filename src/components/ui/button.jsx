import { cn } from '../../lib/utils'

const variants = {
  primary: 'bg-[#ff5d8f] text-white hover:bg-[#ff437e]',
  sunny: 'bg-[#ffc93c] text-[#1c1917] hover:bg-[#ffb703]',
  sky: 'bg-[#7dd3fc] text-[#0c4a6e] hover:bg-[#38bdf8]',
  grass: 'bg-[#4ade80] text-[#052e16] hover:bg-[#22c55e]',
  paper: 'bg-[var(--surface)] text-[var(--text)] hover:-translate-y-px',
  dark: 'bg-[#1c1917] text-white hover:bg-black dark:bg-white dark:text-black',
}

const sizes = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-[15px] gap-2 min-h-[44px]',
  lg: 'h-13 px-6 text-base gap-2 min-h-[52px] py-3',
  icon: 'h-11 w-11 min-h-[44px] min-w-[44px] grid place-items-center',
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }) {
  return (
    <button
      className={cn(
        'doodle-btn font-display inline-flex cursor-pointer items-center justify-center font-semibold tracking-tight transition-all duration-200 select-none',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:transform-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
