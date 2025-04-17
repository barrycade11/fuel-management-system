import React, { useState } from "react";
import { UploadIcon } from "lucide-react";
import AttachmentsTable from "./AttachmentsTable";
import FilePreview from "./FilePreview";
import { Modal, ModalContent } from "@heroui/react";

const UploadArea = ({files, setFiles}) => {
  // const [files, setFiles] = useState([]);

const [previewFile, setPreviewFile] = useState(null); // State to hold the file to preview
const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
const handleOpenModal = () => setIsAttachmentModalOpen(true);
const handleCloseModal = () => setIsAttachmentModalOpen(false);


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
    console.log("Previewing file:", file);
    setPreviewFile(file.content); // Set the file to preview
    setIsAttachmentModalOpen(true); 
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
      <Modal isOpen={isAttachmentModalOpen}   
                size="full"
                scrollBehavior={"inside"}
                onClose={handleCloseModal}
        >
            <ModalContent  >                
                <div style={{height:'100%'}} className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div style={{height:'100%'}} className="bg-white p-6 rounded shadow-lg w-3/4 max-h-[100vh] overflow-auto">
                    <h2 className="text-lg font-semibold mb-4">PDF Preview</h2>
                    <div className="mb-4" style={{height:'90%'}}>
                    {previewFile?.type === "application/pdf" ? (
                        <iframe
                        src={URL.createObjectURL(previewFile)}
                        title={previewFile?.name}
                        className="w-full h-96 border"
                        style={{height:'100%'}}
                        ></iframe>
                    ) : (
                        <p className="text-gray-600">This component only supports PDF files.</p>
                    )}
                    </div>
                    <div className="flex justify-end">
                    <button
                        onClick={handleCloseModal}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Close
                    </button>
                    </div>
                </div>
                </div>
                

            </ModalContent>
        </Modal>


       
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