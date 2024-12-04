'use client'

import { TransactionHistory } from './TransactionHistory'
import { AddressBalance } from './AddressBalance'

interface AddressDataProps {
  address: string
}

export function AddressData({ address }: AddressDataProps) {
  return (
    <div className="grid w-full gap-4 xl:grid-cols-2">
      <AddressBalance address={address} />
      <TransactionHistory address={address} />
    </div>
  )
}
