import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteDropdown = async (typeId, parentId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Dropdowns/${typeId}/${parentId}/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};