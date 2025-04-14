import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const fetchTargetsWeekly = async (targetId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Target/${targetId}/Weekly`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const useAddTargetWeekliesbyTargetId = (resource) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, payload}) => {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/${resource}/${id}/Weekly`, payload);
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

const useDeleteTargetWeekliesByTargetId = (resource) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/${resource}/${id}/Weekly/delete`);
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

const fetchTargetWeekly = async (targetId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Targets/${targetId}/Weekly/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createTargetWeekly = async (targetId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Target/${targetId}/Weekly`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateTargetWeekly = async (targetId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Target/${targetId}/Weekly/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteTargetWeekly = async (targetId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Targets/${targetId}/Weekly/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchTargetsWeekly,
    useAddTargetWeekliesbyTargetId,
    useDeleteTargetWeekliesByTargetId,
    fetchTargetWeekly,
    createTargetWeekly,
    updateTargetWeekly,
    deleteTargetWeekly,
};