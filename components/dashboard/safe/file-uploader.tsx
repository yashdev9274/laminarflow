"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { FileHeader } from "./file-header"
import { FileUploaderEmptyState } from "./file-uploader-emptystate"
import { FileTable, type FileItem } from "./file-table"
import { formatFileSize, generateTags } from "../../../lib/file-utils"

export default function FileUploader() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const fileInputRef = useRef<HTMLInputElement>(document.createElement('input'));

  useEffect(() => {
    // Create the input element after the component mounts
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = ".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg";
    fileInputRef.current = input; // Assign to ref
  }, []);

  const handleFileUpload = useCallback((uploadedFiles: FileList) => {
    const newFiles: FileItem[] = Array.from(uploadedFiles).map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
      tags: generateTags(file.name),
      uploadDate: new Date(),
    }))

    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fileInputRef.current && e.target.files) {
      handleFileUpload(e.target.files)
    }
  }

  const handleFileAction = (fileId: string, action: string) => {
    switch (action) {
      case "delete":
        setFiles((prev) => prev.filter((file) => file.id !== fileId))
        break
      case "download":
        console.log(`Downloading file: ${fileId}`)
        break
      case "rename":
        console.log(`Renaming file: ${fileId}`)
        break
      case "share":
        console.log(`Sharing file: ${fileId}`)
        break
      default:
        break
    }
  }

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen text-white">
      <FileHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onUploadClick={() => fileInputRef.current?.click()}
      />

      <div className="p-6">
        {files.length === 0 ? (
          <FileUploaderEmptyState onFileUpload={handleFileUpload} fileInputRef={fileInputRef!} />
        ) : (
          <FileTable files={filteredFiles} onFileAction={handleFileAction} />
        )}
      </div>

      {/* Hidden File Input */}
      {fileInputRef.current && (
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInputChange}
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
        />
      )}
    </div>
  )
}
