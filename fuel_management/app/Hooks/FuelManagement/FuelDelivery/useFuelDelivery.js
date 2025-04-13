import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchfuelDeliveries = async () => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/fuelDeliveries`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchfuelDelivery = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/fuelDeliveries/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createfuelDelivery = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/fuelDelivery`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updatefuelDelivery = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/fuelDelivery/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deletefuelDelivery = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/fuelDelivery/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchfuelDeliveries,
    fetchfuelDelivery,
    createfuelDelivery,
    updatefuelDelivery,
    deletefuelDelivery,
};