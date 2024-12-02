'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IconButton } from './IconButton'

interface PaginationProps {
  currentPage: number
  hasMore: boolean
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export function Pagination({
  currentPage,
  hasMore,
  onPageChange,
  isLoading,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <IconButton
        icon={<ChevronLeft className="h-7 w-7" />}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        aria-label="Previous page"
        className="bg-transparent hover:bg-secondary/10"
      />
      <span className="min-w-[3rem] text-center text-base">
        Page {currentPage}
      </span>
      <IconButton
        icon={<ChevronRight className="h-7 w-7" />}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore || isLoading}
        aria-label="Next page"
        className="bg-transparent hover:bg-secondary/10"
      />
    </div>
  )
}
