"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploaderEmptyProps {
  onFileUpload: (files: FileList) => void
  fileInputRef: React.RefObject<HTMLInputElement>
}

export function FileUploaderEmptyState({ onFileUpload, fileInputRef }: FileUploaderEmptyProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      if (e.dataTransfer.files) {
        onFileUpload(e.dataTransfer.files)
      }
    },
    [onFileUpload],
  )

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[60vh] border-2 border-dashed rounded-lg transition-colors ${
        isDragOver ? "border-blue-500 bg-blue-500/10" : "border-gray-700 hover:border-gray-600"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-2xl font-semibold">Always find what you need</h2>
        <p className="text-gray-400 leading-relaxed">
          Drag & drop or upload your documents. We'll automatically organize them with tags based on content, making
          them easy and secure to find.
        </p>
        <Button onClick={() => fileInputRef.current?.click()} className="mt-6 px-8 py-2">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>
    </div>
  )
}
