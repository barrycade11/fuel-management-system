import apiClient from "~/Constants/ApiClient";

export const createDropdown = async (typeId, parentId, data) => {
    try {
        const response = await apiClient.post(`/Dropdown`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};