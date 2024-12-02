import { useState, useCallback } from 'react'

interface PaginationOptions {
  itemsPerPage?: number
  initialPage?: number
}

export function usePagination<T>(
  items: T[],
  { itemsPerPage = 5, initialPage = 1 }: PaginationOptions = {}
) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = items.slice(startIndex, endIndex)
  const totalPages = Math.ceil(items.length / itemsPerPage)
  const hasMore = endIndex < items.length

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return
      setCurrentPage(page)
    },
    [totalPages]
  )

  return {
    items: paginatedItems,
    currentPage,
    hasMore,
    handlePageChange,
    totalItems: items.length,
    showPagination: items.length > itemsPerPage,
  }
}
