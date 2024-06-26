"use client";
import React, { useEffect, useState } from "react";
import RegisterForm from "../../../component/account/register/registerForm";
import { loginRoute } from "@/route/route";
import { register } from "@/api/api";
import { Dialog, Button, Card } from "@mui/material";
import LoginLayout from "../../../component/account/login/loginLayout";

function Register() {
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState("aaa");

  const handleSubmit = (userRegisterData) => {
    setUserData(userRegisterData);
  };

  useEffect(() => {
    const registerUser = async () => {
      if (userData) {
        try {
          const response = await register(userData);
          console.log("User registered successfully:", response.message);
          return response.message;
        } catch (error) {
          console.error("Error registering user:", error);
          return "Error registering user: " + error.message;
        }
      }
    };

    const setMessageAsync = async () => {
      const message = await registerUser();
      setMessage(message);
    };

    setMessageAsync();
  }, [userData]);

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
        <RegisterForm submit={handleSubmit} />
        <Dialog
          open={!!message}
          style={{ textAlign: "center", margin: "20px" }}
        >
          <Card sx={{ padding: "10px", margin: "10px" }}>{message}</Card>
          <Button
            onClick={() => {
              if (message === "Create success") {
                window.location.href = loginRoute.loginPage;
              } else {
                setMessage(null);
              }
            }}
            style={{ margin: "10px" }}
            variant="outlined"
          >
            {message === "Create success" ? "Go to login" : "OKay"}
          </Button>
        </Dialog>
      </div>
    </LoginLayout>
  );
}

export default Register;
