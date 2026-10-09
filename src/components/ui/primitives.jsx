import { cn } from '../../lib/utils'

export function Input({ className, ref, ...props }) {
  return (
    <input
      ref={ref}
      className={cn(
        'doodle-input font-display w-full bg-[var(--surface)] px-5 text-lg font-medium text-[var(--text)] placeholder:text-[var(--text-3)]',
        'h-[52px] outline-none transition-shadow duration-200 focus:shadow-[inset_3px_3px_0_rgba(0,0,0,0.08),0_0_0_3px_var(--sky)]',
        className,
      )}
      {...props}
    />
  )
}

export function Card({ className, children, ...props }) {
  return (
    <div className={cn('doodle-card p-5 sm:p-6', className)} {...props}>
      {children}
    </div>
  )
}

export function Badge({ className, children, color = '#ffe66d', ...props }) {
  return (
    <span
      className={cn('font-display inline-flex -rotate-1 items-center gap-1 border-[2.5px] border-[var(--border)] px-2.5 py-0.5 text-xs font-semibold', className)}
      style={{ background: color, borderRadius: '225px 12px 255px 12px / 12px 255px 12px 225px', boxShadow: '2px 2px 0 var(--border)' }}
      {...props}
    >
      {children}
    </span>
  )
}

export function Skeleton({ className, ...props }) {
  return <div className={cn('skeleton-shimmer rounded-2xl border-[3px] border-dashed border-[var(--text-3)]', className)} {...props} />
}

export function Alert({ kind = 'info', className, children, ...props }) {
  const colors = {
    info: 'bg-[#e0f2fe]',
    warn: 'bg-[#fef3c7]',
    error: 'bg-[#ffe4e6]',
    ok: 'bg-[#dcfce7]',
  }
  return (
    <div
      role="alert"
      className={cn('doodle-card flex items-start gap-3 p-4 text-left text-[15px] font-semibold text-[#1c1917]', colors[kind], className)}
      {...props}
    >
      {children}
    </div>
  )
}
