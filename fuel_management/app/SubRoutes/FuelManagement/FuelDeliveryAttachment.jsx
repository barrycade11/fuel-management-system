import React, { useState, lazy } from "react";
import  UploadArea  from './Components/UploadArea'


const FuelDeliveryAttachment = () => {

  const handleFilesUploaded = (files) => {
    console.log("Uploaded files:", files);
    // Handle the uploaded files (e.g., send them to the server)
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-md shadow-sm border border-gray-200">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Attachments</h2>
        <UploadArea onFilesUploaded={handleFilesUploaded} />
      </div>
      <div className="bg-gray-50 px-6 py-3 flex justify-end border-t border-gray-200">
        <button className="text-blue-600 font-medium">Close</button>
      </div>
    </div>
  )
}

export default FuelDeliveryAttachment;