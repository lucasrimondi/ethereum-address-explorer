'use client'

import { WalletBalance } from './WalletBalance'
import { TransactionHistory } from './TransactionHistory'

interface WalletInfoProps {
  address: string
}

export function WalletInfo({ address }: WalletInfoProps) {
  return (
    <div className="grid w-full gap-4 xl:grid-cols-2">
      <WalletBalance address={address} />
      <TransactionHistory address={address} />
    </div>
  )
}
