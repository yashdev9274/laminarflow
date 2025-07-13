"use client"

import { UploadDropzone } from "@/app/utils/uploadthing";

interface FileUploaderEmptyStateProps {
  onUploadComplete: (res?: any) => void;
}

export function FileUploaderEmptyState({ onUploadComplete }: FileUploaderEmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[60vh] border-2 border-dashed rounded-lg transition-colors border-gray-700 hover:border-gray-600`}
    >
      <UploadDropzone
        endpoint="fileUploader"
        onClientUploadComplete={onUploadComplete}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  )
}
