"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "./loginForm";
import { login } from "@/api/api";
import { Button, Card, Dialog } from "@mui/material";
import LoginLayout from "./loginLayout";
import { dashboardRoute } from "@/route/route";

const Login = () => {
  const [user, setUser] = useState({ account: null, password: null });
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.account !== null && user.password !== null) {
          const response = await login(user);
          setMessage(response.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [user]);

  const updateUser = async (userData) => {
    setUser(userData);
  };

  return (
    <LoginLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoginForm submit={updateUser} />
        <Dialog
          open={!!message}
          style={{ textAlign: "center", margin: "20px" }}
        >
          <Card sx={{ padding: "10px", margin: "10px" }}>{message}</Card>
          <Button
            onClick={() => {
              if (message === "Login success") {
                window.location.href = dashboardRoute.home;
                window.location.reload;
              } else {
                setMessage(null);
              }
            }}
            style={{ margin: "10px" }}
            variant="outlined"
          >
            Okay
          </Button>
        </Dialog>
      </div>
    </LoginLayout>
  );
};

export default Login;
