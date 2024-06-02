export const imageRemovePrefix = (imgPath) => {
  return imgPath.replace(/^data:image\/png;base64,/, "");
};

export const imageDecoder = (img) => {
    const image = atob(img);
    return `data:image/png;base64,${image}`;
}