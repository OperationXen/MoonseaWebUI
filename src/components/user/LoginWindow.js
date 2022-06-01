import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Box, Paper, Link } from "@mui/material";
import { TextField, Typography, Button } from "@mui/material";

import useSnackbar from "../../datastore/snackbar";
import { doLogin } from "../../api/user";

export default function LoginWindow() {
  const displayMessage = useSnackbar((s) => s.displayMessage);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    doLogin(username, password)
      .then(() => navigate("/"))
      .catch((error) => {
        if (error.response.status === 401) {
          displayMessage("Wrong username or password", "error");
        } else displayMessage("Server error", "error");
      });
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter" && username && password) handleSubmit();
  };

  return (
    <Container sx={{ display: "flex", height: "70%" }}>
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

        <Link variant="caption" onClick={() => navigate("/login")}>
          Register an account
        </Link>
        <Link variant="caption" onClick={() => navigate("/forgotpassword")}>
          I forgot my password
        </Link>
      </Paper>
    </Container>
  );
}
