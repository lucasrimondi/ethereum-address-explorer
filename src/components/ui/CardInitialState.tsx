import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardInitialStateProps {
  message: string
  icon?: ReactNode
  className?: string
}

export function CardInitialState({
  message,
  icon,
  className,
}: CardInitialStateProps) {
  return (
    <div
      className={clsx(
        'relative min-h-[300px] w-full content-center rounded-3xl p-4 text-secondary xl:min-h-[400px]',
        className
      )}
    >
      {icon && <div className="absolute left-4 top-4">{icon}</div>}
      <p className="absolute bottom-4 right-4 max-w-[60%] text-right text-xs sm:text-base md:text-lg lg:text-xl">
        {message}
      </p>
    </div>
  )
}
