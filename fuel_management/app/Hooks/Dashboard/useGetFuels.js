import apiClient from "~/Constants/ApiClient";

const useGetFuels = async (startDate, endDate, locations) => {
    try {
        const response = await apiClient.get(
            `/Dashboard/Fuel-Sales`, 
            {
                params: {
                    startDate,
                    endDate,
                    locations
                }
            }
        );
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export default useGetFuels