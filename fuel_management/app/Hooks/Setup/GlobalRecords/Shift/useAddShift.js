import apiClient from "~/Constants/ApiClient";

export const createShift = async (data) => {
    try {
        const response = await apiClient.post(`/Shift`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};