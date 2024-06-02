import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import TableRender from "./TableRender";
import ProductImage from "./ProductImage";

const tabList = ["User", "Product", "Order", "Category"];

function AdminContent(props) {
  const [clickState, setClickState] = useState(0);

  return (
    <>
      {props.currentContent.content === "Modify" && (
        <div className="middleContentAdmin">
          <div style={{ display: "flex" }}>
            {tabList.map((tabName, index) => {
              return (
                <Typography
                  className={`tab ${clickState === index ? "clicked" : ""}`}
                  key={index}
                  onClick={() => {
                    setClickState(index);
                  }}
                >
                  {tabName}
                </Typography>
              );
            })}
          </div>
          <div>
            <TableRender name={tabList[clickState]} />
          </div>
        </div>
      )}
      {props.currentContent.content === "Upload Image" && (
        <ProductImage className="middleImgAdmin" />
      )}
    </>
  );
}

AdminContent.propTypes = {
  currentContent: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default AdminContent;
