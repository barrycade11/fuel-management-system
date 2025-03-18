import apiClient from "~/Constants/ApiClient";

export const updateFuels = async (typeId, parentId, id, data) => {
    try {
        const response = await apiClient.put(`/Dropdown/${typeId}/${parentId}/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};