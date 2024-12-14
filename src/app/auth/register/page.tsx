"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Container, Box, Paper, Link } from "@mui/material";
import { TextField, Typography, Button } from "@mui/material";

import useSnackbar from "../../../datastore/snackbar";
import { validatePassword, checkDiscordID } from "../../../utils/user";
import { registerAccount } from "../../../api/user";

type Issues = {
  password?: string;
  username?: string;
  email?: string;
};

export default function RegistrationWindow() {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [discordID, setDiscordID] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [issues, setIssues] = useState<Issues>({});

  const updatePassword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    delete issues.password;
    setIssues(issues);

    setPassword1(e.target.value);
  };

  const handleSubmit = () => {
    registerAccount(username, email, discordID, password1)
      .then(() => {
        displayMessage("Your account has been created, please check your email for a verification email", "success");
        router.push("/auth/login");
      })
      .catch((error) => {
        if ("errors" in error.response.data) setIssues(error.response.data["errors"]);
        displayMessage("Unable to register this account", "error");
      });
  };

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && username && password1) handleSubmit();
  };

  return (
    <Container sx={{ display: "flex", height: "calc(100vh - 7em)" }}>
      <Paper
        elevation={12}
        sx={{
          alignSelf: "center",
          width: "35em",
          margin: "auto",
          display: "flex",
          padding: "0.8em 2em",
          flexDirection: "column",
          alignItems: "center",
        }}
        onKeyDown={keyPressHandler}
      >
        <Typography variant="h4">Register A New Account</Typography>
        <Box
          sx={{
            margin: "0.4em",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            sx={{ flexGrow: 0.6 }}
            value={username}
            label="Username"
            autoComplete="username"
            error={issues.username !== undefined}
            helperText={issues.username ? issues.username : null}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            sx={{ flexGrow: 0.35 }}
            value={discordID}
            label="Discord Username (optional)"
            autoComplete="discord"
            error={discordID !== "" && !checkDiscordID(discordID)}
            placeholder="Username"
            onChange={(e) => setDiscordID(e.target.value.trim())}
          />
        </Box>
        <Box sx={{ margin: "0.4em", width: "100%" }}>
          <TextField
            fullWidth
            value={email}
            label="eMail"
            autoComplete="email"
            error={issues.email !== undefined}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            margin: "0.4em",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            sx={{ flexGrow: 0.48 }}
            value={password1}
            label="Password"
            type="password"
            autoComplete="password"
            error={issues.password !== undefined}
            helperText={
              issues.password
                ? issues.password[0]
                : password1 && !validatePassword(password1)
                ? "Password too short"
                : " "
            }
            onChange={updatePassword1}
          />
          <TextField
            sx={{ flexGrow: 0.48 }}
            value={password2}
            label="Confirm Password"
            type="password"
            autoComplete="password-confirm"
            error={issues.password !== undefined}
            helperText={password2 && password1 !== password2 ? "Passwords must match" : " "}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Box>
        <Button
          sx={{ width: "50%", margin: "0.4em" }}
          variant="contained"
          disabled={!username || !password1 || !password2 || (discordID !== "" && !checkDiscordID(discordID))}
          onClick={handleSubmit}
        >
          Create Account
        </Button>
        <Link variant="caption" sx={{ cursor: "pointer" }} onClick={() => router.push("/auth/login")}>
          Sign in with existing account
        </Link>
      </Paper>
    </Container>
  );
}
