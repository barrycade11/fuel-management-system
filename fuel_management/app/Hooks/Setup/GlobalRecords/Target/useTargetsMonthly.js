import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const fetchTargetsMonthly = async (targetId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Target/${targetId}/Monthly`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const useAddTargetMonthliesbyTargetId = (resource) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, payload}) => {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/${resource}/${id}/Monthly`, payload);
        return response.data;
      },
      onSuccess: (data) => {
        console.log(`Added ${resource} weeklies successfully:`, data);
        queryClient.invalidateQueries([`${resource}s`]);
      },
      onError: (error) => {
        console.error(`Failed to add ${resource} weeklies:`, error);
      },
    });
};

const useDeleteTargetMonthliesByTargetId = (resource) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/${resource}/${id}/Monthly/delete`);
        return response.data;
        },
        onSuccess: (data) => {
        console.log(`Deleted ${resource} weeklies successfully:`, data);
        queryClient.invalidateQueries([`${resource}s`]);
        },
        onError: (error) => {
        console.error(`Failed to delete ${resource} weeklies:`, error);
        },
    });
};

const fetchTargetMonthly = async (targetId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Targets/${targetId}/Monthly/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createTargetMonthly = async (targetId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Target/${targetId}/Monthly`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateTargetMonthly = async (targetId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Target/${targetId}/Monthly/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteTargetMonthly = async (targetId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Targets/${targetId}/Monthly/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchTargetsMonthly,
    useAddTargetMonthliesbyTargetId,
    useDeleteTargetMonthliesByTargetId,
    fetchTargetMonthly,
    createTargetMonthly,
    updateTargetMonthly,
    deleteTargetMonthly,
};