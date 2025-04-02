import apiClient from "~/Constants/ApiClient";

export const fetchDropdowns = async (typeId, parentId) => {
    try {
        const response = await apiClient.get(`/Dropdowns/${typeId}/${parentId}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};