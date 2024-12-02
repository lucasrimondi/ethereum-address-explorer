import { useQuery } from '@tanstack/react-query'
import { getTransactionHistory } from '../ethplorer'
import { usePagination } from '@/lib/hooks/usePagination'

export function useTransactionHistory(address?: string) {
  const {
    data: response,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['transactionHistory', address],
    queryFn: () => getTransactionHistory(address!),
    enabled: !!address,
  })

  const transactions = response?.operations || []
  const {
    items: paginatedData,
    currentPage,
    hasMore,
    handlePageChange,
    showPagination,
  } = usePagination(transactions)

  return {
    data: paginatedData,
    error: error ? 'Failed to fetch transaction history' : '',
    isLoading,
    currentPage,
    hasMore,
    handlePageChange,
    totalTransactions: transactions.length,
    showPagination,
  }
}
