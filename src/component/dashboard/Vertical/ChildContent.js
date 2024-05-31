import React, { useState } from "react";
import PropTypes from "prop-types";
import { Divider, Typography } from "@mui/material";
import ChildItem from "./ChildItem";
import { Iconify } from "@/component/Iconify";

function ChildContent(props) {
  const { title } = props;
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    if (!props.itemList) {
      props.setCurrentContent({ title: title });
    }
  };

  const setCurrentContent = (content) => {
    props.setCurrentContent({
      title: title,
      content: content,
    })
  }

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={toggleOpen}
      >
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <div style={{ marginLeft: "auto" }}>
          {props.itemList && <Iconify
            icon={isOpen ? "icon-park-outline:down" : "icon-park-outline:right"}
          />}
        </div>
      </div>
      {isOpen && (
        <ChildItem
          itemList={props.itemList}
          setCurrentContent={setCurrentContent}
        />
      )}
      <Divider />
    </>
  );
}

ChildContent.propTypes = {
  title: PropTypes.string,
  itemList: PropTypes.array,
  setCurrentContent: PropTypes.func,
};

export default ChildContent;
