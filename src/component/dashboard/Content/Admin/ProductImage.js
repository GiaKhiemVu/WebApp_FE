import { Button, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import ContentItem from "../ContentItem";
import PropTypes from "prop-types";
import { createProductImgForAdmin, getProductForAdmin } from "@/api/productService";
import { imageDecoder, imageRemovePrefix } from "@/util/imageUtil";

export default function ProductImage(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [pid, setPid] = useState("");
  const [product, setProduct] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type && !file.type.startsWith("image")) {
        setError("Please select an image file.");
        return;
      }
      if (file.size > 1024 * 1024) {
        setError("Please select an image smaller than 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePidChange = (e) => {
    setPid(e.target.value);
    setProduct(null)
    setSelectedImage(null)
  };

  const getProduct = () => {
    if(pid === ""){
      setError("Empty Pid")
      setProduct(null)
      return
    }
    const fetchProduct = async () => {
      try {
        const {Image ,...fetchedProduct} = await getProductForAdmin(pid).then((res) => res.data)
        if (!!Image) {
          console.log({ img: Image });
          setSelectedImage(imageDecoder(Image));
        }
        setProduct(fetchedProduct);
        setError("");
      } catch {
        setError("Cannot find product respective with that Pid")
        setProduct(null)
      }
    }

    fetchProduct()
  }

  const save = () => {
    const saveFunction = async (pid, imgPath) => {
      const savedProduct = {
        Pid: pid,
        image: imageRemovePrefix(imgPath),
      };
      console.log(savedProduct);
      try {
        await createProductImgForAdmin(savedProduct);
      } catch (err) {
        throw new Error("Save fail");
      }
    };
    
    saveFunction(product.Pid, selectedImage)
  }

  return (
    <div className={props.className}>
      <Input
        placeholder="Pid"
        value={pid}
        onChange={handlePidChange}
        onBlur={getProduct}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {product && (
        <>
          {Object.entries(product).map(([key, value], index) => (
            <Typography key={index}>
              {key}: {value}
            </Typography>
          ))}
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </>
      )}
      {selectedImage && (
        <>
          <Typography variant="h4">Preview Item:</Typography>
          <ContentItem
            list={[
              {
                ...product,
                imgPath: selectedImage,
              },
            ]}
          />
          <Button variant="contained" onClick={save}>
            save
          </Button>
        </>
      )}
    </div>
  );
}

ProductImage.propTypes = {
  className: PropTypes.string,
};
