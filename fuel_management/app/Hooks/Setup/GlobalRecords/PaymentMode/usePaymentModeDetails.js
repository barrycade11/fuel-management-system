import apiClient from "~/Constants/ApiClient";

export const fetchFuel = async (id) => {
    try {
        const response = await apiClient.get(`/PaymentModes/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};