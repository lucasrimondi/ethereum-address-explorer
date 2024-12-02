import { AddressInfoResponse } from '../api/dto/response.dto'

export interface TokenData {
  symbol: string
  balance: number
  balanceUSD: number
  decimals: number
}

export function useTokenData(
  data: AddressInfoResponse | undefined
): TokenData[] {
  if (!data) return []

  const { ETH, tokens = [] } = data

  // Transform ETH data
  const ethData: TokenData = {
    symbol: 'ETH',
    decimals: 18,
    balance: ETH?.balance ?? 0,
    balanceUSD: (ETH?.balance ?? 0) * (ETH?.price?.rate ?? 0),
  }

  // Transform token data
  const tokenData: TokenData[] = tokens
    .map((token) => {
      const decimals = parseInt(token.tokenInfo.decimals) || 18
      const balance = token.balance / Math.pow(10, decimals)
      const rate = token.tokenInfo.price?.rate ?? 0

      return {
        symbol: token.tokenInfo.symbol,
        decimals,
        balance,
        balanceUSD: balance * rate,
      }
    })
    .filter((token) => token.balance > 0)

  return [ethData, ...tokenData]
}
