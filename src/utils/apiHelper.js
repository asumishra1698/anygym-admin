import axios from "axios";

// POST Request Helper
export const postRequest = async (url, payload, headers = {}) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in postRequest:", error);
    throw new Error(
      error.response?.data?.message || "Network error. Please try again."
    );
  }
};

// GET Request Helper
export const getRequest = async (url, params = null, config = {}) => {
  try {
    const token = localStorage.getItem("token");
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: params,
      ...config, 
    };

    const response = await axios.get(url, axiosConfig);
    return response.data;
  } catch (error) {
    console.error("Error in getRequest:", error);
    throw new Error(
      error.response?.data?.message || "Network error. Please try again."
    );
  }
};

export const putRequest = async (url, data, config = {}) => {
  try {
    const response = await axios.put(url, data, config);
    return response;
  } catch (error) {
    throw error.response || error;
  }
};