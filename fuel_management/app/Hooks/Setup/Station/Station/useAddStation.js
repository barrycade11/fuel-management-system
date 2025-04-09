import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useMutation } from "@tanstack/react-query";

const useAddStationMutation = () => {
  return useMutation({
    mutationFn: async (params) => {
      const response = await apiClient.post(`${endPoints.Stations}/station`, params)
      return response.data;
    }
  })
};

export default useAddStationMutation;
