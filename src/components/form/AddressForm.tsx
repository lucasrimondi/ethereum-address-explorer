'use client'

import { useState, FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { isValidEthereumAddress } from '@/lib/validation'
import { Input } from '@/components/ui/Input'
import { IconButton } from '../ui/IconButton'
import { WalletBalance } from '../wallet/WalletBalance'

export function AddressForm() {
  const [address, setAddress] = useState('')
  const [submittedAddress, setSubmittedAddress] = useState('')
  const [error, setError] = useState('')

  const isValid = address && isValidEthereumAddress(address)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setSubmittedAddress(address)
    setAddress('')
  }

  const handleAddressChange = (value: string) => {
    setAddress(value)
    if (!value) {
      setError('')
    } else if (!isValidEthereumAddress(value)) {
      setError('Invalid Ethereum address')
    } else {
      setError('')
    }
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <form onSubmit={handleSubmit} className="w-full px-2 sm:px-4">
        <div className="flex items-start gap-3 rounded-2xl bg-secondary p-6 sm:gap-4 sm:p-10">
          <div className="relative flex-1">
            <Input
              type="text"
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
              placeholder="0x..."
              error={error}
              className="w-full font-mono text-sm sm:text-base"
              style={{ letterSpacing: '0.5px' }}
              maxLength={42}
            />
          </div>
          <IconButton
            type="submit"
            icon={<ArrowRight />}
            disabled={!isValid}
            aria-label="Submit address"
          />
        </div>
      </form>
      {submittedAddress && (
        <div className="w-full px-2 sm:px-4">
          <WalletBalance address={submittedAddress} />
        </div>
      )}
    </div>
  )
}
