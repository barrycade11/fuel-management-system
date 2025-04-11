import {apiClient} from "~/Constants/ApiClient";

const useGetSelectInput = async (effectivityDate, selectedStation, editId) => {
    try {
        const response = await apiClient.get(
            `/SelectSales/getDailySalesSelectData`, 
            {
                params: {
                    effectivityDate,
                    selectedStation,
                    inputId: editId
                }
            }
        );
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export default useGetSelectInput