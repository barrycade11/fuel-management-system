import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchEmplolyeeDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Employees/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};