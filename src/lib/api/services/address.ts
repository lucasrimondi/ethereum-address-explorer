import { ETHPLORER_API_KEY, ETHPLORER_API_URL } from '../../config'
import { AddressInfoResponse, TransactionResponse } from '../dto/response.dto'

async function getAddressInfo(address: string): Promise<AddressInfoResponse> {
  const response = await fetch(
    `${ETHPLORER_API_URL}/getAddressInfo/${address}?apiKey=${ETHPLORER_API_KEY}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch address info')
  }

  return response.json()
}

async function getTransactionHistory(
  address: string
): Promise<TransactionResponse> {
  const response = await fetch(
    `${ETHPLORER_API_URL}/getAddressHistory/${address}?apiKey=${ETHPLORER_API_KEY}&limit=50&type=transfer`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch transaction history')
  }

  return response.json()
}

export const addressService = {
  getAddressInfo,
  getTransactionHistory,
}
