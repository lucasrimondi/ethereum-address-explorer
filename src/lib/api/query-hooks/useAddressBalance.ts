import { useQuery } from '@tanstack/react-query'
import { useTokenData } from '@/lib/hooks/useTokenData'
import { usePagination } from '@/lib/hooks/usePagination'
import { addressService } from '../services/address'

export function useAddressBalance(address: string) {
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['addressInfo', address],
    queryFn: () => addressService.getAddressInfo(address!),
    enabled: !!address,
  })

  const tokens = useTokenData(data)
  const {
    items: paginatedTokens,
    currentPage,
    hasMore,
    handlePageChange,
    showPagination,
  } = usePagination(tokens, { itemsPerPage: 7 })

  return {
    tokens: paginatedTokens,
    error: error ? 'Failed to fetch address information' : '',
    isLoading,
    isFetching,
    currentPage,
    hasMore,
    handlePageChange,
    showPagination,
  }
}
