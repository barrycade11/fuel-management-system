import React, { useState } from "react";
import UploadArea from "./Components/UploadArea";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const FuelDeliveryAttachment = (handleCloseModal, fuelDeliveryId) => {
  // const { fuelDeliveryId } = useParams(); // Get the fuel delivery ID from the URL parameters
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null); // State to hold the file to preview
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // State to control the preview modal

  const handleFilesUploaded = (files) => {
    console.log("Uploaded files:", files);
    // Handle the uploaded files (e.g., send them to the server)
  };

  const handleFileRemoved = (file) => {
    console.log("Removed file:", file);
    // Handle the removed file (e.g., update the state)
  };

  const handleFileDownload = (file) => {
    console.log("Download file:", file);
    // Handle the file download (e.g., initiate a download)
  };

  const handleFilePreview = (file) => {
    setPreviewFile(file); // Set the file to preview
    setIsPreviewOpen(true); // Open the preview modal
  };

  const handleFileUploadError = (error) => {
    console.error("File upload error:", error);
    // Handle the file upload error (e.g., show a notification)
  };

  const handleFileUploadSuccess = (file) => {
    console.log("File upload success:", file);
    // Handle the file upload success (e.g., update the state)
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false); // Close the preview modal
    setPreviewFile(null); // Clear the preview file
  };

  const handleCLose = () => {
    // navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-md shadow-sm border border-gray-200">
      <div className="p-6">
        {fuelDeliveryId && fuelDeliveryId > 0 ? (
          <p>Editing Fuel Delivery ID: {fuelDeliveryId}</p>
        ) : (
          <p>Creating a New Fuel Delivery</p>
        )}

        <h2 className="text-lg font-medium text-gray-900 mb-4">Attachments</h2>
        <UploadArea files={files} setFiles={setFiles}  />
      </div>
      {/* <div className="bg-gray-50 px-6 py-3 flex justify-end border-t border-gray-200">
        <button className="text-blue-600 font-medium" onClick={handleCloseModal}>
          Close
        </button>
      </div> */}

      {/* File Preview Modal */}
      {isPreviewOpen && previewFile && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-3/4 max-h-[80vh] overflow-auto">
            <h2 className="text-lg font-semibold mb-4">File Preview</h2>
            <div className="mb-4">
              {previewFile.type.startsWith("image/") && (
                <img src={URL.createObjectURL(previewFile)} alt={previewFile.name} className="max-w-full max-h-64" />
              )}
              {previewFile.type === "application/pdf" && (
                <iframe
                  src={URL.createObjectURL(previewFile)}
                  title={previewFile.name}
                  className="w-full h-64"
                ></iframe>
              )}
              {previewFile.type.startsWith("text/") && (
                <textarea
                  readOnly
                  value={previewFile.text()}
                  className="w-full h-64 border rounded p-2"
                ></textarea>
              )}
              {!previewFile.type.startsWith("image/") &&
                previewFile.type !== "application/pdf" &&
                !previewFile.type.startsWith("text/") && (
                  <p className="text-gray-600">Preview not available for this file type.</p>
                )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleClosePreview}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelDeliveryAttachment;