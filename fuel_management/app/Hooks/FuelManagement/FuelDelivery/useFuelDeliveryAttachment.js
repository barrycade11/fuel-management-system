import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchfuelDeliveryAttachments = async (fuelDeliveryId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Attachment`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchfuelDeliveryAttachment = async (fuelDeliveryId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Attachment/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createfuelDeliveryAttachment = async (fuelDeliveryId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Attachment`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updatefuelDeliveryAttachment = async (fuelDeliveryId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Attachment/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deletefuelDeliveryAttachment = async (fuelDeliveryId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Attachment/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchfuelDeliveryAttachments,
    fetchfuelDeliveryAttachment,
    createfuelDeliveryAttachment,
    updatefuelDeliveryAttachment,
    deletefuelDeliveryAttachment,
};