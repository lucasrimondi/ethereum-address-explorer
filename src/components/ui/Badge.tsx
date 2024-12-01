import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full bg-secondary px-8 py-6 text-primary ${className}`}
    >
      {children}
    </span>
  )
}
