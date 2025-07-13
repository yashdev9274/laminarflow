import FileUploader from '@/components/dashboard/safe/file-uploader';
import React from 'react';
import { getUploadedFiles } from './actions';
import { FileItem } from '@/components/dashboard/safe/file-table';
import { generateTags } from '@/lib/file-utils';

const SafePage = async () => {
  const uploadedFiles = await getUploadedFiles();
  const formattedFiles: FileItem[] = uploadedFiles.map((file) => ({
    id: file.id,
    name: file.name,
    size: "N/A", // UploadThing doesn't provide size in the server response
    tags: generateTags(file.name),
    uploadDate: file.createdAt,
  }))

  return (
    <div>
      <FileUploader initialFiles={formattedFiles} />
    </div>
  );
};

export default SafePage;
