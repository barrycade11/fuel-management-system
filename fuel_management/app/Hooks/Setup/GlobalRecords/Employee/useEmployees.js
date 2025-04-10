import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery, useMutation } from "@tanstack/react-query";

const fetchEmployees = async () => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Employees/`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchEmployeeDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Employees/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createEmployee = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Employee`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

// Hook to generate employee code
const useGenerateEmployeeCode = (resource) => {
  return useQuery({
    queryKey: [resource],
    queryFn: async () => {
      const response = await apiClient.get(`${endPoints.GlobalRecords}/${resource}/generate-emp-code`);
      return response.data;
    },
  });
};

// const generateEmployeeCode = async () => {
//     try {
//         const response = await apiClient.get(`${endPoints.GlobalRecords}/Employee/generate-emp-code/`);

//         return response.data;
//     }
//     catch (error) {
//         throw error;
//     }
// }

const updateEmployee = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Employee/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteEmployee = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Employee/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    fetchEmployees, 
    fetchEmployeeDetails, 
    createEmployee, 
    useGenerateEmployeeCode, 
    updateEmployee, 
    deleteEmployee 
};