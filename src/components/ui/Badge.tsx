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
        'inline-block rounded-full bg-secondary px-8 py-6 text-primary',
        className
      )}
    >
      {children}
    </span>
  )
}
