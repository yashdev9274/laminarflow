"use client"

import { useState, useEffect, useRef } from "react"
import { FileHeader } from "./file-header"
import { FileTable, type FileItem } from "./file-table"
import { generateTags } from "../../../lib/file-utils"
import { UploadDropzone, UploadButton } from "@/app/utils/uploadthing"
import { getUploadedFiles } from "@/app/dashboard/safe/actions"

interface FileUploaderProps {
  initialFiles: FileItem[]
}

export default function FileUploader({ initialFiles }: FileUploaderProps) {
  const [files, setFiles] = useState<FileItem[]>(initialFiles)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const uploadContainerRef = useRef<HTMLDivElement>(null)

  const fetchFiles = async () => {
    const uploadedFiles = await getUploadedFiles()
    const formattedFiles: FileItem[] = uploadedFiles.map((file) => ({
      id: file.id,
      name: file.name,
      size: "N/A", // UploadThing doesn't provide size in the server response
      tags: generateTags(file.name),
      uploadDate: file.createdAt,
    }))
    setFiles(formattedFiles)
  }

  useEffect(() => {
    setFiles(initialFiles)
  }, [initialFiles])

  const handleFileAction = (fileId: string, action: string) => {
    switch (action) {
      case "delete":
        console.log(`Deleting file: ${fileId}`)
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
        onUploadClick={() => {
          if (uploadContainerRef.current) {
            ;(uploadContainerRef.current.querySelector("button") as HTMLElement)?.click()
          }
        }}
      />

      {/* Hidden uploader for the plus button */}
      <div ref={uploadContainerRef} className="hidden">
        <UploadButton
          endpoint="fileUploader"
          onClientUploadComplete={() => {
            fetchFiles()
            alert("Upload Completed")
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`)
          }}
        />
      </div>

      <div className="p-6">
        {files.length === 0 ? (
          <UploadDropzone
            endpoint="fileUploader"
            onClientUploadComplete={() => {
              fetchFiles()
              alert("Upload Completed")
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`)
            }}
          />
        ) : (
          <FileTable files={filteredFiles} onFileAction={handleFileAction} />
        )}
      </div>
    </div>
  )
}
