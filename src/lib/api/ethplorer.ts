import { ETHPLORER_API_KEY, ETHPLORER_API_URL } from '../config'

export interface AddressInfo {
  address: string
  ETH: {
    balance: number
    price: {
      rate: number
      diff: number
      diff7d: number
      ts: number
      marketCapUsd: number
      availableSupply: number
      volume24h: number
    }
  }
  tokens: Array<{
    tokenInfo: {
      address: string
      name: string
      symbol: string
      decimals: string
      price: {
        rate: number
        diff: number
        diff7d: number
        ts: number
        marketCapUsd: number
        availableSupply: number
        volume24h: number
      }
    }
    balance: number
  }>
}

export async function getAddressInfo(address: string): Promise<AddressInfo> {
  const response = await fetch(
    `${ETHPLORER_API_URL}/getAddressInfo/${address}?apiKey=${ETHPLORER_API_KEY}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch address info')
  }

  return response.json()
}
