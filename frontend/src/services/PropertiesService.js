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
    console.error("Could not list property:", error);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

const getProperties = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}properties`
    );
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Could not fetch data:", error);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

const getFilteredSortedProperties = async (params) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}properties`,
      {
        params,
      }
    );
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Could not fetch data:", error);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export { listProperty, getProperties, getFilteredSortedProperties };
