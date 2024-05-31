import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import TableRender from "./TableRender";

const tabList = ["User", "Product", "Order"];

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
