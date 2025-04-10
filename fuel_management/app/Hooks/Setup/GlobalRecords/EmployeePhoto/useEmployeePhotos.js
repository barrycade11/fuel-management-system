import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const fetchEmployeePhoto = async (employeeId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Employee/${employeeId}/Photo`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const useAddEmployeePhotoByEmployeeId = (resource) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, payload}) => {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/${resource}/${id}/Photo`, payload, 
            {
                headers: {
                    "Content-Type": "multipart/form-data",  
                }
            },
        );
        return response.data;
      },
      onSuccess: (data) => {
        console.log(`Added ${resource} photo successfully:`, data);
        queryClient.invalidateQueries([`${resource}s`]);
      },
      onError: (error) => {
        console.error(`Failed to add ${resource} photo:`, error);
      },
    });
};

const useDeleteEmployeePhotoByEmployeeId = (resource) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/${resource}/${id}/Photo/delete`);
        return response.data;
        },
        onSuccess: (data) => {
        console.log(`Deleted ${resource} photo successfully:`, data);
        queryClient.invalidateQueries([`${resource}s`]);
        },
        onError: (error) => {
        console.error(`Failed to delete ${resource} photo:`, error);
        },
    });
};

export { 
    fetchEmployeePhoto, 
    useAddEmployeePhotoByEmployeeId,
    useDeleteEmployeePhotoByEmployeeId
    // fetchEmployeePhotoDetails, 
    // createEmployeePhoto, 
    // updateEmployeePhoto, 
    // deleteEmployeePhoto 
};