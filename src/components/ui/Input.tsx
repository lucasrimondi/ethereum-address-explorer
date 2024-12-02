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
          'w-full rounded-xl border-0 bg-input px-3 py-2.5 text-primary placeholder-primary/50 sm:px-4 sm:py-3 md:px-5 md:py-4',
          'focus:outline-none focus:ring-1 focus:ring-secondary/30',
          'overflow-x-auto',
          {
            'ring-1 ring-red-500': error,
          },
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500 lg:text-base" role="alert">
          {error}
        </p>
      )}
    </>
  )
}
