import apiClient from "~/Constants/ApiClient";

export const deleteDropdown = async (typeId, parentId, id) => {
    try {
        const response = await apiClient.delete(`/Dropdowns/${typeId}/${parentId}/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};