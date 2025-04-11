import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchTargets = async () => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Targets`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchTarget = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Targets/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createTarget = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Target`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateTarget = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Target/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteTarget = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Targets/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchTargets,
    fetchTarget,
    createTarget,
    updateTarget,
    deleteTarget,
};