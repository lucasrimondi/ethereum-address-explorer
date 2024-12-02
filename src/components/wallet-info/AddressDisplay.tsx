'use client'

import { Copy, Check } from 'lucide-react'
import { useCallback, useState } from 'react'
import { IconButton } from '../ui/IconButton'
import { formatAddress } from '@/lib/utils/format'
import clsx from 'clsx'

interface AddressDisplayProps {
  address: string
  className?: string
}

export function AddressDisplay({ address, className }: AddressDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy address:', err)
    }
  }, [address])

  return (
    <div className={clsx('flex items-center gap-1 sm:gap-2', className)}>
      <code className="rounded-lg bg-secondary/5 px-1.5 py-0.5 font-mono text-[8px] text-secondary/70 sm:px-2 sm:py-1 sm:text-base">
        {formatAddress(address)}
      </code>
      <IconButton
        type="button"
        icon={
          copied ? (
            <Check className="h-3 w-3 sm:h-4 sm:w-4" />
          ) : (
            <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
          )
        }
        onClick={handleCopy}
        className="h-5 w-5 bg-transparent hover:bg-secondary/5 sm:h-6 sm:w-6"
        aria-label={copied ? 'Copied!' : 'Copy address'}
      />
    </div>
  )
}
