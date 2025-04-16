import React, { useState } from "react";
import { UploadIcon } from "lucide-react";
import AttachmentsTable from "./AttachmentsTable";

const UploadArea = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).map((file) => ({
      name: file.name,
      uploadedBy: "Current User", // Replace with actual user if available
      date: new Date().toLocaleString(),
      content: file, // Store the file object for preview
    }));
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handlePreview = (file) => {
    alert(`Previewing file: ${file.name}`);
    // Add logic to preview the file (e.g., open in a modal or new tab)
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    if (onFilesUploaded) {
      onFilesUploaded(droppedFiles);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
       
    <div
      className="border border-gray-200 rounded-md p-4 mb-6 flex flex-col items-center justify-center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
        <label
            htmlFor="fileInput"
            className="text-blue-600 font-medium cursor-pointer mb-2"
        >
            Upload files...
        </label>
        <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
        />
        
        <div className="flex items-center text-gray-500">
            <UploadIcon size={18} className="mr-2" />
            <span>Drop files here</span>
        </div>

      </div>
      <br/>
      <br/>
      <AttachmentsTable
        files={files}
        onDelete={handleDelete}
        onPreview={handlePreview}
      />
    </div>
  );
};

export default UploadArea;