import {apiClient} from "~/Constants/ApiClient";

const useGetFuelSales = async (effectivityDate, selectedStation, selectedShift) => {
    try {
        const response = await apiClient.get(
            `/Sales/getCashierFuelData`, 
            {
                params: {
                    effectivityDate,
                    selectedStation,
                    selectedShift
                }
            }
        );
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export default useGetFuelSales