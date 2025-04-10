import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateDropdown = async (typeId, parentId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Dropdown/${typeId}/${parentId}/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};