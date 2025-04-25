import axios from "axios";

export const postRequest = async (url, payload) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error) {
    console.error("Error in postRequest:", error);
    throw new Error("Network error. Please try again.");
  }
};

export const getRequest = async (url, params = null) => {
  try {
    console.log("Making GET request to:", url); // Add this log
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      params: params,
    });

    return response;
  } catch (error) {
    console.error("Error in getRequest:", error);
    throw new Error(error.response?.data?.message || "Network error. Please try again.");
  }
};