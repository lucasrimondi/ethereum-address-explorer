import { useQuery } from '@tanstack/react-query'
import { usePagination } from '@/lib/hooks/usePagination'
import { addressService } from '../services/address'

export function useTransactionHistory(address?: string) {
  const {
    data: response,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['transactionHistory', address],
    queryFn: () => addressService.getTransactionHistory(address!),
    enabled: !!address,
  })

  const transactions = response?.operations || []
  const {
    items: paginatedTransactions,
    currentPage,
    hasMore,
    handlePageChange,
    showPagination,
  } = usePagination(transactions)

  return {
    transactions: paginatedTransactions,
    error: error ? 'Failed to fetch transaction history' : '',
    isLoading,
    isFetching,
    currentPage,
    hasMore,
    handlePageChange,
    totalTransactions: transactions.length,
    showPagination,
  }
}
