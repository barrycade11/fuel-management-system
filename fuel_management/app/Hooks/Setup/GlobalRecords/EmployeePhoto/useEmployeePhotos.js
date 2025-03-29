import apiClient from "~/Constants/ApiClient";

export const fetchEmployeePhotos = async (employeeId) => {
    try {
        const response = await apiClient.get(`/Employee/${employeeId}/Photos`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};