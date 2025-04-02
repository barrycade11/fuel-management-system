import apiClient from "~/Constants/ApiClient";

export const fetchDropdownDetails = async (typeId, parentId, id) => {
    try {
        const response = await apiClient.get(`/Dropdowns/${typeId}/${parentId}/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};