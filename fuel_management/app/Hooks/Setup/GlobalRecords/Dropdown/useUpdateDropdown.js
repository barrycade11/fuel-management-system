import apiClient from "~/Constants/ApiClient";

export const updateDropdown = async (typeId, parentId, id, data) => {
    try {
        const response = await apiClient.put(`/Dropdown/${typeId}/${parentId}/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};