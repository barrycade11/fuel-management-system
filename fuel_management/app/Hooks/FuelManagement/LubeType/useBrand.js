import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchlubeTypes = async () => {
    try {
        const response = await apiClient.get(`${endPoints.FuelManagements}/lubeTypes`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchlubeType = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.FuelManagements}/lubeTypes/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createlubeType = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.FuelManagements}/lubeType`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updatelubeType = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.FuelManagements}/lubeType/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deletelubeType = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.FuelManagements}/lubeType/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchlubeTypes,
    fetchlubeType,
    createlubeType,
    updatelubeType,
    deletelubeType,
};