import { useQuery } from '@tanstack/react-query'
import { getAddressInfo } from '../ethplorer'

export function useAddressBalance(address?: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['addressInfo', address],
    queryFn: () => getAddressInfo(address!),
    enabled: !!address,
  })

  return {
    data,
    error: error ? 'Failed to fetch address information' : '',
    isLoading,
  }
}
