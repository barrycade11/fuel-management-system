import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchfuelDeliveryAttachments = async (fuelDeliveryId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Attachment`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};



// const getDataController = (params) => {
//     return new Promise((resolve, reject) => {
//       CRUD.get(params.data, params.url, params.addConfig)
//         .then((res) => {
//           if (!res.isError) {
//             resolve(res);
//           } else {
//             resolve(false);
//           }
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   };



//   get(data, url, addConfig) {
//     return new Promise((resolve, reject) => {
//       const payload = { ...data };

//       this.Request.get(url, payload, addConfig)
//         .then((res) => {
//           let result = res.data;
//           resolve(result);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   }

  
//   get(url, payload, addConfig) {
//     return new Promise((resolve, reject) => {
//       // Create the config object for the axios call
//       let config = {
//         url: url,
//         method: "get",
//         headers: {},
//         data: payload,
//         ...addConfig,
//       };
//       // Execute axios call to backend
//       this._axiosExecute(config)
//         .then((res) => {
//           resolve(res);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   }

const fetchfuelDeliveryAttachment = async (fuelDeliveryId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Attachment/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createfuelDeliveryAttachment = async (fuelDeliveryId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Attachment`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updatefuelDeliveryAttachment = async (fuelDeliveryId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Attachment/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deletefuelDeliveryAttachment = async (fuelDeliveryId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/fuelDelivery/${fuelDeliveryId}/Attachment/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchfuelDeliveryAttachments,
    fetchfuelDeliveryAttachment,
    createfuelDeliveryAttachment,
    updatefuelDeliveryAttachment,
    deletefuelDeliveryAttachment,
};