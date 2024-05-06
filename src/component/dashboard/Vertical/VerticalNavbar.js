import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Welcome from "./Welcome";
import { getUserCookie } from "@/util/getCookie";
import { Paper } from "@mui/material";
import { getUser } from "@/api/api";

function VerticalNavbar(props) {
  const [auth, setAuth] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        return user;
      } catch {
        return null;
      }
    };

    if (!getUserCookie()) {
      fetchUser();
    }
    const userInfo = getUserCookie();
    setUser(userInfo);
  }, []);

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [user]);

  return (
    <Paper
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        flex: "initial",
      }}
    >
      <Welcome user={user} />
    </Paper>
  );
}

VerticalNavbar.propTypes = {};

export default VerticalNavbar;
