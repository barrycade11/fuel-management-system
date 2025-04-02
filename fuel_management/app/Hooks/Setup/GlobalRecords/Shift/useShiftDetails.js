import apiClient from "~/Constants/ApiClient";

export const fetchShiftDetails = async (id) => {
    try {
        const response = await apiClient.get(`/Shifts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};