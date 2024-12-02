import { ReactNode } from 'react'
import clsx from 'clsx'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-full bg-secondary text-primary',
        'px-3 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4',
        className
      )}
    >
      {children}
    </span>
  )
}
