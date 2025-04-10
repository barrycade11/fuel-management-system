import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createDropdown = async (typeId, parentId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Dropdown`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};