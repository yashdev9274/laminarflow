"use client"

import { Search, Grid3X3, List, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FileHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  onUploadClick: () => void
}

export function FileHeader({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onUploadClick,
}: FileHeaderProps) {
  return (
    <div className="border-b border-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search or type filter"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={onUploadClick}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
