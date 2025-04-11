import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const fetchCustomerVehicles = async (customerId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Customer/${customerId}/Vehicles`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const useAddCustomerVehiclesByCustomerId = (resource) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, payload}) => {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/${resource}/${id}/vehicle`, payload);
        return response.data;
      },
      onSuccess: (data) => {
        console.log(`Added ${resource} vehicles successfully:`, data);
        queryClient.invalidateQueries([`${resource}s`]);
      },
      onError: (error) => {
        console.error(`Failed to add ${resource} vehicles:`, error);
      },
    });
};

const useDeleteCustomerVehiclesByCustomerId = (resource) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/${resource}/${id}/vehicle/delete`);
        return response.data;
        },
        onSuccess: (data) => {
        console.log(`Deleted ${resource} vehicles successfully:`, data);
        queryClient.invalidateQueries([`${resource}s`]);
        },
        onError: (error) => {
        console.error(`Failed to delete ${resource} vehicles:`, error);
        },
    });
};

export { 
    fetchCustomerVehicles,
    useAddCustomerVehiclesByCustomerId,
    useDeleteCustomerVehiclesByCustomerId 
};