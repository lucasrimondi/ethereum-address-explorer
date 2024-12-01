'use client'

import { useState, FormEvent } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { isValidEthereumAddress } from '@/lib/validation'
import { Input } from '@/components/ui/Input'
import clsx from 'clsx'

export function AddressForm() {
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const isValid = address && isValidEthereumAddress(address)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setIsLoading(true)
    // TODO: Handle form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
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
    <form onSubmit={handleSubmit} className="w-full max-w-3xl px-4">
      <div className="flex items-start gap-3 rounded-lg bg-secondary p-3 sm:gap-4 sm:p-4">
        <div className="relative flex-1">
          <Input
            type="text"
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            placeholder="0x..."
            error={error}
            disabled={isLoading}
            className="w-full font-mono text-sm sm:text-base"
            style={{ letterSpacing: '0.5px' }}
            maxLength={42}
          />
        </div>
        <div
          className={clsx(
            'bg-arrow-badge flex h-12 w-16 shrink-0 items-center justify-center rounded-full transition-all',
            {
              'cursor-not-allowed opacity-50': !isValid || isLoading,
              'hover:bg-arrow-badge/80 cursor-pointer': isValid && !isLoading,
            }
          )}
        >
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="flex h-full w-full items-center justify-center"
            aria-label="Submit address"
          >
            {isLoading ? (
              <Loader2 className="h-7 w-7 animate-spin text-secondary" />
            ) : (
              <ArrowRight className="h-8 w-8 text-secondary" />
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
