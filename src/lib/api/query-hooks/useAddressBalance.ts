import { useQuery } from '@tanstack/react-query'
import { getAddressInfo } from '../ethplorer'
import { useTokenData } from '@/lib/hooks/useTokenData'
import { usePagination } from '@/lib/hooks/usePagination'

export function useAddressBalance(address?: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['addressInfo', address],
    queryFn: () => getAddressInfo(address!),
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
    currentPage,
    hasMore,
    handlePageChange,
    showPagination,
  }
}
