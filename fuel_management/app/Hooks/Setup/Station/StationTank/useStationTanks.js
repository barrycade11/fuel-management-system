import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery } from "@tanstack/react-query";

const useStationTanks = (stationId) => {
  return useQuery({
    queryKey: ['tanks', stationId],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.Stations}/Station/${stationId}/Tanks`);
      return response.data;
    },
    enabled: false,
  })
}

export default useStationTanks;
