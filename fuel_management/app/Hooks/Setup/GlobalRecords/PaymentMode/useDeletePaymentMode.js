import apiClient from "~/Constants/ApiClient";

export const updateFuels = async (id) => {
    try {
        const response = await apiClient.delete(`/PaymentMode/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};