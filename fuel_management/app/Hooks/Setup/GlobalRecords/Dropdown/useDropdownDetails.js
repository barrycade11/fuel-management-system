import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchDropdownDetails = async (typeId, parentId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Dropdowns/${typeId}/${parentId}/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};