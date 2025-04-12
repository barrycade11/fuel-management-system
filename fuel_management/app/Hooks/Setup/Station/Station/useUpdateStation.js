import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useMutation } from "@tanstack/react-query";

const useUpdateStationMutation = () => {
  return useMutation({
    mutationFn: async ({ params, id }) => {
      const response = await apiClient.put(`${endPoints.Stations}/station/${id}`, params)
      return response.data;
    }
  })
};

export default useUpdateStationMutation; 
