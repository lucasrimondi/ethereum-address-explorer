'use client'

import { ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import clsx from 'clsx'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  isLoading?: boolean
}

export function IconButton({
  icon,
  isLoading,
  className,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        'flex h-12 w-16 items-center justify-center rounded-full bg-arrow-badge transition-all',
        {
          'cursor-not-allowed opacity-50': disabled || isLoading,
          'cursor-pointer hover:bg-arrow-badge/80': !disabled && !isLoading,
        },
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin text-secondary" />
      ) : (
        <div className="flex h-6 w-6 items-center justify-center text-secondary">
          {icon}
        </div>
      )}
    </button>
  )
}
