"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type FilterState = {
  search: string
  writer: string
  status: string
  dueDate: string
  activeFilters: string[]
}

type ProposalFilterContextType = {
  filters: FilterState
  setSearch: (search: string) => void
  setWriter: (writer: string) => void
  setStatus: (status: string) => void
  setDueDate: (dueDate: string) => void
  addFilter: (filter: string) => void
  removeFilter: (filter: string) => void
  clearFilters: () => void
}

const initialFilters: FilterState = {
  search: "",
  writer: "",
  status: "",
  dueDate: "",
  activeFilters: [],
}

const ProposalFilterContext = createContext<ProposalFilterContextType | undefined>(undefined)

export function ProposalFilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const setSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  const setWriter = (writer: string) => {
    setFilters((prev) => ({ ...prev, writer }))
  }

  const setStatus = (status: string) => {
    setFilters((prev) => ({ ...prev, status }))
  }

  const setDueDate = (dueDate: string) => {
    setFilters((prev) => ({ ...prev, dueDate }))
  }

  const addFilter = (filter: string) => {
    if (!filters.activeFilters.includes(filter)) {
      setFilters((prev) => ({
        ...prev,
        activeFilters: [...prev.activeFilters, filter],
      }))
    }
  }

  const removeFilter = (filter: string) => {
    setFilters((prev) => ({
      ...prev,
      activeFilters: prev.activeFilters.filter((f) => f !== filter),
    }))
  }

  const clearFilters = () => {
    setFilters(initialFilters)
  }

  return (
    <ProposalFilterContext.Provider
      value={{
        filters,
        setSearch,
        setWriter,
        setStatus,
        setDueDate,
        addFilter,
        removeFilter,
        clearFilters,
      }}
    >
      {children}
    </ProposalFilterContext.Provider>
  )
}

export function useProposalFilters() {
  const context = useContext(ProposalFilterContext)
  if (context === undefined) {
    throw new Error("useProposalFilters must be used within a ProposalFilterProvider")
  }
  return context
}
