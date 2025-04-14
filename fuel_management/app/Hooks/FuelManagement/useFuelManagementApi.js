import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// Hook to fetch all records for a given resource (e.g., 'FuelMasters')
const useGetFuelManagements = (resource) => {
  return useQuery({
    queryKey: [resource],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.FuelManagements}/${resource}`);
      return response.data;
    },
  });
};

// Hook to fetch a single record by its ID for a given resource (e.g., 'FuelMaster')
const useGetFuelManagementById = (resource, id) => {
  return useQuery({
    queryKey: [resource, id],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.FuelManagements}/${resource}/${id}`);
      return response.data;
    },
    enabled: !!id, // Only run if the ID is valid
  });
};

// Usage 
// import { useGetFuelManagements, useGetFuelManagementById } from "~/Hooks/Setup/F/useFuelManagementsApi";
// const { data: fuelMasters, isLoading, error } = useGetFuelManagements('FuelMasters');
// const { data: fuelMasterDetails, isLoading, error } = useGetFuelManagementById('FuelMaster', id);

// Hook to add a new record for a given resource (e.g., 'FuelMasters')
const useAddFuelManagement = (resource) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post(`${endPoints.FuelManagements}/${resource}`, payload);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(`Added ${resource} successfully:`, data);
      queryClient.invalidateQueries([`${resource}s`]);
    },
    onError: (error) => {
      console.error(`Failed to add ${resource}:`, error);
    },
  });
};

// Usage 
// import { useAddFuelManagement } from "~/Hooks/Setup/FuelManagements/useFuelManagementsApi";
// const { mutateAsync: addFuelMaster, isLoading, isSuccess, error } = useAddRecord('FuelMaster');
// const handleAddSubmit = (formData) => {
//   addFuelMaster(formData);
// };

// Hook to edit a record for a given resource (e.g., 'FuelMasters')
const useUpdateFuelManagement = (resource) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const response = await apiClient.put(`${endPoints.FuelManagements}/${resource}/${id}`, payload);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(`Updated ${resource} successfully:`, data);
      queryClient.invalidateQueries([`${resource}s`]);
    },
    onError: (error) => {
      console.error(`Failed to update ${resource}:`, error);
    },
  });
};

// import { useUpdateFuelManagement } from "~/Hooks/Setup/FuelManagements/useFuelManagementsApi";
// const { mutateAsync: updateFuelMaster, isLoading, isSuccess, error } = useUpdateFuelManagement('FuelMaster');
// const handleEditSubmit = (id, formData) => {
//   updateFuelMaster({ id, payload: formData });
// };

// Hook to delete a record for a given resource (e.g., 'FuelMasters')
const useDeleteFuelManagement = (resource) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await apiClient.delete(`${endPoints.FuelManagements}/${resource}/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(`Deleted ${resource} successfully:`, data);
      queryClient.invalidateQueries([`${resource}s`]);
    },
    onError: (error) => {
      console.error(`Failed to delete ${resource}:`, error);
    },
  });
};

// import { useDeleteFuelManagement } from "~/Hooks/Setup/FuelManagements/useFuelManagementsApi";
// const { mutateAsync: deleteFuelMaster, isLoading, isSuccess, error } = useDeleteFuelManagement('FuelMaster');
// const handleDelete = (id) => {
//   deleteFuelMaster(id);
// };

export {
  useGetFuelManagements,
  useGetFuelManagementById,
  useAddFuelManagement,
  useUpdateFuelManagement,
  useDeleteFuelManagement,
};
