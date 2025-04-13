import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery } from "@tanstack/react-query";

const useFetchFuelMasterProducts = () => {
  return useQuery({
    queryKey: ["fuel-master-stations"],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.GlobalRecords}/FuelMasters`);
      return response.data;
    },
  })
}

export {
  useFetchFuelMasterProducts,
}
