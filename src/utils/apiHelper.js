import axios from "axios";

// POST Request Helper
export const postRequest = async (url, payload) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to process the request.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error in postRequest:", error);
    throw new Error(error.message || "Network error. Please try again.");
  }
};

// GET Request Helper
export const getRequest = async (url, params = null) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Making GET request to:", url);
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: params,
    });

    return response.data;
  } catch (error) {
    console.error("Error in getRequest:", error);
    throw new Error(
      error.response?.data?.message || "Network error. Please try again."
    );
  }
};
