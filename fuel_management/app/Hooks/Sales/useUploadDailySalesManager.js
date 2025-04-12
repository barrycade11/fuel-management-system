import {apiClient} from "~/Constants/ApiClient";

export const useUploadDailySalesInputManager = async (data) => {
    try {
        const response = await apiClient.post(
            `/ManagerSales/dailySalesInputManager`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;
    }
    catch (error) {
        throw error;
    }
};