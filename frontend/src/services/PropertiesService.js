import axios from "axios";

const listProperty = async (body) => {
  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}properties`, body);
  } catch (error) {
    console.error("Could not fetch area suggestions:", error);
  }
};

export { listProperty };
