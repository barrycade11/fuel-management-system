import apiClient from "~/Constants/ApiClient";

export const fetchDiscounts = async () => {
    try {
        const response = await apiClient.get(`/Discounts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};