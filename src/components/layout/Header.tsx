'use client'

import { Search } from 'lucide-react'
import { Badge } from '../ui/Badge'

export function Header() {
  return (
    <header className="w-full">
      <div className="mx-auto w-full rounded-3xl bg-blue">
        <div className="flex flex-col items-start gap-4 px-4 py-4 sm:px-6 sm:py-8">
          <div className="flex gap-1 text-center">
            <Badge>
              <h1 className="text-l transform cursor-default transition-transform duration-300 ease-in-out hover:scale-105 sm:text-xl md:text-2xl lg:text-3xl ">
                reXplorer
              </h1>
            </Badge>
            <Badge className="md:px-6">
              <Search
                className="h-4 w-4 transform text-blue transition-transform duration-300 ease-in-out hover:scale-110 sm:h-6 sm:w-6 md:h-8 md:w-8"
                strokeWidth={3}
              />
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
