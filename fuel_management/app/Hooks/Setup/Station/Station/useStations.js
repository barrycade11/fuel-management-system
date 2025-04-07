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

export default useFetchStations;
