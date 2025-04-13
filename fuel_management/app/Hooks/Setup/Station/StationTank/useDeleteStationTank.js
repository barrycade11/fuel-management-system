import { useMutation } from "@tanstack/react-query";
import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const useDeleteStationTankMutation = () => {
  return useMutation({
    mutationFn: async ({ stationId, tankId }) => {
      const response = await apiClient.delete(`${endPoints.Stations}/station/${stationId}/tank/${tankId}`);
      return response.data;
    }
  })
}

export default useDeleteStationTankMutation;
