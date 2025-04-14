import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useMutation, useQuery } from "@tanstack/react-query";

const useFetchShifts = () => {
  return useQuery({
    queryKey: ['stationsshifts'],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.GlobalRecords}/Shifts`);
      return response.data;
    },
  });
}

const useFetchStationShifts = (id) => {
  return useQuery({
    queryKey: ['stationshifts', id],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.Stations}/station/${id}/shifts`);
      return response.data;
    }
  });
}

const useCreateShiftMutation = () => {
  return useMutation({
    mutationFn: async ({ params, stationId }) => {
      const response = await apiClient.post(`${endPoints.Stations}/station/${stationId}/shift`, params)
      return response.data;
    }
  })
}

const useUpdateShiftMutation = () => {
  return useMutation({
    mutationFn: async (params) => {
      console.log(params);
      const response = await apiClient.put(`${endPoints.Stations}/station/${params.stationId}/shift/${params.id}`, { "shiftId": params.shiftId })
      return response.data;
    },
  });
}

const useDeleteShiftMutation = () => {
  return useMutation({
    mutationFn: async ({ stationId, id }) => {
      const response = await apiClient.delete(`${endPoints.Stations}/station/${stationId}/shift/${id}`);
      return response.data;
    }
  });
}

const fetchShifts = async () => {
  try {
    const response = await apiClient.get(`${endPoints.GlobalRecords}/Shifts`);

    return response.data;
  }
  catch (error) {
    throw error;
  }
};

const fetchShiftDetails = async (id) => {
  try {
    const response = await apiClient.get(`${endPoints.GlobalRecords}/Shifts/${id}`);

    return response.data;
  }
  catch (error) {
    throw error;
  }
};

const createShift = async (data) => {
  try {
    const response = await apiClient.post(`${endPoints.GlobalRecords}/Shift`, data);

    return response.data;
  }
  catch (error) {
    throw error;
  }
};

const updateShift = async (id, data) => {
  try {
    const response = await apiClient.put(`${endPoints.GlobalRecords}/Shift/${id}`, data);

    return response.data;
  }
  catch (error) {
    throw error;
  }
};

const deleteShift = async (id) => {
  try {
    const response = await apiClient.delete(`${endPoints.GlobalRecords}/Shift/${id}`);

    return response.data;
  }
  catch (error) {
    throw error;
  }
};

export {
  useFetchShifts,
  useFetchStationShifts,
  useCreateShiftMutation,
  useUpdateShiftMutation,
  useDeleteShiftMutation,
  fetchShifts,
  fetchShiftDetails,
  createShift,
  updateShift,
  deleteShift
};
