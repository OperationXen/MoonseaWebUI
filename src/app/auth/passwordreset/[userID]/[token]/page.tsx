"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { Container, Paper, Typography, Divider } from "@mui/material";
import { Box, Stack, Button, TextField } from "@mui/material";

import useSnackbar from "@/datastore/snackbar";

import { validatePassword } from "@/utils/user";
import { useUserStatus } from "@/data/fetch/auth";

export default function PasswordReset() {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const { data: userStatus, completePasswordReset } = useUserStatus();
  const { userID, token } = useParams();
  const router = useRouter();

  const [highlight, setHighlight] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = () => {
    completePasswordReset({
      user_id: userID as string,
      token: token as string,
      password: password1,
    })
      .then(() => {
        displayMessage("Password updated", "success");
        router.push("/characters");
      })
      .catch((_error) => {
        displayMessage("Unable to reset password", "error");
      });
  };

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (
      e.key === "Enter" &&
      password1 === password2 &&
      validatePassword(password1)
    )
      handleSubmit();
  };

  // sanity check the token and userID
  if (
    !(userID as string).match(/\d+/) ||
    !(token as string).match(/[0-9a-f-]{30,42}/)
  ) {
    router.push("/auth/login");
  }

  // If user is already logged in don't let them waste their time here
  useEffect(() => {
    if (userStatus?.authenticated) router.push("/characters");
  }, [userStatus]);

  return (
    <Container
      className="flex items-center justify-around"
      sx={{ height: "calc(100vh - 6em)" }}
    >
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
        <Typography variant="h4">Set a new password</Typography>
        <Divider sx={{ width: "100%", marginBottom: "0.4em" }} />
        <Stack spacing={1} width="100%" sx={{ alignItems: "center" }}>
          <TextField
            fullWidth
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            label="New password"
            error={highlight && !validatePassword(password1)}
            placeholder="Password must be at least 8 characters"
          />
          <TextField
            fullWidth
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            label="Confirm new password"
            error={highlight && password1 !== password2}
            placeholder="Reenter the same password"
          />
          <Box
            sx={{ width: "60%" }}
            onMouseOver={() => setHighlight(true)}
            onMouseOut={() => setHighlight(false)}
          >
            <Button
              fullWidth
              variant="contained"
              disabled={password1 !== password2 || !validatePassword(password1)}
              onClick={handleSubmit}
            >
              Change Password
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
