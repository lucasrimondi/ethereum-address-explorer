'use client'

import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export function Button({
  children,
  disabled,
  isLoading,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-lg px-6 py-2 text-primary transition-all duration-200',
        {
          'cursor-not-allowed opacity-50': disabled || isLoading,
          'bg-secondary hover:bg-opacity-90': !disabled,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
