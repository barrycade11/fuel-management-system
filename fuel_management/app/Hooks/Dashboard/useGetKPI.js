import {apiClient} from "~/Constants/ApiClient";

const useGetKPI = async (startDate, endDate, locations) => {
    try {
        const response = await apiClient.get(
            `/Dashboard/KPI`, 
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

export default useGetKPI