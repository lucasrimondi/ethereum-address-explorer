'use client'

import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useTransactionHistory } from '@/lib/hooks/useTransactionHistory'
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
    fetchTransactionHistory,
    currentPage,
    hasMore,
    handlePageChange,
    totalTransactions,
  } = useTransactionHistory()

  useEffect(() => {
    if (address) {
      fetchTransactionHistory(address)
    }
  }, [address, fetchTransactionHistory])

  if (error) {
    return (
      <div className="w-full rounded-2xl bg-red-500/10 p-4 text-red-500 lg:text-lg">
        {error}
      </div>
    )
  }

  return (
    <div
      className={clsx(
        'w-full overflow-hidden rounded-2xl bg-arrow-badge p-4 text-secondary transition-all duration-300 sm:p-6 md:p-8',
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
            Recent Transfers
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
              {data.map((transaction) => (
                <TransactionItem
                  key={transaction.uniqueId}
                  transaction={transaction}
                  userAddress={address}
                />
              ))}
              {data.length === 0 && (
                <p className="text-center text-secondary/50 lg:text-lg">
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
