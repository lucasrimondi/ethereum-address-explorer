export interface AddressInfoResponse {
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
