import clsx from 'clsx'

interface ErrorStateProps {
  error: string
  className?: string
}

export function CardErrorState({ error, className }: ErrorStateProps) {
  return (
    <div
      className={clsx(
        'min-h-[300px] w-full rounded-2xl bg-red-500/10 p-4 text-red-500 xl:min-h-[400px]',
        className
      )}
    >
      {error}
    </div>
  )
}
