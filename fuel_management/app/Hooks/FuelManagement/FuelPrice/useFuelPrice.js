import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchFuelPrices = async () => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/FuelPrices`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchFuelPrice = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/FuelPrices/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createFuelPrice = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/FuelPrice`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateFuelPrice = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/FuelPrice/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteFuelPrice = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/FuelPrice/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchFuelPrices,
    fetchFuelPrice,
    createFuelPrice,
    updateFuelPrice,
    deleteFuelPrice,
};