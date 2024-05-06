"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Button,
  Menu,
  Tooltip,
  Box,
} from "@mui/material";
import { getUserCookie } from "@/util/getCookie";
import { Iconify } from "../../Iconify";
import { dashboardRoute, loginRoute } from "@/route/route";
import UserSetting from "./UserSetting";
import NavbarItems from "./NavbarItems";
import { getUser } from "@/api/api";

export default function HorizontalNavbar(props) {
  const [auth, setAuth] = useState(true);
  const [user, setUser] = useState();
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        console.log(user);
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
    <AppBar position="static" sx={{ p: 1 }}>
      <Container maxWidth="xl">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Iconify icon="entypo:shop"></Iconify>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              window.location.href = dashboardRoute.home;
            }}
          >
            TheCoffeeK
          </Typography>
          <NavbarItems />
          {auth ? (
            <Box sx={{ flexGrow: 0, marginRight: "10px" }}>
              <Tooltip title="Open profile">
                <Box
                  style={{
                    border: "1px solid black",
                    borderRadius: "50%",
                    width: "35px",
                    height: "35px",
                    backgroundColor: "lightgray",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      setAnchorElUser(true);
                    }}
                    sx={{
                      p: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Iconify icon="mdi:account" sx={{ fontSize: "30px" }} />
                  </IconButton>
                </Box>
              </Tooltip>
              <Menu
                sx={{ mt: "60px", w: "200px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <UserSetting user={user}></UserSetting>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
