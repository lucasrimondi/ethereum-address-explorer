'use client'

import { Loader2, ArrowLeftRight } from 'lucide-react'
import { useTransactionHistory } from '@/lib/api/query-hooks/useTransactionHistory'
import { Pagination } from '../ui/Pagination'
import clsx from 'clsx'
import { CardInitialState } from '../ui/CardInitialState'
import { CardErrorState } from '../ui/CardErrorState'
import { TransactionItem } from './TransactionItem'

interface TransactionHistoryProps {
  address: string
  className?: string
}

export function TransactionHistory({
  address,
  className,
}: TransactionHistoryProps) {
  const {
    transactions,
    error,
    isLoading,
    isFetching,
    currentPage,
    hasMore,
    handlePageChange,
    totalTransactions,
  } = useTransactionHistory(address)

  if (!address) {
    return (
      <CardInitialState
        message="Track your recent token transfers — see where your crypto has been moving!"
        icon={
          <ArrowLeftRight className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
        }
        className="bg-green"
      />
    )
  }

  if (error) {
    return <CardErrorState error={error} />
  }

  return (
    <div
      className={clsx(
        'w-full rounded-2xl bg-green p-4 transition-all duration-300 sm:p-6 md:p-8',
        'min-h-[300px] xl:min-h-[400px]',
        {
          'animate-pulse': isLoading || isFetching,
        },
        className
      )}
    >
      <div
        className={clsx(
          'h-full w-full overflow-hidden rounded-3xl bg-primary p-4 text-secondary transition-all duration-300 sm:p-6 md:p-8',
          {
            'animate-pulse': isLoading || isFetching,
          },
          className
        )}
      >
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg sm:text-xl lg:text-2xl">Transactions</h2>
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
              {transactions.map((transaction, index) => (
                <TransactionItem
                  key={index}
                  transaction={transaction}
                  userAddress={address}
                />
              ))}
              {transactions.length === 0 && (
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
