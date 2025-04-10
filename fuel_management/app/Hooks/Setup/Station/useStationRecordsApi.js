import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery, useMutation } from "@tanstack/react-query";

// Hook to fetch all records for a given resource (e.g., 'FuelMasters')
const useGetStationRecords = (resource) => {
  return useQuery({
    queryKey: [resource],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.Stations}/${resource}`);
      return response.data;
    },
  });
};

// Hook to fetch a single record by its ID for a given resource (e.g., 'FuelMaster')
const useGetStationRecordById = (resource, id) => {
  return useQuery({
    queryKey: [resource, id],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.Stations}/${resource}/${id}`);
      return response.data;
    },
    enabled: !!id, // Only run if the ID is valid
  });
};

// Usage 
// import { useGetStationRecords, useGetStationRecordById } from "~/Hooks/Setup/Stations/useStationRecordsApi";
// const { data: fuelMasters, isLoading, error } = useGetStationRecords('FuelMasters');
// const { data: fuelMasterDetails, isLoading, error } = useGetStationRecordById('FuelMaster', id);

// Hook to add a new record for a given resource (e.g., 'FuelMasters')
const useAddStationRecord = (resource) => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post(`${endPoints.Stations}/${resource}`, payload);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(`Added ${resource} successfully:`, data);
    },
    onError: (error) => {
      console.error(`Failed to add ${resource}:`, error);
    },
  });
};

// Usage 
// import { useAddStationRecord } from "~/Hooks/Setup/Stations/useStationRecordsApi";
// const { mutate: addFuelMaster, isLoading, isSuccess, error } = useAddStationRecord('FuelMaster');
// const handleAddSubmit = (formData) => {
//   addFuelMaster(formData);
// };

// Hook to edit a record for a given resource (e.g., 'FuelMasters')
const useUpdateStationRecord = (resource) => {
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const response = await apiClient.put(`${endPoints.Stations}/${resource}/${id}`, payload);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(`Updated ${resource} successfully:`, data);
    },
    onError: (error) => {
      console.error(`Failed to update ${resource}:`, error);
    },
  });
};

// import { useUpdateStationRecord } from "~/Hooks/Setup/Stations/useStationRecordsApi";
// const { mutate: updateFuelMaster, isLoading, isSuccess, error } = useUpdateStationRecord('FuelMaster');
// const handleEditSubmit = (id, formData) => {
//   updateFuelMaster({ id, payload: formData });
// };

// Hook to delete a record for a given resource (e.g., 'FuelMasters')
const useDeleteStationRecord = (resource) => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await apiClient.delete(`${endPoints.Stations}/${resource}/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(`Deleted ${resource} successfully:`, data);
    },
    onError: (error) => {
      console.error(`Failed to delete ${resource}:`, error);
    },
  });
};

// import { useDeleteStationRecord } from "~/Hooks/Setup/Stations/useStationRecordsApi";
// const { mutate: deleteFuelMaster, isLoading, isSuccess, error } = useDeleteStationRecord('FuelMaster');
// const handleDelete = (id) => {
//   deleteFuelMaster(id);
// };

export {
  useGetStationRecords,
  useGetStationRecordById,
  useAddStationRecord,
  useUpdateStationRecord,
  useDeleteStationRecord,
};
