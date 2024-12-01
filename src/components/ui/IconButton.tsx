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
        'xs:h-9  xs:w-12 flex h-7 w-9 items-center justify-center rounded-full bg-arrow-badge transition-all sm:h-12 sm:w-16 sm:rounded-2xl',
        {
          'opacity-50': disabled || isLoading,
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
