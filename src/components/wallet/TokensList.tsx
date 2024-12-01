import { formatUSD } from '@/lib/utils/format'

interface Token {
  tokenInfo: {
    name: string
    symbol: string
    decimals: string
    price?: {
      rate: number
    }
  }
  balance: number
}

interface TokensListProps {
  tokens: Token[]
  ethBalance: number
  ethPrice: number
  hideBalances?: boolean
}

export function TokensList({
  tokens,
  ethBalance,
  ethPrice,
  hideBalances = false,
}: TokensListProps) {
  const nonZeroTokens = tokens.filter((token) => {
    const balance =
      token.balance / Math.pow(10, parseInt(token.tokenInfo.decimals) || 18)
    return balance > 0
  })

  const allAssets = [
    {
      tokenInfo: {
        symbol: 'ETH',
        decimals: '18',
        price: { rate: ethPrice },
      },
      balance: ethBalance * 1e18, // Convert to wei for consistent handling
    },
    ...nonZeroTokens,
  ]

  return (
    <div className="flex flex-col divide-y divide-secondary/10">
      {allAssets.map((token, index) => {
        const balance =
          token.balance / Math.pow(10, parseInt(token.tokenInfo.decimals) || 18)
        const value = balance * (token.tokenInfo.price?.rate ?? 0)

        return (
          <div
            key={index}
            className="flex items-baseline justify-between py-2 first:pt-0 last:pb-0"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium sm:text-sm md:text-base">
                {token.tokenInfo.symbol}
              </span>
              <span className="text-[10px] text-secondary/50 sm:text-xs">
                {hideBalances ? '*****' : balance.toFixed(4)}
              </span>
            </div>
            <span className="font-mono text-xs sm:text-sm md:text-base">
              {hideBalances ? '$*****' : formatUSD(value)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
