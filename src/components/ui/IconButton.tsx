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
        'bg-blue flex items-center justify-center rounded-xl transition-all',
        {
          'opacity-50': disabled || isLoading,
          'hover:bg-blue/80 cursor-pointer': !disabled && !isLoading,
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
