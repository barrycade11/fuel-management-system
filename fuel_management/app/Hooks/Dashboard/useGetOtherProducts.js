import apiClient from "~/Constants/ApiClient";

const useGetOtherProducts = async (startDate, endDate, locations) => {
    try {
        const response = await apiClient.get(
            `/Dashboard/OtherProduct-Sales`, 
            {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                    locations: locations
                }
            }
        );
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export default useGetOtherProducts