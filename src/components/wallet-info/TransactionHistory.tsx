'use client'

import { Loader2, ArrowLeftRight } from 'lucide-react'
import { useTransactionHistory } from '@/lib/api/query-hooks/useTransactionHistory'
import { TransactionItem } from './TransactionItem'
import { Pagination } from '../ui/Pagination'
import clsx from 'clsx'

interface TransactionHistoryProps {
  address: string
  className?: string
}

export function TransactionHistory({
  address,
  className,
}: TransactionHistoryProps) {
  const {
    data,
    error,
    isLoading,
    currentPage,
    hasMore,
    handlePageChange,
    totalTransactions,
  } = useTransactionHistory(address)

  if (!address) {
    return (
      <div className="relative min-h-[300px] w-full content-center rounded-3xl bg-arrow-badge p-4 text-secondary xl:min-h-[400px]">
        <ArrowLeftRight className="absolute left-4 top-4 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
        <p className="absolute bottom-4 right-4 max-w-[80%] text-right text-xs sm:text-base md:text-lg lg:text-xl">
          Track your recent token transfers — see where your crypto has been
          moving!
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[300px] w-full rounded-3xl bg-red-500/10 p-4 text-red-500 xl:min-h-[400px]">
        {error}
      </div>
    )
  }

  return (
    <div
      className={clsx(
        'w-full overflow-hidden rounded-2xl bg-arrow-badge p-4 text-secondary transition-all duration-300 sm:p-6 md:p-8',
        'min-h-[300px] xl:min-h-[400px]',
        {
          'animate-pulse': isLoading,
        },
        className
      )}
    >
      <div
        className={clsx(
          'h-full w-full overflow-hidden rounded-3xl bg-primary p-4 text-secondary transition-all duration-300 sm:p-6 md:p-8',
          {
            'animate-pulse': isLoading,
          },
          className
        )}
      >
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold sm:text-xl lg:text-2xl">
            Recent Token Transfers
          </h2>
          {totalTransactions > 0 && (
            <span className="text-xs text-secondary/70 lg:text-sm">
              {totalTransactions} total
            </span>
          )}
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              {data.map((transaction, index) => (
                <TransactionItem
                  key={index}
                  transaction={transaction}
                  userAddress={address}
                />
              ))}
              {data.length === 0 && (
                <p className="mt-8 text-center text-secondary/50 lg:text-lg">
                  No transfers found
                </p>
              )}
            </div>
            {totalTransactions > 0 && (
              <Pagination
                currentPage={currentPage}
                hasMore={hasMore}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
