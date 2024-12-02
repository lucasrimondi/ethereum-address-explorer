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
        'flex items-center justify-center rounded-xl bg-arrow-badge transition-all',
        {
          'opacity-50': disabled || isLoading,
          'cursor-pointer hover:bg-arrow-badge/80': !disabled && !isLoading,
        },
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin text-secondary sm:h-6 sm:w-6 md:h-7 md:w-7" />
      ) : (
        <div className="flex items-center justify-center text-secondary">
          {icon}
        </div>
      )}
    </button>
  )
}
