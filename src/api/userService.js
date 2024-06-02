// userService.js
import api from "./api"; // Adjust the path as needed

export const getUser = async () => {
  try {
    const response = await api.get("getUser");
    const data = response.data.user;
    document.cookie = `user_info=${encodeURIComponent(
      JSON.stringify(data)
    )}; path=/;`;
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getUserForAdmin = async () => {
  try {
    const response = await api.get("getFullUserInfo");
    const data = response.data
    return data
  } catch(error){
    throw new Error(error.response?.data?.message || error.message);
  }
}