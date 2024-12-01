'use client'

import { Search } from 'lucide-react'
import { Badge } from '../ui/Badge'

export function Header() {
  return (
    <header className="w-full px-2 py-2 sm:px-4 sm:py-6">
      <div className="bg-header mx-auto w-full rounded-2xl">
        <div className="flex flex-col items-start gap-4 px-4 py-4 sm:px-6 sm:py-8">
          <div className="flex gap-1 text-center">
            <Badge>
              <Search className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
            </Badge>
            <Badge>
              <h1 className="text-l sm:text-xl md:text-2xl lg:text-3xl">
                reXplorer
              </h1>
            </Badge>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-4 px-4 py-4 sm:px-6 sm:py-8">
          <p className="text-center text-base text-xs text-primary sm:text-base md:text-lg lg:text-xl">
            Enter your Ethereum address and dive into your wallet’s journey —
            track balances, transactions, and more!
          </p>
        </div>
      </div>
    </header>
  )
}
