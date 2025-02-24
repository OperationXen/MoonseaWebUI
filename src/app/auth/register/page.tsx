"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

import { Container, Box, Paper, Link, Divider } from "@mui/material";
import { TextField, Typography, Button } from "@mui/material";

import useSnackbar from "@/data/store/snackbar";
import { validatePassword, checkDiscordID } from "@/utils/user";
import { useUserStatus } from "@/data/fetch/auth";

type Issues = {
  password?: string;
  username?: string;
  email?: string;
};

export default function RegistrationWindow() {
  const router = useRouter();
  const { data: userStatus, registerAccount } = useUserStatus();
  const displayMessage = useSnackbar((s) => s.displayMessage);

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
    registerAccount({
      username: username,
      email: email,
      discord_id: discordID,
      password: password1,
    })
      .then(() => {
        displayMessage(
          "Your account has been created, please check your email for a verification email",
          "success",
        );
        router.push("/auth/login");
      })
      .catch((error) => {
        if ("errors" in error.response.data)
          setIssues(error.response.data["errors"]);
        displayMessage("Unable to register this account", "error");
      });
  };

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && username && password1) handleSubmit();
  };

  // if the user is authed already don't let them waste time here
  useEffect(() => {
    if (userStatus?.authenticated) router.push("/characters");
  }, [userStatus]);

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
        <Typography variant="h4">Create an account</Typography>
        <Divider className="w-full my-2" />
        <Box className="flex flex-col gap-2 w-full">
          <Box className="flex gap-2">
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

          <TextField
            fullWidth
            value={email}
            label="eMail"
            autoComplete="email"
            error={issues.email !== undefined}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box className="flex gap-2">
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
              helperText={
                password2 && password1 !== password2
                  ? "Passwords must match"
                  : " "
              }
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Box>
        </Box>
        <Box className="flex flex-col w-full items-center justify-center">
          <Button
            className="w-full"
            variant="contained"
            disabled={
              !username ||
              !password1 ||
              !password2 ||
              (discordID !== "" && !checkDiscordID(discordID))
            }
            onClick={handleSubmit}
          >
            Create Account
          </Button>
          <Divider className="w-80">
            <Typography className="opacity-80">or</Typography>
          </Divider>
          <NextLink
            href={"/api/discord_auth/login"}
            passHref
            className="w-full"
          >
            <Button className="w-full" variant="outlined">
              Sign in with discord
            </Button>
          </NextLink>
        </Box>
        <Box className="mt-2">
          <Link
            variant="caption"
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/auth/login")}
          >
            Sign in with existing account
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}
