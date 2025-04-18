import React, { useState } from "react";
import UploadArea from "./Components/UploadArea"; 

const FuelDeliveryAttachment = ({handleCloseModal, fuelDeliveryId }) => {
  // const { fuelDeliveryId } = useParams(); // Get the fuel delivery ID from the URL parameters 
  const [files, setFiles] = useState([]); 
 
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-md shadow-sm border border-gray-200">
      <div className="p-6">
         

        <h2 className="text-lg font-medium text-gray-900 mb-4">Attachments</h2>
        <UploadArea files={files} setFiles={setFiles}  />
      </div>
       
    </div>
  );
};

export default FuelDeliveryAttachment;