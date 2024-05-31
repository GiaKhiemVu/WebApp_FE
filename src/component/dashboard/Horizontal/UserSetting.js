import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Divider, MenuItem, Typography } from "@mui/material";
import { clearLoginCookies } from "@/util/getCookie";

const settings = [
  {
    name: "Profile",
    onClick: () => {
      console.log("Profile");
    },
  },
  {
    name: "Cart",
    onClick: () => {
      console.log("Account");
    },
  },
  {
    name: "Payment",
    onClick: () => {
      console.log("Payment");
    },
  },
  {
    name: "Logout",
    onClick: () => {
      console.log("Logout");
      clearLoginCookies();
      window.location.reload();
    },
  },
];

function UserSetting(props) {
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <Box sx={{ m: 2 }}>
      <Typography>{"Hello, " + user.LastName}</Typography>
      <Typography>{"Role: " + user.role}</Typography>
      <Divider />
      {settings.map((setting) => (
        <MenuItem key={setting.name} onClick={setting.onClick}>
          <Typography textAlign="center">{setting.name}</Typography>
        </MenuItem>
      ))}
    </Box>
  );
}

UserSetting.propTypes = {
  user: PropTypes,
};

export default UserSetting;
