import apiClient from "~/Constants/ApiClient";

export const fetchShifts = async () => {
    try {
        const response = await apiClient.get(`/Shifts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};