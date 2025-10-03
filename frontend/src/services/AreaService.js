import axios from "axios";

const getAreaSuggestions = async (input) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}areas`,
      {
        params: {
          input,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Could not fetch area suggestions:", error);
    return [];
  }
};

export { getAreaSuggestions };
