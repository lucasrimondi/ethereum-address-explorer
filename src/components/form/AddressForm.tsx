'use client'

import { useState, FormEvent } from 'react'
import { ArrowRight, RotateCw } from 'lucide-react'
import { isValidEthereumAddress } from '@/lib/validation'
import { Input } from '@/components/ui/Input'
import { IconButton } from '@/components/ui/IconButton'
import { WalletInfo } from '../wallet/WalletInfo'
import { useQueryClient } from '@tanstack/react-query'

export function AddressForm() {
  const [address, setAddress] = useState('')
  const [submittedAddress, setSubmittedAddress] = useState('')
  const [error, setError] = useState('')
  const queryClient = useQueryClient()

  const isValid = address && isValidEthereumAddress(address)
  const shouldRefetch = isValid && address === submittedAddress

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (shouldRefetch) {
      queryClient.invalidateQueries({ queryKey: ['addressInfo', address] })
      queryClient.invalidateQueries({
        queryKey: ['transactionHistory', address],
      })
    }
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
    <div className="flex w-full flex-col items-center gap-8">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-start gap-2 rounded-3xl bg-secondary p-2 sm:gap-3 sm:p-3 md:gap-4 md:p-4 lg:p-8">
          <div className="relative flex-1">
            <Input
              type="text"
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
              placeholder="Please enter a valid Ethereum address (0x...)"
              error={error}
              className="w-full font-mono text-sm sm:text-base lg:text-lg"
              style={{ letterSpacing: '0.5px' }}
              maxLength={42}
            />
          </div>
          <IconButton
            type="submit"
            icon={
              shouldRefetch ? (
                <RotateCw className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-9 lg:w-9" />
              ) : (
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-9 lg:w-9" />
              )
            }
            disabled={!isValid}
            aria-label={
              shouldRefetch ? 'Refresh address data' : 'Submit address'
            }
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-[3.8rem] md:w-14"
          />
        </div>
      </form>
      <WalletInfo address={submittedAddress} />
    </div>
  )
}
