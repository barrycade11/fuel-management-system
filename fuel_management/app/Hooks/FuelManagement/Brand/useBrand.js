import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchbrands = async () => {
    try {
        const response = await apiClient.get(`${endPoints.FuelManagements}/brands`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchbrand = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.FuelManagements}/brands/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createbrand = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.FuelManagements}/brand`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updatebrand = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.FuelManagements}/brand/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deletebrand = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.FuelManagements}/brand/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchbrands,
    fetchbrand,
    createbrand,
    updatebrand,
    deletebrand,
};