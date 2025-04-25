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
    throw new Error("Network error. Please try again.");
  }
};

export const getRequest = async ({ url = null, params = null }) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      params: params,
    });

    if (response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error in getRequest:", error);
    throw new Error(error.response?.data?.message || "Network error. Please try again.");
  }
};
