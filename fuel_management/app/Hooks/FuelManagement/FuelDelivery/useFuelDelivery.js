import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";


const fetchfuelDeliveries = async (resource) => {
    try {
        const {effectivedate, stationids} = resource;
        const response = await apiClient.get(`${endPoints.FuelManagements}/fuelDeliveries/${effectivedate}/${stationids}`);
 
        // console.log("effectivedate", effectivedate);
        // console.log("station", stationids);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};
 
// const fetchfuelDeliveries = (resource) => {
//     return useQuery({
//       queryKey: [resource],
//       queryFn: async () => {
//         const response = await apiClient.get(`${endPoints.FuelManagements}/fuelDeliveries`);
//         return response.data;
//       },
//     });
// };

const fetchfuelDelivery = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.FuelManagements}/fuelDeliveries/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createfuelDelivery = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.FuelManagements}/fuelDelivery`, data);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updatefuelDelivery = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.FuelManagements}/fuelDelivery/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deletefuelDelivery = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.FuelManagements}/fuelDelivery/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchfuelDeliveries,
    fetchfuelDelivery,
    createfuelDelivery,
    updatefuelDelivery,
    deletefuelDelivery,
};