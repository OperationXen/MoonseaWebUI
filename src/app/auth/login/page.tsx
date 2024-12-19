"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Container, Box, Paper, Link } from "@mui/material";
import { TextField, Typography, Button } from "@mui/material";

import useSnackbar from "@/datastore/snackbar";
import { useUserStatus } from "@/data/fetch/auth";

export default function LoginWindow() {
  const { data: userStatus, login } = useUserStatus();
  const router = useRouter();
  const displayMessage = useSnackbar((s) => s.displayMessage);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    login({ username: username, password: password })
      .then(() => router.push("/characters"))
      .catch((error) => {
        if (error.response.status === 401) {
          displayMessage(
            "Wrong username or password - have you activated your account?",
            "error",
          );
        } else displayMessage("Server error", "error");
      });
  };

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && username && password) handleSubmit();
  };

  // If user is already logged in don't let them waste their time here
  useEffect(() => {
    if (userStatus?.authenticated) router.push("/characters");
  }, [userStatus]);

  return (
    <Container sx={{ display: "flex", height: "calc(100vh - 7em)" }}>
      <Paper
        elevation={12}
        sx={{
          alignSelf: "center",
          width: "25em",
          margin: "auto",
          display: "flex",
          padding: "0.8em 2em",
          flexDirection: "column",
          alignItems: "center",
        }}
        onKeyDown={keyPressHandler}
      >
        <Typography variant="h4">User login</Typography>
        <Box sx={{ margin: "0.4em", width: "100%" }}>
          <TextField
            fullWidth
            value={username}
            label="Username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box sx={{ margin: "0.4em", width: "100%" }}>
          <TextField
            fullWidth
            value={password}
            label="Password"
            type="password"
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button
          sx={{ width: "50%", margin: "0.4em" }}
          variant="contained"
          disabled={!username || !password}
          onClick={handleSubmit}
        >
          Login
        </Button>

        <Link
          variant="caption"
          sx={{ cursor: "pointer" }}
          onClick={() => router.push("/auth/register")}
        >
          Register an account
        </Link>
        <Link
          variant="caption"
          sx={{ cursor: "pointer" }}
          onClick={() => router.push("/auth/passwordreset")}
        >
          I forgot my password
        </Link>
      </Paper>
    </Container>
  );
}
