import { useState, useCallback } from 'react'
import { Transaction, getTransactionHistory } from '../api/ethplorer'

const ITEMS_PER_PAGE = 5

export function useTransactionHistory() {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])
  const [data, setData] = useState<Transaction[]>([])
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const updateCurrentPageData = useCallback(
    (page: number, transactions: Transaction[]) => {
      const startIndex = (page - 1) * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE
      const paginatedData = transactions.slice(startIndex, endIndex)

      setData(paginatedData)
      setCurrentPage(page)
      setHasMore(endIndex < transactions.length)
    },
    []
  )

  const fetchTransactionHistory = useCallback(
    async (address: string) => {
      try {
        setIsLoading(true)
        setError('')
        const response = await getTransactionHistory(address)

        // Ensure each transaction has a unique identifier
        interface TransactionResponse {
          operations: Transaction[]
        }

        const transactions: Transaction[] = (
          response as TransactionResponse
        ).operations.map((tx: Transaction, index: number) => ({
          ...tx,
          uniqueId: `${tx.hash}-${tx.timestamp}-${index}`,
        }))

        setAllTransactions(transactions)
        updateCurrentPageData(1, transactions)
      } catch (err) {
        setError('Failed to fetch transaction history')
        setAllTransactions([])
        setData([])
        setHasMore(false)
      } finally {
        setIsLoading(false)
      }
    },
    [updateCurrentPageData]
  )

  const handlePageChange = useCallback(
    (page: number) => {
      if (
        page < 1 ||
        page > Math.ceil(allTransactions.length / ITEMS_PER_PAGE)
      ) {
        return
      }
      updateCurrentPageData(page, allTransactions)
    },
    [allTransactions, updateCurrentPageData]
  )

  return {
    data,
    error,
    isLoading,
    fetchTransactionHistory,
    currentPage,
    hasMore,
    handlePageChange,
    totalTransactions: allTransactions.length,
  }
}
