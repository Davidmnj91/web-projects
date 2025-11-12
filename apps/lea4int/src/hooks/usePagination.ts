import { useState } from 'react'

export const usePagination = <T>(items: T[], itemsPerPage: number, maxPaginationLinks: number) => {
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = () => {
    return Math.ceil(items.length / itemsPerPage)
  }
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const canGoToPage = (pageNumber: number) => {
    return pageNumber >= 0 && pageNumber < totalPages()
  }

  const canGoPrevPage = () => {
    return canGoToPage(currentPage - 1)
  }

  const canGoNextPage = () => {
    return canGoToPage(currentPage + 1)
  }

  const paginationLinks = () => {
    const startIndex = Math.max(0, currentPage - maxPaginationLinks)
    const endIndex = Math.min(currentPage + maxPaginationLinks, totalPages())
    return Array.from({ length: maxPaginationLinks }, (_, k) => startIndex + k).filter((i) => i < endIndex)
  }

  const currentItems = () => {
    return items.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
  }

  return {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    canGoPrevPage,
    canGoNextPage,
    paginationLinks,
  }
}
