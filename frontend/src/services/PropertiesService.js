import axios from "axios";

const listProperty = async (body) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}properties`,
      body
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Could not fetch area suggestions:", error);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export { listProperty };
