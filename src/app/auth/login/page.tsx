"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Container, Box, Paper, Link, Divider } from "@mui/material";
import { TextField, Typography, Button } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { useUserStatus } from "@/data/fetch/auth";

export default function LoginWindow() {
  const router = useRouter();
  const { data: userStatus, login } = useUserStatus();
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
  if (userStatus?.authenticated) router.push("/characters");

  return (
    <Container sx={{ display: "flex", height: "calc(100vh - 7em)" }}>
      <Paper
        elevation={6}
        sx={{
          alignSelf: "center",
          width: "28em",
          minHeight: "8em",
          margin: "auto",
          display: "flex",
          padding: "0.8em 2em",
          flexDirection: "column",
          alignItems: "center",
        }}
        onKeyDown={keyPressHandler}
      >
        <Typography variant="h4">Login required</Typography>
        <Divider className="w-full m-2" />

        <NextLink className="w-full" href={"/api/discord_auth/login"} passHref>
          <Button className="w-full" variant="contained">
            Sign in with discord
          </Button>
        </NextLink>

        <Divider className="w-80 my-4 opacity-70">OR</Divider>

        <Accordion
          className="w-full"
          sx={{
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            className="opacity-70"
          >
            <Typography component="span">Sign in to account</Typography>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col gap-4 items-center">
            <TextField
              fullWidth
              value={username || ""}
              label="Username"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              value={password || ""}
              label="Password"
              type="password"
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-full"
              variant="contained"
              disabled={!username || !password}
              onClick={handleSubmit}
            >
              Login
            </Button>

            <Box className="flex gap-8 mt-2">
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
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
}
