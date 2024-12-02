'use client'

import { useEffect, useCallback } from 'react'
import { Wallet, Loader2, ChevronDown, Eye, EyeOff } from 'lucide-react'
import { useAddressInfo } from '@/lib/hooks/useAddressInfo'
import { formatUSD } from '@/lib/utils/format'
import { calculateTotalBalance } from '@/lib/utils/calculations'
import { TokensList } from './TokensList'
import { AddressDisplay } from './AddressDisplay'
import { useBalanceVisibility } from '@/lib/context/BalanceVisibilityContext'
import { IconButton } from '../ui/IconButton'
import clsx from 'clsx'

interface WalletBalanceProps {
  address: string
  className?: string
}

export function WalletBalance({ address, className }: WalletBalanceProps) {
  const { data, error, isLoading, fetchAddressInfo } = useAddressInfo()
  const { isVisible, toggleVisibility } = useBalanceVisibility()

  const fetchData = useCallback(async () => {
    if (address) {
      await fetchAddressInfo(address)
    }
  }, [address, fetchAddressInfo])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (error) {
    return (
      <div className="w-full rounded-2xl bg-red-500/10 p-4 text-red-500 lg:text-lg">
        {error}
      </div>
    )
  }

  const ethBalance = data?.ETH?.balance ?? 0
  const ethPrice = data?.ETH?.price?.rate ?? 0
  const tokens = data?.tokens ?? []

  const { totalValueUSD } = calculateTotalBalance(ethBalance, ethPrice, tokens)

  return (
    <div
      className={clsx(
        'bg-wallet w-full overflow-hidden rounded-2xl p-4 text-secondary transition-all duration-300 sm:p-6 md:p-8',
        {
          'animate-pulse': isLoading,
        },
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold sm:text-lg md:text-xl lg:text-2xl">
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
                      onClick={toggleVisibility}
                      className="h-5 w-5 bg-transparent hover:bg-secondary/5 sm:h-6 sm:w-6"
                      aria-label={isVisible ? 'Hide balance' : 'Show balance'}
                    />
                  </div>
                  <AddressDisplay address={address} />
                </div>
              </div>
              <span className="font-mono text-xl font-bold md:text-2xl lg:text-3xl">
                {isVisible ? formatUSD(totalValueUSD) : '••••••'}
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
            ethBalance={ethBalance}
            ethPrice={ethPrice}
            hideBalances={!isVisible}
          />
        </div>
      )}
    </div>
  )
}
