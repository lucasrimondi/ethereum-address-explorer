import { useQuery } from '@tanstack/react-query'
import { getAddressInfo, AddressInfo } from '../api/ethplorer'

export function useAddressInfo(address?: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['addressInfo', address],
    queryFn: () => getAddressInfo(address!),
    enabled: !!address,
  })

  return {
    data: data as AddressInfo | null,
    error: error ? 'Failed to fetch address information' : '',
    isLoading,
  }
}
