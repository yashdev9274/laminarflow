"use client"

import { MoreHorizontal, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export interface FileItem {
  id: string
  name: string
  size: string
  tags: string[]
  uploadDate: Date
}

interface FileTableProps {
  files: FileItem[]
  onFileAction?: (fileId: string, action: string) => void
}

export function FileTable({ files, onFileAction }: FileTableProps) {
  const handleAction = (fileId: string, action: string) => {
    onFileAction?.(fileId, action)
  }

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800 hover:bg-gray-900/50">
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Tags</TableHead>
            <TableHead className="text-gray-300">Size</TableHead>
            <TableHead className="text-gray-300 w-16">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id} className="border-gray-800 hover:bg-gray-900/50">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{file.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {file.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-gray-300">{file.size}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                    <DropdownMenuItem
                      className="text-gray-300 hover:bg-gray-800"
                      onClick={() => handleAction(file.id, "download")}
                    >
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-gray-300 hover:bg-gray-800"
                      onClick={() => handleAction(file.id, "rename")}
                    >
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-gray-300 hover:bg-gray-800"
                      onClick={() => handleAction(file.id, "share")}
                    >
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-400 hover:bg-gray-800"
                      onClick={() => handleAction(file.id, "delete")}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
