export const getAllKeys = (obj) => {
  return Object.keys(obj);
};

export const formatString = (string, lengthLimit) => {
  if (string.length > lengthLimit) {
    return string.slice(0, lengthLimit) + "...";
  } else {
    return string;
  }
};
