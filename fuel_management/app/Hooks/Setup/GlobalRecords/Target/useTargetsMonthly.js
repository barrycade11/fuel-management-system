import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchTargetsMonthly = async (targetId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Target/${targetId}/Monthly`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchTargetMonthly = async (targetId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Targets/${targetId}/Monthly/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createTargetMonthly = async (targetId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Target/${targetId}/Monthly`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateTargetMonthly = async (targetId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Target/${targetId}/Monthly/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteTargetMonthly = async (targetId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Targets/${targetId}/Monthly/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchTargetsMonthly,
    fetchTargetMonthly,
    createTargetMonthly,
    updateTargetMonthly,
    deleteTargetMonthly,
};