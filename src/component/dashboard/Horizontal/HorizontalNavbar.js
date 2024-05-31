"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  Tooltip,
  Box,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { dashboardRoute, loginRoute } from "@/route/route";
import UserSetting from "./UserSetting";
import "./appbar.css";
import PropTypes from "prop-types";

export default function HorizontalNavbar(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(props.user);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    setUser(props.user);
    setAuth(!!props.user);
  }, [props.user]);

  const handleMenuOpen = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className="app">
      <Container className="container">
        <span className="navItem justify-start">
          <Icon icon="openmoji:roasted-coffee-bean" className="bigIcon" />
          <Typography
            variant="h4"
            component="div"
            className="shopTitle"
            onClick={() => {
              window.location.href = dashboardRoute.home;
            }}
          >
            TheCoffeeK
          </Typography>
        </span>
        <span className="navItem">
          {auth ? (
            <Box className="relative">
              <Tooltip title="Open profile">
                <Box className="boxAccount">
                  <IconButton onClick={handleMenuOpen}>
                    <Icon icon="mdi:account-outline" className="icon" />
                  </IconButton>
                </Box>
              </Tooltip>
              <Menu
                className="accountDetail"
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleMenuClose}
              >
                <UserSetting user={user} />
              </Menu>
            </Box>
          ) : (
            <Toolbar>
              <Button
                color="inherit"
                onClick={() => {
                  window.location.href = loginRoute.loginPage;
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  window.location.href = loginRoute.registerPage;
                }}
              >
                Register
              </Button>
            </Toolbar>
          )}
        </span>
      </Container>
    </AppBar>
  );
}

HorizontalNavbar.propTypes = {
  user: PropTypes.object,
};
