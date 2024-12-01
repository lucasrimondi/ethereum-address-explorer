import { useState, useCallback } from 'react'
import { AddressInfo, getAddressInfo } from '../api/ethplorer'

export function useAddressInfo() {
  const [data, setData] = useState<AddressInfo | null>(null)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchAddressInfo = useCallback(async (address: string) => {
    try {
      setIsLoading(true)
      setError('')
      const info = await getAddressInfo(address)
      setData(info)
    } catch (err) {
      setError('Failed to fetch address information')
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, error, isLoading, fetchAddressInfo }
}
