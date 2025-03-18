import apiClient from "~/Constants/ApiClient";

export const fetchDiscountDetails = async (id) => {
    try {
        const response = await apiClient.get(`/Discounts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};