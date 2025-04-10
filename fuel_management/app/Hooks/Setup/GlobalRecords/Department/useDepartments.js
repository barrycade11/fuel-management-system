import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery } from "@tanstack/react-query";

const useFetchDepartments = () => {
  return useQuery({
    queryKey: ['deparments'],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.GlobalRecords}/departments`)
      return response.data;
    }
  });
}

const fetchDepartments = async () => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Departments`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchDepartmentDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Departments/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createDepartment = async (data) => {
    try {
        // console.log("POST URL:", `${endPoints.GlobalRecords}/Department`);
        // console.log("Payload:", data);
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Department`, data);
        // console.log(response)
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateDepartment = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Department/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteDepartment = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Department/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    useFetchDepartments,
    fetchDepartments, 
    fetchDepartmentDetails, 
    createDepartment, 
    updateDepartment, 
    deleteDepartment 
};
