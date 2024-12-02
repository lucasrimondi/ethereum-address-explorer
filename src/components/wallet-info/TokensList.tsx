import { formatUSD } from '@/lib/utils/format'
import { TokenData } from '@/lib/hooks/useTokenData'

interface TokensListProps {
  tokens: TokenData[]
  hideBalances?: boolean
}

export function TokensList({ tokens, hideBalances = false }: TokensListProps) {
  return (
    <div className="flex flex-col divide-y divide-secondary/10">
      {tokens.map((token, index) => (
        <div
          key={index}
          className="flex items-baseline justify-between py-2 first:pt-0 last:pb-0"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium sm:text-sm md:text-base lg:text-xl">
              {token.symbol}
            </span>
            <span className="text-[10px] text-secondary/50 sm:text-xs lg:text-lg">
              {hideBalances ? '••••••' : token.balance.toFixed(4)}
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm md:text-base lg:text-xl">
            {hideBalances ? '••••••' : formatUSD(token.balanceUSD)}
          </span>
        </div>
      ))}
    </div>
  )
}
