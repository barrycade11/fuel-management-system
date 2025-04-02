import apiClient from "~/Constants/ApiClient";

export const deleteDiscount = async (id) => {
    try {
        const response = await apiClient.delete(`/Discount/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};