import apiClient from "~/Constants/ApiClient";

export const createDiscount = async (data) => {
    try {
        const response = await apiClient.post(`/Discount`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};