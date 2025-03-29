import apiClient from "~/Constants/ApiClient";

const fetchShifts = async () => {
    try {
        const response = await apiClient.get(`/Setup/GlobalRecords/Shifts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchShiftDetails = async (id) => {
    try {
        const response = await apiClient.get(`/Setup/GlobalRecords/Shifts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createShift = async (data) => {
    try {
        const response = await apiClient.post(`/Setup/GlobalRecords/Shift`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateShift = async (id, data) => {
    try {
        const response = await apiClient.put(`/Setup/GlobalRecords/Shift/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteShift = async (id) => {
    try {
        const response = await apiClient.delete(`/Setup/GlobalRecords/Shift/${id}`);

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