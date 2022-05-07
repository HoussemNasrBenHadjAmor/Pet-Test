import axios from "axios";

export const getAllPets = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/findByStatus?status=available`
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getOnePet = async (id) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const createPet = async (pet) => {
  try {
    await axios.post(process.env.REACT_APP_API_URL, pet);
  } catch (error) {
    return error;
  }
};

export const deletePet = async (id) => {
  try {
    await axios.post(process.env.REACT_APP_API_URL, id, {
      headers: {
        api_key: "special-key",
      },
    });
  } catch (error) {
    return error;
  }
};
