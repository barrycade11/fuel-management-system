import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchTargetsWeekly = async (targetId, targetWeeklyId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Target/${targetId}/Weekly/${targetWeeklyId}/Stations`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchTargetWeekly = async (targetId, targetWeeklyId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Targets/${targetId}/Weekly/${targetWeeklyId}/Stations/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createTargetWeekly = async (targetId, targetWeeklyId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Target/${targetId}/Weekly/${targetWeeklyId}/Station`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateTargetWeekly = async (targetId, targetWeeklyId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Target/${targetId}/Weekly/${targetWeeklyId}/Station/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteTargetWeekly = async (targetId, targetWeeklyId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Targets/${targetId}/Weekly/${targetWeeklyId}/Station/${id}`);

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