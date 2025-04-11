import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchTargetsWeekly = async (targetId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Target/${targetId}/Weekly`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchTargetWeekly = async (targetId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Targets/${targetId}/Weekly/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createTargetWeekly = async (targetId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Target/${targetId}/Weekly`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateTargetWeekly = async (targetId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Target/${targetId}/Weekly/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteTargetWeekly = async (targetId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Targets/${targetId}/Weekly/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchTargetsWeekly,
    fetchTargetWeekly,
    createTargetWeekly,
    updateTargetWeekly,
    deleteTargetWeekly,
};