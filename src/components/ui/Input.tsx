'use client'

import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'bg-input w-full rounded-lg border-0 px-4 py-3 text-primary placeholder-primary/50',
        'focus:outline-none focus:ring-1 focus:ring-secondary/30',
        {
          'ring-1 ring-red-500': error,
        },
        className
      )}
      {...props}
    />
  )
}
