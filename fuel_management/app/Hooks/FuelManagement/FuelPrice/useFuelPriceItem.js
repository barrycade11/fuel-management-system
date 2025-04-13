import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchFuelPriceItems = async (fuelPriceId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/FuelPrice/${fuelPriceId}/Items`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchFuelPriceItem = async (fuelPriceId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/FuelPrice/${fuelPriceId}/Items/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createFuelPriceItem = async (fuelPriceId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/FuelPrice/${fuelPriceId}/Item`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateFuelPriceItem = async (fuelPriceId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/FuelPrice/${fuelPriceId}/Item/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteFuelPriceItem = async (fuelPriceId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/FuelPrice/${fuelPriceId}/Item/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchFuelPriceItems,
    fetchFuelPriceItem,
    createFuelPriceItem,
    updateFuelPriceItem,
    deleteFuelPriceItem,
};