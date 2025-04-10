import apiClient from "~/Constants/ApiClient";

export const useUploadDailySalesInputForecourt = async (data) => {
    try {
        const response = await apiClient.post(
            `/ForecourtSales/dailySalesInputForecourt`,
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