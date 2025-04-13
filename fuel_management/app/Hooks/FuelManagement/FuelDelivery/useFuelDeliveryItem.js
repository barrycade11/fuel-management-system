import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchfuelDeliveryItems = async (fuelDeliveryId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Items`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchfuelDeliveryItem = async (fuelDeliveryId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Items/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createfuelDeliveryItem = async (fuelDeliveryId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Item`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updatefuelDeliveryItem = async (fuelDeliveryId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Item/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deletefuelDeliveryItem = async (fuelDeliveryId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Item/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchfuelDeliveryItems,
    fetchfuelDeliveryItem,
    createfuelDeliveryItem,
    updatefuelDeliveryItem,
    deletefuelDeliveryItem,
};