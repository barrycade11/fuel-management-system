import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const fetchfuelDeliveryAttachments = async (fuelDeliveryId) => {
    try {
        const response = await apiClient.get(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/Attachment`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchfuelDeliveryAttachment = async (fuelDeliveryId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/Attachment/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};



const addFuelDeliveryAttachment = (resource) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ fuelDeliveryId, payload}) => {  

         

        const response = await apiClient.post(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/attachment`, payload, 
            {
                headers: {
                    "Content-Type": "multipart/form-data",  
                }
            },
        );

        console.log("addFuelDeliveryAttachment",response);

        return response.data;
      },
      onSuccess: (data) => {
        console.log(`Added ${resource} photo successfully:`, data);
        queryClient.invalidateQueries([`${resource}s`]);
      },
      onError: (error) => {
        console.log(`Failed to add ${resource} photo:`, error);
      },
    });
};

const createfuelDeliveryAttachment = async (fuelDeliveryId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/Attachment`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updatefuelDeliveryAttachment = async (fuelDeliveryId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/Attachment/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deletefuelDeliveryAttachment = async (fuelDeliveryId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/Attachment/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchfuelDeliveryAttachments,
    fetchfuelDeliveryAttachment,
    createfuelDeliveryAttachment,addFuelDeliveryAttachment,
    updatefuelDeliveryAttachment,
    deletefuelDeliveryAttachment,
};