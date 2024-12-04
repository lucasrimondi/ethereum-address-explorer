'use client'

import { memo } from 'react'
import { formatAddress } from '@/lib/utils/format'
import { formatDistanceToNow } from 'date-fns'
import { ethers } from 'ethers'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Transaction } from '../../lib/api/dto/response.dto'
import { ETHERSCAN_TXSCAN_TEMPLATE } from '../../lib/utils/constants'

interface TransactionItemProps {
  transaction: Transaction
  userAddress: string
}

function TransactionItemComponent({
  transaction,
  userAddress,
}: TransactionItemProps) {
  const value = transaction.tokenInfo
    ? transaction.value / Math.pow(10, transaction.tokenInfo.decimals)
    : ethers.formatEther(transaction.value.toString())

  const symbol = transaction.tokenInfo?.symbol
  const timestamp = new Date(transaction?.timestamp * 1000)
  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true })

  const isIncoming = transaction?.to.toLowerCase() === userAddress.toLowerCase()

  const txScanUrl = ETHERSCAN_TXSCAN_TEMPLATE.replace(
    ':txId',
    transaction.transactionHash
  )

  return (
    <a
      href={txScanUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline"
    >
      <div className="flex transform flex-col gap-1 rounded-lg bg-secondary/5 p-3 text-sm transition-transform hover:scale-[1.02] hover:bg-secondary/10 hover:shadow-lg lg:text-base">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isIncoming ? (
              <ArrowDownRight className="h-4 w-4 text-green lg:h-5 lg:w-5" />
            ) : (
              <ArrowUpRight className="h-4 w-4 text-footer lg:h-5 lg:w-5" />
            )}
            <span>
              {parseFloat(value.toString()).toFixed(6)} {symbol}
            </span>
          </div>
          <span className="text-xs text-secondary/50 lg:text-base">
            {timeAgo}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs lg:text-base">
          <span className="text-secondary/50">From:</span>
          <code>{formatAddress(transaction.from)}</code>
        </div>
        <div className="flex items-center gap-2 text-xs lg:text-base">
          <span className="text-secondary/50">To:</span>
          <code>{formatAddress(transaction.to)}</code>
        </div>
      </div>
    </a>
  )
}

export const TransactionItem = memo(TransactionItemComponent)
