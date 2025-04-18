import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";


const fetchfuelDeliveryStationedItems = async (fuelDeliveryId, stationId) => {
    try {
        const response = await apiClient.get(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/${stationId}/StationedItems`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};


const fetchfuelDeliveryItems = async (fuelDeliveryId) => {
    try {
        const response = await apiClient.get(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/Items`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchfuelDeliveryItem = async (fuelDeliveryId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/Items/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createfuelDeliveryItem = async (fuelDeliveryId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/Item`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updatefuelDeliveryItem = async (fuelDeliveryId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/Item/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deletefuelDeliveryItem = async (fuelDeliveryId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/Item/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};


const deletefuelDeliveryItems = async (fuelDeliveryId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.FuelManagements}/fuelDelivery/${fuelDeliveryId}/items/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchfuelDeliveryStationedItems,
    fetchfuelDeliveryItems,
    fetchfuelDeliveryItem,
    createfuelDeliveryItem,
    updatefuelDeliveryItem,
    deletefuelDeliveryItem,
    deletefuelDeliveryItems,
};