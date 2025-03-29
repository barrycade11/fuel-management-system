import apiClient from "~/Constants/ApiClient";

export const fetchEmployeePhotoDetails = async (employeeId, id) => {
    try {
        const response = await apiClient.get(`/Employee/${employeeId}/Photos/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};