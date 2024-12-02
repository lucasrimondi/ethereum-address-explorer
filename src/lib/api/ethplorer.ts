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

export interface Transaction {
  timestamp: number
  from: string
  to: string
  hash: string
  value: number
  uniqueId?: string
  tokenInfo?: {
    address: string
    name: string
    symbol: string
    decimals: number
  }
  type: string
  input: string
  success: boolean
}

export interface TransactionResponse {
  operations: Transaction[]
  hasMore: boolean
  total: number
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

export async function getTransactionHistory(
  address: string
): Promise<TransactionResponse> {
  const response = await fetch(
    `${ETHPLORER_API_URL}/getAddressHistory/${address}?apiKey=${ETHPLORER_API_KEY}&limit=50&type=transfer`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch transaction history')
  }

  const data = await response.json()

  return {
    operations: data.operations || [],
    hasMore: false,
    total: data.operations?.length || 0,
  }
}
