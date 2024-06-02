import api from "./api";

export const getProductForAdmin = async (id) => {
  try {
    let data = null
    if (!id) {
      const response = await api.get("getProduct");
      data = response.data;
    } else {
      const response = await api.get(`getProduct/${id}`);
      data = response.data;
    }

    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

/**
 * payload {
 *  Pid,
 *  image,
 * }
 */
export const createProductImgForAdmin = async (payload) => {
  try {
    const data = await api.post("createImg", {data: payload});
    return data
  } catch (err) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export const getCategoryForAdmin = async () => {
  try {
    const data = await api.get("getCategory");
    return data.data;
  } catch (err) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export const getRecommend = async (type) => {
  try {
    const data = await api.get(`getProductByRecommend/${type}`);
    return data.data;
  } catch (err) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getProductByCategory = async (id) => {
  if(!id){
    return
  }
  try {
    const data = await api.get(`getProductByCategory/${id}`);
    return data.data;
  } catch (err) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export const getCategory = (currentContent) => {
  if(currentContent.title === "Menu"){
    return 0;
  }
  if(currentContent.title === "Food"){
    if(currentContent.content === "Fast"){
      return 1;
    } else if(currentContent.content === "Dessert"){
      return 2;
    } else if (currentContent.content === "Meal") {
      return 3;
    } else {
      return 10;
    }
  }
  if(currentContent.title === "Drink"){
    if (currentContent.content === "Coffee") {
      return 4;
    } else if (currentContent.content === "Tea") {
      return 5;
    } else if (currentContent.content === "Ice Blended") {
      return 6;
    } else {
      return 11
    }
  }
};