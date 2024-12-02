import { useQuery } from '@tanstack/react-query'
import { useState, useCallback } from 'react'
import { getTransactionHistory } from '../ethplorer'

const ITEMS_PER_PAGE = 5

export function useTransactionHistory(address?: string) {
  const [currentPage, setCurrentPage] = useState(1)

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
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedData = transactions.slice(startIndex, endIndex)
  const hasMore = endIndex < transactions.length

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > Math.ceil(transactions.length / ITEMS_PER_PAGE)) {
        return
      }
      setCurrentPage(page)
    },
    [transactions.length]
  )

  return {
    data: paginatedData,
    error: error ? 'Failed to fetch transaction history' : '',
    isLoading,
    currentPage,
    hasMore,
    handlePageChange,
    totalTransactions: transactions.length,
  }
}
