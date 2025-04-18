import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery } from "@tanstack/react-query";

// Named export
export const fetchStationTanks = async (stationId) => {
  try {
    const response = await apiClient.get(`${endPoints.Stations}/station/${stationId}/tanks`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Default export
const useStationTanks = (stationId) => {
  return useQuery({
    queryKey: ['tanks', stationId],
    queryFn: () => fetchStationTanks(stationId),
    enabled: false,
  });
};

export default useStationTanks;