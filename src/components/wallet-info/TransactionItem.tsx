'use client'

import { Transaction } from '@/lib/api/ethplorer'
import { formatAddress } from '@/lib/utils/format'
import { formatDistanceToNow } from 'date-fns'
import { ethers } from 'ethers'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

interface TransactionItemProps {
  transaction: Transaction
  userAddress: string
}

export function TransactionItem({
  transaction,
  userAddress,
}: TransactionItemProps) {
  const value = transaction.tokenInfo
    ? transaction.value / Math.pow(10, transaction.tokenInfo.decimals)
    : ethers.formatEther(transaction.value.toString())

  const symbol = transaction.tokenInfo?.symbol || 'ETH'
  const timestamp = new Date(transaction.timestamp * 1000)
  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true })

  const isIncoming = transaction.to.toLowerCase() === userAddress.toLowerCase()

  return (
    <div className="flex flex-col gap-1 rounded-lg bg-secondary/5 p-3 text-sm lg:text-base">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isIncoming ? (
            <ArrowDownRight className="text-header h-4 w-4 lg:h-5 lg:w-5" />
          ) : (
            <ArrowUpRight className="h-4 w-4 text-footer lg:h-5 lg:w-5" />
          )}
          <span className="font-medium">
            {parseFloat(value.toString()).toFixed(6)} {symbol}
          </span>
        </div>
        <span className="text-xs text-secondary/50 lg:text-base">
          {timeAgo}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs lg:text-base">
        <span className="text-secondary/50">From:</span>
        <code className="font-mono">{formatAddress(transaction.from)}</code>
      </div>
      <div className="flex items-center gap-2 text-xs lg:text-base">
        <span className="text-secondary/50">To:</span>
        <code className="font-mono">{formatAddress(transaction.to)}</code>
      </div>
    </div>
  )
}
