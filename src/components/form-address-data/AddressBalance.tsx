'use client'

import { useMemo, useState } from 'react'
import { Wallet, Loader2, ChevronDown, Eye, EyeOff } from 'lucide-react'
import { formatUSD } from '@/lib/utils/format'
import { AddressDisplay } from './AddressDisplay'
import { IconButton } from '../ui/IconButton'
import clsx from 'clsx'
import { useAddressBalance } from '../../lib/api/query-hooks/useAddressBalance'
import { CardInitialState } from '../ui/CardInitialState'
import { CardErrorState } from '../ui/CardErrorState'
import { TokensList } from './TokensList'

interface AddressBalanceProps {
  address: string
  className?: string
}

export function AddressBalance({ address, className }: AddressBalanceProps) {
  const [isVisible, setIsVisible] = useState(true)
  const {
    allTokens,
    tokens,
    error,
    isLoading,
    isFetching,
    currentPage,
    hasMore,
    handlePageChange,
    showPagination,
  } = useAddressBalance(address)

  const totalBalance = useMemo(
    () => allTokens.reduce((sum, token) => sum + token.balanceUSD, 0),
    [allTokens]
  )

  if (!address) {
    return (
      <CardInitialState
        message="Get a breakdown of your wallet's balance — every token, every detail, all in one place!"
        icon={<Wallet className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />}
        className="bg-yellow"
      />
    )
  }

  if (error) {
    return <CardErrorState error={error} />
  }

  return (
    <div
      className={clsx(
        'w-full overflow-hidden rounded-2xl bg-yellow p-4 text-secondary transition-all duration-300 sm:p-6 md:p-8',
        'min-h-[300px] xl:min-h-[400px]',
        {
          'animate-pulse': isLoading || isFetching,
        },
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="flex h-full flex-col gap-4 sm:gap-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold sm:text-lg md:text-xl lg:text-3xl">
                      Total Balance
                    </h2>
                    <IconButton
                      type="button"
                      icon={
                        isVisible ? (
                          <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                        ) : (
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        )
                      }
                      onClick={() => setIsVisible((prev) => !prev)}
                      className="h-5 w-5 bg-transparent hover:bg-secondary/5 sm:h-6 sm:w-6"
                      aria-label={isVisible ? 'Hide balance' : 'Show balance'}
                    />
                  </div>
                  {address && <AddressDisplay address={address} />}
                </div>
              </div>
              <span className="text-xl font-bold md:text-2xl lg:text-4xl">
                {isVisible ? formatUSD(totalBalance) : '••••••'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-secondary/50">
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-[10px] sm:text-sm lg:text-base">
                Asset Details
              </span>
            </div>
          </div>
          <TokensList
            tokens={tokens}
            hideBalances={!isVisible}
            currentPage={currentPage}
            hasMore={hasMore}
            onPageChange={handlePageChange}
            showPagination={showPagination}
          />
        </div>
      )}
    </div>
  )
}
