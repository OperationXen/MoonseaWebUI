import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Box, Paper, Link } from "@mui/material";
import { TextField, Typography, Button } from "@mui/material";

import useSnackbar from "../../datastore/snackbar";
import { validatePassword } from "../../utils/user";
import { registerAccount } from "../../api/user";

export default function RegistrationWindow() {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [discordID, setDiscordID] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [issues, setIssues] = useState([]);

  const updatePassword1 = (e) => {
    delete issues.password;
    setIssues(issues);

    setPassword1(e.target.value);
  };

  const handleSubmit = () => {
    registerAccount(username, email, discordID, password1)
      .then(() => {
        displayMessage(
          "Your account has been created, please check your email for a verification email",
          "success"
        );
        navigate("/login");
      })
      .catch((error) => {
        setIssues(error.response.data);
        displayMessage("Unable to register this account", "error");
      });
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter" && username && password1) handleSubmit();
  };

  return (
    <Container sx={{ display: "flex", height: "70%" }}>
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
            error={issues.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            sx={{ flexGrow: 0.35 }}
            value={discordID}
            label="Discord ID (optional)"
            autoComplete="discord"
            error={issues.discord_id}
            onChange={(e) => setDiscordID(e.target.value)}
          />
        </Box>
        <Box sx={{ margin: "0.4em", width: "100%" }}>
          <TextField
            fullWidth
            value={email}
            label="eMail"
            autoComplete="email"
            error={issues.username}
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
            error={issues.password}
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
            error={issues.password}
            helperText={
              password2 && password1 !== password2
                ? "Passwords must match"
                : " "
            }
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Box>
        <Button
          sx={{ width: "50%", margin: "0.4em" }}
          variant="contained"
          disabled={!username || !password1 || !password2}
          onClick={handleSubmit}
        >
          Create Account
        </Button>
        <Link
          variant="caption"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Sign in with existing account
        </Link>
      </Paper>
    </Container>
  );
}
