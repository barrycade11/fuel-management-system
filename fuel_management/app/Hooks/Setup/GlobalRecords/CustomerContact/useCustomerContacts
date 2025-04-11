import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const fetchCustomerContacts = async (customerId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Customer/${customerId}/Contacts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const useAddCustomerContactsByCustomerId = (resource) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, payload}) => {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/${resource}/${id}/contact`, payload);
        return response.data;
      },
      onSuccess: (data) => {
        console.log(`Added ${resource} contacts successfully:`, data);
        queryClient.invalidateQueries([`${resource}s`]);
      },
      onError: (error) => {
        console.error(`Failed to add ${resource} contacts:`, error);
      },
    });
};

const useDeleteCustomerContactsByCustomerId = (resource) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/${resource}/${id}/contact/delete`);
        return response.data;
        },
        onSuccess: (data) => {
        console.log(`Deleted ${resource} contacts successfully:`, data);
        queryClient.invalidateQueries([`${resource}s`]);
        },
        onError: (error) => {
        console.error(`Failed to delete ${resource} contacts:`, error);
        },
    });
};

export { 
    fetchCustomerContacts,
    useAddCustomerContactsByCustomerId,
    useDeleteCustomerContactsByCustomerId 
};