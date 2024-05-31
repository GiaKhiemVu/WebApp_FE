import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

function ChildItem(props) {
  const itemList = props.itemList;
  return (
    <div className="transition-opacity bg-red-700">
      {itemList?.map((item, index) => (
        <div
          key={index}
          className="opacity-0 animate-fade-in delay-[100ms] duration-300 "
          onClick={(e) => {
            props.setCurrentContent(e.target.innerText);
          }}
          style={{ cursor: "pointer" }}
        >
          <Typography variant="h7" className="childItem">
            {item}
          </Typography>
        </div>
      ))}
    </div>
  );
}

ChildItem.propTypes = {
  itemList: PropTypes.array,
  setCurrentContent: PropTypes.func,
};

export default ChildItem;
