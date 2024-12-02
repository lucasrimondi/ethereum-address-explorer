import { isAddress } from 'ethers'

export const isValidEthereumAddress = (address: string): boolean => {
  try {
    return isAddress(address)
  } catch {
    return false
  }
}
