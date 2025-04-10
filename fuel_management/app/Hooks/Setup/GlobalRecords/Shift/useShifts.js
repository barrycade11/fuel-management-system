import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchShifts = async () => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Shifts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchShiftDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Shifts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createShift = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Shift`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateShift = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Shift/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteShift = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Shift/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    fetchShifts, 
    fetchShiftDetails, 
    createShift, 
    updateShift, 
    deleteShift 
};