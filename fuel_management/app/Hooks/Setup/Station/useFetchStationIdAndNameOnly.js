import { apiClient } from "~/Constants/ApiClient";
import { useQuery } from "@tanstack/react-query";
import { endPoints } from "~/Constants/EndPoints";

/**
 *  use at Settings/Users page for getinng the name and id only to filter users associated
 *  with that station
 */
export const useFetchStationIdAndName = () => {
  return useQuery({
    queryKey: ['stationidname'],
    queryFn: async () => {
      const response = await apiClient.get(endPoints.Stations);
      return response.data;
    }
  })
}

