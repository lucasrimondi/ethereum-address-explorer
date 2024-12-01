'use client'

import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <>
      <input
        className={clsx(
          'w-full rounded-lg border-0 bg-input text-primary placeholder-primary/50',
          'focus:outline-none focus:ring-1 focus:ring-secondary/30',
          'overflow-x-auto',
          'xs:px-3 xs:py-2 px-2 py-1 sm:px-4 sm:py-3',
          {
            'ring-1 ring-red-500': error,
          },
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </>
  )
}
