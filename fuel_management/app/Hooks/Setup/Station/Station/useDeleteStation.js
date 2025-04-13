import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useMutation } from "@tanstack/react-query";


const useDeleteStationMutation = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await apiClient.delete(`${endPoints.Stations}/station/${id}`);
      return response.data;
    }
  })
};

export default useDeleteStationMutation; 


