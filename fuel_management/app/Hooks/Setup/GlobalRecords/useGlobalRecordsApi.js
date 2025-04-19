import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

// Hook to fetch all records for a given resource (e.g., 'FuelMasters')
const useGetGlobalRecords = (resource) => {
  return useQuery({
    queryKey: [resource],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.GlobalRecords}/${resource}`);
      return response.data;
    },
  });
};

// Hook to fetch a single record by its ID for a given resource (e.g., 'FuelMaster')
const useGetGlobalRecordById = (resource, id) => {
  return useQuery({
    queryKey: [resource, id],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.GlobalRecords}/${resource}/${id}`);
      return response.data;
    },
    enabled: !!id, // Only run if the ID is valid
  });
};

// Usage 
// import { useGetGlobalRecords, useGetGlobalRecordById } from "~/Hooks/Setup/GlobalRecords/useGlobalRecordsApi";
// const { data: fuelMasters, isLoading, error } = useGetGlobalRecords('FuelMasters');
// const { data: fuelMasterDetails, isLoading, error } = useGetGlobalRecordById('FuelMaster', id);

// Hook to add a new record for a given resource (e.g., 'FuelMasters')
const useAddGlobalRecord = (resource) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post(`${endPoints.GlobalRecords}/${resource}`, payload);
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
// import { useAddGlobalRecord } from "~/Hooks/Setup/GlobalRecords/useGlobalRecordsApi";
// const { mutateAsync: addFuelMaster, isLoading, isSuccess, error } = useAddRecord('FuelMaster');
// const handleAddSubmit = (formData) => {
//   addFuelMaster(formData);
// };

// Hook to edit a record for a given resource (e.g., 'FuelMasters')
const useUpdateGlobalRecord = (resource) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      // console.log("payload", id, payload)
      // console.log(resource)
      const response = await apiClient.put(`${endPoints.GlobalRecords}/${resource}/${id}`, payload);
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

// import { useUpdateGlobalRecord } from "~/Hooks/Setup/GlobalRecords/useGlobalRecordsApi";
// const { mutateAsync: updateFuelMaster, isLoading, isSuccess, error } = useUpdateGlobalRecord('FuelMaster');
// const handleEditSubmit = (id, formData) => {
//   updateFuelMaster({ id, payload: formData });
// };

// Hook to delete a record for a given resource (e.g., 'FuelMasters')
const useDeleteGlobalRecord = (resource) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await apiClient.delete(`${endPoints.GlobalRecords}/${resource}/${id}`);
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

// import { useDeleteGlobalRecord } from "~/Hooks/Setup/GlobalRecords/useGlobalRecordsApi";
// const { mutateAsync: deleteFuelMaster, isLoading, isSuccess, error } = useDeleteGlobalRecord('FuelMaster');
// const handleDelete = (id) => {
//   deleteFuelMaster(id);
// };

export {
  useGetGlobalRecords,
  useGetGlobalRecordById,
  useAddGlobalRecord,
  useUpdateGlobalRecord,
  useDeleteGlobalRecord,
};
