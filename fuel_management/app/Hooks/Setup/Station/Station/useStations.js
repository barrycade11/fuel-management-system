import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery } from "@tanstack/react-query";

const useFetchStations = () => {
  return useQuery({
    queryKey: ['stations'],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.Station}/stations`);
      return response.data;
    }
  })
}

const fetchStations = async () => {
    try {
        const response = await apiClient.get(`${endPoints.Stations}/Stations`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchStationDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.Stations}/Stations/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createStation = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.Stations}/Station`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateStation = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.Stations}/Station/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteStation = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.Stations}/Station/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    useFetchStations,
    fetchStations, 
    fetchStationDetails, 
    createStation, 
    updateStation, 
    deleteStation 
};
