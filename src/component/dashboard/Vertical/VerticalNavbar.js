import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Welcome from "./Welcome";
import { Paper } from "@mui/material";
import "./style.css";
import ChildContent from "./ChildContent";

const MENUITEM = [
  {
    name: "Menu",
  },
  {
    name: "Food",
    child: ["Recommend", "Fast", "Dessert", "Meal"],
  },
  {
    name: "Drink",
    child: ["Recommend", "Coffee", "Tea", "Ice Blended", "Signature"],
  },
  {
    name: "Combo",
  },
];

const ADMINFUNC = [
  {
    name: "ADMIN",
    child: ["Modify", "Authorize", "Upload Image"],
  },
];

function VerticalNavbar(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <Paper className="verticalSide">
      <Welcome user={user} />
      {MENUITEM.map((item, index) => {
        return (
          <ChildContent
            key={index}
            title={item.name}
            itemList={item.child}
            setCurrentContent={props.setCurrentContent}
          />
        );
      })}
      {user?.role === "admin" &&
        ADMINFUNC.map((item, index) => {
          return (
            <ChildContent
              key={index}
              title={item.name}
              itemList={item.child}
              setCurrentContent={props.setCurrentContent}
            />
          );
        })}
    </Paper>
  );
}

VerticalNavbar.propTypes = {
  user: PropTypes.object,
  setCurrentContent: PropTypes.func,
};

export default VerticalNavbar;
