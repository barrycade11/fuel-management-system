import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchFuelPriceAttachments = async (fuelPriceId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/FuelPrice/${fuelPriceId}/Attachment`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchFuelPriceAttachment = async (fuelPriceId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/FuelPrice/${fuelPriceId}/Attachment/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createFuelPriceAttachment = async (fuelPriceId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/FuelPrice/${fuelPriceId}/Attachment`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateFuelPriceAttachment = async (fuelPriceId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/FuelPrice/${fuelPriceId}/Attachment/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteFuelPriceAttachment = async (fuelPriceId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/FuelPrice/${fuelPriceId}/Attachment/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchFuelPriceAttachments,
    fetchFuelPriceAttachment,
    createFuelPriceAttachment,
    updateFuelPriceAttachment,
    deleteFuelPriceAttachment,
};